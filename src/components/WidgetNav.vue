<template>
    <div class="content">
        <div class="group">
            <span class="title">我的组件一</span>
            <div class="list">
                <div class="item" @drag="drag('MyTable')" @dragend="dragend" draggable="true" unselectable="on">
                    <i class="el-icon-star-off"></i>
                    <span unselectable="on">表单组件</span>
                </div>
                <div class="item">
                    <i class="el-icon-goods"></i>
                    <span>指标组件</span>
                </div>
                <div class="item">
                    <i class="el-icon-picture-outline"></i>
                    <span>组件三</span>
                </div>
            </div>
        </div>
        <div class="group">
            <span class="title">我的组件一</span>
            <div class="list">

                <div class="item">
                    <i class="el-icon-goods"></i>
                    <span>组件二</span>
                </div>
                <div class="item">
                    <i class="el-icon-picture-outline"></i>
                    <span>组件三</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
let mouseXY = { "x": null, "y": null };
import { EventBus } from '../utils/eventBus';
// let DragPos = { "x": null, "y": null, "w": 1, "h": 1, "i": null };
export default {
    data() {
        return {}
    },
    mounted() {
        document.addEventListener("dragover", function (e) {
            mouseXY.x = e.clientX;
            mouseXY.y = e.clientY;
        }, false);
    },
    methods: {
        drag: function (compName) {
            let parentRect = document.getElementById('widgetCanvas').getBoundingClientRect();
            let mouseInGrid = false;
            if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                mouseInGrid = true;
            }

            if (mouseInGrid) {
                EventBus.$emit('dragIn', { mouseXY, mouseInGrid, compName });
            }


        },
        dragend: function () {
            let parentRect = document.getElementById('widgetCanvas').getBoundingClientRect();
            let mouseInGrid = false;
            if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                mouseInGrid = true;
            }
            if (mouseInGrid === true) {
                EventBus.$emit('dragEnd');
            }
        }
    }
}
</script>
<style scoped>
.content {
    display: flex;
    padding: 20px 10px;
    flex-direction: column;
}

.title {
    color: #2c3e50;
}

.group {
    display: flex;
    flex-direction: column;
    gap: 20px;
    margin-bottom: 40px;
}

.list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.item {
    display: flex;
    padding: 10px 5px;
    align-items: center;
    font-size: 14px;
    gap: 5px;
    width: 48%;
    color: #333;
    border: 1px solid #f4f6fc;
    background: #f4f6fc;
    box-sizing: border-box;
}

.item:hover {
    color: #409eff;
    border: 1px dashed #409eff;
    cursor: move;
}
</style>