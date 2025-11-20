<script setup lang="ts">
import dayjs from 'dayjs';
import { useFinance } from '../composables/useFinance';
import { ref, watch, onMounted } from 'vue';

const { lastPurchases, isDataLoading, isNewAdding } = useFinance();
const container = ref();

const scrollDown = () => {
  setTimeout(() => {
      container.value!.scrollTop = container.value!.scrollHeight;
  });
};
watch(isDataLoading, scrollDown);
watch(isNewAdding, scrollDown);
onMounted(scrollDown);
</script>

<template>
    <div class="last" ref="container">
      <TransitionGroup name="list">
        <RouterLink 
          v-for="{date,category,sum,description,type, loading} in lastPurchases" 
          class="last__row py-0.5" 
          to="/operations"
          :key="date+sum+type" 
        >
          <a-spin :spinning="!!loading">
            <div class="flex w-full justify-between">
              <div class="text-left">{{ dayjs(date).format('DD.MM.YYYY') }}</div>
              <div class="last__price" :class="type">{{ (type === 'income' ? '+' : '-') + sum.toLocaleString('ru') }}р</div>
            </div>
            <div class="flex  w-full justify-between last__description">
              <div class="last__category">{{category}}</div>
              <div class="last__category">{{description}}</div>
            </div>
          </a-spin>
        </RouterLink>
      </TransitionGroup>
    </div>
</template>