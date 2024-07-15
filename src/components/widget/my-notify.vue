<template>
    <div class="content">
        <div class="header">
            <p class="title">通知公告</p>
        </div>
        <ul>
            <li v-for="(message, index) in messages" :key="index">
                <span>[通知消息]</span>
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
                "关于2024年春节放假安排的通知",
                "关于系统维护升级的通知",
                "关于网络安全检查的通知",
                "关于员工健康体检的通知",
                "关于调整办公时间的通知",
                "关于新冠疫情防控的紧急通知",
                "关于公司年度总结大会的通知"
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