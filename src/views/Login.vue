<script setup>
import {User , Lock} from '@element-plus/icons-vue'
import {ref} from 'vue'
import { ElMessage } from 'element-plus'
const isRegiter = ref(false)
//定義數據模型
const regiterData = ref({
    username:'',
    password:'',
    rePassword:''
})

//檢測兩次的密碼是否相同
const validatePass = (rule, value, callback) => {
  if (value === '') {
    callback(new Error('請輸入密碼'))
  } else if (value !== regiterData.value.password) {
    callback(new Error("密碼並不相同"))
  } else {
    callback()
  }
}
 
//表單驗證規則
const rules = {
    username: [
    { required: true, message: '請輸入帳號', trigger: 'blur' },
    { min: 5, max: 10, message: '長度為5-10', trigger: 'blur' }
  ],
    password: [
    { required: true, message: '請輸入密碼', trigger: 'blur' },
    { min: 5, max: 10, message: '長度為5-10', trigger: 'blur' }
  ],
    rePassword: [ {validator:validatePass,trigger:'blur'}]   
}


import{useRegisterService, useLoginService} from '@/api/user.js'
//調用後臺 user.js 的 useRegisterService 完成註冊
const regiter = async()=>{
    let result = await useRegisterService(regiterData.value);
    // 判斷資料數據有無的功能,已經在成功取得資料時判斷了
    // if (result.code === 0) {
    //     alert(result.msg? result.msg:'註冊成功');
    // }else{
    //     alert('註冊失敗');
    // }
    //alert(result.msg? result.msg:'註冊成功');
    ElMessage.success(result.msg? result.msg:'註冊成功')
}
//導入路由器來用
import {useRouter} from 'vue-router'
import router from '@/router';
//導入token來應用
import {useTokenStore} from '@/stores/token.js'
const tokenStore = useTokenStore();
//調用後臺 user.js 的 useLoginService 完成登入
const login = async()=>{
    let result = await useLoginService(regiterData.value);

    ElMessage.success(result.msg? result.msg:'登入成功')
    //把得到的token存入pinia中
    tokenStore.setToken(result.data)
    //跳轉到首頁
    router.push('/')
}

//返回鍵以及註冊鍵有清空資料的功能
const clearRegiterData = ()=>{
    regiterData.value={
        username:'',
        password:'',
        rePassword:''
    }
}
</script>

<template>
    <el-row class="login-page">
        <el-col :span="12" class="bg"></el-col>
        <el-col :span="6" :offset="3" class="form"> 
            <!--註冊表單-->
            <el-form ref="form" size="large" aria-autocomplete="off" v-if="isRegiter" :model="regiterData" :rules="rules">
                <el-form-item>
                    <h1>
                        --註冊表單--
                    </h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" aria-placeholder="請輸入用戶名" v-model="regiterData.username"></el-input> 
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" aria-placeholder="請輸入密碼" v-model="regiterData.password"></el-input> 
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" aria-placeholder="請輸入密碼again" v-model="regiterData.rePassword"></el-input> 
                </el-form-item>
                <!--註冊按鈕-->
                <el-form-item>
                    <el-buttom class="button" type="primary" auto-insert-space @click="regiter">--註冊按鈕--</el-buttom>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegiter =false ;clearRegiterData">返回</el-link>
                </el-form-item>
            </el-form>
            <!--登陸表單-->
            <el-form ref="form" size="large" aria-autocomplete="off" v-else :model="regiterData" :rules="rules">
                <el-form-item>
                    <h1>
                        --登陸表單--
                    </h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" aria-placeholder="請輸入帳號" v-model="regiterData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" name="password" type="password" aria-placeholder="請輸入密碼" v-model="regiterData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>記住我</el-checkbox>
                        <el-link type="primary" :underline="false">忘記密碼</el-link>
                    </div>
                </el-form-item>
                <!--登入按鈕-->
                <el-form-item>
                    <el-buttom class="button" type="primary" auto-insert-space @click="login">登入</el-buttom>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="isRegiter = true;clearRegiterData">註冊</el-link>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>


</template>