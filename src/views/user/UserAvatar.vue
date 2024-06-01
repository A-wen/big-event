<script setup>
import{Plus ,Upload} from '@element-plus/icons-vue'
import{ref} from 'vue'
import avator from '@/assets/default.png'
const uploadRef = ref()
import {userInfoStore} from '@/store/token.js'
const tokenStore = useTokenStore();
//用戶頭像路徑
const imgUrl = ref(userInfoStore.info.userPic)

//圖片上傳的回調函數
const uploadSuccess = (result)=>{
    imgUrl.value = result.data;
}
import {userAvatarUpdateService} from '@/api/user.js'
import {ElMessage} from 'element-plus'
//頭像修改
const updateAvatar = async()=>{
    //調用方法
    let result = await userAvatarUpdateService(imgUrl.value);
    ElMessage.success(result.msg?result.msg:'修改成功')
    //修改pinia數據
    userInfoStore.info.userPic = imgUrl.value
}
</script>
<template>
    <el-card class="page-container">
        <template #header >
            <div class="header">
                <span>更換大頭貼</span>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-upload
                    ref="uploadRef"
                    class="avatar-uploader"
                    :show-file-list="false"
                    :auto-upload="true"
                    action="/api/upload"
                    name="file"
                    :header="{'Authorization':tokenStore.token}"
                    :on-success="uploadSuccess">
                    <img v-if="imgUrl" :src="imgUrl" class="avatar"/>
                    <img v-else src="avatar" width="278" />
                </el-upload>
                <br />
                <el-button type="primary" :icon="Plus" size="large" @click="uploadRef.$el.querySelector('input').click()">
                    選擇圖片
                </el-button>
                <el-button type="success" :icon="Upload" size="large" @click="updateAvatar">
                    上傳頭像
                </el-button>               
            </el-col>
        </el-row>
    </el-card>
</template>
<style>

</style>