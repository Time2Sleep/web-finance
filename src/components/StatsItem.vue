<script setup lang="ts">
import { ref } from 'vue';
import { IFinanceStats } from '../types/common';

defineProps<{
    data: IFinanceStats
}>();

const isActive = ref(false);
</script>

<template>
    <div class="stats-item">
        <div class="stats-item__row" :class="{active: isActive}" @click="isActive=!isActive">
          <div>{{ data.label }}</div>
          <div>{{ data.value }}</div>
        </div>

        <div class="stats-item__children" v-if="isActive && data.full?.length">
            <StatsItem v-for="child in data.full" :data="child" class="border-l pl-4"/>
        </div>
    </div>
</template>

<style scoped lang="scss">
.stats-item {
  width: 100%;

  &__row {
    display: flex; 
    justify-content: space-between; 
    width: 100%;

    &.active {
        font-weight: bold;
    }
  }

  &__children {
    display: flex;
    flex-direction: column;
    padding: 4px 0 12px 12px;
  }
}
</style>