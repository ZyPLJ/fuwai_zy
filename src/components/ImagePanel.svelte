<script lang="ts">
import { onMount } from "svelte";
import Icon from "@iconify/svelte";

interface ImageData {
	key: string;
	name: string;
	origin_name: string;
	size: number;
	mimetype: string;
	extension: string;
	md5: string;
	sha1: string;
	width: number;
	height: number;
	human_date: string;
	date: string;
	pathname: string;
	links: {
		url: string;
		html: string;
		bbcode: string;
		markdown: string;
		markdown_with_link: string;
		thumbnail_url: string;
	};
}

interface ApiResponse {
	status: boolean;
	message: string;
	data: {
		current_page: number;
		data: ImageData[];
		first_page_url: string;
		from: number;
		last_page: number;
		last_page_url: string;
		links: Array<{
			url: string | null;
			label: string;
			active: boolean;
		}>;
		next_page_url: string | null;
		path: string;
		per_page: number;
		prev_page_url: string | null;
		to: number;
		total: number;
	};
}

let images: ImageData[] = [];
let currentPage = 1;
let totalPages = 1;
let totalImages = 0;
let loading = false;
let error = "";

const API_BASE_URL = "http://47.116.117.180:8089/api/v1/images";
const API_TOKEN = "1|co2iYJmY5BjA2NWIY0CLlodVZegBaMCJe143W5ET";

async function fetchImages(page: number = 1) {
	loading = true;
	error = "";
	
	try {
		const response = await fetch(`${API_BASE_URL}?page=${page}&album_id=1`, {
			headers: {
				'Accept': 'application/json',
				'Authorization': `Bearer ${API_TOKEN}`
			}
		});
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		
		const data: ApiResponse = await response.json();
		
		if (data.status) {
			images = data.data.data;
			currentPage = data.data.current_page;
			totalPages = data.data.last_page;
			totalImages = data.data.total;
		} else {
			error = data.message || "获取图片失败";
		}
	} catch (err) {
		error = err instanceof Error ? err.message : "网络请求失败";
	} finally {
		loading = false;
	}
}

function formatFileSize(bytes: number): string {
	if (bytes === 0) return "0 B";
	const k = 1024;
	const sizes = ["B", "KB", "MB", "GB"];
	const i = Math.floor(Math.log(bytes) / Math.log(k));
	return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

function goToPage(page: number) {
	if (page >= 1 && page <= totalPages && page !== currentPage) {
		fetchImages(page);
	}
}

// 分页按钮数组计算
$: pageNumbers = Array.from(
	{ length: Math.min(5, totalPages) },
	(_, i) => Math.max(1, Math.min(totalPages, currentPage - 2 + i))
).filter((pageNum, index, arr) => arr.indexOf(pageNum) === index);

onMount(() => {
	fetchImages(1);
});
</script>

<div class="card-base px-8 py-6">
	<!-- Header -->
	<div class="mb-6">
		<h1 class="text-3xl font-bold text-[var(--primary)] mb-2">图片库</h1>
		<p class="text-[var(--text-50)]">
			共 {totalImages} 张图片，第 {currentPage} 页，共 {totalPages} 页
		</p>
	</div>

	<!-- Loading State -->
	{#if loading}
		<div class="flex justify-center items-center py-12">
			<div class="animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--primary)]"></div>
		</div>
	{:else if error}
		<!-- Error State -->
		<div class="text-center py-12">
			<div class="text-red-500 text-lg mb-4">{error}</div>
			<button 
				on:click={() => fetchImages(currentPage)}
				class="btn-card px-6 py-2 rounded-lg"
			>
				重试
			</button>
		</div>
	{:else}
		<!-- Images Grid -->
		<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
			{#each images as image}
				<div class="group relative overflow-hidden rounded-lg bg-[var(--card-bg)] shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
					<!-- Image Container -->
					<div class="relative aspect-square overflow-hidden">
						<img
							src={image.links.thumbnail_url || image.links.url}
							alt={image.origin_name}
							title={image.origin_name}
							class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
							loading="lazy"
						/>
						
						<!-- Overlay on hover -->
						<div class="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
							<div class="opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
								<a 
									href={image.links.url} 
									target="_blank" 
									rel="noopener noreferrer"
									class="btn-card bg-white/90 hover:bg-white text-black px-4 py-2 rounded-lg shadow-lg"
								>
									<Icon icon="material-symbols:open-in-new" class="w-5 h-5 mr-2" />
									查看原图
								</a>
							</div>
						</div>
					</div>
					
					<!-- Image Info -->
					<div class="p-4">
						<h3 class="font-semibold text-[var(--text-75)] mb-2 line-clamp-2 group-hover:text-[var(--primary)] transition-colors duration-300">
							{image.origin_name}
						</h3>
						
						<div class="space-y-1 text-sm text-[var(--text-50)]">
							<div class="flex items-center justify-between">
								<span>尺寸:</span>
								<span>{image.width} × {image.height}</span>
							</div>
							<div class="flex items-center justify-between">
								<span>大小:</span>
								<span>{formatFileSize(image.size * 1024)}</span>
							</div>
							<div class="flex items-center justify-between">
								<span>格式:</span>
								<span class="uppercase">{image.extension}</span>
							</div>
							<div class="flex items-center justify-between">
								<span>上传:</span>
								<span>{image.human_date}</span>
							</div>
						</div>
					</div>
				</div>
			{/each}
		</div>

		<!-- Pagination -->
		{#if totalPages > 1}
			<div class="flex justify-center">
				<div class="flex items-center gap-2">
					<!-- Previous Page -->
					<button
						on:click={() => goToPage(currentPage - 1)}
						disabled={currentPage <= 1}
						class="btn-card px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
					>
						<Icon icon="material-symbols:chevron-left-rounded" class="w-5 h-5" />
						上一页
					</button>

					<!-- Page Numbers -->
					<div class="flex items-center gap-1">
						{#if currentPage > 3}
							<button
								on:click={() => goToPage(1)}
								class="btn-card w-10 h-10 rounded-lg"
							>
								1
							</button>
							{#if currentPage > 4}
								<span class="px-2 text-[var(--text-50)]">...</span>
							{/if}
						{/if}

						{#each pageNumbers as pageNum}
							<button
								on:click={() => goToPage(pageNum)}
								class:list={[
									"w-10 h-10 rounded-lg transition-all",
									pageNum === currentPage 
										? "bg-[var(--primary)] text-white" 
										: "btn-card"
								]}
							>
								{pageNum}
							</button>
						{/each}

						{#if currentPage < totalPages - 2}
							{#if currentPage < totalPages - 3}
								<span class="px-2 text-[var(--text-50)]">...</span>
							{/if}
							<button
								on:click={() => goToPage(totalPages)}
								class="btn-card w-10 h-10 rounded-lg"
							>
								{totalPages}
							</button>
						{/if}
					</div>

					<!-- Next Page -->
					<button
						on:click={() => goToPage(currentPage + 1)}
						disabled={currentPage >= totalPages}
						class="btn-card px-4 py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
					>
						下一页
						<Icon icon="material-symbols:chevron-right-rounded" class="w-5 h-5" />
					</button>
				</div>
			</div>
		{/if}
	{/if}
</div>

<style>
	.line-clamp-2 {
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}
</style>
