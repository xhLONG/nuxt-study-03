# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

支持：原子css、css预处理器、ui库element、接口请求、路由中间件、页面缓存、ssr+ssg、自动生成静态路由、nitro后端接口转发、sitemap站点地图、图片懒加载、tdk结构化数据、多语言


node v18.20.0
nuxt: "3.17.5"
vue: "3.5.17"
pinia: "^3.0.3"
element-plus ui库
tailwindcss 原子css
sass css预处理器


useRequest 封装客户端、服务端请求
server/utils/request 封装node服务器请求
server/middleware/auth 接口权限管理
middleware/auth.global.js 做全局的路由中间件权限管理，每次访问路由前都会触发
middleware/cache-control.global.js 对ssr页面做缓存

wordpress做cms内容管理



num run build 混合渲染 同时生成ssr和ssg，列出的routeRules路由生成ssg，其余ssr。输出到.output文件夹。执行 node .\.output\server\index.mjs 时，会同时运行静态的html网页和ssr页面。直接输入静态网页的url地址访问的是静态文件，如果是网站内跳转的话则是访问的ssr
node .output/server/index.mjs

第三方接口请求
发起的第三方接口（例如：tiktok接口）会在nitro的server中做中转请求，这样可以解决跨域的问题

## (暂时不行)不重新构建整个 Nuxt 应用，仅用 CLI 工具生成指定路由的静态化页面，复用上一次 .output/ 的构建产物。
Nuxt 没有内置 “按需增量静态生成”（Incremental Static Generation）的能力（与 Next.js ISR 区别）
先构建一次（只需一次）
npm run build
只生成某一页
npm run gen:page /blog/123456789
同时生成多页
npm run gen:page /about /blog/1 /blog/2
1
npx nuxi _prerender /privacy



为什么我npm run generate后，使用npm run preview也能访问到非静态化页面？npm run preview是启动一个ssr服务。


先生成ssg，再生成ssr，这样就可以同时存在ssg的disk文件夹和ssr的output。但是有一个问题，每次ssg后都要再次执行ssr构建，因为ssg的output产物会覆盖ssr的output。不行，ssg生成期间会导致线上ssr服务失败
    "build": "nuxt build && node scripts/copy-output.cjs",
    "generate": "nuxt generate && node scripts/copy-dist.cjs",



图片链接加了前缀 懒加载占位图
wordpress 接口响应太慢了 要五六秒才返回数据。wordpress关闭前台网页，只留后台admin
wordpress 安装插件 WP REST Cache 做接口缓存，local软件设置 preference》advance》route mode 为localhost，不要用域名，域名dns解析很慢。
wordpress 安装插件 Redis Object Cache
优化项	推荐做法
禁用前台	template_redirect 拦截
禁用无用功能	禁 Emoji / oEmbed / xmlrpc
启用 REST 缓存	安装并配置 WP REST Cache
优化后台和数据库	禁 heartbeat / WP-Cron / 自动更新
精简服务器压力	升级 PHP + 启用 Opcache

过滤掉wordpress接口数据返回的端口号
https://www.wapcar.my/tools 参考seo



