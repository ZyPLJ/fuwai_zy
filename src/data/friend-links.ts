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
				avatar: "https://cdn-images.hxrch.top/blog-logo_128x128.png",
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
					"https://cdn.sumi233.top/gh/huang233893/blog-image-bed/top/huang233893/imgs/blog/userfb6a1018b84ce485.jpg",
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
				title: "风行Justin - 个人空间",
				url: "https://forthing.top/",
				avatar: "https://forthing.top/avatar.jpg",
				desc: "一个兴趣使然的设计爱好者",
			},
			{
				title: "mccsjs",
				url: "https://mccsjs.eu.org/",
				avatar: "https://mccsjs.eu.org/img/head.jpg",
				desc: "点一盏灯，等一个迷路的夜🍁🍁🍁",
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
				url: "https://share.pljzy.top",
				avatar: "https://share.pljzy.top/assets/logo_small.png",
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
		],
	},
];
