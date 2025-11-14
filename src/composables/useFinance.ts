import { reactive, ref } from "vue";
import { IOption, IQuickTip, IRowData, INewRowParams, IFinanceStats, IFinanceData } from "../types/common";
import { fetchFinanceData, saveNewRow } from "../service/httpService";
import { message } from "ant-design-vue";
import dayjs from "dayjs";

const categories = reactive<{income: IOption[], outcome: IOption[]}>({
    income: [],
    outcome: []
});
const lastPurchases = ref<IRowData[]>([]);
const quickTips = ref<IQuickTip[]>([]);
const finances = ref<IFinanceStats[]>([]);
const isDataLoading = ref<boolean>(false);
const isNewAdding = ref<boolean>(false);

export const useFinance = () => {

    const getDataFromGoogleSheets = async () => {
        isDataLoading.value = true;

        const stored = localStorage.getItem('data');
        if(stored){
            setData(JSON.parse(stored));
        } 
            

        try {
            const { data } = await fetchFinanceData();
            isDataLoading.value = true;
            
            if ('message' in data) {
               message.error(data.message);
               return;
            }
            
            setData(data);            
        } catch (e) {
            console.log(e);
        }

        isDataLoading.value = false;
    }

    const saveNew = async (params: INewRowParams) => {
        isNewAdding.value = true;
        try {
            const newRow = {
                ...params,
                type: params.action,
                sum: +params.sum,
                loading: true
            };

            lastPurchases.value.push(newRow);

            const { data } = await saveNewRow(params);

            lastPurchases.value[lastPurchases.value.length - 1].loading = false;

            message.success(data.message);

            saveValuesToLocalStorage();

            return true;
        } catch(e) {
            console.log(e);

            return false;
        } finally {
            isNewAdding.value = false;
        }
        
    };

    const setData = (data: IFinanceData) => {
        const {
            outcomeCategories,
            incomeCategories,
            lastPurchases: last,
            quickTips: tips,
            lastIncomes: incomes,
            stats
        } = data;

        categories.income = incomeCategories.map(cat => ({label: cat, value: cat}));
        categories.outcome = outcomeCategories.map(cat => ({label: cat, value: cat}));
        lastPurchases.value = [
            ...last.map(dat => ({ ...dat, type: 'outcome' })),
            ...incomes.map(dat => ({ ...dat, type: 'income'}))
        ].sort((a,b) => dayjs(a.date).isBefore(b.date) ? -1 : 1);
        quickTips.value = tips;
        finances.value = stats;

        saveValuesToLocalStorage();
    }

    const saveValuesToLocalStorage = () => {
        localStorage.setItem('data', JSON.stringify({
            outcomeCategories: categories.income,
            incomeCategories: categories.outcome,
            lastPurchases: lastPurchases.value,
            quickTips: quickTips.value,
            lastIncomes: [],
            stats: finances.value
        }));
    }

    return {
        getDataFromGoogleSheets,
        saveNew,

        categories,
        lastPurchases,
        quickTips,
        finances,
        isDataLoading,
        isNewAdding
    }
}