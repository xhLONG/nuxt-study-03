<template>
  <div class="default-layout">
    <BaseHeader></BaseHeader>
    <main><slot></slot></main>
    <BaseFooter></BaseFooter>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
main{
  padding-top: 86px;
}

@media (max-width: 768px) {
  main{
    padding-top: 68px;
  }
}
</style>
