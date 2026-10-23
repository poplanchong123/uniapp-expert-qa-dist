/**
 * 外置配置文件（客户可直接修改，无需重新编译）
 *
 * 由各平台在业务代码执行前加载，注入 globalThis.__APP_CONFIG__：
 * - H5：index.html 中 <script src="./config.js"> 加载
 * - 微信小程序：构建产物 app.js 顶部 require('./config.js')
 * - App：main.js 虚拟模块 virtual:app-config-dev 注入
 *
 * 字段说明见 apis/config.js（业务代码将本文件与默认值合并后导出）。
 * 注意：本文件随发行包发布，请勿放置任何密钥。
 */
globalThis.__APP_CONFIG__ = {
	"type": "cloud",
	"provider": "tcb",
	"tcb": {
		"env": "请填写你的云开发环境ID",
		"region": "ap-shanghai",
		"payFnName": "请填写你的支付集成云函数名",
		// 公众号 JSAPI 网页支付集成生成的 HTTP 云函数名（不同 AppID 的独立集成，在云开发控制台集成中心查看）
		"jsapiPayFnName": "请填写你的JSAPI支付集成云函数名",
		// 公众号 AppID：getBrandWCPayRequest 的 appId 入参，必须与 jsapiPayFnName 集成填写的 AppID 一致
		"jsapiAppId": "请填写你的微信公众号AppID",
		"extra": {
			"accessKey": "请填写你的云开发安全密钥（PublishableKey）"
		}
	},
	"baseUrl": "",
	"wechatH5ProxyUrl": "请填写你的微信H5授权代理地址",
	"timeout": 15000,
	"showLoading": false,
	"loadingText": "加载中...",
	"errorDuration": 2500
}
