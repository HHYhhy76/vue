import axios from 'axios'
import { useUserStore } from '../store/user'
import { ElMessage, ElMessageBox } from "element-plus";
// 创建自定义的 Axios 实例
const api = axios.create({
  baseURL: '/api', // 设置基础URL
  withCredentials: true, // 允许携带跨域请求的凭证
})

// 添加请求拦截器
api.interceptors.request.use(
  (config) => {
    // 在发送请求之前做一些处理
    const userStore = useUserStore()
    const { token } = userStore
    // console.log(token);
    config.headers.token = token
    return config
  },
  (error) => {
    // 处理请求错误
    return Promise.reject(error)
  }
)

// 添加响应拦截器
api.interceptors.response.use(
  (response) => {
    // 对响应数据做一些处理
    return response
  },
  (error) => {
    // 处理响应错误
    return Promise.reject(error)
  }
)

export default api
