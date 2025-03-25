<script setup lang="ts">
import { useFinance } from '../composables/useFinance';

const { finances } = useFinance();
</script>

<template>
    <div class="stats" v-if="finances">
        <div v-for="data in finances" class="row">
          <div>{{ data.label }}</div>
          <div>{{ data.value }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.stats{
  margin: auto auto 20px;
  font-size: 0.8rem;
}

.row { display: flex; justify-content: space-between; width: 100%; }
</style>