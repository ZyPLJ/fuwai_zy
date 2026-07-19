export type AnimeStatus =
	| "watching"
	| "completed"
	| "on_hold"
	| "dropped"
	| "plan";

export type AnimeItem = {
	/** 唯一键 */
	id: string;
	/** 中文名 */
	title: string;
	/** 日文原名 */
	titleOriginal?: string;
	/** 封面 URL */
	cover: string;
	/** 观看状态 */
	status: AnimeStatus;
	/** 个人评分 0–5，支持 0.5 步进 */
	score?: number;
	/** 首播年 */
	year?: number;
	/** 季度 */
	season?: "冬" | "春" | "夏" | "秋";
	/** 集数进度 */
	episodes?: {
		watched?: number;
		total?: number;
	};
	/** 标签 */
	tags?: string[];
	/** 一句话短评 */
	comment?: string;
	/** 外链（Bangumi / Bilibili 等），点击卡片跳转 */
	link?: string;
	/** 最近观看 / 更新日 YYYY-MM-DD */
	date?: string;
	/** 精选 */
	favorite?: boolean;
};

export const animeStatusLabel: Record<AnimeStatus, string> = {
	watching: "在看",
	completed: "看完",
	on_hold: "搁置",
	dropped: "弃番",
	plan: "想看",
};

/** 在列表里追加 / 修改条目即可维护页面 */
export const animeList: AnimeItem[] = [
	{
		id: "frieren",
		title: "葬送的芙莉莲",
		titleOriginal: "葬送のフリーレン",
		// 封面可换成你自己的 CDN；示例用 Bangumi 公开图
		cover: "https://lain.bgm.tv/pic/cover/l/e5/7f/400602_2G2Y2.jpg",
		status: "completed",
		score: 5,
		year: 2023,
		season: "秋",
		episodes: { watched: 28, total: 28 },
		tags: ["奇幻", "冒险", "治愈"],
		comment: "关于时间与告别，后劲很足。",
		link: "https://bgm.tv/subject/400602",
		date: "2024-03-12",
		favorite: true,
	},
	{
		id: "suzume",
		title: "铃芽之旅",
		titleOriginal: "すずめの戸締まり",
		cover: "https://lain.bgm.tv/pic/cover/l/6e/5f/353064_2Z2Z2.jpg",
		status: "completed",
		score: 4.5,
		year: 2022,
		tags: ["奇幻", "冒险", "剧场版"],
		comment: "关门与告别的公路片，画面很美。",
		link: "https://bgm.tv/subject/353064",
		date: "2023-06-01",
	},
	{
		id: "bocchi",
		title: "孤独摇滚！",
		titleOriginal: "ぼっち・ざ・ろっく！",
		cover: "https://lain.bgm.tv/pic/cover/l/5a/2e/328609_2Y2Y2.jpg",
		status: "completed",
		score: 5,
		year: 2022,
		season: "秋",
		episodes: { watched: 12, total: 12 },
		tags: ["音乐", "日常", "喜剧"],
		comment: "社恐与乐队，节奏和演出都在线。",
		link: "https://bgm.tv/subject/328609",
		date: "2023-01-20",
		favorite: true,
	},
	{
		id: "dungeon-meshi",
		title: "迷宫饭",
		titleOriginal: "ダンジョン飯",
		cover: "https://lain.bgm.tv/pic/cover/l/2d/3a/364450_2X2X2.jpg",
		status: "watching",
		score: 4.5,
		year: 2024,
		season: "冬",
		episodes: { watched: 18, total: 24 },
		tags: ["奇幻", "冒险", "美食"],
		comment: "一边打怪一边做饭，世界观扎实。",
		link: "https://bgm.tv/subject/364450",
		date: "2024-05-10",
	},
	{
		id: "your-name",
		title: "你的名字。",
		titleOriginal: "君の名は。",
		cover: "https://lain.bgm.tv/pic/cover/l/c2/b0/140001_2W2W2.jpg",
		status: "completed",
		score: 4.5,
		year: 2016,
		tags: ["恋爱", "奇幻", "剧场版"],
		comment: "经典新海诚，重温依旧上头。",
		link: "https://bgm.tv/subject/140001",
		date: "2022-08-15",
	},
	{
		id: "kusuriya",
		title: "药屋少女的呢喃",
		titleOriginal: "薬屋のひとりごと",
		cover: "https://lain.bgm.tv/pic/cover/l/1a/2b/376703_2V2V2.jpg",
		status: "plan",
		year: 2023,
		season: "秋",
		tags: ["推理", "历史", "日常"],
		comment: "宫斗 + 药理，想找时间补。",
		link: "https://bgm.tv/subject/376703",
	},
];
