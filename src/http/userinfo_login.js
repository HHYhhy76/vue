//统一api管理
import instance from './axios'
const userInfoLogin = (data) => {
    //返回Promise对象
    return instance.request({
        url: '/api/userinfo/login', //url=baseUrl+url,
        method: 'post',
        data,
    })
}


export { userInfoLogin }
