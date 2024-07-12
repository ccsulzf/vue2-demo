<template>
    <div class="container">
        <component :is="compName" />
        <div class="tool-box" v-if="selectId === id">
            <el-button type="primary" @click="drawer = true" icon="el-icon-setting" circle></el-button>
            <el-button type="danger" icon="el-icon-delete" circle></el-button>
        </div>
        <el-drawer title="我是标题" :visible.sync="drawer" :append-to-body="true" :modal="false">
            <span>我来啦!</span>
        </el-drawer>
    </div>
</template>
<script>
import MyTable from './my-table.vue'
export default {
    props: {
        compName: {
            type: String,
            required: true
        },
        selectId: {
            type: String,
        },
        id: {
            type: String,
            required: true
        }
    },
    data() {
        return {
            drawer: false
        }
    },
    components: {
        MyTable,
    },
    methods: {
        selectItem: function () {

        }
    }
}
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    position: relative;
}

.tool-box {
    position: absolute;
    left: 0;
    bottom: -20px;
    width: 100%;
    height: 40px;
    display: flex
}
</style>