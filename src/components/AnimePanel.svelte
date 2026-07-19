<script lang="ts">
import Icon from "@iconify/svelte";
import type { AnimeItem, AnimeStatus } from "@/data/anime-list";
import { animeStatusLabel } from "@/data/anime-list";

export let items: AnimeItem[] = [];

type FilterStatus = "all" | AnimeStatus;
type SortKey = "date" | "score" | "year" | "title";

const statusTabs: { key: FilterStatus; label: string }[] = [
	{ key: "all", label: "全部" },
	{ key: "watching", label: animeStatusLabel.watching },
	{ key: "completed", label: animeStatusLabel.completed },
	{ key: "plan", label: animeStatusLabel.plan },
	{ key: "on_hold", label: animeStatusLabel.on_hold },
	{ key: "dropped", label: animeStatusLabel.dropped },
];

const sortOptions: { key: SortKey; label: string }[] = [
	{ key: "date", label: "最近更新" },
	{ key: "score", label: "评分高低" },
	{ key: "year", label: "年份新旧" },
	{ key: "title", label: "标题 A–Z" },
];

let filterStatus: FilterStatus = "all";
let searchQuery = "";
let sortKey: SortKey = "date";
let sortMenuOpen = false;

$: sortLabel =
	sortOptions.find((option) => option.key === sortKey)?.label ?? "最近更新";

$: stats = (() => {
	const total = items.length;
	const watching = items.filter((i) => i.status === "watching").length;
	const completed = items.filter((i) => i.status === "completed").length;
	const plan = items.filter((i) => i.status === "plan").length;
	const scored = items.filter((i) => typeof i.score === "number");
	const avgScore =
		scored.length > 0
			? scored.reduce((sum, i) => sum + (i.score ?? 0), 0) / scored.length
			: 0;
	return { total, watching, completed, plan, avgScore };
})();

$: statusCounts = (() => {
	const counts: Record<FilterStatus, number> = {
		all: items.length,
		watching: 0,
		completed: 0,
		on_hold: 0,
		dropped: 0,
		plan: 0,
	};
	for (const item of items) {
		counts[item.status] += 1;
	}
	return counts;
})();

$: filteredItems = (() => {
	const q = searchQuery.trim().toLowerCase();
	let list = items.filter((item) => {
		if (filterStatus !== "all" && item.status !== filterStatus) return false;
		if (!q) return true;
		const haystack = [
			item.title,
			item.titleOriginal ?? "",
			...(item.tags ?? []),
			item.comment ?? "",
		]
			.join(" ")
			.toLowerCase();
		return haystack.includes(q);
	});

	list = [...list].sort((a, b) => {
		if (a.favorite && !b.favorite) return -1;
		if (!a.favorite && b.favorite) return 1;

		switch (sortKey) {
			case "score":
				return (b.score ?? -1) - (a.score ?? -1);
			case "year":
				return (b.year ?? 0) - (a.year ?? 0);
			case "title":
				return a.title.localeCompare(b.title, "zh-CN");
			default: {
				const da = a.date ?? "";
				const db = b.date ?? "";
				if (da === db) return 0;
				if (!da) return 1;
				if (!db) return -1;
				return db.localeCompare(da);
			}
		}
	});

	return list;
})();

function setFilter(status: FilterStatus) {
	filterStatus = status;
}

function toggleSortMenu() {
	sortMenuOpen = !sortMenuOpen;
}

function selectSort(key: SortKey) {
	sortKey = key;
	sortMenuOpen = false;
}

function handleSortBlur(event: FocusEvent) {
	const next = event.relatedTarget as Node | null;
	const current = event.currentTarget as HTMLElement;
	if (!next || !current.contains(next)) {
		sortMenuOpen = false;
	}
}

function statusBadgeClass(status: AnimeStatus): string {
	switch (status) {
		case "watching":
			return "badge-watching";
		case "completed":
			return "badge-completed";
		case "plan":
			return "badge-plan";
		case "on_hold":
			return "badge-hold";
		case "dropped":
			return "badge-dropped";
	}
}

