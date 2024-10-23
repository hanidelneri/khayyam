import { greatestCommonDivisor, leastCommendMultiple, normalizeZero } from "./arithmetic";

describe("NaturalNumber", () => {
    test("should calculate the greatest common divisor of two numbers", () => {
        expect(greatestCommonDivisor(10, 5)).toBe(5);
        expect(greatestCommonDivisor(5, 10)).toBe(5);
        expect(greatestCommonDivisor(10, 0)).toBe(10);
        expect(greatestCommonDivisor(2, 3)).toBe(1);
    });

    test("should calculate the least common multiple of two numbers", () => {
        expect(leastCommendMultiple(10, 5)).toBe(10);
        expect(leastCommendMultiple(5, 10)).toBe(10);
        expect(leastCommendMultiple(10, 0)).toBe(0);
        expect(leastCommendMultiple(2, 3)).toBe(6);
        expect(leastCommendMultiple(4, 6)).toBe(12);
        expect(leastCommendMultiple(-3, -6)).toBe(-6);
    });
});

describe("normalizeZero", () => {
    test("should normalize positive zero to zero", () => {
        expect(normalizeZero(0)).toBe(0);
    });

    test("should normalize negative zero to zero", () => {
        expect(normalizeZero(-0)).toBe(0);
    });

    test("should return positive numbers unchanged", () => {
        expect(normalizeZero(5)).toBe(5);
    });

    test("should return negative numbers unchanged", () => {
        expect(normalizeZero(-5)).toBe(-5);
    });

    test("should return non-zero fractional numbers unchanged", () => {
        expect(normalizeZero(0.5)).toBe(0.5);
        expect(normalizeZero(-0.5)).toBe(-0.5);
    });
});
