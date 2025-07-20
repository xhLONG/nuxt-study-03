<template>
  <footer class="footer">
    <section class="footer-container">
      <!-- Logo & About -->
      <div class="footer-brand">
        <NuxtLinkLocale to="/">
          <img src="@/assets/svgs/logo.svg" class="logo" alt="Logo" />
        </NuxtLinkLocale>
        <p class="description">
          {{ store.globalTitle }} {{ $t("footer.description") }}
        </p>

        <!-- 社交媒体图标 -->
        <div class="social-icons">
          <a href="https://facebook.com" target="_blank" aria-label="Facebook" title="Facebook" rel="external">
            <img src="@/assets/svgs/social/facebook.svg" alt="facebook" />
          </a>
          <a href="https://twitter.com" target="_blank" aria-label="Twitter" title="Twitter" rel="external">
            <img src="@/assets/svgs/social/twitter.svg" alt="twitter" />
          </a>
          <a href="https://github.com" target="_blank" aria-label="GitHub" title="GitHub" rel="external">
            <img src="@/assets/svgs/social/github.svg" alt="gitHub" />
          </a>
        </div>
      </div>

      <!-- Footer Links -->
      <div class="footer-links">
        <div class="column">
          <h2>{{ $t('footer.aboutUs') }}</h2>
          <ul>
            <li><NuxtLinkLocale to="about">{{ $t('footer.companyDes') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="/">{{ $t('footer.team') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="careers">{{ $t('footer.joinUs') }}</NuxtLinkLocale></li>
          </ul>
        </div>
        <div class="column">
          <h2>{{ $t('footer.service') }}</h2>
          <ul>
            <li><NuxtLinkLocale to="service">Web 开发</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="service">App 开发</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="service">价格方案</NuxtLinkLocale></li>
          </ul>
        </div>
        <div class="column">
          <h2>{{ $t('footer.support') }}</h2>
          <ul>
            <li><NuxtLinkLocale to="contact">{{ $t('footer.contactUs') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="faq">{{ $t('footer.faq') }}</NuxtLinkLocale></li>
            <li><NuxtLinkLocale to="privacy">{{ $t('footer.privacyPolicy') }}</NuxtLinkLocale></li>
          </ul>
        </div>
      </div>
    </section>

    <section class="footer-bottom">
      <p>© 2025 {{ store.globalTitle }} {{ $t('footer.allRights') }}</p>
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
