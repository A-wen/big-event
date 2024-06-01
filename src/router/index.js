import { createRouter, createWebHistory} from 'vue-router'

//import 物件
import LoginVue from '@/views/Login.vue'
import LayoutVue from '@/views/Layout.vue'

import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserAvartarVue from '@/views/user/UserAvartar.vue'
import UserResetPasswoedVue from '@/views/user/UserResetPasswoed.vue'
//定義 router 關係
const routes = [
    { path:'/login' , component : LoginVue},
    { path:'/',component : LayoutVue , redirect:'article/manage',
        //子路由器
        children:[
            {path:'/article/category',component: ArticleCategoryVue},
            {path:'/article/manage',component: ArticleManageVue},
            {path:'/user/info' ,component: UserInfoVue},
            {path:'/user/avartar',component: UserAvartarVue},
            {path:'/user/resetpassword' ,component: UserResetPasswoedVue}
        ]
    }
]

// 創建路由器 Ronter
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})

// 導出 export 路由
export default router