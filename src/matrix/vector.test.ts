import { areLinearlyIndependent, buildMatrix, areAllColumnsPivotColumn } from "./vector";
import { Matrix } from "./matrix";

describe("areLinearlyIndependent", () => {
    test("should return true for a set of linearly independent vectors", () => {
        const vectors = [
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ];

        const result = areLinearlyIndependent(...vectors);
        expect(result).toBe(true);
    });

    test("should return false for a set of linearly dependent vectors", () => {
        const vectors = [
            [1, 2, 3],
            [2, 4, 6],
            [3, 6, 9],
        ];

        const result = areLinearlyIndependent(...vectors);
        expect(result).toBe(false);
    });

    test("should return false for a single vector", () => {
        const vectors = [[1, 2, 3]];

        const result = areLinearlyIndependent(...vectors);
        expect(result).toBe(false);
    });

    test("should return true for an empty set of vectors", () => {
        const vectors: number[][] = [];

        const result = areLinearlyIndependent(...vectors);
        expect(result).toBe(true);
    });

    test("should throw an error for vectors with different dimensions", () => {
        const vectors = [
            [1, 2],
            [3, 4, 5],
        ];

        expect(() => areLinearlyIndependent(...vectors)).toThrow("Vectors must have the same length");
    });
});

describe("build matrix", () => {
    test("should build a matrix from vectors", () => {
        expect(buildMatrix([1, 2, 3], [4, 5, 6]).rows).toEqual([
            [1, 4],
            [2, 5],
            [3, 6],
        ]);
    });
});

describe("areAllColumnsPivotColumn", () => {
    test("should return true for a matrix where all columns are pivot columns", () => {
        const matrix = new Matrix([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ]);

        const result = areAllColumnsPivotColumn(matrix);
        expect(result).toBe(true);
    });

    test("should return false for a matrix where no columns are pivot columns", () => {
        const matrix = new Matrix([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);

        const result = areAllColumnsPivotColumn(matrix);
        expect(result).toBe(false);
    });

    test("should return false for a matrix where some columns are pivot columns", () => {
        const matrix = new Matrix([
            [1, 0, 0],
            [0, 0, 1],
            [0, 1, 0],
        ]);

        const result = areAllColumnsPivotColumn(matrix);
        expect(result).toBe(false);
    });

    test("should return true for an empty matrix", () => {
        const matrix = new Matrix([]);

        const result = areAllColumnsPivotColumn(matrix);
        expect(result).toBe(true);
    });

    test("should return true for a matrix with a single row", () => {
        const matrix = new Matrix([[1, 0, 0]]);

        const result = areAllColumnsPivotColumn(matrix);
        expect(result).toBe(true);
    });
});
