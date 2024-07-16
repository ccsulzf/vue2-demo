<template>
    <div class="content">
        <div class="header">
            <p class="title">应用子系统入口</p>
        </div>
        <div class="grid">
            <div class="item">
                <img src="../../assets/公告.svg" />
                <span>公告</span>
            </div>
            <div class="item">
                <img src="../../assets/单据.svg" />
                <span>单据</span>
            </div>
            <div class="item">
                <img src="../../assets/客服.svg" />
                <span>客服</span>
            </div>
            <div class="item">
                <img src="../../assets/应用.svg" />
                <span>应用</span>
            </div>
            <div class="item">
                <img src="../../assets/打印.svg" />
                <span>打印</span>
            </div>
            <div class="item">
                <img src="../../assets/批准.svg" />
                <span>批准</span>
            </div>
            <div class="item">
                <img src="../../assets/日历.svg" />
                <span>日历</span>
            </div>
            <div class="item">
                <img src="../../assets/消息.svg" />
                <span>消息</span>
            </div>
        </div>
    </div>
</template>
<script>
</script>
<style scoped>
.content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.header {
    display: flex;
    padding: 10px;
    gap: 20px;
    border-bottom: 1px solid #f1f1f1;
    justify-content: space-between;
}

.title {
    font-size: 18px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: repeat(2, 1fr);
    padding: 10px;
    flex: 1;
}

.item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 14px;
}

.item>img {
    width: 48px;
    height: 48px;
}
</style>