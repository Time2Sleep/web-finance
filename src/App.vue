<script setup lang="ts">
import {onMounted, ref} from "vue";
import dayjs from "dayjs";
import axios from "axios";
import {message} from "ant-design-vue";

const mode = ref('rashod');
const date = ref(dayjs());
const number = ref();
const cats = ref([]);
const earnCats = ref([]);
const curCat = ref(null);
const desc = ref('');

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const handleClick = () => {
  const bodyFormData = new FormData();
  bodyFormData.append('action', mode.value);
  bodyFormData.append('date', date.value.format('YYYY.MM.DD'));
  bodyFormData.append('cat', curCat.value.toString());
  bodyFormData.append('sum', number.value.toString());
  bodyFormData.append('desc', desc.value);
  axiosInstance.post('', bodyFormData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(() => {
    message.success('Сохранено');
    reset();
  })
};

const reset = () => {
  number.value = null;
  desc.value = '';
}

const visible = ref(false);

const init = () => {
  visible.value = true;

  axiosInstance.get('')
      .then(({data}) => {
        console.log(data)
        cats.value = data.cats.map((x: string) => ({value: x, label: x}));
        earnCats.value = data.cats2.map((x: string) => ({value: x, label: x}));
      })
      .catch(err => console.log(err));
}

onMounted(() => {
  if(location.search === import.meta.env.VITE_API_SECRET) {
    init()
  }

})
</script>

<template>
  <a-spin v-if="!visible"/>
  <div v-else class="container">
    <a-date-picker v-model:value="date"/>

    <a-radio-group v-model:value="mode">
      <a-radio-button value="rashod">Расход</a-radio-button>
      <a-radio-button value="dohod">Доход</a-radio-button>
    </a-radio-group>

    <a-select v-model:value="curCat" :options="mode === 'rashod' ? cats : earnCats" placeholder="Категория" :dropdownMatchSelectWidth="false"/>

    <a-input-number id="inputNumber" placeholder="Сумма" v-model:value="number" :min="1"/>

    <a-textarea placeholder="Комментарий" v-model:value="desc"/>

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
