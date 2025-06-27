<script setup lang="ts">
import { useFinance } from '../composables/useFinance';
import StatsItem from './StatsItem.vue';

const { finances } = useFinance();
</script>

<template>
    <div class="stats" v-if="finances">
      <StatsItem v-for="data in finances" :data="data"/>
    </div>
</template>

<style scoped lang="scss">
.stats{
width: 100%;
  margin: auto auto 20px;
  font-size: 0.8rem;
}
</style>