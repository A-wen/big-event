<script>
import {
    Management,
    Promotion,
    UserFilled,
    User,
    Crop,
    EditPen,
    SwitchButton,
    CaretBottom
} from '@element-plus/icons-vue'

import avatar from '@/assets/default.png'

import { userInfoService } from '@/api/user';
import userUserInfoStore from '@/stores/userInfo'
import { useTokenStore } from '@/stores/token';
const tokenStore = useTokenStore();
const userInfoStore = userUserInfoStore();
const getUserInfo = async()=>{
    //調用接口
    let result = await userInfoService();
    //取德的數據存到pinia
    userInfoStore.setInfo(result.data);
}
getUserInfo();
//條目被點擊後，叫用的函數
import {useRouter} from 'vue-router'
import { ElMessage ,ElMessageBox } from 'element-plus';
const router = useRouter();
const handleCommand=(command)=>{
    //判斷指令
    if (command === 'logout') {
        //登出
        ElMessageBox.confirm(
        '要登出?你要確定欸?',
        '提示視窗',
    {
      confirmButtonText: 'OK',
      cancelButtonText: 'Cancel',
      type: 'warning',
    }
  )
    .then(async() => {
        //登出
        //1.清空pinia中的token
        tokenStore.removeToken()
        userInfoStore.removeInfo()

        //2.跳轉到登入畫面
        router.push('/login')
        ElMessage({
        type: 'success',
        message: '登出成功',
      })

    })
    .catch(() => {
        ElMessage({
        type: 'info',
        message: '取消登出',
      })
    })
    } else {
        //路由
        router.push('/user/'+command)
    }
}
</script>
<template>
    <!--element-plus中的容器-->
    <el-container class="layout-container">
        <!--左側菜單-->
        <el-aside width="200px">
            <div class="el-aside__logo"></div>
            <!--element-plus中的菜單標籤-->
            <el-menu active-text-color="#ffd04b" background-color="#232323" text-color="#fff" router>
                <el-menu-item index="/article/category">
                    <el-icon>
                        <Management />
                    </el-icon>
                    <span>文章分類</span>
                </el-menu-item>
                <el-menu-item index="/article/manage">
                    <el-icon>
                        <Promotion />
                    </el-icon>
                    <span>文章管理</span>
                </el-menu-item>
                <el-sub-menu>
                    <template #title>
                        <el-icon>
                            <UserFilled />
                        </el-icon>
                        <span>個人中心</span>
                    </template>
                    <el-menu-item index="/user/info">
                        <el-icon>
                            <User />
                        </el-icon>
                        <span>基本資料</span>
                    </el-menu-item>
                    <el-menu-item index="/user/avartar">
                        <el-icon>
                            <Crop />
                        </el-icon>
                        <span>更換頭像</span>
                    </el-menu-item>
                    <el-menu-item index="/user/resetpassword">
                        <el-icon>
                            <EdirPen />
                        </el-icon>
                        <span>重製密碼</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-aside>
        <!--右側主區域-->
        <el-container>
            <!--頭部區域-->
            <el-header>
                <div><strong>{{ userInfoStore.info.nickname }}</strong></div>
                <!--下拉菜單-->
                <el-dropdown placement="botton-end" @command="handleCommand">
                    <span class="el-dropdown__box">
                        <el-avatar :src="userInfoStore.info.userPic?userInfoStore.info.userPic:avatar" />
                        <el-iocn>
                            <CaretBottom />
                        </el-iocn>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="info" :icon="User">基本資料</el-dropdown-item>
                            <el-dropdown-item command="avatar" :icon="Crop">更換頭像</el-dropdown-item>
                            <el-dropdown-item command="resetPassword" :icon="EditPen">重製密碼</el-dropdown-item>
                            <el-dropdown-item command="logout" :icon="SwitchButton">登出</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </el-header>
            <!--中間區域-->
            <el-main>

                <!-- <div style="width:1290px ; height:570px ;border:1px solid red";></div> -->
                <router-view></router-view>
            <!--底部區域-->
            <el-footer>Spring-framework-Vwe3-Mybatis @2024 Created by Ben</el-footer>
            </el-main>
        </el-container>
    </el-container>
</template>

<style lang="scss" scoped>
.layout-container{
    height: 100vh;

    .el-aside{
        background-color: #232323;

        &__logo {
            height: 120px;
            background: url('@/assets/logo.jpg') no-repeat canter / 120ox auto;
        }

        .el-menu{
            border-right:none;
        }
    }

    .el-header{
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;

        .el-dropdown__box{
            display: flex;
            align-items: center;

            .el-icon{
                color:#999;
                margin-left:10px;
            }

            &:active,
            &:focus{
                outline: none;
            }
        }
    }

    .el-footer{
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        color: #666;
    }


}

</style>
