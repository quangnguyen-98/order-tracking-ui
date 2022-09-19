export const formatMoney = (price: number | null): string => {
    return price!.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};