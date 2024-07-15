<template>
    <div class="content">
        <div class="info">
            <div class="detail">
                <p class="title">
                    {{ currentData.title }}
                </p>
                <p class="num">
                    {{ currentData.num }}
                    <span class="unit">
                        {{ currentData.unit }}
                    </span>
                </p>
            </div>

            <p class="icon">
                <i :class="currentData.icon"></i>
            </p>

        </div>
        <div class="trend">
            <div class="item">
                <p>
                    <span>月同比</span>
                    <span>{{ currentData.monthOverMonth }}</span>
                </p>
                <i
                    :class="[parseFloat(currentData.monthOverMonth) > 0 ? 'el-icon-caret-top' : 'el-icon-caret-bottom', parseFloat(currentData.monthOverMonth) > 0 ? 'red' : 'green']"></i>
            </div>
            <div class="item">
                <p>
                    <span>周同比</span>
                    <span>{{ currentData.weekOverWeek }}</span>
                </p>
                <i
                    :class="[parseFloat(currentData.weekOverWeek) > 0 ? 'el-icon-caret-top' : 'el-icon-caret-bottom', parseFloat(currentData.weekOverWeek) > 0 ? 'red' : 'green']"></i>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            data: [
                {
                    title: "辖区项目总数",
                    icon: 'el-icon-basketball',
                    num: '64,788',
                    unit: '个',
                    monthOverMonth: '12%',
                    weekOverWeek: '5%',
                },
                {
                    title: "业主委员会数",
                    icon: 'el-icon-video-camera',
                    num: '75,432',
                    unit: '个',
                    monthOverMonth: '-8%',
                    weekOverWeek: '3%',
                },
                {
                    title: "辖区物业企业数",
                    icon: 'el-icon-coffee-cup',
                    num: '58,321',
                    unit: '个',
                    monthOverMonth: '15%',
                    weekOverWeek: '-7%',
                },
                {
                    title: "从业人员数",
                    icon: 'el-icon-trophy',
                    num: '135,321',
                    unit: '个',
                    monthOverMonth: '15%',
                    weekOverWeek: '-7%',
                },
                {
                    title: "物业管理面积",
                    icon: 'el-icon-ship',
                    num: '135,321',
                    unit: '万m²',
                    monthOverMonth: '14%',
                    weekOverWeek: '5%',
                },
            ],
            currentData: {}
        };
    },
    created() {
        this.randomizeData();
    },
    methods: {
        randomizeData() {
            const randomIndex = Math.floor(Math.random() * this.data.length);
            this.currentData = this.data[randomIndex];
        }
    }
}
</script>
<style scoped>
.content {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 100%;
    height: 100%;
}

.info {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    flex: 1;
}

.title {
    color: #929292;
    font-size: 14px;
}

.num {
    font-size: 28px;
}

.num>.unit {
    font-size: 14px;
}

.icon {
    background: #e8fef0;
    width: 50px;
    height: 50px;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #387e42
}

.trend {
    display: flex;
    padding: 10px;
    gap: 20px;
}

.trend>.item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.trend>.item>p {
    color: #ccc;
    display: flex;
    gap: 5px;
    font-size: 14px;
}

.red {
    color: red;
}

.green {
    color: green;
}
</style>