/** 渲染 5 星，支持半星 */
function starSlots(score?: number): Array<"full" | "half" | "empty"> {
	const s = Math.max(0, Math.min(5, score ?? 0));
	const slots: Array<"full" | "half" | "empty"> = [];
	for (let i = 1; i <= 5; i++) {
		if (s >= i) slots.push("full");
		else if (s >= i - 0.5) slots.push("half");
		else slots.push("empty");
	}
	return slots;
}

function formatEpisodes(item: AnimeItem): string | null {
	const ep = item.episodes;
	if (!ep) return null;
	if (ep.total != null && ep.watched != null)
		return `${ep.watched}/${ep.total} 集`;
	if (ep.total != null) return `共 ${ep.total} 集`;
	if (ep.watched != null) return `已看 ${ep.watched} 集`;
	return null;
}

function handleCoverError(event: Event) {
	const el = event.currentTarget as HTMLImageElement;
	el.style.display = "none";
	const fallback = el.nextElementSibling as HTMLElement | null;
	if (fallback) fallback.style.display = "flex";
}
</script>

<div class="card-base px-6 md:px-8 py-6">
	<!-- Header -->
	<div class="mb-6">
		<h1 class="text-2xl md:text-3xl font-bold text-90 mb-2 flex items-center gap-2">
			<Icon icon="material-symbols:live-tv-outline" class="w-7 h-7 text-[var(--primary)]" />
			我的追番
		</h1>
		<p class="text-75 text-sm">记录看过的番剧，点击卡片可跳转详情页。</p>
	</div>

	<!-- Stats -->
	<div class="stats-bar">
		<div class="stat-item">
			<span class="stat-value">{stats.total}</span>
			<span class="stat-label">总计</span>
		</div>
		<div class="stat-item">
			<span class="stat-value text-[var(--primary)]">{stats.watching}</span>
			<span class="stat-label">在看</span>
		</div>
		<div class="stat-item">
			<span class="stat-value text-emerald-500">{stats.completed}</span>
			<span class="stat-label">看完</span>
		</div>
		<div class="stat-item">
			<span class="stat-value text-sky-500">{stats.plan}</span>
			<span class="stat-label">想看</span>
		</div>
		<div class="stat-item">
			<span class="stat-value text-amber-500">{stats.avgScore > 0 ? stats.avgScore.toFixed(1) : "—"}</span>
			<span class="stat-label">均分</span>
		</div>
	</div>

	<!-- Toolbar -->
	<div class="toolbar">
		<div class="status-tabs">
			{#each statusTabs as tab}
				{#if tab.key === "all" || statusCounts[tab.key] > 0}
					<button
						type="button"
						class="status-tab"
						class:active={filterStatus === tab.key}
						on:click={() => setFilter(tab.key)}
					>
						{tab.label}
						<span class="tab-count">{statusCounts[tab.key]}</span>
					</button>
				{/if}
			{/each}
		</div>

		<div class="toolbar-right">
			<div class="search-box">
				<input
					type="search"
					placeholder="搜索标题 / 标签…"
					bind:value={searchQuery}
					class="search-input"
				/>
			</div>
			<div
				class="dropdown-container sort-dropdown"
				class:open={sortMenuOpen}
				on:focusout={handleSortBlur}
			>
				<button
					type="button"
					class="btn-regular h-8 text-sm px-3 rounded-lg sort-trigger"
					aria-haspopup="listbox"
					aria-expanded={sortMenuOpen}
					on:click={toggleSortMenu}
				>
					<span>{sortLabel}</span>
					<span class="sort-arrow" class:open={sortMenuOpen} aria-hidden="true">
						<Icon
							icon="material-symbols:keyboard-arrow-down-rounded"
							class="text-[1.1rem]"
						/>
					</span>
				</button>
				{#if sortMenuOpen}
					<div class="dropdown-menu sort-menu" role="listbox">
						<div class="dropdown-content">
							{#each sortOptions as option}
								<button
									type="button"
									class="dropdown-item sort-item"
									class:active={sortKey === option.key}
									role="option"
									aria-selected={sortKey === option.key}
									on:click={() => selectSort(option.key)}
								>
									<span>{option.label}</span>
									{#if sortKey === option.key}
										<Icon
											icon="material-symbols:check-rounded"
											class="text-[1rem] text-[var(--primary)]"
										/>
									{/if}
								</button>
							{/each}
						</div>
					</div>
				{/if}
			</div>
		</div>
	</div>

	<!-- Grid -->
	{#if filteredItems.length === 0}
		<div class="empty-state">
			<Icon icon="material-symbols:movie-filter-outline" class="w-12 h-12 opacity-40 mb-3" />
			<p class="text-75">没有匹配的番剧</p>
		</div>
	{:else}
		<div class="anime-grid">
			{#each filteredItems as item (item.id)}
				<a
					href={item.link || undefined}
					target={item.link ? "_blank" : undefined}
					rel={item.link ? "noopener noreferrer" : undefined}
					class="anime-card"
					class:is-link={!!item.link}
					class:no-link={!item.link}
					on:click={(e) => {
						if (!item.link) e.preventDefault();
					}}
				>
					<div class="cover-wrap">
						<img
							src={item.cover}
							alt={item.title}
							loading="lazy"
							decoding="async"
							class="cover-img"
							on:error={handleCoverError}
						/>
						<div class="cover-fallback" style="display: none;">
							<Icon
								icon="material-symbols:broken-image-outline"
								class="w-10 h-10 opacity-50"
							/>
						</div>

						{#if item.favorite}
							<span class="fav-badge" title="精选">
								<Icon icon="material-symbols:star" class="w-4 h-4" />
							</span>
						{/if}

						<span class={`status-badge ${statusBadgeClass(item.status)}`}>
							{animeStatusLabel[item.status]}
						</span>
					</div>

					<div class="card-body">
						<h3 class="card-title" title={item.title}>{item.title}</h3>
						{#if item.titleOriginal}
							<p class="card-original" title={item.titleOriginal}>
								{item.titleOriginal}
							</p>
						{/if}

						<div class="card-meta">
							{#if item.year}
								<span>{item.year}{item.season ? ` · ${item.season}` : ""}</span>
							{/if}
							{#if formatEpisodes(item)}
								<span class="sep">·</span>
								<span>{formatEpisodes(item)}</span>
							{/if}
						</div>

						{#if typeof item.score === "number"}
							<div class="stars" aria-label={`评分 ${item.score} 星`}>
								{#each starSlots(item.score) as slot}
									{#if slot === "full"}
										<span class="star-wrap full">
											<Icon icon="material-symbols:star" />
										</span>
									{:else if slot === "half"}
										<span class="star-wrap full">
											<Icon icon="material-symbols:star-half" />
										</span>
									{:else}
										<span class="star-wrap empty">
											<Icon icon="material-symbols:star-outline" />
										</span>
									{/if}
								{/each}
								<span class="score-num">{item.score.toFixed(1)}</span>
							</div>
						{/if}

						{#if item.tags && item.tags.length > 0}
							<div class="tags">
								{#each item.tags.slice(0, 3) as tag}
									<span class="tag">{tag}</span>
								{/each}
							</div>
						{/if}

						{#if item.comment}
							<p class="card-comment">{item.comment}</p>
						{/if}
					</div>
				</a>
			{/each}
		</div>
	{/if}
</div>

<style>
	.stats-bar {
		display: flex;
		flex-wrap: wrap;
		gap: 0.75rem 1.5rem;
		justify-content: center;
		padding: 1rem 1.25rem;
		margin-bottom: 1.25rem;
		background: rgba(0, 0, 0, 0.03);
		border-radius: 12px;
	}

	:global(:root.dark) .stats-bar {
		background: rgba(255, 255, 255, 0.05);
	}

	.stat-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		min-width: 3.5rem;
	}

	.stat-value {
		font-size: 1.25rem;
		font-weight: 700;
		line-height: 1.2;
		color: var(--text-color, inherit);
	}

	.stat-label {
		font-size: 0.75rem;
		color: #6b7280;
		margin-top: 0.15rem;
	}

	:global(:root.dark) .stat-label {
		color: #9ca3af;
	}

	.toolbar {
		display: flex;
		flex-direction: column;
		gap: 0.75rem;
		margin-bottom: 1.5rem;
	}

	.status-tabs {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
	}

	.status-tab {
		display: inline-flex;
		align-items: center;
		gap: 0.35rem;
		height: 2rem;
		padding: 0 0.75rem;
		border-radius: 0.5rem;
		font-size: 0.875rem;
		background: var(--btn-regular-bg);
		color: var(--btn-content);
		border: none;
		cursor: pointer;
		transition:
			background 0.2s ease,
			color 0.2s ease;
	}

	.status-tab:hover {
		background: var(--btn-regular-bg-hover);
	}

	.status-tab.active {
		background: var(--primary);
		color: oklch(0.98 0.01 var(--hue));
	}

	.tab-count {
		font-size: 0.7rem;
		opacity: 0.8;
	}

	.toolbar-right {
		display: flex;
		flex-wrap: wrap;
		gap: 0.5rem;
		align-items: center;
	}

	.search-box {
		position: relative;
		flex: 1 1 12rem;
		min-width: 10rem;
	}

	.search-input {
		width: 100%;
		height: 2rem;
		padding: 0 0.75rem;
		border-radius: 0.5rem;
		border: none;
		background: var(--btn-regular-bg);
		color: var(--btn-content);
		font-size: 0.875rem;
		outline: none;
		transition: background 0.2s ease;
	}

	.search-input:hover {
		background: var(--btn-regular-bg-hover);
	}

	.search-input:focus {
		background: var(--btn-regular-bg-hover);
		box-shadow: 0 0 0 1px oklch(0.7 0.12 var(--hue) / 0.35);
	}

	.search-input::placeholder {
		color: inherit;
		opacity: 0.55;
	}

	.sort-dropdown {
		position: relative;
		flex-shrink: 0;
	}

	.sort-trigger {
		gap: 0.25rem;
		min-width: 7.5rem;
		font-weight: 500;
	}

	.sort-arrow {
		display: inline-flex;
		align-items: center;
		transition: transform 0.2s ease;
	}

	.sort-arrow.open {
		transform: rotate(180deg);
	}

	.sort-menu {
		/* 覆盖全局 hover 显隐，改为由 open 状态控制 */
		opacity: 1;
		visibility: visible;
		pointer-events: auto;
		transform: translateY(0);
		right: 0;
		left: auto;
	}

	.sort-item {
		width: 100%;
		border: none;
		background: transparent;
		cursor: pointer;
		text-align: left;
		font: inherit;
	}

	.sort-item.active {
		color: var(--primary);
		background: var(--btn-plain-bg-hover);
	}

	.anime-grid {
		display: grid;
		grid-template-columns: repeat(2, minmax(0, 1fr));
		gap: 1rem;
	}

	@media (min-width: 640px) {
		.anime-grid {
			grid-template-columns: repeat(3, minmax(0, 1fr));
			gap: 1.25rem;
		}
	}

	@media (min-width: 1024px) {
		.anime-grid {
			grid-template-columns: repeat(4, minmax(0, 1fr));
		}
	}

	.anime-card {
		display: flex;
		flex-direction: column;
		border-radius: var(--radius-large, 12px);
		overflow: hidden;
		background: rgba(0, 0, 0, 0.02);
		text-decoration: none !important;
		color: inherit;
		transition:
			transform 0.25s ease,
			box-shadow 0.25s ease;
	}

	:global(:root.dark) .anime-card {
		background: rgba(255, 255, 255, 0.04);
	}

	.anime-card.is-link {
		cursor: pointer;
	}

	.anime-card.no-link {
		cursor: default;
		pointer-events: none;
	}

	.anime-card.is-link:hover {
		transform: translateY(-4px);
		box-shadow: 0 8px 24px oklch(0.7 0.12 var(--hue) / 0.18);
	}

	.cover-wrap {
		position: relative;
		aspect-ratio: 3 / 4;
		overflow: hidden;
		background: linear-gradient(
			135deg,
			oklch(0.9 0.03 var(--hue)),
			oklch(0.85 0.05 var(--hue))
		);
	}

	:global(:root.dark) .cover-wrap {
		background: linear-gradient(
			135deg,
			oklch(0.3 0.03 var(--hue)),
			oklch(0.25 0.05 var(--hue))
		);
	}

	.cover-img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		transition: transform 0.4s ease;
		margin: 0;
		padding: 0;
		display: block;
	}

	.anime-card:hover .cover-img {
		transform: scale(1.05);
	}

	.cover-fallback {
		position: absolute;
		inset: 0;
		align-items: center;
		justify-content: center;
	}

	.fav-badge {
		position: absolute;
		top: 0.5rem;
		left: 0.5rem;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		height: 1.5rem;
		border-radius: 999px;
		background: rgba(0, 0, 0, 0.55);
		color: #fbbf24;
	}

	.status-badge {
		position: absolute;
		top: 0.5rem;
		right: 0.5rem;
		padding: 0.15rem 0.45rem;
		border-radius: 999px;
		font-size: 0.7rem;
		font-weight: 600;
		color: #fff;
		backdrop-filter: blur(4px);
	}

	.badge-watching {
		background: oklch(0.6 0.16 var(--hue) / 0.9);
	}
	.badge-completed {
		background: rgba(16, 185, 129, 0.9);
	}
	.badge-plan {
		background: rgba(14, 165, 233, 0.9);
	}
	.badge-hold {
		background: rgba(245, 158, 11, 0.9);
	}
	.badge-dropped {
		background: rgba(239, 68, 68, 0.85);
	}

	.card-body {
		padding: 0.75rem 0.85rem 0.9rem;
		display: flex;
		flex-direction: column;
		gap: 0.3rem;
		flex: 1;
	}

	.card-title {
		font-size: 0.95rem;
		font-weight: 700;
		line-height: 1.35;
		margin: 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	.card-original {
		font-size: 0.7rem;
		color: #808080;
		margin: 0;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	:global(:root.dark) .card-original {
		color: #a3a3a3;
	}

	.card-meta {
		font-size: 0.72rem;
		color: #6b7280;
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.2rem;
	}

	:global(:root.dark) .card-meta {
		color: #9ca3af;
	}

	.sep {
		opacity: 0.6;
	}

	.stars {
		display: flex;
		align-items: center;
		gap: 0.05rem;
	}

	.star-wrap {
		display: inline-flex;
		width: 0.95rem;
		height: 0.95rem;
		flex-shrink: 0;
		line-height: 1;
	}

	.star-wrap.full {
		color: #fbbf24;
	}

	.star-wrap.empty {
		color: rgba(0, 0, 0, 0.18);
	}

	:global(:root.dark) .star-wrap.empty {
		color: rgba(255, 255, 255, 0.28);
	}

	.star-wrap :global(svg) {
		width: 100%;
		height: 100%;
	}

	.score-num {
		margin-left: 0.3rem;
		font-size: 0.75rem;
		font-weight: 600;
		color: #f59e0b;
	}

	.tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.3rem;
	}

	.tag {
		font-size: 0.65rem;
		padding: 0.1rem 0.4rem;
		border-radius: 999px;
		background: oklch(0.7 0.1 var(--hue) / 0.12);
		color: oklch(0.45 0.1 var(--hue));
	}

	:global(:root.dark) .tag {
		background: oklch(0.55 0.1 var(--hue) / 0.2);
		color: oklch(0.85 0.08 var(--hue));
	}

	.card-comment {
		font-size: 0.72rem;
		line-height: 1.4;
		color: #6b7280;
		margin: 0.15rem 0 0;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
		overflow: hidden;
	}

	:global(:root.dark) .card-comment {
		color: #a3a3a3;
	}

	.empty-state {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 1rem;
		text-align: center;
	}

	@media (max-width: 640px) {
		.stats-bar {
			gap: 0.5rem 1rem;
			padding: 0.85rem;
		}

		.stat-value {
			font-size: 1.1rem;
		}
	}
</style>
