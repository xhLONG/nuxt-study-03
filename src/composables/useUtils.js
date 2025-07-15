export const useUtils = () => {
  /**
   * 监听点击目标元素之外区域，触发回调
   * @param {Ref<HTMLElement>} refEl - 目标元素的 ref
   * @param {Function} callback - 点击外部时触发的函数
   */
  const clickOutside = function(refEl, callback) {
    const handler = (e) => {
      if (refEl.value && !refEl.value.contains(e.target)) {
        callback()
      }
    }

    onMounted(() => {
      if (process.client) {
        document.addEventListener('click', handler)
      }
    })

    onUnmounted(() => {
      if (process.client) {
        document.removeEventListener('click', handler)
      }
    })
  }

  return {
    clickOutside
  }
}

