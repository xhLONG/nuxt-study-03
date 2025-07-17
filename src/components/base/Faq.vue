<template>
  <BaseModuleSection :title="title" :titleLevel="2" class="faq" v-if="faqList.length">
    <div class="faq-collapse">
      <el-collapse v-model="activeName" accordion>
        <el-collapse-item :title="faq.question" :name="idx+1" v-for="(faq, idx) in faqList" :key="faq.question">
          <div>{{ faq.answer }}</div>
        </el-collapse-item>
      </el-collapse>
    </div>
  </BaseModuleSection>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {type: String, default: 'Faqs'},
  faqList: {
    type: Array,
    required: true,
    default: () => []
  }
})

const activeName = ref('1')
</script>

<style lang="scss">
.el-collapse{
  box-shadow: 0 4px 8px rgba(0, 0, 0, .1);
  border: 1px solid #e0e0e0;
  padding: 0 30px;
  .el-collapse-item__header{
    font-size: 16px;
    color: $title-color;
    font-weight: 700;
  }
  .el-collapse-item__content{
    font-size: 14px;
    color: $title-color;
  }
}
</style>
