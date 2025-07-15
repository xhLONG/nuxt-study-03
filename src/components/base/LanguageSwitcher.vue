<template>
  <div class="language-switcher" :class="{ open: isOpen }" ref="languageSwitcher">
    <!-- 当前语言按钮 -->
    <button class="current-lang" @click="toggleDropdown">
      <span :class="`flag fi fi-${currentFlag}`"></span>
      <span class="label">{{ currentLabel }}</span>
      <BaseIcon name="ArrowDown" customClass="arrow" :rotate="isOpen ? 180 : 0"></BaseIcon>
    </button>

    <!-- 下拉菜单，带动画 -->
    <transition name="dropdown-fade">
      <ul class="dropdown" v-if="isOpen">
        <li v-for="localeItem in otherLocales" :key="localeItem.code" @click="isOpen = false">
          <SwitchLocalePathLink :locale="localeItem.code" class="local-link">
            <span :class="`flag fi fi-${localeItem.flag}`"></span>
            <span class="label">{{ localeItem.label }}</span>
          </SwitchLocalePathLink>
        </li>
      </ul>
    </transition>
  </div>
</template>

<script setup>
const { locale, locales } = useI18n()
const { clickOutside } = useUtils()
const isOpen = ref(false)
const languageSwitcher = ref(null)

const localeMap = {
  en: { label: 'English', flag: 'us' },
  zh: { label: '中文', flag: 'cn' },
  ko: { label: '한국어', flag: 'kr' },
  ms: { label: 'Melayu', flag: 'my' },
}

const currentLocale = computed(() => locale.value)
const currentLabel = computed(() => localeMap[currentLocale.value]?.label || currentLocale.value)
const currentFlag = computed(() => localeMap[currentLocale.value]?.flag || '🏳️')

const otherLocales = computed(() => {
  return locales.value
    .map(l => {
      const code = typeof l === 'string' ? l : l.code
      return {
        code,
        label: localeMap[code]?.label || code,
        flag: localeMap[code]?.flag || '🏳️',
      }
    })
})

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

// 点击外部关闭菜单（仅在客户端执行）
clickOutside(languageSwitcher, () => {
  isOpen.value = false
})
</script>

<style scoped lang="scss">
.language-switcher {
  position: relative;
  display: inline-block;
  font-size: 16px;

  .current-lang {
    background: none;
    border: 1px solid #ccc;
    border-radius: 6px;
    padding: 6px 10px;
    width: 126px;
    height: 36px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 6px;

    .flag {
      width: 18px;
    }

    .arrow {
      width: 20px;
      height: 20px;
    }
  }


  .dropdown {
    position: absolute;
    top: 100%;
    right: 0;
    width: 360px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 6px;
    padding: 20px 40px;
    margin-top: 6px;
    z-index: 1000;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 4px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 6px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);

    li {
      list-style: none;
      height: 50px;
      border-bottom: 1px solid #ececec;
      color: rgba(102, 102, 102, 0.85);
    }
  }


  // 动画效果
  .dropdown-fade-enter-active,
  .dropdown-fade-leave-active {
    transition: opacity 0.2s ease, transform 0.2s ease;
  }

  .dropdown-fade-enter-from,
  .dropdown-fade-leave-to {
    opacity: 0;
    transform: translateY(-5px);
  }

  // 移动端优化
  @media (max-width: 768px) {
    &{
      font-size: 14px;
    }
    .current-lang {
      padding: 6px 8px;
    }

    .dropdown {
      width: 300px;
      li{
        height: 38px;
      }
    }
  }
}

.rotate {
  transform: rotate(180deg);
}
</style>

<style lang="scss">
.local-link {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 10px;
  text-decoration: none;

  &:hover {
    color: rgba(102, 102, 102, 1);
  }
}
</style>
