<script setup>
import {
    Edit,
    Delete
} from '@element-plus/icons-vue'
const category = ref ([
    {
        "id": 5 ,
        "categoryName":"xxx",
        "categoryAlias":"xxx",
        "creatTime":"ssss",
        "updateTime":"4444"
    }
])

import{ articleCategoryListService ,articleCategoryListAddService ,articleCategoryListUpdateService ,articleCategoryListDeleteService}from "@/api/article.js"
const articleCategoryList = async() =>{
    let result = await articleCategoryListService();
    category.value = result.data;
}
ArticleCategoryList();
//控制添加分類視窗
const dialogvisible = ref(false)

//添加分類數據模型
const categoryModel = ref({
    categoryName:'',
    categoryAlias:''
})
//添加分類表單驗證
const rules = {
    categoryName:[
        { required: true, message:'請輸入分類名稱', trigger:'blur'}
    ],
    categoryAlias:[
        { required: true, message:'請輸入分類別名', trigger:'blur'}
    ]
}

//調用接口,添加表單
import{ElMessage} from 'element-plus'
const addCategory = async ()=>{
    //調用
    let result = await articleCategoryListAddService(categoryModel.value);
    ElMessage.success(result.msg? result.msg:'添加成功')

    //調用此方法獲取所有文章分類
    articleCategoryList();
    dialogvisible.value = false;
}


//定義變量來控制標題的展示
const title = ref('')

//展示編輯彈窗
const showDialog = (row) =>{
    dialogvisible.value = true;title.value = '編輯分類'
    //數據拷貝
    categoryModel.value.categoryName = row.categoryName;
    categoryModel.value.categoryAlias = row.categoryAlias;
    //擴展id屬性，將來需要傳遞給後台，完成分類修改
    categoryModel.value.id = row.id
}
const updateCategory = async()=>{
    let result = await articleCategoryListUpdateService(categoryModel.value);
    ElMessage.success(result.msg? result.msg:'修改成功')
    articleCategoryList();
    dialogvisible.value = false;
}


//清空模組數據
const clearData =()=>{
    categoryModel.value.categoryName='';
    categoryModel.value.categoryAlias='';
}
//刪除分類
import {ElMessageBox} from 'element-plus'
const deleteCategory =(row)=>{
    ElMessageBox.confirm(
    '要刪除?你要確定欸?',
    '溫馨提示',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async() => {
        //調用刪除方法
        let result = await articleCategoryListDeleteService(row.id);
      ElMessage({
        type: 'success',
        message: '刪除成功',
      })
      //刷新列表
      articleCategoryList();
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: '取消刪除',
      })
    })
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <span>文章分類</span>
                <div class="extra">
                    <el-button type="primary" @click="dialogvisible=true; title='添加分類';clearData() ">添加分類</el-button>
                </div>
            </div>
        </template>
        <el-table :data="categorys" style="width:100%">
            <el-table-column label="序號" width="100" type="index"></el-table-column>
            <el-table-column label="分類別稱" prop="categoryName"></el-table-column>
            <el-table-column label="分類別名" prop="categoryAlias"></el-table-column>
            <el-table-column label="操作" width="100">
                <template> #default ="{row}">
                    <el-button :icon="Edit" circle plain type="primary" @click="showDialog(row)"></el-button>
                    <el-button :icon="Delete" circle plain type="primary" @click="deleteCategory(row)" ></el-button>
                </template>
            </el-table-column>
            <template #empty>
                <el-empty description="沒有數據"/>
            </template>   
        </el-table>

        <!--添加分類彈窗-->
        <el-dialog v-model="dialogvisible" :title="title" width="30%">
            <el-form :model="categoryModel" :rules="rules" label-width="100px" style="padding-right:30px">
                <el-form-item label="分類名稱" prop="categoryName">
                    <el-input v-model="categoryModel.categoryName" minlength="1" maxlength="1"></el-input> 
                </el-form-item>
                <el-form-item label="分類別名" prop="categoryAlias">
                    <el-input v-model="categoryModel.categoryAlias" minlength="1" maxlength="1"></el-input> 
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="dialogvisible=false">取消</el-button>
                    <el-butoon @click="title=='添加分類'?addCategory():updateCategory()" type="primary" >確認</el-butoon>
                </span>
            </template>
        </el-dialog>
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
</style>