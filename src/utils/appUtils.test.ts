import { formatDateTime, formatMoney } from './appUtils';

describe('formatDateTime()', () => {
    it('Should be convert ISO String date to String date', () => {
        expect(formatDateTime('2022-09-22T18:59:28.689Z')).toBe('09/23/2022 01:59 AM');
        expect(formatDateTime('2022-09-21T18:59:28.689Z')).toBe('09/22/2022 01:59 AM');
    });
});

describe('formatMoney()', () => {
    it('Should be convert number to text format', () => {
        expect(formatMoney(25000)).toBe('25.000');
        expect(formatMoney(17000)).toBe('17.000');
        expect(formatMoney(0)).toBe('0');
    });
    it('Should be return empty string when receice null or undefined', () => {
        expect(formatMoney(null)).toBe('');
        expect(formatMoney(undefined)).toBe('');
    });
});