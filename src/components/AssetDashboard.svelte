<script lang="ts">
import Icon from "@iconify/svelte";
import { assetsData } from "@/data/asset-data";

// 定义资产类型接口
interface Asset {
	id: number;
	name: string;
	price: number;
	date: string;
	lifespan: number;
	image: string;
}

// 组件状态
let currentPage = 1;
let itemsPerPage = 6;
let totalPages = Math.ceil(assetsData.length / itemsPerPage);

// 计算资产折旧
function calculateDepreciation(asset: Asset) {
	const now = new Date();
	const purchaseDate = new Date(asset.date);

	// 毫秒转天数
	const daysUsed =
		(now.getTime() - purchaseDate.getTime()) / (1000 * 60 * 60 * 24);
	const totalDaysLifespan = asset.lifespan * 365;

	// 核心计算 (直线折旧)
	let currentValue = asset.price - asset.price * (daysUsed / totalDaysLifespan);

	// 边界限制
	if (currentValue < 0) currentValue = 0;
	if (currentValue > asset.price) currentValue = asset.price; // 防止未来日期

	const percentageLeft = (currentValue / asset.price) * 100;
	const dailyCost = asset.price / totalDaysLifespan; // 每天掉多少钱

	return {
		currentValue,
		daysUsed,
		percentageLeft,
		dailyCost,
	};
}

// 格式化货币
function formatMoney(num: number) {
	return `¥${num.toLocaleString("zh-CN", { maximumFractionDigits: 0 })}`;
}

// 获取状态
function getStatus(percentage: number) {
	if (percentage >= 80) return { text: "几乎全新", class: "status-new" };
	if (percentage >= 50) return { text: "状态良好", class: "status-good" };
	if (percentage >= 20) return { text: "正在贬值", class: "status-warn" };
	return { text: "建议退役", class: "status-old" };
}

// 计算当前页显示的资产
function getCurrentAssets() {
	const startIndex = (currentPage - 1) * itemsPerPage;
	const endIndex = startIndex + itemsPerPage;
	return assetsData.slice(startIndex, endIndex);
}

// 处理页码点击
function handlePageClick(page: number) {
	if (page >= 1 && page <= totalPages && page !== currentPage) {
		currentPage = page;
	}
}

// 获取分页显示的页码
function getPageNumbers(): number[] {
	const ADJ_DIST = 2;
	const VISIBLE = ADJ_DIST * 2 + 1;

	let count = 1;
	let l = currentPage;
	let r = currentPage;

	while (0 < l - 1 && r + 1 <= totalPages && count + 2 <= VISIBLE) {
		count += 2;
		l--;
		r++;
	}
	while (0 < l - 1 && count < VISIBLE) {
		count++;
		l--;
	}
	while (r + 1 <= totalPages && count < VISIBLE) {
		count++;
		r++;
	}

	let pages: number[] = [];
	for (let i = l; i <= r; i++) {
		pages.push(i);
	}

	return pages;
}

// 计算总体统计数据
let totalInvestment = 0;
let totalCurrentValue = 0;

assetsData.forEach((asset) => {
	totalInvestment += asset.price;
	const stats = calculateDepreciation(asset);
	totalCurrentValue += stats.currentValue;
});

const totalLoss = totalInvestment - totalCurrentValue;
</script>

