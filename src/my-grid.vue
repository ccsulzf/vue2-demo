<template>
    <div class="content">
        <div class="nav">
            <span class="title">我的组件</span>
            <div class="list">
                <div class="item" v-for="widget in widgets" :key="widget.compName" @drag="startDrag(widget)"
                    @dragend="endDrag" draggable="true">
                    <i :class="widget.icon"></i>
                    <span unselectable="on">{{ widget.name }}</span>
                </div>
            </div>
        </div>
        <div class="canvas" id="widgetCanvas" @click="selectId = '-1'">
            <grid-layout ref="gridlayout" :layout.sync="layout" :col-num="12" :row-height="20" :is-draggable="true"
                :is-resizable="true" :vertical-compact="true" :use-css-transforms="true">
                <grid-item :key="item.i" v-for="item in layout" :x="item.x" :y="item.y" :w="item.w" :h="item.h"
                    :i="item.i" :minW="item.minW" :minH="item.minH">
                    <div style="width: 100%;height: 100%;" @click.stop="selectItem(item)" v-if="item.compName">
                        <BaseCom :compName="item.compName" :selectId="selectId" :id="item.i" @onDelete="handleDel" />
                    </div>
                    <span v-else class="text">{{ item.i }}</span>
                </grid-item>
            </grid-layout>
        </div>
    </div>
</template>
<script>
import { GridLayout, GridItem } from "vue-grid-layout"
import BaseCom from './components/widget/base-com.vue';
let mouseXY = { "x": null, "y": null };
let DragPos = { "x": null, "y": null, "w": 1, "h": 1, "i": null };
export default {
    components: {
        GridLayout,
        GridItem,
        BaseCom
    },
    mounted() {
        document.addEventListener("dragover", function (e) {
            mouseXY.x = e.clientX;
            mouseXY.y = e.clientY;
        }, false);
    },
    beforeDestroy() {
    },
    data() {
        return {
            currWidget: {
                compName: "",
                x: 0,
                y: 0,
                w: 0,
                h: 0,
                minW: 0,
                minH: 0,
            },
            currCompName: "",
            selectId: "-1",
            widgets: [
                {
                    compName: 'MyTable',
                    w: 6,
                    h: 12,
                    minW: 6,
                    minH: 12,
                    icon: 'el-icon-star-off',
                    name: '知识库组件',
                },
                {
                    compName: 'MyQuota',
                    w: 3,
                    h: 5,
                    minW: 3,
                    minH: 5,
                    icon: 'el-icon-goods',
                    name: '指标组件',
                },
                {
                    compName: 'MyFlow',
                    w: 6,
                    h: 12,
                    minW: 6,
                    minH: 12,
                    icon: 'el-icon-picture-outline',
                    name: '工作流组件',
                },
                {
                    compName: 'MyNotify',
                    w: 6,
                    h: 12,
                    minW: 6,
                    minH: 12,
                    icon: 'el-icon-picture-outline',
                    name: '通知消息组件',
                },
                {
                    compName: 'MyEntrance',
                    w: 6,
                    h: 12,
                    minW: 6,
                    minH: 12,
                    icon: 'el-icon-picture-outline',
                    name: '系统入口组件',
                },
            ],
            layout: [],
        }
    },
    methods: {
        startDrag(currWidget) {
            this.currWidget = currWidget
            let parentRect = document.getElementById('widgetCanvas').getBoundingClientRect();
            let mouseInGrid = false;
            if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                mouseInGrid = true;
            }
            if (mouseInGrid === true && (this.layout.findIndex(item => item.i === 'drop')) === -1) {
                this.layout.push({
                    x: (this.layout.length * 2) % (this.colNum || 12),
                    y: this.layout.length + (this.colNum || 12), // puts it at the bottom
                    i: 'drop',
                    ...currWidget
                });
            }
            let index = this.layout.findIndex(item => item.i === 'drop');
            if (index !== -1) {
                try {
                    this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = "none";
                    // eslint-disable-next-line no-empty
                } catch {
                }
                let el = this.$refs.gridlayout.$children[index];
                el.dragging = { "top": mouseXY.y - parentRect.top, "left": mouseXY.x - parentRect.left };
                let new_pos = el.calcXY(mouseXY.y - parentRect.top, mouseXY.x - parentRect.left);

                if (mouseInGrid === true) {
                    this.$refs.gridlayout.dragEvent('dragstart', 'drop', new_pos.x, new_pos.y, 1, 1);
                    DragPos.i = String(index);
                    DragPos.x = this.layout[index].x;
                    DragPos.y = this.layout[index].y;
                }
                if (mouseInGrid === false) {
                    this.$refs.gridlayout.dragEvent('dragend', 'drop', new_pos.x, new_pos.y, 1, 1);
                    this.layout = this.layout.filter(obj => obj.i !== 'drop');
                }
            }
        },
        endDrag() {
            let parentRect = document.getElementById('widgetCanvas').getBoundingClientRect();
            let mouseInGrid = false;
            if (((mouseXY.x > parentRect.left) && (mouseXY.x < parentRect.right)) && ((mouseXY.y > parentRect.top) && (mouseXY.y < parentRect.bottom))) {
                mouseInGrid = true;
            }
            if (mouseInGrid === true) {
                this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
                this.layout = this.layout.filter(obj => obj.i !== 'drop');

                this.layout.push({
                    x: DragPos.x,
                    y: DragPos.y,
                    i: DragPos.i,
                    ...this.currWidget
                });
                this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 1, 1);
                try {
                    this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display = "block";
                    // eslint-disable-next-line no-empty
                } catch {
                }

            }
        },
        handleDel(id) {
            this.layout = this.layout.filter(obj => obj.i !== id);
        },
        selectItem(item) {
            this.selectId = String(item.i)
        },
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
    display: flex;
    padding: 20px 10px;
    flex-direction: column;
}

.canvas {
    flex: 1;
    height: 100%;

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

columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}

/deep/ .vue-grid-item.vue-grid-placeholder {
    background: green !important;
}

.vue-grid-layout {
    min-height: 100vh;
    background: #eee;
}

.vue-grid-item:not(.vue-grid-placeholder) {
    background: #fff;
    border-radius: 5px;
    /* border: 1px solid black; */
}

.vue-grid-item .resizing {
    opacity: 0.9;
}

.vue-grid-item .static {
    background: #cce;
}
</style>