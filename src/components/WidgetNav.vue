<template>
    <div class="content">
        <div class="group">
            <span class="title">我的组件</span>
            <div class="list">
                <div class="item" @drag="startDrag({
                    compName: 'MyTable',
                    w: 6,
                    h: 12,
                    minW: 2,
                    minH: 2,
                })" @dragend="endDrag" draggable="true" unselectable="on">
                    <i class="el-icon-star-off"></i>
                    <span unselectable="on">知识库组件</span>
                </div>
                <div class="item" @drag="startDrag({
                    compName: 'MyQuota',
                    w: 3,
                    h: 5,
                    minW: 3,
                    minH: 5,
                })" @dragend="endDrag" draggable="true">
                    <i class="el-icon-goods"></i>
                    <span>指标组件</span>
                </div>
                <div class="item" @drag="startDrag({
                    compName: 'MyFlow',
                    w: 6,
                    h: 12,
                    minW: 2,
                    minH: 2,
                })" @dragend="endDrag" draggable="true">
                    <i class="el-icon-picture-outline"></i>
                    <span>工作流组件</span>
                </div>
                <div class="item" @drag="startDrag({
                    compName: 'MyNotify',
                    w: 6,
                    h: 12,
                    minW: 2,
                    minH: 2,
                })" @dragend="endDrag" draggable="true">
                    <i class="el-icon-picture-outline"></i>
                    <span>通知消息组件</span>
                </div>
                <div class="item" @drag="startDrag({
                    compName: 'MyEntrance',
                    w: 6,
                    h: 12,
                    minW: 6,
                    minH: 12,
                })" @dragend="endDrag" draggable="true">
                    <i class="el-icon-picture-outline"></i>
                    <span>系统入口组件</span>
                </div>
            </div>
        </div>
        <!-- <div class="group">
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
        </div> -->
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
        document.addEventListener('dragover', this.updateMousePosition, false);
    },
    destroyed() {
        document.removeEventListener('dragover', this.updateMousePosition);
    },
    methods: {
        updateMousePosition(e) {
            mouseXY.x = e.clientX;
            mouseXY.y = e.clientY;
        },

        startDrag(currWidget) {
            this.emitDragEvent('dragIn', currWidget);
        },
        endDrag() {
            this.emitDragEvent('dragEnd');
        },
        emitDragEvent(eventType, currWidget = null) {
            const parentRect = document.getElementById('widgetCanvas').getBoundingClientRect();
            const mouseInGrid = mouseXY.x > parentRect.left && mouseXY.x < parentRect.right &&
                mouseXY.y > parentRect.top && mouseXY.y < parentRect.bottom;

            EventBus.$emit(eventType, {
                mouseXY,
                mouseInGrid,
                currWidget
            });
        },
        drag: function (currWidget) {
            let parentRect = document.getElementById('widgetCanvas').getBoundingClientRect();
            let mouseInGrid = false;
            if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                mouseInGrid = true;
            }

            if (mouseInGrid) {
                EventBus.$emit('dragIn', {
                    mouseXY, mouseInGrid, currWidget
                });
            }
        },
        dragend: function () {
            let parentRect = document.getElementById('widgetCanvas').getBoundingClientRect();
            let mouseInGrid = false;
            if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                mouseInGrid = true;
            }
            EventBus.$emit('dragEnd', { mouseInGrid });
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