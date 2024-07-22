<template>
    <div class="content">
        <TinymceEditor v-model="value" ref="tinymceEditorRef"></TinymceEditor>
        <el-row type="flex" justify="center">
            <el-col :span="6" :offset="6">
                <el-button type="success" @click="handle">作为HTML展示</el-button>
            </el-col>
        </el-row>
        <el-drawer title="我是标题" :visible.sync="drawer" :append-to-body="true" :modal="false">
            <div class="myHtml" v-html="value"></div>
        </el-drawer>
    </div>
</template>
<script>
import TinymceEditor from '@/components/TinymceEditor.vue'
export default {
    components: {
        TinymceEditor
    },
    data() {
        return {
            drawer: false,
            value: "<h2 style=\"text-align: center;\">Welcome to the TinyMCE editor demo!</h2>\n<h2>Got questions or need help?</h2>\n<ul>\n<li>Our <a href=\"6/\">documentation</a> is a great resource for learning how to configure TinyMCE.</li>\n<li>Have a specific question? Try the <a href=\"https://stackoverflow.com/questions/tagged/tinymce\" target=\"_blank\" rel=\"noopener\"><code>tinymce</code> tag at Stack Overflow</a>.</li>\n<li>We also offer enterprise grade support as part of <a href=\"pricing\">TinyMCE premium plans</a>.</li>\n</ul>\n<h2>A simple table to play with</h2>\n<table style=\"border-collapse: collapse; width: 100%;\" border=\"1\">\n<thead>\n<tr>\n<th>Product</th>\n<th>Cost</th>\n<th>Really?</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>TinyMCE</td>\n<td>Free</td>\n<td>YES!</td>\n</tr>\n<tr>\n<td>Plupload</td>\n<td>Free</td>\n<td>YES!</td>\n</tr>\n</tbody>\n</table>\n<h2>Found a bug?</h2>\n<p>If you think you have found a bug please create an issue on the <a href=\"https://github.com/tinymce/tinymce/issues\">GitHub repo</a> to report it to the developers.</p>\n<h2>Finally ...</h2>\n<p>Don't forget to check out our other product <a href=\"http://www.plupload.com\" target=\"_blank\" rel=\"noopener\">Plupload</a>, your ultimate upload solution featuring HTML5 upload support.</p>\n<p><!-- x-tinymce/html --></p>\n<p>Thanks for supporting TinyMCE! We hope it helps you and your users create great content.<br />All the best from the TinyMCE team.</p>"
        }
    },
    methods: {
        handle() {
            this.drawer = true
            console.log(JSON.stringify(this.value))
        }
    }
}
</script>

<style scoped>
.content {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 40px;
}

.myHtml {
    padding: 10px 20px;
}
</style>