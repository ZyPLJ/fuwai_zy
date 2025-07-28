<script lang="ts">
export let postSlug: string;
export let postTitle: string;

import { onMount } from "svelte";

let comments: any[] = [];
let isLoading = false;
let name = "";
let email = "";
let website = "";
let comment = "";
let statusMsg = "";
let statusClass = "";

// 回复相关变量
let replyToId: string | null = null; // 当前回复的一级评论id
let replyToName = ""; // 当前@的对象

// 分页相关变量
let page = 1; // 当前页码
const pageSize = 5; // 每页显示评论数
let totalPages = 1; // 总页数

// 获取顶级评论（parentId为null）
$: topLevelComments = comments.filter((c) => !c.parentId);
$: pagedComments = topLevelComments.slice(
	(page - 1) * pageSize,
	page * pageSize,
);
$: totalPages = Math.max(1, Math.ceil(topLevelComments.length / pageSize));

// 获取某条评论的所有二级回复（parentId为该评论id）
function getReplies(parentId: string): any[] {
	return comments.filter((c) => c.parentId === parentId);
}

function getComments(slug: string) {
	const stored = localStorage.getItem(`comments_${slug}`);
	return stored ? JSON.parse(stored) : [];
}

function saveComments(slug: string, comments: any[]) {
	localStorage.setItem(`comments_${slug}`,·JSON.stringify(comments));
}

function renderStatus(msg: string, cls: string) {
	statusMsg = msg;
	statusClass = cls;
	setTimeout(() => {
		statusMsg = "";
	}, 3000);
}

// 点击回复按钮
function handleReply(targetId: string, targetName: string) {
	replyToId = targetId;
	replyToName = targetName;
	comment = `@${targetName} `;
	setTimeout(() => {
		const input = document.getElementById(
			"main-comment-input",
		) as HTMLTextAreaElement;
		input?.focus();
	}, 0);
}

// 取消回复
function cancelReply() {
	replyToId = null;
	replyToName = "";
	comment = "";
}

// 提交评论或回复
function submitComment() {
	if (!name.trim() || !email.trim() || !comment.trim()) {
		renderStatus("请填写所有必填字段", "text-red-600");
		return;
	}
	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	if (!emailRegex.test(email.trim())) {
		renderStatus("请输入有效的邮箱地址", "text-red-600");
		return;
	}
	// 判断是否为回复
	let parentId = null;
	let content = comment;
	if (replyToId && comment.startsWith(`@${replyToName}`)) {
		parentId = replyToId;
		content = comment.replace(`@${replyToName}`, "").trim();
	}
	if (!content) {
		renderStatus("回复内容不能为空", "text-red-600");
		return;
	}
	const newComment = {
		id: Date.now().toString() + Math.random().toString(36).slice(2),
		name: name.trim(),
		email: email.trim(),
		website: website.trim(),
		comment: comment.trim(),
		createdAt: new Date().toISOString(),
		postSlug,
		parentId,
	};
	comments = [newComment, ...comments];
	saveComments(postSlug, comments);
	name = email = website = comment = "";
	replyToId = null;
	replyToName = "";
	renderStatus("评论提交成功！", "text-green-600");
	page = 1;
}

// 切换页码
function goToPage(p: number) {
	if (p < 1 || p > totalPages) return;
	page = p;
}

onMount(() => {
	isLoading = true;
	setTimeout(() => {
		comments = getComments(postSlug);
		isLoading = false;
	}, 300);
});
</script>

