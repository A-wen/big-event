<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'

import {ref} from 'vue'

const category = ref ([
    {
        "id": 5 ,
        "categoryName":"xxx",
        "categoryAlias":"xxx",
        "creatTime":"ssss",
        "updateTime":"4444"
    }
])
//用戶搜尋時選中的分類id
const categoryId =ref('');
//用戶搜尋時選中的發布狀態
const state =ref('');

//分類數據模型
const pageNum = ref(1)//最為前頁
const total = ref(20)//總頁數
const pageSize = ref(3)//每頁的條數
//當每頁條數發生變化，調用此方法
const onSizeChange=(size)=>{
    pageSize.value = size
    articleList();
}
//當前頁碼發生變化，調用此方法
const onCurrentChange = (num)=>{
    pageNum.value = num
    articleList();
}
import{ articleCategoryListService,articleListService ,articleAddService  }from "@/api/article.js"
const articleCategoryList = async() =>{
    let result = await articleCategoryListService();
    categorys.value = result.data;
}
//獲取文章列表的數據
const articleList = async()=>{
    let params = {
        pageNum:pageNum.value,
        pageSize:pageSize.value,
        categoryId:categoryId.value ? categoryId.value : null,
        state:state.value ? state.value :null
    }
    let result = await articleListService();

    //呈現在畫面
    total.value = result.data.value;
    articles.value = result.data.items;

    //處理數據，給數據模組擴展一個屬性categoryName，分類名稱
    for(let i = 0 ; i<articles.value.length;i++) {
        let article = articles.value[i];
        for(let j = 0; j<categorys.value.length; j++){
            if(article.categoryId == categorys.value[j].id){
                article.categoryName = categorys.value[j].categoryName;
            }
        }
    }

}

//刷新列表
articleList();
ArticleCategoryList();

import {Plus} from '@element-plus/icons-vue'
//控制抽層是否顯示
const visibleDrawer = ref(false)
//添加表單數據模型
const articleModel = ref({
    title:'',
    categoryId:'',
    coverImg:'',
    content:'',
    state:''
})
//導入文本編輯器
import { QuillEditor } from "@vueup/vue-quill";
import '@vueup/vue-quill/dist/vue-quill.snow.css'
//導入token
import{useTokenStore} from '@/stores/token.js'
const tokenStore = useTokenStore();
//上傳成功回傳函數
const uploadSuccess=(result)=>{
    articleModel.value.coverImg=result.data
}
//添加文章
const addArticle = async ()=>{
    //把發布狀態附值給數據模型
    articleModel.value.state = clickState;
    //調用接口
    let result = await articleAddService(articleModel.value);
    ElMessage.success(result.msg? result.msg:'添加成功');
    //抽屜消失
    visibleDrawer.value = false;
    //刷新頁面
    articleList();
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章管理</span>
                <div class="extra">
                    <el-button type="primary" @click="visibleDrawer=true">添加文章</el-button>
                </div>
            </div>
        </template>
        <!--搜尋選單-->
        <el-form inline>
            <el-form-item label="文章分類:">
                <el-select aria-placeholder="請選擇" v-model="categoryId">
                    <el-option>
                        v-for="c in categorys"
                        :key="q.id"
                        :label="c.categoryName"
                        :value="c.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item label="發布狀態">
                <el-select aria-placeholder="請選擇" v-model="state">
                    <el-option label="已發布" value="已發布" ></el-option>
                    <el-option label="草稿" value="草稿"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item>
                <el-button type="primary">搜尋</el-button>
                <el-button @click="categoryId='';state=''">重製</el-button>
            </el-form-item>
        </el-form>
        <!--文章列表-->
        <el-table :data="article" style="width:100%">
            <el-table-colum label="文章列表" width="400" prop="title"></el-table-colum>
            <el-table-colum label="分類" prop="categoryName"></el-table-colum>
            <el-table-colum label="發表時間" prop="creatTime"></el-table-colum>
            <el-table-colum label="狀態" prop="state"></el-table-colum>
            <el-table-colum label="操作" width="100">
                <template> #default ="{row}">
                    <el-button :icon="Edit" circle plain type="primary" ></el-button>
                    <el-button :icon="Delete" circle plain type="danger"  ></el-button>
                </template>
            </el-table-colum>
            <template #empty>
                <el-empty description="沒有數據"/>
            </template>
        </el-table>
        <!--分條頁-->
        <el-pagination v-model:current-page="pageNum" v-model:page-size="pageSize" :page-size="[3,5,10,15]"
        layout="jumper, total, size, prev, pager, next" background :total="total" @size-change="onSizeChange"
        @current-change="onCurrentChange" style="margin-top: 20px; justify:flex-end" />

        <!--抽屜-->
        <el-drawer v-model="visibleDrawer" title="添加文章" direction="rtl" size="50%">
            <!--添加文章表單-->
            <el-form :model="articleModel" label-width="100px">
                <el-form-item label="文章標題">
                    <el-input v-model="articleModel" aria-placeholder="請輸入標題"></el-input> 
                </el-form-item>
                <el-form-item label="文章分類">
                    <el-select aria-placeholder="請選擇" v-model="articleModel.categoryId">
                        <el-option v-for="c in categorys" :key="c.id" :label="c.categoryName" :value="cid"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="文章封面">
                    <!--
                        auto-upload:設置是否自動上傳 ture false
                        action:設置服務接口路徑
                        name:設置上船的文件字段名
                        hearder:設置上傳的請求
                        on-sucess:設置上傳完成的回調函數
                    -->
                    <el-upload class="avatar-uploader" :auto-upload="false" :show-file-list="false"
                    action="/api/upload"
                    name="file"
                    :header="{'Authorization':tokenStore.token}"
                    :on-success="uploadSuccess"
                    
                    >
                        <img v-if="articleModel.coverImg" :src="articleModel.coverImg" class="avatar"/>
                        <el-icon v-else class="avatar-uploader-icon">
                            <Plus />
                        </el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="文章內容">
                    <div class="editor">
                        <quill-editor theme="snow" v-model:content="formModel.content" contentType="html">

                        </quill-editor>
                    </div>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="addArticle('已發布')">發布</el-button>
                    <el-button type="info" @click="addArticle('草稿')">草稿</el-button>
                </el-form-item>
            </el-form>
        </el-drawer>
    </el-card>
</template>

<style lang="scss" scoped>
.page-container {
    min-height:100%;
    box-sizing: border-box;

    .header{
        display: flex;
        align-items:center;
        justify-content: space-between;
    }
}

/*抽屜樣式*/
.avatar-uploader{
    :deep(){
        .avatar{
            width:178px;
            height:178px;
            display:block;
        }
        .el-upload{
            border:1px dashed var(--el-border-color);
            border-radius: 6px;
            cursor:pointer;
            position:relative;
            overflow: hidden;
            transition: var(--el-transition-duration-fast);
        }
        .el-upload:hover{
            border-color:var(--el-color-primary);
        }
        .el-icon.acatar-uploader-inon{
            font-size:28px;
            color:#8c939d;
            width:178px;
            height:178px;
            text-align: center;
        }
    }
}
.editor{
    width:100%;
    :deep(ql-editor){
        min-height: 200px;
    }
}
</style>