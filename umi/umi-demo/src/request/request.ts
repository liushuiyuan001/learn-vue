import { extend } from 'umi-request'
import type { RequestOptionsInit } from 'umi-request'
import { notification } from 'antd'

const codeMessage = {
	200: '服务端成功返回请求的数据。',
	400: '发出的请求有错误，服务器没有进行新建或修改的操作。',
	500: '服务器发生错误，请检查服务器'
}
type mapCode = 200 | 400 | 500;

/**
 * 错误异常处理程序
 */
const errorHandler = (error: { response: Response}): Response => {
	const { response } = error;
	if (response && response.status) {
		let errorText = codeMessage[response.status as mapCode] || response.statusText;
		const { status, url } = response;
		response
			?.clone()
			?.json()
			?.then((res) => {
				// 后端返回错误信息，就用后端传回的
				errorText = res.msg ? res.msg : errorText
				notification.error({
					message: `请求错误 ${status}: ${url}`,
					description: errorText
				})
			})
	} else if(!response) {
		notification.error({
			description: '您的网络发生异常,无法连接服务器',
			message: '网络异常'
		})
	}
	return response
}

/** 
 * 配置request请求时的默认参数
*/
const request = extend({
	errorHandler,
	credentials: 'include', // 默认请求是否带上cookie
})

// 根据不同的开发环境，配置请求前缀
interface ApiPrefix {
	dev: string;
	test: string;
	prd: string;
}
const apiPrefix: ApiPrefix = { 
	dev: 'http://192.169.1.1:3000',
	test: 'http://192.169.1.1:3001',
	prd: 'http://192.169.1.1:3002'
}
// request拦截器，携带token，以及根据环境，配置不同的请求前缀
request.interceptors.request.use((url: string, options: RequestOptionsInit) => {
	// 不携带token的请求数组
	let notCarryTokenArr: string[] = [];
	if (notCarryTokenArr.includes(url)) {
		return {
			url: `${apiPrefix[CurrentEnvironment]}${url}`,
			options
		}
	}
	// 给每个请求带上token
	let token = localStorage.getItem('tokens') || ''
	let headers = {
		Authorization: `Bearer ${token}`,
	}
	return { 
		url: `${apiPrefix[CurrentEnvironment]}${url}`,
		options: {
			...options, interceptors: true, headers
		}
	}
})

const get = async (url: string, parameter?: Record<string, unknown>): Promise<any> => {
	try {
		const res = await request(url, { method: 'get', params: parameter})
		return res
	} catch (error) {
		console.log(error)
	}
}

const post = async (url:string, parameter?: Record<string,unknown>): Promise<any> => {
	try {
		const res = await request(url, { method: 'post', data: parameter})
		return res
	} catch (error) {
		console.log(error);
	}
}

export default {
	get,
	post
}