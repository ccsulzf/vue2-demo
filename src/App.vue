<template>
    <MyGrid />
    <!-- <div class="content">
        <div class="nav">
            <WidgetNav />
        </div>
        <div class="canvas">
            <WidgetCanvas />
        </div>
    </div> -->
</template>
<script>
import MyGrid from './my-grid.vue'
export default {
    components: {
        MyGrid,
    }
}
</script>

<style scoped>
.content {
    width: 100%;
    height: 100vh;
    box-sizing: border-box;
    display: flex;
}

.nav {
    width: 280px;
    height: 100%;
}

.canvas {
    flex: 1;
    height: 100%;

}
</style>