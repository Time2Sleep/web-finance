<script setup lang="ts">
import {onMounted, ref, computed} from "vue";
import dayjs from "dayjs";
import axios from "axios";
import {message} from "ant-design-vue";

const mode = ref('rashod');
const date = ref(dayjs());
const number = ref();
const cats = ref([]);
const earnCats = ref([]);
const curCat = ref('');
const desc = ref('');
const mainData = ref<any>({})

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

const handleClick = () => {
  const bodyFormData = new FormData();
  bodyFormData.append('action', mode.value);
  bodyFormData.append('date', date.value.format('YYYY.MM.DD'));
  bodyFormData.append('cat', curCat.value);
  bodyFormData.append('sum', number.value.toString());
  bodyFormData.append('desc', desc.value);
  axiosInstance.post('', bodyFormData, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).then(() => {
    message.success('Сохранено');
    mainData.value.last.push({
      date: date.value.format('YYYY.MM.DD'),
      cat: curCat.value,
      sum: number.value.toString(),
      desc: desc.value
    });
    mode.value === 'rashod' ? mainData.value.monthRashod += number.value : mainData.value.monthDohod += number.value
    scrollToBottomOfLast();
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
        cats.value = data.cats.map((x: string) => ({value: x, label: x}));
        earnCats.value = data.cats2.map((x: string) => ({value: x, label: x}));

        mainData.value = data;

        scrollToBottomOfLast();
        
      })
      .catch(err => console.log(err));
}

onMounted(() => {
  if(location.search === import.meta.env.VITE_API_SECRET) {
    init()
  }
})

const rashody = computed(() => {
  return mainData.value.last?.sort((a: any,b: any) => dayjs(a.date).isBefore(dayjs(b.date)) ? -1 : 1 )
})

const scrollToBottomOfLast = () => {
  setTimeout(() => {
          document.querySelector('.container__scroller')!.scrollTop = document.querySelector('.container__scroller')!.scrollHeight;
        })
}

const handleQuickClick = (quick: {cat: string, desc: string}) => {
  curCat.value = quick.cat;
  desc.value = quick.desc;
}

const quicks = [
  {
    cat: 'продукты и хозтовары',
    desc: 'Лента'
  },
  {
    cat: 'Кафе, рестораны',
    desc: 'Наланч'
  },
  {
    cat: 'продукты и хозтовары',
    desc: 'Самокат'
  }
];

const otloPercent = computed(() => ((mainData.value.monthDohod - mainData.value.monthRashod)/mainData.value.monthDohod * 100).toLocaleString())
</script>

<template>
  <a-spin v-if="!visible"/>
  <div v-else class="container">

    <div class="container__scroller">
      <div v-for="{date,cat,sum,desc} in rashody" class="rashod">
        <div>{{ dayjs(date).format('DD.MM.YYYY') }}</div>
        <div class="text-start">{{ cat }}</div>
        <div>{{ sum }}р</div>
        <div class="text-end">{{ desc }}</div>
      </div>
    </div>

    <div>В этом месяце потрачено: {{ mainData.monthRashod.toLocaleString() }} руб</div>
    <div>В этом месяце заработано: {{ mainData.monthDohod.toLocaleString() }} руб</div>
    <div>Разница: {{ (mainData.monthDohod - mainData.monthRashod).toLocaleString() }} руб ({{ otloPercent }}%)</div>
    <a-date-picker v-model:value="date"/>

    <a-radio-group v-model:value="mode">
      <a-radio-button value="rashod">Расход</a-radio-button>
      <a-radio-button value="dohod">Доход</a-radio-button>
    </a-radio-group>

    <a-select v-model:value="curCat" :options="mode === 'rashod' ? cats : earnCats" placeholder="Категория" :dropdownMatchSelectWidth="false"/>

    <a-input-number id="inputNumber" placeholder="Сумма" v-model:value="number" :min="0"/>

    <a-textarea placeholder="Комментарий" v-model:value="desc"/>

    <a-button type="primary" :disabled="!number || number <= 0 || !curCat" @click="handleClick">Сохранить</a-button>

    <div class="quick">
      <a-button v-for="quick in quicks" class="quick__btn" @click="handleQuickClick(quick)">{{quick.desc}}</a-button>
    </div>
    <div class="all-sum">
      <div>За год потрачено: {{ mainData.yearRashod.toLocaleString() }} руб</div>
      <div>За год заработано: {{ mainData.yearDohod.toLocaleString() }} руб</div>
      <div>Капитал: {{ mainData.allSum.toLocaleString() }} руб</div>
    </div>

  </div>

</template>

<style lang="scss">
.container{
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  max-width: 320px;

  & > * {
    width: 100%;
    margin-bottom: 12px;
  }

  & input, & textarea, & .ant-radio-button-wrapper, & .ant-select-selector {
    font-size: 20px !important;
  }

  & div.ant-select-selector, input, button, label {
    padding: 8px 12px !important;
    height: unset !important;
  }

  & label {
    width: 50%;
  }

  &__scroller{
    overflow: auto;
    height: 200px;
  }
}

.all-sum{
  margin: auto auto 20px;
}

.rashod{
  display: grid;
  grid-template-columns: 2fr 4fr 1fr 2fr;
  font-size: 10px !important;
  border-bottom: 1px solid rgba(0,0,0,0.05)
}

.text-end{
  text-align: end;
}
.text-start{
  text-align: start;
}

.quick{
  display: flex;
  width: max-content;
  overflow: auto;

  & button.quick__btn{
    padding: 4px !important;
    margin-right: 4px;
  }
}
</style>: { date: string | number | dayjs.Dayjs | Date | null | undefined; }: { date: string | number | dayjs.Dayjs | Date | null | undefined; }
