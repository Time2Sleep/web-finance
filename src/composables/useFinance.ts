import { reactive, ref } from "vue";
import { Finances, IOption, IQuickTip, IRowData, INewRowParams } from "../types/common";
import { fetchFinanceData, saveNewRow } from "../service/httpService";
import { message } from "ant-design-vue";

const categories = reactive<{income: IOption[], outcome: IOption[]}>({
    income: [],
    outcome: []
});
const lastPurchases = ref<IRowData[]>([]);
const quickTips = ref<IQuickTip[]>([]);
const finances = ref<Finances>({
    total: 0,
    year: { income: 0, outcome: 0 },
    month: { income: 0, outcome: 0 }
});
const isDataLoading = ref<boolean>(false);

export const useFinance = () => {

    const getDataFromGoogleSheets = async () => {
        isDataLoading.value = true;

        try {
            const { data } = await fetchFinanceData();
            
            if ('message' in data) {
               message.error(data.message);
               return;
            }
            
            const {
                outcomeCategories,
                incomeCategories,
                lastPurchases: last,
                quickTips: tips,
                ...rest
            } = data;

            categories.income = incomeCategories.map(cat => ({label: cat, value: cat}));
            categories.outcome = outcomeCategories.map(cat => ({label: cat, value: cat}));
            lastPurchases.value = last;
            quickTips.value = tips;
            finances.value = rest;
        } catch (e) {
            console.log(e);
        }

        isDataLoading.value = false;
    }

    const saveNew = async (params: INewRowParams) => {
        isDataLoading.value = true;

        try {
            const { data } = await saveNewRow(params);

            message.success(data.message);

            getDataFromGoogleSheets();

            return true;
        } catch(e) {
            console.log(e);

            return false;
        }
    };

    return {
        getDataFromGoogleSheets,
        saveNew,

        categories,
        lastPurchases,
        quickTips,
        finances,
        isDataLoading
    }
}