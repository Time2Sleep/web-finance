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
        <div v-for="{date,category,sum,description,type} in lastPurchases" class="last__row py-0.5">
            <div class="text-left">{{ dayjs(date).format('DD.MM.YYYY') }}</div>
            <div class="last__category">{{ category }}</div>
            <div class="last__description">{{ description }}</div>
            <div class="last__price" :class="type">{{ (type === 'income' ? '+' : '-') + sum.toLocaleString('ru') }}р</div>
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
        grid-template-columns: 3fr 7fr 4fr 3fr;
        font-size: 14px !important;
        border-bottom: 1px solid rgba(0,0,0,0.05);
    }

    &__category{
        text-align: start;
    }

    &__description{
        text-align: left;
    }

    &__price {
      color: rgb(180, 0, 0);
      text-align: end;

      &.income {
        color: rgb(0, 180, 0)
      }
    }
}
</style>