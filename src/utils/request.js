//導入axios  install axios
import axios from 'axios';
import { ElMessage } from 'element-plus'
//const baseURL ='http://localhost:8080';
const baseURL ='/api';
const instance = axios.create({baseURL})
//導入路由器
import router from '@/router'
//添加請求攔截器
import {useTokenStore} from '@/stores/token.js'
instance.interceptors.request.use(
    (config)=>{
        //請求前的回調
        //添加token
        const tokenStore = useTokenStore();
        //判斷
        if(tokenStore.token){
            config.header.Authorization = tokenStore.token
        }
        return config;
    },
    (err)=>{
        //請求錯誤的回調
        Promise.reject(err)
    }
)

//添加響應攔截器
instance.interceptors.response.use(
    result=>{
        //判斷業務狀態碼
        if(result.data===0){
            return result.data;
        }
        //操作失敗
        ElMessage.error(result.data.msg?result.data.msg:'服務異常');
        return Promise.reject(result.data)
       
    },
    err=>{
        if(err.response.status === 104){
            ElMessage.error('請先登入')
            router.push('/login')
        }else{
            ElMessage.error("服務異常")
        }
        
        return Promise.reject(err);
    }
)


export default instance;