<template>
  <nav class="breadcrumb" aria-label="Breadcrumb">
    <ol>
      <li v-for="(item, index) in items" :key="index">
        <template v-if="isLast(index)">
          <!-- <span class="breadcrumb-current">{{ item.name }}</span> -->
          <NuxtLink :to="route.path" class="breadcrumb-current">
            {{ item.name }}
          </NuxtLink>
        </template>
        <template v-else>
          <NuxtLink :to="item.url" class="breadcrumb-link">
            {{ item.name }}
          </NuxtLink>
          <span class="breadcrumb-separator">/</span>
        </template>
      </li>
    </ol>
  </nav>
</template>

<script setup>
const route = useRoute()
const props = defineProps({
  items: {
    type: Array,
    required: true,
    default: () => []
  }
})

const isLast = (index) => index === props.items.length - 1
</script>

<style scoped lang="scss">
.breadcrumb {
  font-size: 13px;
  overflow-x: auto;
  white-space: nowrap;
}

.breadcrumb ol {
  display: flex;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb li {
  display: flex;
  align-items: center;
}

.breadcrumb-link {
  color: #1A3760;
  text-decoration: none;
  transition: color 0.2s;
  cursor: pointer;
}

.breadcrumb-link:hover {
  text-decoration: underline;
  color: $link-color;
}

.breadcrumb-separator {
  margin: 0 0.5rem;
  color: #999;
}

.breadcrumb-current {
  color: #777;
}
</style>
