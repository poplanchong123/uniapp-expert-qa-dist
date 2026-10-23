# 问答系统 · 演示站点（H5 + 管理后台）

一套可直接部署的**付费问答 / 知识付费社区**前端产物：用户找答主、付费提问、答主作答，后台管理答主、订单、提现与内容审核。

本仓库只放**已编译好的静态文件**，不含服务端代码，也不含任何可用密钥。业务数据全部在你自己的云环境里。

<img src="https://raw.githubusercontent.com/poplanchong123/uniapp-expert-qa-dist/main/assets/poster.png" alt="产品海报：找到你的知识向导" width="760">

线上演示：https://release.ask.poplanchong.top/release/product/showcase.html

| 目录 | 是什么 | 入口 |
|---|---|---|
| `h5/` | 用户端（手机优先，5 个 Tab） | `h5/index.html` |
| `admin/` | 管理后台（PC） | `admin/index.html` |

> 两个站点都必须由 HTTP 服务打开。直接双击 `index.html`（`file://`）会白屏。

---

## 一、配置（唯一需要改的地方）

两个目录下各有一个 `config.js`，它在业务代码之前加载，**改完刷新浏览器即生效，不需要重新编译**。
仓库里的这份已经是「请填写…」占位文本，用之前必须按下面两张表填成你自己的环境。

### 1. 先选数据源 `provider`

| 你想用 | `provider` | 说明 |
|---|---|---|
| 腾讯云开发 CloudBase | `'tcb'` | 填 `tcb.env` 与 `tcb.accessKey`，开箱即用 |
| DCloud uniCloud（阿里云 / 腾讯云 / 支付宝云） | `'unicloud'` | 填 `unicloud.*`，并保证服务端已经部署到同一空间 |

### 2. 字段说明（`provider: 'tcb'`）

| 字段 | 必填 | 从哪里拿 |
|---|---|---|
| `tcb.env` | 是 | 云开发控制台 → 环境 → 环境 ID |
| `tcb.region` | 否 | 默认 `ap-shanghai` |
| `tcb.extra.accessKey` | 是 | 云开发控制台 → 环境 → 安全配置 → 密钥（PublishableKey，按设计可公开下发） |
| `tcb.payFnName` | 收款时需要 | 集成中心生成的微信支付 HTTP 云函数名 |
| `tcb.jsapiPayFnName` | 公众号内支付需要 | 公众号 JSAPI 支付集成的 HTTP 云函数名 |
| `tcb.jsapiAppId` | 公众号内支付需要 | 与上面 JSAPI 集成一致的公众号 AppID |
| `wechatH5ProxyUrl` | 否 | 微信内 H5 授权中转入口，留空会按云环境自动推导 |
| `baseUrl` | `type: 'http'` 时必填 | 独立后端接口地址 |

### 3. 字段说明（`provider: 'unicloud'`）

| 字段 | 必填 | 从哪里拿 |
|---|---|---|
| `unicloud.provider` | 是 | `aliyun` / `tencent` / `alipay`，必须与开通的服务空间一致 |
| `unicloud.spaceId` | 是 | uniCloud 控制台 → 服务空间 → 空间详情 → SpaceID |
| `unicloud.clientSecret` | 阿里云 / 腾讯云必填 | 服务空间 → 安全配置 → 客户端密钥 |
| `unicloud.spaceAppId` | 支付宝云必填 | 服务空间 → 空间详情 |
| `unicloud.accessKey` / `secretKey` | 支付宝云必填 | 服务空间 → 安全配置 |

### 4. 两个 `config.js` 必须指向同一个环境

`h5/config.js` 与 `admin/config.js` 的 `env`（或 `unicloud.spaceId`）**必须完全一致**，
否则后台看到的订单、答主和用户端不是同一份数据。

### 5. 这里不要放服务端密钥

`config.js` 是浏览器能下载到的公开文件。只填「客户端可公开」的配置；
tokenSecret、支付商户号、APIv3 密钥、证书私钥这类东西只能放在云函数的环境变量里。

---

## 二、本地预览

```bash
# 在仓库根目录起一个静态服务器
python3 -m http.server 8080
# 然后访问 http://localhost:8080/h5/     用户端
#         http://localhost:8080/admin/  管理后台
```

后台的路由前缀固定为 `/admin/`，所以请按上面的路径访问，不要直接开 `admin/index.html`。

