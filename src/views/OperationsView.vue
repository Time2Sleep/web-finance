<script setup lang="ts">
import dayjs from 'dayjs';
import 'dayjs/locale/ru';
import { IRowData } from '../types/common.ts';
import { useFinance } from '../composables/useFinance';
import { ref, computed } from 'vue';

dayjs.locale('ru');

const { lastPurchases, categories } = useFinance();

const selectedCategory = ref<string|null>(null);

const today = dayjs().format('DD MMMM');
const yesterday = dayjs().subtract(1, 'day').format('DD MMMM');

const filteredOperations = computed<IRowData[]>(() => {
    return lastPurchases.value
        .slice()
        .reverse()
        .filter(({ category }) => selectedCategory.value ? category === selectedCategory.value : true)
});

const operationsList = computed<Record<string, IRowData[]>>(() => {
    return filteredOperations.value.reduce((acc, item) => {
        let formattedDate = dayjs(item.date).format('DD MMMM');

        if(formattedDate === today) {
            formattedDate = 'Сегодня';
        } else if(formattedDate === yesterday) {
            formattedDate = 'Вчера';
        }

        if (acc[formattedDate]) {
            acc[formattedDate].push(item);

            return acc;
        } else {
            return {...acc, [formattedDate]: [item] };
        }
    }, {} as Record<string, IRowData[]>);
});

const monthAmount = computed<number>(() => {
    return filteredOperations.value.reduce((acc, {date, sum}) => {
        console.log(sum);
        return dayjs(date).format('MM') === dayjs().format('MM') ? acc + Number(sum) : acc;
    }, 0);
});

</script>

<template>
    <div class="w-full flex justify-between mb-4"> 
        <RouterLink to="/">< Назад</RouterLink>
        
        <a-select 
            v-model:value="selectedCategory" 
            class="operations__select" 
            :options="categories.outcome" 
            placeholder="Фильтр по категориям" 
            :dropdownMatchSelectWidth="false"
            allowClear
        />
    </div>
    
    <div v-if="selectedCategory" class="operations__month">
        <div>Трат в категории <b>«{{ selectedCategory }}»</b> за текущий месяц</div>
        <div class="operations__sum">{{ monthAmount }} руб</div>
    </div>

    <div
        v-for="(day, key) in operationsList" 
        class="py-2" 
        :key="key" 
    >
        <div class="text-left operations__date">{{ key }}</div>

        <div v-for="{date,category,sum,description,type} in day" class="py-1" :key="date+sum+type+key" >
            <div class="flex w-full justify-between">
                <div class="text-left">{{ description }}</div>
                <div class="last__price operations__price" :class="type">{{ (type === 'income' ? '+' : '-') + sum.toLocaleString('ru') }}р</div>
            </div>
            <div class="flex  w-full justify-between last__description">
                <div class="last__category">{{category}}</div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.operations {
    &__month {
        font-size: 12px;
    }

    &__sum {
        font-size: 24px;
        font-weight: bold;
    }

    &__date, &__price {
        font-size: 18px;
        font-weight: bold;
    }
}
</style>