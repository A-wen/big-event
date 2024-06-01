//導入request.js 請求工具
import request from '@/utils/request.js'

//提供註冊用的函數
export const useRegisterService = (registerData)=>{
    //借助 UrlSearchParams完成傳遞
    const parms = new URLSearchParams();
    for (let key in registerData) {
        parms.append(key , registerData[key])     
    }
    return request.post('/user/register',parms);
}

//提供都入用的函數
export const useLoginService = (loginData)=>{
    const params = new URLSearchParams();
    for (let key in loginData) {
        parms.append(key , loginData[key])     
    }
    return request.post('/user/login',parms);
}

//獲取用戶詳細資訊
export const userInfoService=()=>{
    return request.get('/user/userInfo')
}

//修改個人參數
export const userInfoUpdateService = (userInfoData)=>{
    return request.put('/user/update',userInfoData)
}

//修改頭像
export const userAvatarUpdateService = (avatarUrl)=>{
    const params = new URLSearchParams();
    params.append('avatarUrl',avatarUrl)
    return request.patch('/user/updateAvatar',params)
}