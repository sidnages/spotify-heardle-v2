import CryptoES from 'crypto-es';

export function isSameDay(date1: Date, date2: Date): boolean {
    return (date1.getFullYear() === date2.getFullYear() &&
        date1.getMonth() === date2.getMonth() &&
        date1.getDate() === date2.getDate());
}

export function generateHash(input: string): number {
    const hash = CryptoES.SHA256(input);
    const hashHexString = hash.toString(CryptoES.enc.Hex);
    return parseInt(hashHexString, 16);
}