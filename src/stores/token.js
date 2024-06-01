//定義store
import{ref} from 'vue'
import {defineStore} from "pinia"

/**
 * 第一個參數:名字 唯一性
 * 第二個參數:方法 方法的內部可以定義狀態的所有內容
 */

export const useTokenStore = defineStore('token',()=>{
    //定義狀態的內容

    //1.響應式變量
    const token = ref('')

    //2.定義一個方法來修改token的值
    const setToken =(newToken)=>{
        token.value = newToken
    }

    //3.定義一個方法來移除token的值
    const removeToken = ()=>{
        token.value = ''
    }

    return{
        token,setToken,removeToken
    }
},{
    persist:true//持久化存儲
})

