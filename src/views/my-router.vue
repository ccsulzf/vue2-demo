<template>
    <div class="content">
        <el-row>
            <el-button type="primary" @click="toRouter('/myGrid')">拖拽Demo</el-button>
            <el-button type="success" @click="toRouter('/myTiny')">富文本Demo</el-button>
        </el-row>
    </div>

</template>

<script>
export default {
    data() {
        return {
            activeIndex: "1" // 默认选中的菜单项
        };
    },
    methods: {
        toRouter(path) {
            // this.$router.push(path); 
            const url = this.$router.resolve(path).href;
            window.open(url, '_blank');
        }
    }
};
</script>

<style scoped>
.content {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
