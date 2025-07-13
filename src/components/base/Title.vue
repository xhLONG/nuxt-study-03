<template>
  <component :is="computedTag" :class="['base-title', `level-${level}`, customClass]">
    <slot />
  </component>
</template>

<script setup>
const props = defineProps({
  tag: {
    type: String,
    default: ''
  },
  level: {
    type: [Number, String],
    default: 2,
    validator: val => [1, 2, 3, 4, 5, 6].includes(Number(val))
  },
  customClass: {
    type: String,
    default: ''
  }
})

const computedTag = computed(() => {
  return props.tag ? props.tag.toLowerCase() : `h${props.level}`
})
</script>

<style scoped lang="scss">
.base-title {
  line-height: 1.3;
  margin: 1.1em 0;
  font-size: 26px;
  font-family: $robotoC;
  font-weight: 700;
  color: $title-color;
}

/* 默认：桌面端字号 */
.level-1 { font-size: 2rem; }
.level-2 { font-size: 2rem; }
.level-3 { font-size: 1.6rem; }
.level-4 { font-size: 1.4rem; }
.level-5 { font-size: 1.2rem; }
.level-6 { font-size: 1rem; }

/* 媒体查询：移动端变小（<768px） */
// @media (max-width: 767px) {
//   .level-1 { font-size: 2rem; }
//   .level-2 { font-size: 1.75rem; }
//   .level-3 { font-size: 1.5rem; }
//   .level-4 { font-size: 1.25rem; }
//   .level-5 { font-size: 1rem; }
//   .level-6 { font-size: 0.875rem; }
// }
</style>
