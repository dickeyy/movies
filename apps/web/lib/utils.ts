import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function abbreviateNumber(num: number): string {
    const lookup = [
        { value: 1e9, symbol: "b" },
        { value: 1e6, symbol: "m" },
        { value: 1e3, symbol: "k" }
    ];

    const item = lookup.find((item) => Math.abs(num) >= item.value);

    if (!item) return num.toString();

    const result = (num / item.value).toFixed(1).replace(/\.?0+$/, "");
    return result + item.symbol;
}