<div class="asset-dashboard card-base px-8 py-6 mb-4">
  <header class="dashboard-header">
    <h2 class="header-title">我的数字资产库</h2>
    <div class="dashboard-stats">
      <div class="stat-box">
        <div class="stat-title">总投入成本</div>
        <div class="stat-num total">{formatMoney(totalInvestment)}</div>
      </div>
      <div class="stat-box">
        <div class="stat-title">当前剩余价值</div>
        <div class="stat-num current">{formatMoney(totalCurrentValue)}</div>
      </div>
      <div class="stat-box">
        <div class="stat-title">累计折旧损耗</div>
        <div class="stat-num lost">-{formatMoney(totalLoss)}</div>
      </div>
    </div>
  </header>

  <div class="assets-grid">
    {#each getCurrentAssets() as asset}
      <div class="asset-card">
        {#if asset}
          {@const depreciation = calculateDepreciation(asset)}
          {@const status = getStatus(depreciation.percentageLeft)}
          <div class="card-image-box">
            <img src={asset.image} alt={asset.name} loading="lazy">
            <div class={`status-badge ${status.class}`}>{status.text}</div>
          </div>
          <div class="card-content">
            <h3 class="card-title">{asset.name}</h3>
            <div class="card-date">购入于: {asset.date} · 预计寿命 {asset.lifespan} 年</div>

            <div class="price-row">
              <div class="price-block">
                <div>当前残值</div>
                <div class="current-price">{formatMoney(depreciation.currentValue)}</div>
              </div>
              <div class="price-block" style="text-align:right">
                <div>原价</div>
                <div class="original-price">{formatMoney(asset.price)}</div>
              </div>
            </div>

            <div class="progress-section">
              <div class="progress-info">
                <span>剩余价值</span>
                <span>{depreciation.percentageLeft.toFixed(1)}%</span>
              </div>
              <div class="progress-bar-bg">
                <div
                    class="progress-bar-fill"
                    style="
                      width: {depreciation.percentageLeft}%;
                      background: {depreciation.percentageLeft >= 50 ? 'var(--admonitions-color-tip)' : 
                      depreciation.percentageLeft >= 20 ? 'var(--admonitions-color-caution)' : 
                      'var(--admonitions-color-danger)'};
                    "
                ></div>
              </div>
            </div>

            <div class="daily-loss">
              平均每天成本: <span>-{depreciation.dailyCost.toFixed(2)} 元</span>
            </div>
          </div>
        {/if}
      </div>
    {/each}
  </div>
</div>

<!-- Pagination -->
{#if totalPages > 1}
  <div class="flex flex-row gap-3 justify-center">
    <!-- Previous Page -->
    <button
            on:click={() => handlePageClick(currentPage - 1)}
            disabled={currentPage <= 1}
            class="btn-card overflow-hidden rounded-lg text-[var(--primary)] w-11 h-11 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={currentPage > 1 ? "Previous Page" : null}
    >
      <Icon icon="material-symbols:chevron-left-rounded" class="text-[1.75rem]" />
    </button>

    <!-- Page Numbers -->
    <div class="bg-[var(--card-bg)] flex flex-row rounded-lg items-center text-neutral-700 dark:text-neutral-300 font-bold">
      {#if currentPage > 3}
        <button
                on:click={() => handlePageClick(1)}
                class="btn-card w-11 h-11 rounded-lg overflow-hidden active:scale-[0.85]"
                aria-label="Page 1"
        >
          1
        </button>
        {#if currentPage > 4}
          <Icon icon="material-symbols:more-horiz" class="mx-1" />
        {/if}
      {/if}

      {#each getPageNumbers() as pageNum}
        {#if pageNum === currentPage}
          <div class="h-11 w-11 rounded-lg bg-[var(--primary)] flex items-center justify-center font-bold text-white dark:text-black/70">
            {pageNum}
          </div>
        {:else}
          <button
                  on:click={() => handlePageClick(pageNum)}
                  class="btn-card w-11 h-11 rounded-lg overflow-hidden active:scale-[0.85]"
                  aria-label={`Page ${pageNum}`}
          >
            {pageNum}
          </button>
        {/if}
      {/each}

      {#if currentPage < totalPages - 2}
        {#if currentPage < totalPages - 3}
          <Icon icon="material-symbols:more-horiz" class="mx-1" />
        {/if}
        <button
                on:click={() => handlePageClick(totalPages)}
                class="btn-card w-11 h-11 rounded-lg overflow-hidden active:scale-[0.85]"
                aria-label={`Page ${totalPages}`}
        >
          {totalPages}
        </button>
      {/if}
    </div>

    <!-- Next Page -->
    <button
            on:click={() => handlePageClick(currentPage + 1)}
            disabled={currentPage >= totalPages}
            class="btn-card overflow-hidden rounded-lg text-[var(--primary)] w-11 h-11 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label={currentPage < totalPages ? "Next Page" : null}
    >
      <Icon icon="material-symbols:chevron-right-rounded" class="text-[1.75rem]" />
    </button>
  </div>
{/if}

<style>
.asset-dashboard {
  width: 100%;
  padding: 20px;
}

.dashboard-header {
  margin-bottom: 30px;
}

.header-title {
  font-size: 1.8rem;
  font-weight: 800;
  margin-bottom: 20px;
  color: var(--text-primary);
}

.dashboard-stats {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
}

.stat-box {
  background: var(--card-bg);
  padding: 20px;
  border-radius: var(--radius-large);
  box-shadow: 0 10px 20px rgba(0,0,0,0.08);
  backdrop-filter: var(--backdrop-filter);
}

.stat-title {
  font-size: 0.9rem;
  color: var(--text-secondary);
  margin-bottom: 8px;
}

.stat-num {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: -1px;
}

.stat-num.total {
  color: var(--text-primary);
}

.stat-num.current {
  color: var(--admonitions-color-tip);
}

.stat-num.lost {
  color: var(--text-secondary);
  font-size: 1.5rem;
}

/* 资产网格 */
.assets-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* 卡片样式 */
.asset-card {
  background: var(--card-bg);
  border-radius: var(--radius-large);
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0,0,0,0.05);
  transition: all 0.3s ease;
  position: relative;
  display: flex;
  flex-direction: column;
  backdrop-filter: var(--backdrop-filter);
}

.asset-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.06);
}

/* 图片区域 */
.card-image-box {
  width: 100%;
  height: 180px;
  background: var(--btn-regular-bg);
  position: relative;
  overflow: hidden;
}

.card-image-box img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s ease;
}

.asset-card:hover .card-image-box img {
  transform: scale(1.05);
}

.status-badge {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  color: white;
  backdrop-filter: blur(4px);
}

.status-new { background: #27ae60; }
.status-good { background: #3498db; }
.status-warn { background: #f39c12; }
.status-old { background: #e74c3c; }

/* 内容区域 */
.card-content {
  padding: 20px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 1.2rem;
  font-weight: 700;
  margin-bottom: 5px;
  color: var(--text-primary);
}

.card-date {
  font-size: 0.85rem;
  color: var(--text-secondary);
  margin-bottom: 20px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 20px;
}

.price-block div:first-child {
  display: block;
  font-size: 0.75rem;
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.current-price {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
}

.original-price {
  font-size: 1rem;
  color: var(--text-secondary);
  text-decoration: line-through;
}

/* 进度条 */
.progress-section {
  margin-top: auto;
}

.progress-info {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: var(--text-secondary);
  margin-bottom: 6px;
}

.progress-bar-bg {
  width: 100%;
  height: 6px;
  background: var(--btn-regular-bg);
  border-radius: 3px;
  overflow: hidden;
}

.progress-bar-fill {
  height: 100%;
  border-radius: 3px;
  transition: width 0.8s ease;
}

/* 每日折旧提示 */
.daily-loss {
  margin-top: 15px;
  padding-top: 15px;
  border-top: 1px solid var(--line-divider);
  font-size: 0.8rem;
  color: var(--text-secondary);
  text-align: right;
}

.daily-loss span {
  color: var(--admonitions-color-caution);
  font-weight: 600;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .asset-dashboard {
    padding: 10px;
  }
  
  .assets-grid {
    grid-template-columns: 1fr;
  }
  
  .header-title {
    font-size: 1.5rem;
  }
}
</style>