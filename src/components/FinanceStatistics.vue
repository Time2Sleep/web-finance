<script setup lang="ts">
import { computed } from 'vue';
import { useFinance } from '../composables/useFinance';

const { finances } = useFinance();

const monthPercent = computed<string>(() => {
    const income = finances.value.month.income;
    const outcome = finances.value.month.outcome;

    if(!income) return '100';

    return ((income - outcome) / income * 100).toFixed(2);
});
</script>

<template>
    <div class="stats" v-if="finances">
        <div>В этом месяце потрачено: {{ finances.month.outcome.toLocaleString() }} руб</div>
        <div>В этом месяце заработано: {{ finances.month.income.toLocaleString() }} руб</div>
        <div>Разница: {{ (finances.month.income - finances.month.outcome).toLocaleString() }} руб ({{ monthPercent }}%)</div>
        <div>За год потрачено: {{ finances.year.outcome.toLocaleString() }} руб</div>
        <div>За год заработано: {{ finances.year.income.toLocaleString() }} руб</div>
        <div>Капитал: {{ finances.total.toLocaleString() }} руб</div>
    </div>
</template>

<style scoped lang="scss">
.stats{
  margin: auto auto 20px;
  font-size: 0.8rem;
}
</style>