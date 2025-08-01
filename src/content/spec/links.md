# 友情链接 🔗

欢迎来到友链页面！这里收集了一些优秀的技术博客和实用网站，希望对大家有所帮助。

---

## 🌟 友情博客

<div class="friend-links-grid">

<div class="friend-link-card">
    <a href="https://www.cnblogs.com/ZYPLJ/" target="_blank">
        <div class="card-avatar">
            <img src="https://pljzy.top/images/logo4.jpg" alt="博客园">
        </div>
        <div class="card-info">
            <h3 class="card-title">博客园</h3>
            <p class="card-desc">技术分享与学习交流的园地</p>
        </div>
    </a>
</div>

<div class="friend-link-card">
    <a href="https://github.com/ZyPLJ" target="_blank">
        <div class="card-avatar">
            <img src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" alt="GitHub">
        </div>
        <div class="card-info">
            <h3 class="card-title">GitHub</h3>
            <p class="card-desc">代码托管与开源项目分享</p>
        </div>
    </a>
</div>

<div class="friend-link-card">
    <a href="https://pljzy.top" target="_blank">
        <div class="card-avatar">
            <img src="https://pljzy.top/images/logo4.jpg" alt="旧站">
        </div>
        <div class="card-info">
            <h3 class="card-title">我的旧站</h3>
            <p class="card-desc">记录技术成长的足迹</p>
        </div>
    </a>
</div>

<div class="friend-link-card">
    <a href="https://blog.deali.cn/" target="_blank">
        <div class="card-avatar">
            <img src="https://blog.deali.cn/images/codelab.jpg" alt="程序设计实验室">
        </div>
        <div class="card-info">
            <h3 class="card-title">程序设计实验室</h3>
            <p class="card-desc">一个技术探索与分享的平台，专注于互联网热门新技术探索与团队敏捷开发实践，包括Web前后端、移动端开发、机器学习、数据分析、算法、Linux等技术，欢迎探讨、分享学习实践经验。</p>
        </div>
    </a>
</div>

<div class="friend-link-card">
    <a href="https://www.jjy2023.cn/" target="_blank">
        <div class="card-avatar">
            <img src="https://upyun.jjy2023.cn/2024/06/Pika.jpg" alt="云深知处">
        </div>
        <div class="card-info">
            <h3 class="card-title">云深知处</h3>
            <p class="card-desc">在喧嚣世界寻求片刻宁静</p>
        </div>
    </a>
</div>

<div class="friend-link-card">
    <a href="https://pinaland.cn/" target="_blank">
        <div class="card-avatar">
            <img src="https://pic.pinaland.cn/uploads/2024/05/27/6653f31f92d2a.png" alt="空屿">
        </div>
        <div class="card-info">
            <h3 class="card-title">空屿</h3>
            <p class="card-desc">一颗树，一座灯塔，一座岛</p>
        </div>
    </a>
</div>

</div>

---

## 🛠️ 实用工具

<div class="friend-links-grid">

<div class="friend-link-card">
    <a href="https://ico.pljzy.top" target="_blank">
        <div class="card-avatar">
            <img src="https://ico.pljzy.top/logo.ico" alt="图片转Ico">
        </div>
        <div class="card-info">
            <h3 class="card-title">图片转Ico</h3>
            <p class="card-desc">在线png、jpg、jpeg图片转Ico工具</p>
        </div>
    </a>
</div>

</div>

---

## 📧 友链申请

### 申请要求
1. 🌐 网站内容积极向上，无违法违规内容
2. 📝 定期更新，有一定的原创内容
3. 🔗 网站访问正常，加载速度良好
4. 💻 技术类、学习类或个人博客优先

### 申请方式

提交issue至：[https://github.com/ZyPLJ/fuwai_zy/issues](https://github.com/ZyPLJ/fuwai_zy/issues)

或者去旧站提交：[https://www.pljzy.top/LinkExchange/Add](https://www.pljzy.top/LinkExchange/Add)

请在邮件中包含以下信息：
- 网站名称
- 网站链接  
- 网站描述
- 网站图标/头像

参考格式：
- 网站名称：ZYBlog
- 网站介绍：一个技术探索与分享的平台
- 网站地址：https://blog.pljzy.top/
- 网站头像：https://blog.pljzy.top/_astro/logo.BxIxyJV1_Z19cEQW.webp
---

**感谢大家的支持与分享！** 🙏

<style>
.friend-links-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 1.5rem;
    margin: 2rem 0;
}

.friend-link-card {
    background: var(--card-bg);
    border: 1px solid var(--line-divider);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    position: relative;
}

.friend-link-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    border-color: var(--primary);
}

.friend-link-card a {
    display: flex;
    align-items: center;
    padding: 0;
    text-decoration: none;
    color: inherit;
    height: 100%;
}

.card-avatar {
    flex-shrink: 0;
    width: 80px;
    height: 80px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 12px 0 0 12px;
}

.card-info {
    flex: 1;
    min-width: 0;
    padding: 1rem 1.25rem;
}

.card-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.friend-link-card:hover .card-avatar img {
    transform: scale(1.05);
}

.card-title {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--text-primary);
    margin: 0 0 0.25rem 0;
    line-height: 1.3;
}

.card-desc {
    font-size: 0.875rem;
    color: var(--text-secondary);
    margin: 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.custom-md a:not(.no-styling) {
    margin:0;
    padding:0;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .friend-links-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .card-avatar {
        width: 70px;
        height: 70px;
    }
    
    .card-info {
        padding: 0.875rem 1rem;
    }
}

/* 深色模式优化 */
:root.dark .friend-link-card {
    border-color: var(--line-divider);
}

:root.dark .friend-link-card:hover {
    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.05);
}
</style>

