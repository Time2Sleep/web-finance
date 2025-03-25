

export interface IDefaultResponse {
    message: string;
}

export interface IAuthResponse extends IDefaultResponse {
    auth: boolean
}

export interface IRowData {
    date: string,
    category: string,
    sum: number,
    description: string
}

export interface IQuickTip {
    title: string,
    category: string,
    description: string
}

export interface IFinanceStats{
    label: string,
    value: string,
    full?: IFinanceStats[]
}

export interface IFinanceData {
    outcomeCategories: string[],
    incomeCategories: string[],
    lastPurchases: IRowData[],
    quickTips: IQuickTip[],
    stats: IFinanceStats[]
}

export type Finances = Omit<IFinanceData, 'outcomeCategories'|'incomeCategories'|'lastPurchases'|'quickTips'>

export interface IOption {
    label: string,
    value: string
}

export interface INewRowParams extends Omit<IRowData, 'sum'> {
    sum: string,
    action: 'income'|'outcome'
}