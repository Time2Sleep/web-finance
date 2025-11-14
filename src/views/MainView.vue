<script setup lang="ts">
import { onBeforeMount } from 'vue';
import { useFinance } from '../composables/useFinance';
import LastPurchases from '../components/LastPurchases.vue';
import MainForm from '../components/MainForm.vue';
import FinanceStatistics from '../components/FinanceStatistics.vue';

const { getDataFromGoogleSheets, isDataLoading } = useFinance();

onBeforeMount(() => {
    getDataFromGoogleSheets();
});
</script>

<template>

    <a-spin :spinning="isDataLoading">
        <LastPurchases class="mb"/>
    </a-spin>

        <MainForm class="mb-4"/>
        
        <FinanceStatistics/>

        <a-typography-link class="mt-auto" href="https://docs.google.com/spreadsheets/d/1UHOsQObjhDRyhDaJbWmlOdfFD2akzu1EOd8Xrht871A">Основная таблица</a-typography-link>
  </template>

<style lang="scss" scoped>
.mb {
    margin-bottom: 8px;
}
</style>