<template>
    <div class="content">
        <div class="header">
            <p class="title">知识库</p>
            <el-popover :append-to-body="false" popper-class="my-popover" :popper-options="{
                boundariesElement: 'body',
                gpuAcceleration: true,
                positionFixed: true,
                preventOverflow: true
            }" placement="bottom-end" trigger="manual" v-model="visible">

                <FilterForm />
                <el-button type="text" slot="reference" @click.stop="visible = !visible">
                    <span v-if="!visible">展开 <i class="el-icon-caret-bottom"></i></span>
                    <span v-else>收起 <i class="el-icon-caret-bottom"></i></span>
                </el-button>
            </el-popover>

        </div>
        <el-table :data="tableData" :height="200">
            <el-table-column prop="fileName" label="文件名" min-width="220">
            </el-table-column>
            <el-table-column prop="fileDate" label="文件日期" min-width="140">
            </el-table-column>
            <el-table-column prop="directory" label="文档目录" min-width="120">
            </el-table-column>
            <el-table-column label="操作" width="80" fixed="right">
                <template slot-scope>
                    <el-button type="text">查看</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import FilterForm from './filter-form'
export default {
    data() {
        return {
            tableData: [],
            visible: false,
        };
    },
    components: {
        FilterForm
    },
    created() {
        this.generateTableData(10);
    },
    methods: {
        generateTableData(count) {
            const fileNames = [
                "通知公告2024-03-12.pdf",
                "系统升级2024-03-13.doc",
                "网络安全检查2024-03-14.xlsx",
                "健康体检安排2024-03-15.docx",
                "办公时间调整2024-03-16.pdf",
                "疫情防控措施2024-03-17.ppt",
                "年度总结大会2024-03-18.pdf",
                "假期安排2024-03-19.docx",
                "员工培训计划2024-03-20.xlsx",
                "项目进度报告2024-03-21.doc"
            ];

            const directories = [
                "公告",
                "系统维护",
                "安全检查",
                "健康管理",
                "办公安排",
                "防控措施",
                "年度总结",
                "假期安排",
                "培训计划",
                "项目报告"
            ];

            for (let i = 0; i < count; i++) {
                const randomFileIndex = Math.floor(Math.random() * fileNames.length);
                const randomDirIndex = Math.floor(Math.random() * directories.length);
                const randomDate = this.randomDate(new Date(2023, 0, 1), new Date());

                this.tableData.push({
                    fileName: fileNames[randomFileIndex],
                    fileDate: randomDate,
                    directory: directories[randomDirIndex]
                });
            }
        },
        randomDate(start, end) {
            const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    }
}
</script>

<style scoped>
.content {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 100%;
}

.header {
    display: flex;
    padding: 10px;
    gap: 20px;
    border-bottom: 1px solid #f1f1f1;
    justify-content: space-between;
    align-items: center;
}

.title {
    font-size: 18px;
}

/deep/.my-popover {
    width: 100%;
    padding: 0;
    transform: translate3d(0px, 35px, 0px) !important;
}
</style>