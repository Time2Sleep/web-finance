<script setup lang="ts">
import dayjs from 'dayjs';
import { useFinance } from '../composables/useFinance';
import { ref, watch } from 'vue';

const { lastPurchases, isDataLoading } = useFinance();
const container = ref();

watch(isDataLoading, () => {
    setTimeout(() => {
        container.value!.scrollTop = container.value!.scrollHeight;
    });
});
</script>

<template>
    <div class="last" ref="container">
        <div v-for="{date,category,sum,description} in lastPurchases" class="last__row">
            <div>{{ dayjs(date).format('DD.MM.YYYY') }}</div>
            <div class="last__category">{{ category }}</div>
            <div>{{ sum }}р</div>
            <div class="last__description">{{ description }}</div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.last {
    width: 100%;
    height: 200px;
    overflow-y: auto;

    &__row {
        display: grid;
        grid-template-columns: 2fr 4fr 1fr 2fr;
        font-size: 10px !important;
        border-bottom: 1px solid rgba(0,0,0,0.05);
    }

    &__category{
        text-align: start;
    }

    &__description{
        text-align: end;
    }
}
</style>