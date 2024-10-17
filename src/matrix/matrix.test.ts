import { Matrix } from "./matrix";

describe("Matrix", () => {
    let matrix: Matrix;

    beforeEach(() => {
        matrix = new Matrix();
    });

    test("should add rows with the correct length", () => {
        matrix.addRow([1, 2, 3]);
        matrix.addRow([4, 5, 6]);
        expect(matrix.numberOfRows).toBe(2);
        expect(matrix.numberOfColumns).toBe(3);
    });

    test("should throw an error when adding rows with incorrect length", () => {
        matrix.addRow([1, 2, 3]);
        expect(() => matrix.addRow([4, 5])).toThrow("Row length must be 3");
    });

    test("should get rows by index", () => {
        matrix.addRow([1, 2, 3]);
        matrix.addRow([4, 5, 6]);
        expect(matrix.getRow(0)).toEqual([1, 2, 3]);
        expect(matrix.getRow(1)).toEqual([4, 5, 6]);
    });

    test("should return the correct number of rows", () => {
        matrix.addRow([1, 2, 3]);
        matrix.addRow([4, 5, 6]);
        expect(matrix.numberOfRows).toBe(2);
    });

    test("should return the correct number of columns", () => {
        matrix.addRow([1, 2, 3]);
        expect(matrix.numberOfColumns).toBe(3);
    });

    test("should return the correct column from a matrix with multiple rows", () => {
        matrix.addRow([1, 2, 3]);
        matrix.addRow([4, 5, 6]);
        matrix.addRow([7, 8, 9]);

        expect(matrix.getColumn(0)).toEqual([1, 4, 7]);
        expect(matrix.getColumn(1)).toEqual([2, 5, 8]);
        expect(matrix.getColumn(2)).toEqual([3, 6, 9]);
    });

    test("should return the correct column from a matrix with a single row", () => {
        matrix.addRow([1, 2, 3]);

        expect(matrix.getColumn(0)).toEqual([1]);
        expect(matrix.getColumn(1)).toEqual([2]);
        expect(matrix.getColumn(2)).toEqual([3]);
    });
});