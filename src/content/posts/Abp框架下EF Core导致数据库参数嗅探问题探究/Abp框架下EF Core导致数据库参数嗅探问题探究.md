---
title: Abp框架下EF Core导致数据库参数嗅探问题探究
published: 2026-08-26 17:00:02
description: 上周六，吃完中饭，刚准备玩游戏，一通电话打进来，领导打电话说：“客户反馈某某页面系统查询慢，看看什么问题”。
tags: [Sql Server, Sql, .NET]
category: 杂七杂八
draft: false
pinned: false
---

# Abp框架下EF Core导致数据库参数嗅探问题探究

## 前言

上周六，吃完中饭，刚准备玩游戏，一通电话打进来，领导打电话说：“客户反馈某某页面系统查询慢，看看什么问题”。然后我就打开工作笔记本，然后连堡垒机，同时在本地打开系统查看问题。

## 初看

刚开始看代码，没发现什么问题，也让**AI**看了下，没啥问题。

就是很简单的`linq`查询语句，然后我本地调试，查询非常快。

数据索引啥的也没问题，都是在项目初期就已经创建好了的。

不过我还是优化了一版，更新到客户环境上去试了一下，查询确实慢。基本上要**40多秒**，由于客户环境要用堡垒机，所以我本地只能用自己的数据库测试，数据量没那么大，但是客户那边这几张表数据量也不是特别多，查询出来也就**4万条**数据，我本地也有**1万多条**，但是本地只需要**1秒**不到。

## 问题发现

最后还是`Deepseek`提到了**“参数嗅探”**这个问题，让我有点眉目了。

### 参数嗅探

参数嗅探是 `SQL Server` 的一种机制

```sql
-- 第一次执行这个查询时，SQL Server 会：
-- 1. 看到参数 @TenantId = 'A'（少量数据）
-- 2. 生成针对 'A' 优化的执行计划（使用 Index Seek）
-- 3. 缓存这个执行计划

-- 第二次执行时，参数变成 @TenantId = 'B'（大量数据）
-- SQL Server 直接使用缓存的执行计划（仍然用 Index Seek）
-- 但 'B' 有大量数据，应该用 Index Scan 更合适
-- 导致性能问题
```

**示例：**

```sql
-- 表中有约 100 万条数据
-- TenantId = 'A'：只有 10 条数据
-- TenantId = 'B'：有 90 万条数据

-- 第一次执行（TenantId = 'A'）
SELECT * FROM table 
WHERE TenantId = @TenantId  -- @TenantId = 'A'
-- SQL Server 看到 'A' 只有 10 条，选择 Index Seek
-- 缓存这个执行计划

-- 第二次执行（TenantId = 'B'）
SELECT * FROM table 
WHERE TenantId = @TenantId  -- @TenantId = 'B'
-- 使用缓存的执行计划（Index Seek）
-- 但 'B' 有 90 万条，Index Seek 效率很低
-- 应该使用 Index Scan 或不同的索引
```

ABP 框架的租户过滤加剧了问题。

```sql
-- ABP 框架自动添加的租户过滤
-- 生成的 SQL：
WHERE (@__ef_filter__p_0 = CAST(1 AS bit)) 
   OR ([i].[TenantId] = @__ef_filter__CurrentTenantId_1)

-- 这个 OR 条件让 SQL Server 更难优化
-- 因为：
-- 1. 当 @__ef_filter__p_0 = 1 时，条件永远为真（不过滤）
-- 2. 当 @__ef_filter__p_0 = 0 时，需要过滤 TenantId
-- SQL Server 不知道参数的实际值，难以选择最优执行计划
```

### 索引扫描和索引查找

| 特性         | Index Seek（**索引查找**） | Index Scan（索引扫描） |
| :----------- | :------------------------- | :--------------------- |
| **读取方式** | 直接定位                   | 遍历全部               |
| **读取量**   | 只读需要的行               | 读取所有行             |
| **速度**     | 快                         | 慢                     |
| **适用场景** | 返回少量行                 | 返回大量行             |
| **I/O 开销** | 低                         | 高                     |
| **CPU 开销** | 低                         | 高                     |

### 统计信息

SQL Server 的查询优化器依赖统计信息来估算查询返回的行数，然后决定使用 `Index Seek` 还是 `Index Scan`。

示例：

```sql
-- 假设 A 表有 100 万行数据
-- 统计信息过时，SQL Server 认为 TenantId = 'A' 只有 10 行

SELECT * FROM A 
WHERE TenantId = 'A';

-- 实际情况：TenantId = 'A' 有 90 万行
-- 但 SQL Server 认为只有 10 行
-- 所以选择了 Index Seek（适合返回少量行）
-- 结果：Index Seek 需要处理 90 万行，效率极低
-- 正确选择应该是 Index Scan（适合返回大量行）
```

### 简单解释

ABP框架默认会加上租户条件查询，原本我那段EF到数据库执行应该走**索引扫描**的，然后由于数据库统计信息过时了 走**索引查找**了，然后数据量大导致查询非常慢。

## 问题解决

用下面的`sql`查询下正在运行的慢查询语句。

```sql
SELECT 
    r.session_id,
    r.start_time,
    r.status,
    r.command,
    r.blocking_session_id,
    r.wait_type,
    r.wait_time,
    r.wait_resource,
    r.cpu_time,
    r.total_elapsed_time / 1000.0 AS elapsed_seconds,
    r.logical_reads,
    r.reads,
    r.writes,
    t.text AS query_text,
    SUBSTRING(t.text, (r.statement_start_offset/2)+1,
        ((CASE r.statement_end_offset
            WHEN -1 THEN DATALENGTH(t.text)
            ELSE r.statement_end_offset
        END - r.statement_start_offset)/2) + 1) AS current_statement,
    qp.query_plan,
    DB_NAME(t.dbid) AS database_name,
    s.login_name,
    s.host_name,
    s.program_name
FROM sys.dm_exec_requests r
INNER JOIN sys.dm_exec_sessions s ON r.session_id = s.session_id
CROSS APPLY sys.dm_exec_sql_text(r.sql_handle) t
CROSS APPLY sys.dm_exec_query_plan(r.plan_handle) qp
WHERE r.session_id > 50  -- 排除系统会话
    AND r.total_elapsed_time > 5000  -- 执行超过5秒
ORDER BY r.total_elapsed_time DESC;
```

通过这个语句可以查询到`EF`执行的`sql`。

> 注：上面的查询只能看到**正在执行**的慢查询（40 秒的查询足够抓到）。如果想查历史慢查询，可以改查 `sys.dm_exec_query_stats`，按 `total_elapsed_time` 排序。

我发现确实执行很慢，大约**40s**，然后我把语句捞出来，手动把参数替换成字面量再执行，发现只要**1秒**。

更新下统计信息

```sql
UPDATE STATISTICS 表名
```

然后再次执行后发现查询很快了。

`UPDATE STATISTICS` 之所以立竿见影，不只是因为统计信息变新了，更重要的是**更新统计会使引用该表的缓存执行计划失效**，下次执行被迫重新编译。

## AI总结

- **根因**：参数嗅探。ABP 的租户过滤让同一段 SQL 被所有租户/请求共用一份缓存计划，首次编译时的参数值（可能还叠加了过时的统计信息）生成了坏计划，之后所有执行全部复用，查询从 1 秒退化到 40 秒。
- **排查套路**：DMV 抓慢查询 → 捞出 EF 生成的 SQL → 手动填字面量执行对比。参数化慢、字面量快，就是嗅探的直接证据。
- **修复**：`UPDATE STATISTICS` 让缓存计划失效并刷新估算。