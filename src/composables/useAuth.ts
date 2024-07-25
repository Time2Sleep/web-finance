import { onMounted, ref } from "vue";
import { authRequest } from "../service/httpService";
import { message } from "ant-design-vue";

const password = ref<string>(localStorage.getItem('password') || '');
const isAuthenticated = ref<boolean>(false);
const isLoading = ref<boolean>(false);

export const useAuth = () => {

    const auth = async () => {
        if(!password.value) return;

        isLoading.value = true;

        try {
            const { data } = await authRequest(password.value);


            isAuthenticated.value = data.auth;
            isAuthenticated.value ? onSuccess(data.message) : onError(data.message);
        } catch (e) {
            console.log(e);
        }

        isLoading.value = false;
    }

    const onError = (text: string) => {
        message.error(text);
        password.value = '';
    };

    const onSuccess = (text: string) => {
        message.success(text);
        localStorage.setItem('password', password.value);
    };

    return {
        password,
        isAuthenticated,
        isLoading,
        auth
    }
};