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
          <div class="flex w-full justify-between">
            <div class="text-left">{{ dayjs(date).format('DD.MM.YYYY') }}</div>
            <div class="last__price" :class="type">{{ (type === 'income' ? '+' : '-') + sum.toLocaleString('ru') }}р</div>
          </div>
          <div class="flex  w-full justify-between last__description">
            <div class="last__category">{{description}}</div>
            <div class="last__category">{{category}}</div>
          </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.last {
    width: 100%;
    height: 200px;
    overflow-y: auto;

    &__row {
        font-size: 14px !important;
        border-bottom: 1px solid rgba(0,0,0,0.05);
    }

    &__category{
        text-align: start;
    }

    &__description{
        text-align: left;
        font-size: 10px;
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