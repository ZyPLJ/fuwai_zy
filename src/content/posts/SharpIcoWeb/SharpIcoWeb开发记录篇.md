---
title: SharpIcoWeb开发记录篇
published: 2025-07-27
description: SharpIcoWeb开发记录篇.
image: ./2756baed-a0e4-4e17-8e57-9b770def0469.png
tags: [C#, .NET, MinimalApi]
category: .NET 技术合集
draft: false
pinned: false
---
`

# SharpIcoWeb开发记录篇

## 前言

大佬用.NET 9.0开发了[SharpIco](https://github.com/star-plan/sharp-ico)轻量级图标生成工具，是一款控制台应用程序，支持AOT发布，非常方便。

**✨ 功能特点**

* 🖼️ 将PNG图像转换为多尺寸ICO图标
* 🔍 支持生成包含自定义尺寸的ICO图标（最高支持1024×1024）
* 🧐 检查ICO文件的内部结构和信息
* 📏 准确识别并显示超大尺寸图标（如512×512、1024×1024）的实际尺寸

直达地址：[https://github.com/star-plan/sharp-ico](https://github.com/star-plan/sharp-ico)

现在互联网上应该有很多这类小工具或者网站，我也想部署把这个小工具部署成网站，当然不要和别人网站一模一样，所有后端我采用 `.NET Core Minimal API`去开发。

大佬开发的这款小工具可以直接在集成 `.NET Core`中，所以我只需要写一个上传文件的接口就行了。用了 `.NET`这么久，写接口一直用的是 `WebApi`，这次尝试下 `Minimal Api`。

在线地址：[https://ico.pljzy.top](https://ico.pljzy.top)

## Minimal Api 简介

> 在使用 ASP.NET Core 生成快速 HTTP API 时，可以将最小 API 作为一种简化的方法。 可以使用最少的代码和配置生成完全正常运行的 REST 终结点。 跳过传统的基架，并通过流畅地声明 API 路由和操作来避免不必要的控制器。

### 主要特点

1. **简洁的语法**：使用更少的代码定义 API 端点
2. **减少样板代码**：不需要控制器类
3. **内置依赖注入**：简化服务配置
4. **路由和请求处理一体化**：直接在路由定义中处理请求
5. **支持所有 ASP.NET Core 功能**：中间件、认证、授权等

### 架构概述

`MiniAPI`的核心架构包括以下几个关键组件：

1. WebApplication：这是整个应用的入口点和宿主。它负责配置服务、中间件和路由。
2. Endpoints：这些是API的终点，也就是处理特定HTTP请求的地方。
3. Handlers：这些是实际处理请求并生成响应的函数。
4. Middleware：这些组件在请求到达handler之前和之后处理请求。

### 关键术语

在进行开发前，先了解下什么是 `Endpoints`、`Handlers`、`Middleware`。

1. Endpoints（端点）：Endpoints是一个特定的URL路径，与一个HTTP方法相关联。

   ```c#
   app.MapGet("/hello", () => "Hello, World!");
   ```
2. Handlers（处理器）：Handlers是一个函数，它接收http请求并返回响应。在 `MiniAPIs`中handler可以是一个简单的lambda表达式，也可以是一个单独定义的方法。例如：

   ```c#
   app.MapGet("/users/{id}", (int id) => $"User ID: {id}");
   
   ```
3. Middleware（中间件）：与WebApi一样，MiniAPIs中也可以使用中间件，它们可以在请求到达handler之前执行操作，也可以在handler处理完请求后修改响应。例如，你可以使用中间件来处理身份验证、日志记录或异常处理。

## 开发

了解完一些 `Minimal Api`基础知识后，就可以开始开发了。首先创建 `MiniMal Api`模版的 `.NET 9 Api`程序。

模版默认为创建一个示例接口，看到这个接口，看起来和 `WebApi`写法差别不大，但是代码是直接写在 `Program.cs`文件中,无需创建控制器。

![image.png](731d9fcb-67c3-438a-9142-2dbf19de76c6.png)

接下来开发一个上传文件的接口，然后调用大佬开发的工具就ok了。

在 `MiniAPI`中也可以使用依赖注入，那么这里创建一个处理文件的服务，然后再注入这个服务在接口中使用。

### 项目结构

可以看到我的项目可以直接引用 `SharpIco`工具，这里右键 `SharpIco`编辑csproj文件将项目类型改为类库就可以直接调用了。

```xml
<PropertyGroup>
        <!-- 改为生成库而不是控制台应用 -->
        <OutputType>Library</OutputType>
</PropertyGroup>
```

![image.png](f442603a-fb8c-476d-a958-8d54ccbf88b1.png)

### IFileService接口

```c#
public interface IFileService
{
    // 检查文件是否有效
    bool IsFileValid(IFormFile file);
    // 保存上传的文件
    Task<string> SaveUploadedFile(IFormFile file);
    // 创建临时目录
    string GetTempDirectory();
    // 读取文件到内存流
    Task<MemoryStream> ReadFileToMemoryAsync(string filePath);
    // 删除临时文件
    void DeleteFile(string tempFilePath);
}
```

### FileService类

这里使用了一个变量 `_tempFiles`去记录上传的临时文件,然后实现IDisposable接口自动清理临时文件，确保上传的图片不会留存到硬盘里面。

一开始我的设计思路就是在 `wooroot`中去建立一个待转换和转换后的目录取处理图片，但转念一想，作为一款图片转ico的工具，还是不要留存图片好一点，所以才采用了临时目录这个办法。

```c#

public class FileService : IFileService, IDisposable
{
    private readonly List<string> _tempFiles = new();

    public string GetTempDirectory()
    {
        var tempDir = Path.Combine(Path.GetTempPath(), "SharpIcoTemp");
        Directory.CreateDirectory(tempDir);
        return tempDir;
    }
  
    public bool IsFileValid(IFormFile file)
    {
        var allowedExtensions = new[] { ".png", ".jpg", ".jpeg" };
        var extension = Path.GetExtension(file.FileName).ToLowerInvariant();
        return file.Length is > 0 and < 10 * 1024 * 1024 && // 10MB
               allowedExtensions.Contains(extension);
    }

    // 保存上传的文件
    public async Task<string> SaveUploadedFile(IFormFile file)
    {
        var tempDir = GetTempDirectory();
        var tempFilePath = Path.Combine(tempDir, $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}");
  
        await using var stream = new FileStream(tempFilePath, FileMode.Create);
        await file.CopyToAsync(stream);
  
        _tempFiles.Add(tempFilePath); // 记录待清理文件
        return tempFilePath;
    }
  
    // 安全读取文件到内存流
    public async Task<MemoryStream> ReadFileToMemoryAsync(string filePath)
    {
        var memoryStream = new MemoryStream();
        await using (var fileStream = File.OpenRead(filePath))
        {
            await fileStream.CopyToAsync(memoryStream);
        }
        memoryStream.Position = 0;
        return memoryStream;
    }

    public void DeleteFile(string tempFilePath)
    {
        if (File.Exists(tempFilePath))
            File.Delete(tempFilePath);
    }

    // 实现IDisposable接口自动清理
    public void Dispose()
    {
        foreach (var file in _tempFiles)
        {
            try
            {
                if (File.Exists(file))
                    File.Delete(file);
            }
            catch { /* 忽略删除异常 */ }
        }
        GC.SuppressFinalize(this);
    }
}
```

### Program类

服务写完后，接下来在配置类中注入服务并完成接口编写就大功告成了。

注入服务：

```c#
builder.Services.AddScoped<IFileService, FileService>();
```

接口编写：

```c#
app.MapPost("/api/uploadDownload", async ([FromForm] IFormFile file,[FromForm] string? sizes,IFileService fileService, ILogger<Program> logger) =>
{
    try
    {
        // 验证输入
        if (!fileService.IsFileValid(file))
        {
            return Results.BadRequest("请上传有效文件,文件大小不能超过10MB");
        }

        // 保存临时文件
        var tempFilePath = await fileService.SaveUploadedFile(file);

        // 生成输出路径
        var outputPath = Path.Combine(fileService.GetTempDirectory(), $"{Guid.NewGuid()}.ico");

        // 执行转换 处理大小参数
        var sizesArray = sizes?.Split(',').Select(int.Parse).ToArray();
        if (sizesArray is { Length: > 0 })
            IcoGenerator.GenerateIcon(tempFilePath, outputPath, sizesArray);
        else
            IcoGenerator.GenerateIcon(tempFilePath, outputPath);

        // 读取到内存
        var memoryStream = await fileService.ReadFileToMemoryAsync(outputPath);
  
        // 删除临时文件
        fileService.DeleteFile(outputPath);
  
        logger.LogInformation($"{DateTime.UtcNow} 文件 {file.FileName} 转换成功");
  
        return Results.File(memoryStream, "image/x-icon");
    }
    catch (Exception ex)
    {
        logger.LogError(ex, $"{DateTime.UtcNow} 处理文件时发生错误");
        return Results.Problem("处理文件时发生错误");
    }
}).DisableAntiforgery();
```

## 接口测试

这里直接使用模版自带的http文件进行测试，这个还是第一次使用，还折腾了挺久。

`SharpIcoWeb.http` 文件

简单介绍下，第一个请求只上传了图片文件，未指定尺寸参数，后端接口会默认生成16,32,48,64,128,256,512,1024 尺寸的ico文件。

第二个请求就是添加了尺寸参数的请求。

```c#
@SharpIcoWeb_HostAddress = http://localhost:5235

### 上传文件并转换为ICO（不带尺寸参数）
POST {{SharpIcoWeb_HostAddress}}/api/uploadDownload
Content-Type: multipart/form-data; boundary=WebAppBoundary

--WebAppBoundary
Content-Disposition: form-data; name="file"; filename="1.png"
Content-Type: image/png

< ./1.png
--WebAppBoundary--

### 上传文件并转换为ICO（带尺寸参数）
POST {{SharpIcoWeb_HostAddress}}/api/uploadDownload
Content-Type: multipart/form-data; boundary=WebAppBoundary

--WebAppBoundary
Content-Disposition: form-data; name="file"; filename="1.png"
Content-Type: image/png

< ./1.png
--WebAppBoundary
Content-Disposition: form-data; name="sizes"

16,32,48,64,128
```

### 测试结果

![image.png](837bb5ba-af7c-4a23-b364-55c1ac60737c.png)

### 关键代码

`IcoGenerator.GenerateIcon(tempFilePath, outputPath, sizesArray);`这里是调用SharpIco工具提供的方法。

`app.MapPost().DisableAntiforgery()`DisableAntiforgery作用是禁用 ASP.NET Core 的防伪造令牌验证。

## 相关链接

* SharpIco：https://github.com/star-plan/sharp-ico
* [SharpIcoWeb](https://github.com/ZyPLJ/SharpIcoWeb)：https://github.com/ZyPLJ/SharpIcoWeb
* 最小API官方文档：[https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/minimal-apis/overview?view=aspnetcore-9.0](https://learn.microsoft.com/zh-cn/aspnet/core/fundamentals/minimal-apis/overview?view=aspnetcore-9.0)
* 最小API学习指南：[https://blog.csdn.net/xiaohucxy/article/details/140134](https://blog.csdn.net/xiaohucxy/article/details/140134927)