---

## 三、部署

### GitHub Pages（最快出演示）

1. 仓库 → Settings → Pages → Source 选 `Deploy from a branch`，分支 `main`，目录 `/`。
2. 稍等 1–2 分钟，访问 `https://<用户名>.github.io/<仓库名>/h5/`。
3. 后台同样在 `.../admin/` 下。

> 仓库里的 `index.html`、CSS 已把 `/assets/...` 改成相对路径，因此项目子路径也能加载资源。
> 但后台的路由前缀写死为 `/admin/`，在 Pages 子路径下访问 `.../<仓库名>/admin/` 会被重定向到 `/admin/#/`。
> 想让后台在 Pages 上完整可用，二选一：
> - 用**自定义域名**（或 `<用户名>.github.io` 仓库）把站点部署在域名根目录，后台就是 `域名/admin/`；
> - 或把后台项目 `manifest.json` 的 `h5.router.base` 改为 `/` 后重新编译，再用本脚本发布。
>
> 只是给人看界面的话，用户端 `h5/` 在 Pages 子路径下可直接使用。

### 自有服务器（Nginx）

```bash
# 上传后解压到站点目录，例如 /www/wwwroot/demo
scp -r h5 admin user@server:/www/wwwroot/demo/
```

```nginx
server {
    listen 80;
    server_name demo.example.com;
    root /www/wwwroot/demo;
    index index.html;

    location / { try_files $uri $uri/ /h5/index.html; }
    location /admin/ { try_files $uri $uri/ /admin/index.html; }
}
```

### uniCloud 前端网页托管

控制台 → 前端网页托管 → 上传 `h5/` 目录内容即可（后台同理，注意上传到 `admin/` 子目录）。

---

## 四、如何购买

本仓库是**演示站**，完整版提供源码 + 一键部署脚本（云函数、数据库结构、管理后台全部包含）。

### 版本与价格

| 版本 | 包含 | 价格 |
|---|---|---|
| 源码授权（单站点） | 完整前后端源码 + 部署文档，自行部署 | 请填写价格 |
| 源码 + 代部署 | 源码授权 + 远程协助上线（含云环境开通、支付配置） | 请填写价格 |
| 定制开发 | 按需求增删功能，含 UI 定制 | 面议 |

### 交付内容

- 前台（H5 / 微信小程序 / App 同一套代码）+ 管理后台完整源码
- 云函数与数据库集合结构、初始化脚本
- 支付（微信 / 支付宝）与提现结算、佣金配置
- 部署文档与升级脚本（升级不覆盖你手填的配置）

### 联系方式

<img src="https://raw.githubusercontent.com/poplanchong123/uniapp-expert-qa-dist/main/assets/qrcode.png" alt="客服二维码" width="220">

扫码加客服微信（长按识别）

- 在线下单：https://release.ask.poplanchong.top/release/product/showcase.html

> 咨询时说明：打算做的领域、是否需要小程序、有没有现成的答主资源，会直接给你对应的部署方案和报价。

---

## 五、常见问题

**打开是白屏 / 控制台报 config.js 404**
用 `file://` 直接打开，或把 `config.js` 放到了别的目录。必须通过 HTTP 服务访问，且 `config.js` 与 `index.html` 同级。

**改完 config.js 没生效**
浏览器缓存。强制刷新（`Ctrl/Cmd + Shift + R`）或开无痕窗口。

**用户端能登录，后台登录后空白**
两处 `config.js` 指向的环境不一致，或服务端还没部署 `admin-gateway` 等云函数。

**微信内 H5 授权失败**
`wechatH5ProxyUrl` 未配置且无法自动推导；或公众号后台的网页授权域名没配。

**图片、字体 404**
说明站点没有部署在域名根目录，且资源路径被改成了绝对路径。仓库里的产物已改成相对路径，重新拉取即可。

---

## 六、授权与免责

- 本仓库仅用于产品演示与配置说明，不含服务端源码；未经授权不得将界面/代码用于商业分发或转售。
- 仓库内的 `config.js` 为占位文本，请勿在其中填写任何服务端密钥。
- 演示站数据由作者维护，如需清空或关闭请联系作者。

---

<sub>本 README 由 `deploy/publish-github.js` 自动生成，重新发布时会被覆盖。</sub>
