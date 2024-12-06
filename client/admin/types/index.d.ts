export interface ICourse {
    id: string;
    title: string;
    description: string;
    image: string;
    isPublished: boolean;
    number_access: number;
    number_lesson: number;
    level: number;
    createAt: string;
    updateAt: string;
}


export interface StatisticalData2 {
    total: number,
    rate: number,
}

export interface StatisticalData {
    day: string;
    num: number;
}

export interface ChartData {
    data: StatisticalData[];
    title: string;
    lable: string;
    lineColor: string;
    backgroundColor: string;
}

export interface CardData {
    total: number;
    rate: number;
    title: string;
    icon: JSX.Element;
}

export interface Account {
    acc_id: string;
    username: string;
    password: string;
    tick: boolean;
    role: string;
    isBan: boolean;
    createdAt: string;
    lastOnline: string;
}

export interface ResponseAccountData {
    data: Account[];
    total_records: number;
    page: number;
    limit: number;
}