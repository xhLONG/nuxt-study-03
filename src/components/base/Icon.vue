<template>
  <component
    :is="iconComponent"
    v-if="iconComponent"
    :class="['base-icon', customClass]"
    :style="mergedStyle"
  />
</template>

<script setup>
import * as Icons from '@element-plus/icons-vue'
import { computed } from 'vue'

const props = defineProps({
  name: { type: String, required: true }, // 如 Edit、Delete、User 等
  size: { type: [String, Number], default: 20 },
  color: { type: String, default: '#333' },
  rotate: { type: Number, default: 0 },
  customClass: { type: String, default: '' },
  style: { type: [String, Object], default: '' }
})

const iconComponent = computed(() => {
  return Icons[props.name] || null
})

const mergedStyle = computed(() => ({
  fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
  color: props.color,
  transform: `rotate(${props.rotate}deg)`,
  ...typeof props.style === 'string' ? {} : props.style
}))
</script>

<style scoped>
.base-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  vertical-align: middle;
}
</style>
