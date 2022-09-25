import moment from 'moment';
import { DateTimeFormat } from '../constants/appConstant';

// Format number number to String
export const formatMoney = (price: number | null | undefined): string => {
    return (price ?? '').toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

//Formart ISO date to String date
export const formatDateTime = (stringDate: string | null | undefined): string => {
    return moment(stringDate).format(DateTimeFormat.MMDDYYYYhhmmA);
};

// Get the past time by the number of minutes from the present time
export const getPastISODateByMinutes = (minutes: number) => {
    return new Date(new Date().getTime() - (1000 * 60 * minutes)).toISOString();
};

// Convert currency by currency type
export const convertCurrency = (value: number, currency: string): string => {
    switch (currency) {
        case 'USD':
            return (value / 23313.99).toFixed(2).toString();
        default:
            return value.toString();
    }
};