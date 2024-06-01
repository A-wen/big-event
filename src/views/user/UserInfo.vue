<script setup>
import {ref} from 'vue'; 
import userUserInfoStore from '@/store/userInfo.js'
const userInfoStore = userUserInfoStore();
const userInfo = ref({...userInfoStore.info})
const rules={
    nickname:[
        {required: true, message:'請輸入用戶暱稱', trigger:'blur'},
        {
            pattern:/^\S{2,10}$/,
            message:'暱稱必須2-10非空字串',
            trigger:'blur'
        }
    ],
    email:[
        {required:true, message:'請輸入信箱' ,trigger:'blur'},
        {type:'email' ,message:'信箱格式不正確', trigger:'blur'}
    ]
}

//修改個人資料
import { userInfoUpdateService } from '@/api/user';
import { ElMessage } from 'element-plus';
const updateUserInfo = async ()=>{
    //調用接口
    let result = await userInfoUpdateService(userInfo.value);
    ElMessage.success(result.msg?result.msg:'修改成功');

    //修改pinia中的個人信息
    userInfoStore.setInfo(userInfo.value) 
}
</script>
<template>
    <el-card class="page-container">
        <template #header>
            <div class="header">
                <sapn>基本資料</sapn>
            </div>
        </template>
        <el-row>
            <el-col :span="12">
                <el-form :model="userInfo" :rules="rules" label-width="100px" size="large">
                    <el-form-item label="登陸名稱">
                        <el-input v-model="userInfo.usename" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="用戶暱稱" prop="nickname">
                        <el-input v-model="userInfo.nickname" ></el-input>
                    </el-form-item>
                    <el-form-item label="用戶信箱" prop="email">
                        <el-input v-model="userInfo.email" ></el-input>
                    </el-form-item>
                    <el-form-item >
                        <el-input type="primary" @click="updateUserInfo"></el-input>
                    </el-form-item>                    
                </el-form>
            </el-col>
        </el-row>
    </el-card>
</template>
<style>
</style>
