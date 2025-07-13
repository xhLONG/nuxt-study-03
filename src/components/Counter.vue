<template>
  <div class="counter">
    <p>{{ store.count }}</p>
    <button @click="store.increment()" class="w-xs">+</button>
    <button @click="store.desCount()">-</button>
  </div>
</template>

<script setup>
import { useCounterStore } from '@/stores/myStore'
const store = useCounterStore()
</script>

<style>

</style>
