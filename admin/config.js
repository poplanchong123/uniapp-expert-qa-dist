/**
 * 外置配置文件（客户可直接修改，无需重新编译）
 *
 * 本文件不参与业务打包：由 index.html 中的 <script src="./config.js"> 在业务代码之前加载，
 * 注入 globalThis.__APP_CONFIG__，再由 js_sdk/tcb-shim/config.js 与默认值合并后使用。
 *
 * 字段：
 *   provider    数据源开关（⚠️ 决定使用哪套云）
 *                 'tcb'      腾讯云开发 CloudBase —— 垫片接管 uniCloud，请求走 admin-gateway 云函数
 *                 'unicloud' DCloud uniCloud —— 原生行为；若填了 unicloud.spaceId，
 *                            垫片会用运行时 uniCloud.init() 指向该服务空间
 *   env         TCB 环境 ID（provider='tcb' 时必填），需与主 App（uni_ai_ask）使用同一个环境
 *   region      地域，默认 ap-shanghai（provider='tcb' 时生效）
 *   accessKey   安全密钥（CloudBase 控制台 → 环境 → 安全配置 → 密钥）
 *               按设计为可公开下发的客户端密钥（PublishableKey），与主 App 使用同一把
 *   extra       透传给 @cloudbase/js-sdk init 的额外参数（provider='tcb' 时生效）
 *   unicloud    uniCloud 服务空间（provider='unicloud' 时启用），需与主 App 指向同一个空间
 *
 * 注意：本文件随发行包发布，请勿放置任何服务端密钥。
 */
globalThis.__APP_CONFIG__ = {
  provider: 'tcb',
  env: '请填写你的云开发环境ID',
  region: 'ap-shanghai',
  accessKey:
    '请填写你的云开发安全密钥（PublishableKey）',
  // uniCloud 服务空间（provider='unicloud' 时启用）
  // uniCloud 的服务空间默认由 HBuilderX 在编译期关联进产物；填了 spaceId 就改为
  // 运行时 uniCloud.init()，同一个编译包即可对接任意客户的服务空间。
  // 需与主 App（uni_ai_ask）的 config.js 填同一个空间。
  unicloud: {
    // aliyun | tencent | alipay
    provider: 'aliyun',
    spaceId: '',
    // 阿里云 / 腾讯云：uniCloud 控制台 → 服务空间 → 安全配置 → 客户端密钥
    clientSecret: '',
    // 支付宝云：空间 AppId 与客户端 accessKey / secretKey
    spaceAppId: '',
    accessKey: '',
    secretKey: '',
  },
  extra: {},
}
