<template>
    <el-form size="small" :inline="true" label-width="80px" ref="ruleForm" style="padding: 10px 0;">
        <el-form-item label="公司文档">
            <el-select v-model="form.region" placeholder="请选择公司文档">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item label="关键词">
            <el-input style="width: 200px" v-model="form.title" clearable placeholder="请输入关键词">
                <!-- <i slot="suffix" class="el-input__icon el-icon-search curson"></i> -->
            </el-input>
        </el-form-item>

        <el-form-item class="btn-group">
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button>重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        return {
            form: {
                title: '',
                region: '',
            },
            gridData: [{
                date: '2016-05-02',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-04',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-01',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }, {
                date: '2016-05-03',
                name: '王小虎',
                address: '上海市普陀区金沙江路 1518 弄'
            }]
        };
    },
}
</script>

<style scoped>
.btn-group {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-bottom: 0;
}
</style>