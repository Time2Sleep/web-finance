<script setup lang="ts">
import dayjs, { Dayjs } from 'dayjs';
import { computed, ref } from 'vue';
import { IOption, IQuickTip } from '../types/common';
import { useFinance } from '../composables/useFinance';

const { categories, quickTips, saveNew } = useFinance();

const date = ref<Dayjs>(dayjs());
const mode = ref<'income'|'outcome'>('outcome');
const curCat = ref<string>('');
const sum = ref<number>();
const description = ref<string>('');

const categoriesOptions = computed<IOption[]>(() => categories[mode.value]);

const isBtnDisabled = computed<boolean>(() => {
    return !sum.value || sum.value <= 0 || !curCat.value || !date.value
});

const handleSubmit = async () => {
    const saved = await saveNew({
        date: date.value.format('YYYY-MM-DD'),
        sum: sum.value!.toString(),
        action: mode.value,
        description: description.value,
        category: curCat.value
    });

    if(saved)
        resetValues();
};

const handleQuickClick = (quick: IQuickTip) => {
    const { description: desc, category } = quick;

    description.value = desc;
    curCat.value = category;
};

const handleModeChange = () => {
    curCat.value = categoriesOptions.value[0]?.value ?? '';
};

const resetValues = () => {
    sum.value = undefined;
    description.value = '';
}
</script>

<template>
    <div class="main-form">
        <a-date-picker v-model:value="date" class="main-form__item"/>

        <a-radio-group v-model:value="mode" class="main-form__item" @change="handleModeChange">
            <a-radio-button class="main-form__radio" value="outcome">Расход</a-radio-button>
            <a-radio-button class="main-form__radio" value="income">Доход</a-radio-button>
        </a-radio-group>

        <a-select v-model:value="curCat" class="main-form__item" :options="categoriesOptions" placeholder="Категория" :dropdownMatchSelectWidth="false"/>

        <a-input-number class="main-form__item" placeholder="Сумма" v-model:value="sum" :min="0"/>

        <a-textarea class="main-form__item main-form__textarea" placeholder="Комментарий" v-model:value="description"/>

        <a-button class="main-form__item" type="primary" :disabled="isBtnDisabled" @click="handleSubmit">Сохранить</a-button>

        <div class="main-form__item main-form__quick">
            <a-button v-for="quick in quickTips" class="main-form__quick-item" @click="handleQuickClick(quick)">{{quick.title}}</a-button>
        </div>
    </div>    
</template>

<style scoped lang="scss">
.main-form {
    display: flex;
    flex-direction: column;

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