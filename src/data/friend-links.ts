export type FriendLinkItem = {
	title: string;
	url: string;
	avatar: string;
	desc: string;
};

export type FriendLinkSection = {
	title: string;
	items: FriendLinkItem[];
};

export const friendLinkSections: FriendLinkSection[] = [
	{
		title: "🌟 友情博客",
		items: [
			{
				title: "博客园",
				url: "https://www.cnblogs.com/ZYPLJ/",
				avatar: "https://pljzy.top/images/logo4.jpg",
				desc: "技术分享与学习交流的园地",
			},
			{
				title: "GitHub",
				url: "https://github.com/ZyPLJ",
				avatar:
					"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",
				desc: "代码托管与开源项目分享",
			},
			{
				title: "我的旧站",
				url: "https://pljzy.top",
				avatar: "https://pljzy.top/images/logo4.jpg",
				desc: "记录技术成长的足迹",
			},
			{
				title: "程序设计实验室",
				url: "https://blog.deali.cn/",
				avatar: "https://blog.deali.cn/images/codelab.jpg",
				desc: "一个技术探索与分享的平台，专注于互联网热门新技术探索与团队敏捷开发实践，包括Web前后端、移动端开发、机器学习、数据分析、算法、Linux等技术，欢迎探讨、分享学习实践经验。",
			},
			{
				title: "云深知处",
				url: "https://www.jjy2023.cn/",
				avatar: "https://upyun.jjy2023.cn/2024/06/Pika.jpg",
				desc: "在喧嚣世界寻求片刻宁静",
			},
			{
				title: "空屿",
				url: "https://pinaland.cn/",
				avatar: "https://pic.pinaland.cn/uploads/2024/05/27/6653f31f92d2a.png",
				desc: "一颗树，一座灯塔，一座岛",
			},
			{
				title: "Xeonzilla's Note",
				url: "https://xeonzilla.top/",
				avatar: "https://cdn.pljzy.top/linkIco/avatar.avif",
				desc: "Yuri is life.",
			},
			{
				title: "Horean's Blog",
				url: "https://blog.hxrch.top",
				avatar: "https://img.hxrch.top/bfav256.webp",
				desc: "Spread the Knowledge Wisely & Widely",
			},
			{
				title: "SLHAF's blog",
				url: "https://blog.slhaf.work/",
				avatar: "https://cdn.pljzy.top/linkIco/favicon.png",
				desc: "SLHAF的个人博客",
			},
			{
				title: "joeytoday",
				url: "https://joeytoday.com",
				avatar: "https://joeytoday.com/favicon/favicon.ico",
				desc: "Show, not tell. Thinking, Reading, Writing.",
			},
			{
				title: "Guoweiyi",
				url: "https://gwy.fun",
				avatar: "https://www.gwy.fun/zhan/logo.jpg",
				desc: "不知何时春日悄来临， 不知何日春花已落尽。",
			},
			{
				title: "Lan小站",
				url: "https://www.lanol.cn/",
				avatar: "https://cdn.pljzy.top/linkIco/lan.png",
				desc: "Lan小站",
			},
			{
				title: "飞鸟",
				url: "https://lzxjack.top",
				avatar: "https://img.lzxjack.top/202203302154224.webp",
				desc: "一只平凡的鸟罢了。",
			},
			{
				title: "iMaeGoo’s Blog",
				url: "https://www.imaegoo.com",
				avatar: "https://www.imaegoo.com/images/avatar.jpg",
				desc: "虹墨空间站",
			},
			{
				title: "个站商店",
				url: "https://storeweb.cn/site/o/2235",
				avatar: "https://storeweb.cn/static/favicon.ico",
				desc: "个站商店",
			},
			{
				title: "云海花瑶",
				url: "https://www.moeyao.cn/",
				avatar:
					"https://dn-qiniu-avatar.qbox.me/avatar/d00de9fbffe50946b950a3fd0cd1bfdb",
				desc: "我相信一切都会好起来的！",
			},
			{
				title: "澄沨的漫游茶记",
				url: "https://champhoon.xyz/",
				avatar: "https://api.champhoon.xyz/favicon/favicon-main.png",
				desc: "Stay hungry, Stay foolish.",
			},
			{
				title: "乱话三千",
				url: "https://www.zanks.link",
				avatar: "https://avatars.githubusercontent.com/u/144093429?v=4",
				desc: "养了一只叫基金的可爱小猫,平时会写点技术向的东西,有点做饭的小爱好",
			},
			{
				title: "Elin's Blog",
				url: "https://elin521.cn",
				avatar:
					"https://elin521.cn/_next/image?url=%2Fauther_avatar.webp&w=3840&q=75",
				desc: "Elin's Blog个人博客",
			},
			{
				title: "远方博客",
				url: "https://blog.ltyuanfang.cn/",
				avatar:
					"https://tucdn.ltyuanfang.cn/images/2020/11/26/eebc2ac86abd7.jpg",
				desc: "因为喜欢，所以折腾！",
			},
			{
				title: "伏枥之间",
				url: "https://www.leehenry.top",
				avatar: "https://leehenry.top/friends/my-avatar-portrait.jpg",
				desc: "莫听穿林打叶声，何妨吟啸且徐行。",
			},
			{
				title: "酥米的小站",
				url: "https://www.sumi233.top/",
				avatar:
					"https://cdn.sumi233.top/gh/huang233893/blog-image-bed@main/top/huang233893/imgs/blog/usersumi.png",
				desc: "终有一日，寻梦中人",
			},
			{
				title: "天海博客",
				url: "https://woolyun.com/",
				avatar:
					"https://woolyun.com/wp-content/uploads/2025/05/yyl-e1746698677584.jpg",
				desc: "建站经验记录，实用工具推荐，免费资源分享。",
			},
			{
				title: "小野博客",
				url: "https://lb5.net/",
				avatar: "https://lb5.net/favicon.ico",
				desc: "小野（Hirono）博客的个人网站，主要讲述关于小野的一些陈芝麻烂谷子事。网络、生活、我的主张，也是一个自留地",
			},
			{
				title: "TimochanのBlog",
				url: "https://www.timochan.cn/",
				avatar:
					"https://www.timochan.cn/api/objects/icon/9s6tbcvax674yv2m88.jpg",
				desc: "Let's start learning",
			},
			{
				title: "郭飞的笔记",
				url: "https://www.guofei.site/",
				avatar: "https://www.guofei.site/p/me/me.png",
				desc: "郭飞的笔记",
			},
			{
				title: "peachRL的小站",
				url: "https://wanyijizi.com",
				avatar: "https://blog.wanyijizi.com/avatar.jpg",
				desc: "万亿及秭",
			},
			{
				title: "繁华如风的小站",
				url: "https://fhrf.top",
				avatar: "https://www.fhrf.top/img/tx.png!/format/webp/lossless/true",
				desc: "醉后不知天在水,满船清梦压星河。",
			},
			{
				title: "mccsjs",
				url: "https://mccsjs.eu.org/",
				avatar: "https://mccsjs.eu.org/img/head.jpg",
				desc: "点一盏灯，等一个迷路的夜🍁🍁🍁",
			},
			{
				title: "THW's Blog",
				url: "https://blog.tianhw.top",
				avatar: "https://image.tianhw.top/avatar.webp",
				desc: "前途似海，来日方长",
			},
			{
				title: "阿叶Ayeez",
				url: "https://blog.Ayeez.cn",
				avatar: "https://cdn.pljzy.top/linkIco/ayeez.jpg",
				desc: "记录自己的学习历程，记录自己的美好生活",
			},
			{
				title: "夏夜流萤",
				url: "https://blog.cuteleaf.cn",
				avatar:
					"https://q.qlogo.cn/headimg_dl?dst_uin=7618557&spec=640&img_type=jpg",
				desc: "总有一场相遇，是互相喜欢的！",
			},
			{
				title: "绘星里",
				url: "https://blog.storia.ren/",
				avatar: "https://blog.storia.ren/images/icon.png",
				desc: "一起来绘制属于自己的星星！",
			},
			{
				title: "Thun888",
				url: "https://blog.hzchu.top/",
				avatar: "https://blog.hzchu.top/img/avatar.webp",
				desc: "夏日当空，心如深渊",
			},
			{
				title: "fishcpy的小破站",
				url: "https://blog.fis.ink",
				avatar: "https://www.fis.ink/img/logo.png",
				desc: "非淡泊无以明志，非宁静无以致远",
			},
			{
				title: "花墨",
				url: "https://flowersink.com",
				avatar: "https://api.flowersink.com/img/logo.png",
				desc: "好耶！是再花猫猫头ฅ•ω•ฅ",
			},
			{
				title: "鈴奈咲桜のBlog",
				url: "https://blog.sakura.ink",
				avatar: "https://q2.qlogo.cn/headimg_dl?dst_uin=2731443459&spec=5",
				desc: "愛することを忘れないで",
			},
			{
				title: "LYEy_isine个人博客",
				url: "https://caiyifeng.top/",
				avatar: "https://caiyifeng.top/avatar.jpg",
				desc: "花海无一日,少年踏自来",
			},
			{
				title: "LANSGANBS's Blog",
				url: "https://www.lansganbs.cn/",
				avatar: "https://www.lansganbs.cn/images/friends/lansganbs.png",
				desc: "红叶最多情，一舞寄相思。",
			},
			{
				title: "幽默的小刘吖的博客",
				url: "https://blog.lzch.top/",
				avatar: "https://blog.lzch.top/favicon.png",
				desc: "每天分享不一样的知识内容",
			},
			{
				title: "千纸鹤",
				url: "http://blog.wilsonzy.cn/",
				avatar: "https://cdn.pljzy.top/linkIco/wilsonzy.png",
				desc: "《千纸鹤》是一个关于个人成长、心灵探索和生活哲学的博客。",
			},
			{
				title: "拾音集",
				url: "https://blog.tibtob.cn/",
				avatar: "https://s1.tibtob.cn/blog/logo.png",
				desc: "收集生活里的声与光",
			},
			{
				title: "浪小舟的博客",
				url: "https://blog.lonzov.top/",
				avatar: "https://img.fastmirror.net/s/2025/09/12/68c39893a84aa.png",
				desc: "向利而生，随心而活",
			},
			{
				title: "栖梦集",
				url: "https://www.lafoyer.com",
				avatar:
					"https://www.lafoyer.com/wp-content/uploads/2025/12/cropped-icon.png",
				desc: "一席小筑结网缘，半分禅意伴闲言",
			},
			{
				title: "Serenity",
				url: "https://www.aobp.cn/",
				avatar: "https://www..aobp.cn/upload/%E5%A4%B4%E5%83%8F.png",
				desc: "热爱可抵岁月漫长",
			},
			{
				title: "Inalineの小站",
				url: "https://inaline.net",
				avatar:
					"https://inaline.net/usr/themes/inaline/assets/images/logo/cover.png",
				desc: "此情可待成追忆，只是当时已惘然",
			},
			{
				title: "许耿彬的博客",
				url: "https://xugengbin.com/",
				avatar: "https://xugengbin.com/_astro/avatar.kViV4Dl9_ZoB1ND.webp",
				desc: "许耿彬的博客",
			},
			{
				title: "小慧博客",
				url: "https://www.itxiaohui.top/",
				avatar: "https://blogoss.itxiaohui.top/logo%20-uhlgnmrf.png",
				desc: "小慧的技术博客",
			},
			{
				title: "SengokuCola'sBlog",
				url: "https://home.nibutupaopao.top/",
				avatar: "https://lsky.nibutupaopao.top/i/2026/07/09/6a4fc40211f69.png",
				desc: "随着风的轨迹 在那耀眼的午后",
			},
			{
				title: "Cheng · 技术刊",
				url: "https://blog.lzch.eu.org/",
				avatar: "https://blog.lzch.eu.org//favicon.ico",
				desc: "关注人工智能、系统设计与知识管理。喜欢把复杂问题写清楚，也把半成品笔记种进花园。",
			},
			{
				title: "南风未起",
				url: "https://aly.lbool.site/",
				avatar: "https://www.lbool.site/MyBlog/head.jpg",
				desc: "云原生/Go技术分享站",
			},
		],
	},
	{
		title: "🛠️ 实用工具",
		items: [
			{
				title: "图片转Ico",
				url: "https://ico.pljzy.top",
				avatar: "https://ico.pljzy.top/logo.ico",
				desc: "在线png、jpg、jpeg图片转Ico工具",
			},
			{
				title: "文件快递柜",
				url: "https://www.pljzy.top/share",
				avatar: "https://www.pljzy.top:12346/assets/logo_small.png",
				desc: "FileCodeBox, 文件快递柜, 口令传送箱, 匿名口令分享文本, 文件",
			},
			{
				title: "TXT转电子书工具",
				url: "https://ebook.deali.cn/",
				avatar: "https://ebook.deali.cn/static/favicon.ico",
				desc: "将TXT文本文件转换为EPUB、MOBI、AZW3等电子书格式",
			},
			{
				title: "日历记账系统",
				url: "https://www.pljzy.top/bookkeeping.html",
				avatar: "https://www.pljzy.top/logo.ico",
				desc: "本地记账网页应用，轻松记录和管理您的日常消费",
			},
			{
				title: "网站监控服务",
				url: "https://stats.uptimerobot.com/f3bIMzwfwF",
				avatar: "https://cdn.pljzy.top/linkIco/uptimerobot.png",
				desc: "提供网站监控服务，实时监测网站状态，确保网站稳定运行",
			},
			{
				title: "便签墙",
				url: "https://pljzy.top/note.html",
				avatar: "https://pljzy.top/notelogo.ico",
				desc: "有趣的静态便签墙",
			},
			{
				title: "便签墙交互版",
				url: "https://www.pljzy.top/noteweb",
				avatar: "https://pljzy.top/notelogo.ico",
				desc: "有趣的便签墙可以添加便签",
			},
		],
	},
	{
		title: "🌐 迷失友链",
		items: [],
	},
];
