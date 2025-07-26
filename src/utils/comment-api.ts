// 评论数据类型定义
export interface Comment {
	id: string;
	name: string;
	email: string;
	website?: string;
	comment: string;
	createdAt: string;
	postSlug: string;
}

export interface CommentFormData {
	name: string;
	email: string;
	website?: string;
	comment: string;
}

// 模拟API响应类型
export interface ApiResponse<T> {
	success: boolean;
	data?: T;
	message?: string;
	error?: string;
}

// 模拟网络延迟
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// 模拟API错误
const simulateError = (probability = 0.1) => {
	if (Math.random() < probability) {
		throw new Error("网络错误，请稍后重试");
	}
};

// 评论API服务类
export class CommentApiService {
	private static instance: CommentApiService;
	private storageKey = "blog_comments";

	private constructor() {}

	public static getInstance(): CommentApiService {
		if (!CommentApiService.instance) {
			CommentApiService.instance = new CommentApiService();
		}
		return CommentApiService.instance;
	}

	// 获取所有评论数据
	private getAllComments(): Record<string, Comment[]> {
		try {
			const stored = localStorage.getItem(this.storageKey);
			return stored ? JSON.parse(stored) : {};
		} catch (error) {
			console.error("读取评论数据失败:", error);
			return {};
		}
	}

	// 公共方法：获取所有评论数据（用于导出）
	public getAllCommentsData(): Record<string, Comment[]> {
		return this.getAllComments();
	}

	// 保存所有评论数据
	private saveAllComments(comments: Record<string, Comment[]>): void {
		try {
			localStorage.setItem(this.storageKey, JSON.stringify(comments));
		} catch (error) {
			console.error("保存评论数据失败:", error);
			throw new Error("保存评论失败");
		}
	}

	// 获取指定文章的评论列表
	async getComments(postSlug: string): Promise<ApiResponse<Comment[]>> {
		try {
			// 模拟网络延迟
			await delay(300 + Math.random() * 400);

			// 模拟网络错误
			simulateError(0.05);

			const allComments = this.getAllComments();
			const comments = allComments[postSlug] || [];

			// 按创建时间倒序排列
			const sortedComments = comments.sort(
				(a, b) =>
					new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
			);

			return {
				success: true,
				data: sortedComments,
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : "获取评论失败",
			};
		}
	}

	// 提交新评论
	async submitComment(
		postSlug: string,
		commentData: CommentFormData,
	): Promise<ApiResponse<Comment>> {
		try {
			// 模拟网络延迟
			await delay(500 + Math.random() * 600);

			// 模拟网络错误
			simulateError(0.08);

			// 验证数据
			if (
				!commentData.name?.trim() ||
				!commentData.email?.trim() ||
				!commentData.comment?.trim()
			) {
				throw new Error("请填写所有必填字段");
			}

			// 验证邮箱格式
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
			if (!emailRegex.test(commentData.email)) {
				throw new Error("请输入有效的邮箱地址");
			}

			// 验证评论长度
			if (commentData.comment.length < 5) {
				throw new Error("评论内容至少需要5个字符");
			}

			if (commentData.comment.length > 1000) {
				throw new Error("评论内容不能超过1000个字符");
			}

			// 创建新评论
			const newComment: Comment = {
				id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
				...commentData,
				createdAt: new Date().toISOString(),
				postSlug: postSlug,
			};

			// 获取现有评论
			const allComments = this.getAllComments();
			const postComments = allComments[postSlug] || [];

			// 添加新评论
			postComments.unshift(newComment);
			allComments[postSlug] = postComments;

			// 保存到存储
			this.saveAllComments(allComments);

			return {
				success: true,
				data: newComment,
				message: "评论提交成功！",
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : "提交评论失败",
			};
		}
	}

	// 获取评论统计信息
	async getCommentStats(
		postSlug?: string,
	): Promise<ApiResponse<{ total: number; postCount?: number }>> {
		try {
			await delay(100 + Math.random() * 200);

			const allComments = this.getAllComments();
			const total = Object.values(allComments).reduce(
				(sum, comments) => sum + comments.length,
				0,
			);

			const result: { total: number; postCount?: number } = { total };

			if (postSlug) {
				result.postCount = allComments[postSlug]?.length || 0;
			}

			return {
				success: true,
				data: result,
			};
		} catch (error) {
			return {
				success: false,
				error: error instanceof Error ? error.message : "获取统计信息失败",
			};
		}
	}
}

// 导出单例实例
export const commentApi = CommentApiService.getInstance();
