<template>
  <section :class="['module-section', customClass]">
    <!-- 标题 -->
    <BaseTitle :level="titleLevel" :customClass="'module-title'">
      {{ title }}
    </BaseTitle>

    <!-- 可选副标题 -->
    <p v-if="subtitle" class="module-subtitle">{{ subtitle }}</p>

    <!-- 内容插槽 -->
    <div class="module-content">
      <slot />
    </div>
  </section>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  titleLevel: {
    type: [Number, String],
    default: 2
  },
  customClass: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.module-section {
  padding: 1.15rem 0;
}

.module-title {
  margin: 0;
  margin-bottom: 1.53rem;
}

.module-subtitle {
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #666;
}

.module-content {
  /* 内容区域可以加样式 */
}
</style>
