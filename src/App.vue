<template>
    <div class="content">
        <div class="nav">
            <WidgetNav />
        </div>
        <div class="canvas">
            <WidgetCanvas />
        </div>
    </div>
</template>
<script>
import WidgetNav from './components/WidgetNav'
import WidgetCanvas from './components/WidgetCanvas.vue'
export default {
    components: {
        WidgetNav,
        WidgetCanvas
    }
}
</script>

<style scoped>
.content {
    width: 100%;
    height: 100vh;
    /* height: calc(100vh - 20px); */
    /* padding: 10px 20px; */
    box-sizing: border-box;
    display: flex;
    /* gap: 10px; */
}

.nav {
    width: 300px;
    height: 100%;
    border-right: 1px solid lightgray;
    /* height: 100vh; */
    /* background: lightgray; */
}

.canvas {
    flex: 1;
    height: 100%;
    /* background: lightgray; */
}
</style>