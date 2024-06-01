import request from '@/utils/request.js'
//import {useTokenStore} from '@/stores/token.js'


//分類類表查詢
export const articleCategoryListService = ()=>{
    // const tokenStore = usrTokenStore();
    // return request.get('/category' .{header :{'Authorization':tokenStore.token}})
    //以上註解也在request.js實作

    return request.get('/category')
}
//文章分類添加
export const articleCategoryListAddService =(CategoryData)=>{
    return request.post('/category' ,CategoryData)
}
//文章分類修改
export const articleCategoryListUpdateService =(CategoryData)=>{
    return request.put('/category' ,CategoryData)
}
//文章分類刪除
export const articleCategoryListDeleteService =(id)=>{
    return request.delete('/category?id='+id ,)
}
//文章列表查詢
export const articleListService =(params)=>{
    return request.get('/article',{params:params})
}
//文章添加
export const articleAddService =(articleData)=>{
    return request.post('/article',articleData)
}