import { greatestCommonDivisor, leastCommendMultiple } from "./arithmetic";

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
    });
});
