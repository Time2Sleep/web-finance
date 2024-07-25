export const normalizeParams = (params: Record<string,string>): FormData => {
    const formData = new FormData();

    for ( var key in params ) {
        formData.append(key, params[key]);
    }

    return formData;
};