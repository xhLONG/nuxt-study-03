<template>
  <header class="header">
    <section class="container">
      <!-- Logo -->
      <div class="logo-wrap">
        <NuxtLink to="/" class="logo-link">
          <img src="@/assets/svgs/logo.svg" alt="Logo" />
          <span>{{ store.globalTitle }}</span>
        </NuxtLink>
      </div>

      <!-- Desktop nav -->
      <nav class="nav desktop-nav">
        <NuxtLink v-for="nav in navLinks" :to="nav.href" :key="nav.label">{{ nav.label }}</NuxtLink>
      </nav>

      <!-- Hamburger Button -->
      <button class="menu-toggle" @click="toggleMobileMenu">
        <span :class="{ open: mobileOpen }"></span>
        <span :class="{ open: mobileOpen }"></span>
        <span :class="{ open: mobileOpen }"></span>
      </button>
    </section>

    <!-- Mobile nav -->
    <transition name="fade-slide">
      <nav class="nav mobile-nav" v-show="mobileOpen">
        <NuxtLink v-for="nav in navLinks" :to="nav.href" :key="nav.label" @click="closeMobile">{{ nav.label }}</NuxtLink>
      </nav>
    </transition>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useIndexStore } from '@/stores/index'
const store = useIndexStore()
const route = useRoute()

const mobileOpen = ref(false)
const navLinks = [
  {label:　'Home', routeName: 'home', href: '/'},
  {label:　'About(ssg)', routeName: 'about', href: '/about'},
  {label:　'Profile', routeName: 'profile', href: '/profile'},
  {label:　'Privacy', routeName: 'privacy-policy', href: '/privacy-policy'},
  {label:　'Services', routeName: 'terms-of-service', href: '/terms-of-service'},
  {label:　'Contact', routeName: 'contact', href: '/contact'},
  {label:　'News', routeName: 'news', href: '/news'},
]

function toggleMobileMenu() {
  mobileOpen.value = !mobileOpen.value
}
function closeMobile() {
  mobileOpen.value = false
}
</script>

<style lang="scss" scoped>
.header {
  background: #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1000;
  color: #33373d;
  font-size: 16px;

  .container {
    max-width: 1340px;
    margin: 0 auto;
    padding: 0 20px;
    height: 86px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
      height: 68px;
    }
  }

  .logo-link {
    display: flex;
    align-items: center;
    font-weight: bold;
    font-size: 1.25rem;

    img {
      height: 32px;
      margin-right: 8px;
    }
  }

  .nav {
    a {
      position: relative;
      margin: 0 12px;
      text-decoration: none;
      font-weight: 500;
      display: inline-block;
      padding: 4px 0;

      // 下划线动画核心
      &::after {
        content: '';
        position: absolute;
        left: 0;
        bottom: 0;
        height: 2px;
        width: 0;
        background-color: $primary-color;
        transition: width 0.3s ease;
      }
      &:hover::after {
        width: 100%;
      }
      &:hover {
        color: $primary-color;
      }
      &.router-link-active{
        color: $primary-color;
      }
    }
  }

  .desktop-nav {
    display: flex;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .menu-toggle {
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 4px;
    width: 28px;
    height: 24px;
    background: none;
    border: none;
    padding: 0;
    cursor: pointer;

    span {
      display: block;
      width: 100%;
      height: 3px;
      background: #333;
      border-radius: 2px;
      transition: 0.3s;
    }

    .open:nth-child(1) {
      transform: translateY(6px) rotate(45deg);
    }

    .open:nth-child(2) {
      opacity: 0;
    }

    .open:nth-child(3) {
      transform: translateY(-8px) rotate(-45deg);
    }

    @media (max-width: 768px) {
      display: flex;
    }
  }

  .mobile-nav {
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 1rem;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    font-size: 14px;

    a {
      padding: 8px 0;
    }

    @media (min-width: 769px) {
      display: none;
    }
  }

  @media (max-width: 768px) {

  }
}

/* Transition animation */
.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: all 0.3s ease;
}
.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>
