<script setup lang="ts">
import {ref} from "vue";
import dayjs from "dayjs";
import axios from "axios";

const mode = ref('rashod');
const date = ref(dayjs());
const number = ref(0);
const cats = ref([]);
const earnCats = ref([]);
const curCat = ref(null);
const desc = ref('');

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

console.log('env', import.meta.env);

axiosInstance.get('')
  .then(({data}) => {
    console.log(data)
    cats.value = data.cats.map(x => ({value: x, label: x}));
    earnCats.value = data.cats2.map(x => ({value: x, label: x}));
  })
  .catch(err => console.log(err));

const handleClick = () => {
  axiosInstance.post('', {
    action: mode.value,
    date: date.value,
    cat: curCat.value,
    sum: number.value,
    desc: desc.value
  })
};
</script>

<template>
  <div class="container">
    {{curCat}}
    <a-date-picker v-model:value="date"/>

    <a-radio-group v-model:value="mode">
      <a-radio-button value="rashod">Расход</a-radio-button>
      <a-radio-button value="dohod">Доход</a-radio-button>
    </a-radio-group>

    <a-select v-model:value="curCat" :options="mode === 'rashod' ? cats : earnCats" placeholder="Категория" :dropdownMatchSelectWidth="false"/>

    <a-input-number id="inputNumber" placeholder="Сумма" v-model:value="number" :min="1"/>

    <a-textarea placeholder="Комментарий" v-model="desc"/>

    <a-button type="primary" :disabled="number <= 0 || !curCat" @click="handleClick">Сохранить</a-button>
  </div>

</template>

<style lang="scss">
.container{
  display: flex;
  flex-direction: column;
  width: 320px;

  & > * {
    width: 320px;
    margin-bottom: 12px;
  }

  & * {
    font-size: 20px !important;
  }

  & div.ant-select-selector, input, button, label {
    padding: 8px 12px !important;
    height: unset !important;
  }

  & label {
    width: 50%;
  }
}
</style>
