<template>
    <div class="content" id="widgetCanvas">
        <div class="grid" @click="selectId = '-1'">
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
import BaseCom from '../components/widget/base-com'
import { EventBus } from '../utils/eventBus';
let DragPos = { "x": null, "y": null, "w": 1, "h": 1, "i": null };
// let i = 9
export default {
    components: {
        GridLayout,
        GridItem,
        BaseCom,
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
            layout: [
                // { "x": 0, "y": 0, "w": 2, "h": 2, "i": "0", },
                // { "x": 2, "y": 0, "w": 2, "h": 4, "i": "1", },
                // { "x": 4, "y": 0, "w": 2, "h": 5, "i": "2" },
                // { "x": 6, "y": 0, "w": 2, "h": 3, "i": "3" },
                // { "x": 8, "y": 0, "w": 2, "h": 3, "i": "4" },
                // { "x": 10, "y": 0, "w": 2, "h": 3, "i": "5" },
                // { "x": 0, "y": 5, "w": 2, "h": 5, "i": "6" },
                // { "x": 2, "y": 5, "w": 2, "h": 5, "i": "7" },
                // { "x": 4, "y": 5, "w": 2, "h": 5, "i": "8" },
                { "x": 0, "y": 0, "w": 6, "h": 12, "i": "0", minW: 6, minH: 10, compName: 'MyTable' },
            ],
        }
    },
    created() {
        EventBus.$on('dragIn', ({ mouseXY, mouseInGrid, currWidget }) => {
            this.currWidget = currWidget

            let parentRect = document.getElementById('widgetCanvas').getBoundingClientRect();
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
                this.$refs.gridlayout.$children[this.layout.length].$refs.item.style.display = "none";
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
        });

        EventBus.$on('dragEnd', () => {
            this.$refs.gridlayout.dragEvent('dragend', 'drop', DragPos.x, DragPos.y, 1, 1);
            this.layout.push({
                x: DragPos.x,
                y: DragPos.y,
                i: DragPos.i,
                ...this.currWidget
            });
            this.selectId = "-1"
            this.layout = this.layout.filter(obj => obj.i !== 'drop');
            this.$refs.gridLayout.dragEvent('dragend', DragPos.i, DragPos.x, DragPos.y, 1, 1);
            this.$refs.gridLayout.$children[this.layout.length].$refs.item.style.display = "block";
        })
    },
    methods: {
        selectItem(item) {
            this.selectId = String(item.i)
        },
        handleDel(id) {
            console.log("----------")
            console.log(id)
            this.layout = this.layout.filter(obj => obj.i !== id);
        }
    }
}
</script>

<style scoped>
.content {
    width: 100%;
    /* padding: 10px 20px; */
}

.grid {
    width: 100%;
}


.droppable-element {
    width: 150px;
    text-align: center;
    background: #fdd;
    border: 1px solid black;
    margin: 10px 0;
    padding: 10px;
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

.vue-grid-item .text {
    font-size: 24px;
    text-align: center;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    height: 100%;
    width: 100%;
}

.vue-grid-item .no-drag {
    height: 100%;
    width: 100%;
}

.vue-grid-item .minMax {
    font-size: 12px;
}

.vue-grid-item .add {
    cursor: pointer;
}

.vue-draggable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    left: 0;
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10'><circle cx='5' cy='5' r='5' fill='#999999'/></svg>") no-repeat;
    background-position: bottom right;
    padding: 0 8px 8px 0;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    cursor: pointer;
}

.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}

.layoutJSON {
    background: #ddd;
    border: 1px solid black;
    margin-top: 10px;
    padding: 10px;
}

.columns {
    -moz-columns: 120px;
    -webkit-columns: 120px;
    columns: 120px;
}
</style>