<div class="comment-section mt-8">
  <h2 class="text-2xl font-bold mb-6 text-black/90 dark:text-white/90">评论</h2>
  <div class="comment-stats flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
    <span>{comments.length} 条评论</span>
  </div>
  <div class="comment-form-container mb-8">
    <div class="comment-form p-6 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
      <div class="flex flex-wrap gap-4 mb-4">
        <div class="flex flex-col flex-1 min-w-[120px]">
          <label class="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">邮箱 *</label>
          <input type="email" bind:value={email} placeholder="请输入您的邮箱"
            class="p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
        </div>
        <div class="flex flex-col flex-1 min-w-[120px]">
          <label class="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">姓名 *</label>
          <input type="text" bind:value={name} placeholder="请输入您的姓名"
            class="p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
        </div>
        <div class="flex flex-col flex-1 min-w-[120px]">
          <label class="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">网站</label>
          <input type="url" bind:value={website} placeholder="您的网站（可选）"
            class="p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100" />
        </div>
      </div>
      <div class="flex flex-col mb-4">
        <label class="mb-1 text-sm font-medium text-gray-700 dark:text-gray-200">留言 *</label>
        <textarea id="main-comment-input" rows="4" bind:value={comment} placeholder={replyToName ? `@${replyToName} ` : "请输入您的留言"}
          class="p-3 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 resize-vertical"></textarea>
        {#if replyToName}
          <div class="text-xs text-blue-600 mt-1">正在回复 <span class="font-bold">@{replyToName}</span> <button class="ml-2 text-gray-500 hover:underline" on:click={cancelReply}>取消</button></div>
        {/if}
      </div>
      <div class="flex items-center justify-between">
        <button type="button" class="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-200 font-medium"
          on:click={submitComment}>
          提交{replyToName ? "回复" : "评论"}
        </button>
        <div class="text-sm" class:text-green-600={statusClass === 'text-green-600'} class:text-red-600={statusClass === 'text-red-600'}>
          {statusMsg}
        </div>
      </div>
    </div>
  </div>
  <div class="comments-list mb-2">
    {#if isLoading}
      <div class="text-center py-8 text-gray-600 dark:text-gray-400">加载评论中...</div>
    {:else if topLevelComments.length === 0}
      <div class="text-center py-8 text-gray-600 dark:text-gray-400">暂无评论，成为第一个评论者吧！</div>
    {:else}
      <div>
        <!-- 评论列表 -->
        <div class="space-y-4">
          {#each pagedComments as c}
            <div class="ml-0 md:ml-8">
              <div class="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-3 mb-2 border border-gray-100 dark:border-gray-700">
                <div class="flex items-center gap-2 mb-1">
                  {#if c.website}
                    <a href={c.website} target="_blank" rel="noopener noreferrer" class="font-bold text-blue-600 hover:underline">{c.name}</a>
                  {:else}
                    <span class="font-bold text-gray-900 dark:text-gray-100">{c.name}</span>
                  {/if}
                  <span class="text-xs text-gray-500 dark:text-gray-400">{new Date(c.createdAt).toLocaleString('zh-CN')}</span>
                </div>
                <div class="text-gray-700 dark:text-gray-300 mb-2">{@html c.comment.replace(/\n/g, '<br>')}</div>
                <button class="text-xs text-blue-600 hover:underline mr-2" on:click={() => handleReply(c.id, c.name)}>回复</button>
              </div>
              <!-- 二级回复 -->
              {#if getReplies(c.id).length > 0}
                <div class="ml-4 border-l-2 border-gray-200 dark:border-gray-700 pl-4">
                  {#each getReplies(c.id) as reply}
                    <div class="ml-0 md:ml-8">
                      <div class="bg-gray-50 dark:bg-gray-900/30 rounded-lg p-3 mb-2 border border-gray-100 dark:border-gray-700">
                        <div class="flex items-center gap-2 mb-1">
                          {#if reply.website}
                            <a href={reply.website} target="_blank" rel="noopener noreferrer" class="font-bold text-blue-600 hover:underline">{reply.name}</a>
                          {:else}
                            <span class="font-bold text-gray-900 dark:text-gray-100">{reply.name}</span>
                          {/if}
                          <span class="text-xs text-gray-500 dark:text-gray-400">{new Date(reply.createdAt).toLocaleString('zh-CN')}</span>
                        </div>
                        <div class="text-gray-700 dark:text-gray-300 mb-2">{@html reply.comment.replace(/\n/g, '<br>')}</div>
                        <button class="text-xs text-blue-600 hover:underline mr-2" on:click={() => handleReply(c.id, reply.name)}>回复</button>
                      </div>
                    </div>
                  {/each}
                </div>
              {/if}
            </div>
          {/each}
        </div>
        <!-- 分页控件 -->
        <div class="flex justify-center items-center gap-2 mt-6">
          <button class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            on:click={() => goToPage(page - 1)} disabled={page === 1} title="上一页">上一页</button>
          {#each Array(totalPages) as _, i}
            <button class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 font-bold {page === i + 1 ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300' : ''}"
              on:click={() => goToPage(i + 1)} aria-current={page === i + 1 ? 'page' : undefined}>{i + 1}</button>
          {/each}
          <button class="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 disabled:opacity-50"
            on:click={() => goToPage(page + 1)} disabled={page === totalPages} title="下一页">下一页</button>
        </div>
      </div>
    {/if}
  </div>
</div>