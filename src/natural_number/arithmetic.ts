export function leastCommendMultiple(a: number, b: number): number {
    return (a * b) / greatestCommonDivisor(a, b);
}

export function greatestCommonDivisor(a: number, b: number): number {
    if (b === 0) {
        return a;
    }

    return greatestCommonDivisor(b, a % b);
}

export function normalizeZero(value: number): number {
    return value === 0 ? 0 : value;
}