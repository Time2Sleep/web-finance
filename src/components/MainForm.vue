<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { computed, ref } from 'vue';
import { IOption, IQuickTip } from '../types/common';
import { useFinance } from '../composables/useFinance';

const { categories, quickTips, saveNew } = useFinance();

const date = ref<Dayjs>(dayjs());
const mode = ref<'income'|'outcome'>('outcome');
const curCat = ref<string|null>(null);
const sum = ref<number>();
const description = ref<string>('');

const categoriesOptions = computed<IOption[]>(() => categories[mode.value]);
const pending = ref<boolean>(false);

const isBtnDisabled = computed<boolean>(() => {
    return !sum.value || sum.value <= 0 || !curCat.value || !date.value || pending.value
});

const handleSubmit = () => {
    pending.value = true;

    const backup = {
        date: date.value.format('YYYY-MM-DD'),
        sum: sum.value!.toString(),
        action: mode.value,
        description: description.value,
        category: curCat.value
    };

    saveNew(backup).then(res => {
        if (!res) {
            date.value = dayjs(backup.date);
            sum.value = Number(backup.sum);
            mode.value = backup.action;
            description.value = backup.description;
            curCat.value = backup.category;
        }
    });

    setTimeout(resetValues, 500);
};

const handleQuickClick = (quick: IQuickTip) => {
    const { description: desc, category } = quick;

    description.value = desc;
    curCat.value = category;
};

const resetValues = () => {
    pending.value = false;
    sum.value = undefined;
    description.value = '';
}
</script>

<template>
    <div class="main-form space-y-2 border p-3 rounded">
        <a-date-picker v-model:value="date" class="w-full border p-2 rounded"/>

        <div className="flex space-x-2">
          <button
              class="flex-1 p-2 rounded"
              :class="mode === 'outcome' ? 'bg-blue-500 text-white' : 'bg-gray-200'"
              @click="mode = 'outcome'"
          >Расход</button>
          <button
              class="flex-1 p-2 rounded"
              :class="mode === 'income' ? 'bg-green-500 text-white' : 'bg-gray-200'"
              @click="mode = 'income'"
          >Доход</button>
        </div>

        <a-select v-model:value="curCat" class="main-form__item main-form__select" :options="categoriesOptions" placeholder="Выберите категорию" :dropdownMatchSelectWidth="false"/>

        <input type="number" class="w-full border p-2 rounded" placeholder="Сумма" v-model="sum" :min="0"/>

        <input class="w-full border p-2 rounded" placeholder="Комментарий" v-model="description"/>

        <button class="w-full text-white p-2 rounded disabled:bg-gray-400 " :disabled="isBtnDisabled" @click="handleSubmit" :class="mode === 'income' ? 'bg-green-500' : 'bg-blue-500'">Добавить</button>

        <div class="main-form__item main-form__quick">
            <a-button v-for="quick in quickTips" class="bg-gray-200 px-2 py-1 rounded" @click="handleQuickClick(quick)">{{quick.title}}</a-button>
        </div>
    </div>    
</template>

<style scoped lang="scss">
.main-form {
    display: flex;
    flex-direction: column;

    font-size: 16px;

    &__select{
      &:deep(.ant-select-selector){
        height: 40px;
        padding: 4px 16px;
        font-size: 16px;
        font-family: Roboto, Inter, sans-serif;
      }
    }
    &__item{
        width: 100%;
        margin-bottom: 8px;
    }

    &__radio {
        width: 50%;
    }

    &__quick {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 6px;
    }

    &__quick-item {
        padding: 4px 6px !important;
        font-size: 12px;
    }

    &__textarea {
        resize: none;
    }
}
</style>