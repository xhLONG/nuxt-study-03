<template>
  <el-image
    :src="src"
    :alt="alt"
    :fit="fit"
    :lazy="lazy"
    :preview-src-list="preview ? [src] : []"
    :preview-teleported="true"
    :class="['base-image', customClass, baseStyle ?　'baseStyle' : '']"
    :style="style"
    :draggable="draggable"
    @error="handleError"
  >
    <!-- 加载中插槽 -->
    <template #placeholder>
      <div class="base-image__placeholder">
        <span>加载中...</span>
      </div>
    </template>

    <!-- 加载失败插槽 -->
    <template #error>
      <div class="base-image__error">
        <span>加载失败</span>
      </div>
    </template>
  </el-image>
</template>

<script setup>
import { ElImage } from 'element-plus'

const props = defineProps({
  src: { type: String, required: true },
  alt: { type: String, default: '' },
  fit: { type: String, default: 'cover' },
  lazy: { type: Boolean, default: true },
  preview: { type: Boolean, default: false },
  // loading: { type: String, default: 'lazy' }, // eager | lazy
  customClass: { type: String, default: '' },
  baseStyle: { type: Boolean, default: false },
  style: { type: [String, Object], default: '' },
  draggable: { type: Boolean, default: false }
})

function handleError() {
  console.warn(`图片加载失败: ${props.src}`)
}
</script>

<style scoped lang="scss">
.base-image {
  display: block;

  .el-image__wrapper{
    width: 100%;
    height: 100%;
  }
  .base-image__placeholder,
  .base-image__error {
    display: flex;
    align-items: center;
    justify-content: center;
    color: $primary-color;
    font-size: 14px;
    width: 100%;
    height: 100%;
    background-color: #f5f5f5;
  }
}
.base-style {
  border-radius: 8px;
  transition: all 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  /* 可选：添加悬浮动效 */
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  }
}

</style>

<style lang="scss">
.base-image {
  .el-image__wrapper{
    width: 100%;
    height: 100%;
  }
}
</style>
