import moment from 'moment';
import { DateTimeFormat } from '../constants/appConstant';

export const formatMoney = (price: number | null | undefined): string => {
    return (price ?? '').toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};

export const formatDateTime = (stringDate: string | null | undefined): string => {
    return moment(stringDate).format(DateTimeFormat.MMDDYYYYhhmmA);
};

// Get the past time by the number of minutes from the present time
export const getPastISODateByMinutes = (minutes: number) => {
    return new Date(new Date().getTime() - (1000 * 60 * minutes)).toISOString();
}