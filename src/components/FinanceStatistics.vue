<script setup lang="ts">
import { useFinance } from '../composables/useFinance';
import StatsItem from './StatsItem.vue';

const { finances } = useFinance();
</script>

<template>
  <div className="border p-3 rounded mb-4" v-if="finances.length">
    <h2 className="text-lg font-bold mb-2">Статистика</h2>

    <StatsItem v-for="data in finances" :data="data"/>
  </div>
</template>