<template>
  <footer class="footer">
    <section class="footer-container">
      <!-- Logo & About -->
      <div class="footer-brand">
        <NuxtLink to="/">
          <img src="@/assets/svgs/logo.svg" class="logo" alt="Logo" />
        </NuxtLink>
        <p class="description">
          {{ store.globalTitle }} 是一个现代化响应式 Nuxt 网站，为您提供专业可靠的服务体验。
        </p>

        <!-- 社交媒体图标 -->
        <div class="social-icons">
          <a href="https://facebook.com" target="_blank" aria-label="Facebook">
            <img src="@/assets/svgs/social/facebook.svg" alt="facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" aria-label="Twitter">
            <img src="@/assets/svgs/social/twitter.svg" alt="twitter" />
          </a>
          <a href="https://github.com" target="_blank" aria-label="GitHub">
            <img src="@/assets/svgs/social/gitHub.svg" alt="gitHub" />
          </a>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="footer-links">
        <div class="column">
          <h2>关于我们</h2>
          <ul>
            <li><NuxtLink to="/about">公司简介</NuxtLink></li>
            <li><NuxtLink to="/team">团队成员</NuxtLink></li>
            <li><NuxtLink to="/careers">加入我们</NuxtLink></li>
          </ul>
        </div>
        <div class="column">
          <h2>服务</h2>
          <ul>
            <li><NuxtLink to="/services/web">Web 开发</NuxtLink></li>
            <li><NuxtLink to="/services/app">App 开发</NuxtLink></li>
            <li><NuxtLink to="/pricing">价格方案</NuxtLink></li>
          </ul>
        </div>
        <div class="column">
          <h2>支持</h2>
          <ul>
            <li><NuxtLink to="/contact">联系我们</NuxtLink></li>
            <li><NuxtLink to="/faq">常见问题</NuxtLink></li>
            <li><NuxtLink to="/privacy-policy">隐私政策</NuxtLink></li>
          </ul>
        </div>
      </div>
    </section>

    <section class="footer-bottom">
      <p>© 2025 {{ store.globalTitle }} 版权所有</p>
    </section>
  </footer>
</template>

<script setup>
import { useIndexStore } from '@/stores/index'
const store = useIndexStore()
</script>

<style scoped lang="scss">
.footer {
  background: #1E1E1E;
  color: #858282;
  padding: 40px 0 20px;
  font-size: 14px;
  line-height: 1.6;

  a {
    color: #858282;
    text-decoration: none;

    &:hover {
      color: #ffffff;
    }
  }

  .footer-container {
    display: flex;
    flex-wrap: wrap;
    max-width: 1340px;
    margin: 0 auto;
    padding: 0 20px;
    gap: 40px;
    justify-content: space-between;
  }

  .footer-brand {
    flex: 1 1 250px;

    .logo {
      width: 32px;
      margin-bottom: 6px;
    }

    .social-icons {
      display: flex;
      gap: 12px;
      margin-top: 16px;

      a {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 32px;
        height: 32px;
        background: #374151;
        border-radius: 50%;
        transition: background 0.3s;

        &:hover {
          background: #4b5563;
        }

        svg {
          width: 18px;
          height: 18px;
          fill: #d1d5db;
        }

        &:hover svg {
          fill: #ffffff;
        }
      }
    }
  }

  .footer-links {
    display: flex;
    flex: 2 1 500px;
    justify-content: space-between;
    flex-wrap: wrap;

    .column {
      min-width: 140px;

      h2 {
        font-size: 16px;
        margin-bottom: 10px;
        font-weight: 600;
        color: #ffffff;
      }

      ul {
        list-style: none;
        padding: 0;

        li {
          margin-bottom: 6px;
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid #374151;
    text-align: center;
    padding-top: 20px;
    max-width: 1340px;
    margin: 40px auto 0;
    padding: 6px 20px;
    font-size: 13px;
    color: #9ca3af;
  }

  @media (max-width: 768px) {
    &{
      font-size: 12px;
      padding: 10px 0;
    }

    .footer-container {
      flex-direction: column;
      gap: 30px;
    }

    .footer-brand {
      flex: 1 1 130px;
    }

    .footer-links {
      flex: unset;
      flex-direction: column;
      gap: 20px;

      .column h2{
        font-size: 18px;
      }
    }
  }
}
</style>
