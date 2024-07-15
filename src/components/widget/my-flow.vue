<template>
    <div class="content">
        <div class="header">
            <p class="title">集成工作流</p>
            <p>
                <el-radio v-model="radio" label="1">代办</el-radio>
                <el-radio v-model="radio" label="2">已办</el-radio>
            </p>
        </div>

        <ul>
            <li v-for="(message, index) in messages" :key="index">
                <span>[系统消息]</span>
                <p>{{ message.content }}</p>
                <span>{{ message.date }}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            radio: '1',
            messages: []
        };
    },
    created() {
        this.generateRandomMessages(7);
    },
    methods: {
        generateRandomMessages(count) {
            const contentTemplates = [
                "JSMART3.0平台，资产管理，运营服务 (租后) ，纪检",
                "系统更新，服务器维护，操作指南",
                "新版本上线，功能升级，用户反馈",
                "数据备份，安全提醒，系统优化",
                "服务调整，维护通知，用户指南",
                "系统消息，安全升级，版本更新",
                "操作指南，功能调整，用户体验优化"
            ];

            for (let i = 0; i < count; i++) {
                const randomIndex = Math.floor(Math.random() * contentTemplates.length);
                const randomDate = this.randomDate(new Date(2023, 0, 1), new Date());

                this.messages.push({
                    content: contentTemplates[randomIndex],
                    date: randomDate
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
}

.title {
    font-size: 18px;
}

/deep/ .el-radio {
    margin-right: 10px;
}

li {
    list-style: none;
    display: flex;
    gap: 5px;
    padding: 15px 10px;
}

ul {
    margin: 0;
    padding: 0px;
    font-size: 14px;
    overflow: auto;
    height: calc(100% - 50px);
}

li>span {
    white-space: nowrap;
    color: gray;
}

li>p {
    flex: 1;

}

li+li {
    border-top: 1px solid #f1f1f1;
}
</style>