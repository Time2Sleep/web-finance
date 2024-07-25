import axios, { AxiosResponse } from "axios";
import { normalizeParams } from "../helpers/normalizeParams";
import { IDefaultResponse, IFinanceData, IAuthResponse, INewRowParams } from "../types/common";
import { useAuth } from "../composables/useAuth";

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

export const authRequest = (password: string): Promise<AxiosResponse<IAuthResponse>> => {
    const query = normalizeParams({
        action: 'auth',
        password
    });

    return axiosInstance.post('', query, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

export const saveNewRow = (params: INewRowParams): Promise<AxiosResponse<IDefaultResponse>> => {
    const { password } = useAuth();
    const query = normalizeParams({...params, password: password.value} as unknown as Record<string,string>);

    return axiosInstance.post('', query, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

export const fetchFinanceData = (): Promise<AxiosResponse<IFinanceData|IDefaultResponse>> => {
    const { password } = useAuth();

    if(!password.value) return Promise.reject({message: 'Выполните вход!'});

    return axiosInstance.get('', {
        params: { password: password.value }
    });
};