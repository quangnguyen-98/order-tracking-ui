export const formatMoney = (price: number | null | undefined): string => {
    return price!.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1.");
};