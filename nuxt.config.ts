// https://nuxt.com/docs/api/configuration/nuxt-config
import { resolve } from 'path';
import routeRules from './nuxt-config/prerender-routes.json'
import { sitemap } from './nuxt-config/sitemap.js'

export default defineNuxtConfig({
  compatibilityDate: '2025-05-15',
  // 你可以根据开发/生产切换不同配置
  devtools: { enabled: import.meta.dev },
  srcDir: 'src/',
  alias: {
    '@': resolve(__dirname, 'src')
  },
  app: {
    head: {
      title: 'nuxt study 02',
      htmlAttrs: {
        lang: 'en',
      },
      charset: 'utf-16',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1' },
        { name: 'description', content: 'a study nuxt demo project' },
        { name: 'keywords', content: '抖音,tiktok,download' },
        { name: 'robots', content: 'index, follow' }
      ],
    },
    buildAssetsDir: '_nuxt_static_assets/'
  },
  // css单独文件引用，不使用内联
  experimental: {
    inlineSSRStyles: false
  },
  css: ['@/assets/style/main.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/style/var.scss" as *;'
        }
      }
    },
    build: {
      cssCodeSplit: true // ✅ 拆出路由页面 CSS ，好像没什么用 打包出来没区别
    }
  },
  site: {
    url: process.env.DOMAIN,
    name: process.env.GLOBALTITLE
  },
  routeRules,
  sitemap,
  // sitemapName: 'sitemap', 多模块sitemap时，该属性不生效
  modules: ['@nuxtjs/tailwindcss', '@element-plus/nuxt', '@pinia/nuxt', '@nuxtjs/sitemap', '@nuxt/image'],
  runtimeConfig: {
    public: {
      apiBase: '',
      ttApiBase: process.env.TT_API_BASE,
      wpApiBase: process.env.WP_API_BASE,
      domain: process.env.DOMAIN,
      globalTitle: process.env.GLOBAL_TITLE,
      facebookContact: process.env.FACEBOOKCONTACT,
      youtubeContact: process.env.YOUTUBECONTACT,
      instagramContact: process.env.INSTAGRAMCONTACT,
      email: process.env.EMAIL,
      gaId: process.env.GA_ID
    }
  },
  nitro: {
    prerender: {
      // routes: [], // 用于激活 `.output/server/prerender.mjs`
      crawlLinks: false, // 不爬 a 标签，仅使用上面的静态路由清单
    },
    // 仅在开发环境	浏览器请求需要转发时 仅开发时有效
    devProxy: {
      '/api/wp-cms': {
        target: process.env.WP_API_BASE,
        changeOrigin: true
      },
    },
    // 在构建后运行时	服务端请求转发（SSG/SSR/API）	服务端运行时代理
    routeRules: {
      '/api/wp-cms/**': {
        proxy: process.env.WP_API_BASE + '/**',
        cache: {
          swr: true,          // 启用 stale-while-revalidate 策略
          maxAge: 120,         // 缓存有效时间（秒）
          staleMaxAge: 300    // 过期后仍然可用的时间（秒），后台同时重新验证
        }
      }
    }
  }
})