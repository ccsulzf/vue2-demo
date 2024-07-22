<template>
    <div id="app">
        <router-view />
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
        handleSelect(key, keyPath) {
            console.log(key, keyPath);
            // 处理菜单项的选择事件
        }
    }
};
</script>

<style>
.el-menu-demo {
    /* 你的样式 */
}
</style>
