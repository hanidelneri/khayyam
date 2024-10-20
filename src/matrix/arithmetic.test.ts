import { Matrix } from "./matrix";
import { add, multiply, transpose, toEchelonFrom, reduceRowsComparedToPivot, toReducedEchelonForm } from "./arithmetic";

describe("add", () => {
    let matrixA: Matrix;
    let matrixB: Matrix;

    beforeEach(() => {
        matrixA = new Matrix();
        matrixB = new Matrix();
    });

    test("should add two matrices of the same dimensions", () => {
        matrixA.addRow([1, 2, 3]);
        matrixA.addRow([4, 5, 6]);

        matrixB.addRow([7, 8, 9]);
        matrixB.addRow([10, 11, 12]);

        const result = add(matrixA, matrixB);

        expect(result.getRow(0)).toEqual([8, 10, 12]);
        expect(result.getRow(1)).toEqual([14, 16, 18]);
    });

    test("should throw an error when adding matrices of different dimensions", () => {
        matrixA.addRow([1, 2, 3]);
        matrixB.addRow([4, 5]);

        expect(() => add(matrixA, matrixB)).toThrow("Matrices must have the same dimensions");
    });

    test("should add matrices with negative and positive numbers", () => {
        matrixA.addRow([-1, -2, -3]);
        matrixA.addRow([4, 5, 6]);

        matrixB.addRow([1, 2, 3]);
        matrixB.addRow([-4, -5, -6]);

        const result = add(matrixA, matrixB);

        expect(result.getRow(0)).toEqual([0, 0, 0]);
        expect(result.getRow(1)).toEqual([0, 0, 0]);
    });
});

describe("multiply", () => {
    let matrixA: Matrix;
    let matrixB: Matrix;

    beforeEach(() => {
        matrixA = new Matrix();
        matrixB = new Matrix();
    });

    test("should throw an error when multiplying matrices with incompatible dimensions", () => {
        matrixA.addRow([1, 2]);
        matrixA.addRow([3, 4]);

        matrixB.addRow([5, 6, 7]);

        expect(() => multiply(matrixA, matrixB)).toThrow(
            "The number of columns in the first matrix must be equal to the number of rows in the second matrix"
        );
    });

    test("should multiply matrices with negative and positive numbers", () => {
        matrixA.addRow([-1, 2]);
        matrixA.addRow([3, -4]);

        matrixB.addRow([5, -6]);
        matrixB.addRow([-7, 8]);

        const result = multiply(matrixA, matrixB);

        expect(result.getRow(0)).toEqual([-19, 22]);
        expect(result.getRow(1)).toEqual([43, -50]);
    });

    test("should multiply two matrices with compatible dimensions", () => {
        matrixA.addRow([1, 2, 3]);
        matrixA.addRow([4, 5, 6]);

        matrixB.addRow([7, 8]);
        matrixB.addRow([9, 10]);
        matrixB.addRow([11, 12]);

        const result = multiply(matrixA, matrixB);

        expect(result.getRow(0)).toEqual([58, 64]);
        expect(result.getRow(1)).toEqual([139, 154]);
    });
});

describe("transpose", () => {
    let matrix: Matrix;

    beforeEach(() => {
        matrix = new Matrix();
    });

    test("should transpose a matrix with multiple rows and columns", () => {
        matrix.addRow([1, 2, 3]);
        matrix.addRow([4, 5, 6]);
        matrix.addRow([7, 8, 9]);

        const result = transpose(matrix);

        expect(result.getRow(0)).toEqual([1, 4, 7]);
        expect(result.getRow(1)).toEqual([2, 5, 8]);
        expect(result.getRow(2)).toEqual([3, 6, 9]);
    });

    test("should transpose a matrix with a single row and column", () => {
        matrix.addRow([1]);

        const result = transpose(matrix);

        expect(result.getRow(0)).toEqual([1]);
    });

    test("should transpose a matrix with different numbers of rows and columns", () => {
        matrix.addRow([1, 2]);
        matrix.addRow([3, 4]);
        matrix.addRow([5, 6]);

        const result = transpose(matrix);

        expect(result.getRow(0)).toEqual([1, 3, 5]);
        expect(result.getRow(1)).toEqual([2, 4, 6]);
    });
});

describe("echelon-form", () => {
    let matrixA: Matrix;
    let matrixB: Matrix;

    beforeEach(() => {
        matrixA = new Matrix();
        matrixB = new Matrix();
    });

    test("should reduce rows compared to pivot element", () => {
        expect(reduceRowsComparedToPivot([1, 2, 3], [4, 5, 6], 0)).toEqual([0, -3, -6]);
        expect(reduceRowsComparedToPivot([1, 2, 3], [4, 5, 6], 1)).toEqual([3, 0, -3]);
    });

    test("should reduce rows compared to pivot element with zero pivot", () => {
        expect(reduceRowsComparedToPivot([0, 2, 3], [4, 5, 6], 0)).toEqual([4, 5, 6]);
        expect(reduceRowsComparedToPivot([1, 2, 3], [0, 5, 6], 0)).toEqual([0, 5, 6]);
        expect(reduceRowsComparedToPivot([0, 0, 3], [4, 5, 6], 1)).toEqual([4, 5, 6]);
    });

    test("should convert a matrix to echelon form for square matrix", () => {
        matrixA.addRow([1, 2, 3]);
        matrixA.addRow([4, 5, 6]);
        matrixA.addRow([7, 8, 9]);

        const result = toEchelonFrom(matrixA);
        expect(result.getRow(0)).toEqual([1, 2, 3]);
        expect(result.getRow(1)).toEqual([0, -3, -6]);
        expect(result.getRow(2)).toEqual([0, 0, 0]);
    });

    test("should convert a matrix to echelon form for non-square matrix", () => {
        matrixA.addRow([1, 2, 3, 4]);
        matrixA.addRow([5, 6, 7, 8]);
        matrixA.addRow([9, 10, 11, 12]);

        const resultA = toEchelonFrom(matrixA);
        expect(resultA.getRow(0)).toEqual([1, 2, 3, 4]);
        expect(resultA.getRow(1)).toEqual([0, -4, -8, -12]);
        expect(resultA.getRow(2)).toEqual([0, 0, 0, 0]);

        matrixB.addRow([1, 2]);
        matrixB.addRow([3, 4]);
        matrixB.addRow([5, 6]);
        matrixB.addRow([7, 8]);

        const resultB = toEchelonFrom(matrixB);
        expect(resultB.getRow(0)).toEqual([1, 2]);
        expect(resultB.getRow(1)).toEqual([0, -2]);
        expect(resultB.getRow(2)).toEqual([0, 0]);
        expect(resultB.getRow(3)).toEqual([0, 0]);
    });

    test("should convert a matrix to reduced echelon form", () => {
        matrixA.addRow([1, 2, 3]);
        matrixA.addRow([4, 5, 6]);
        matrixA.addRow([7, 8, 9]);

        const result = toReducedEchelonForm(matrixA);
        expect(result.getRow(0)).toEqual([1, 0, -1]);
        expect(result.getRow(1)).toEqual([-0, 1, 2]);
        expect(result.getRow(2)).toEqual([0, 0, 0]);
    });

    test("should return the same matrix if it is already in reduced echelon form", () => {
        matrixA.addRow([1, 0, 0]);
        matrixA.addRow([0, 1, 0]);
        matrixA.addRow([0, 0, 1]);

        const result = toReducedEchelonForm(matrixA);

        expect(result.getRow(0)).toEqual([1, 0, 0]);
        expect(result.getRow(1)).toEqual([0, 1, 0]);
        expect(result.getRow(2)).toEqual([0, 0, 1]);
    });

    test("should convert a matrix with all zero rows to reduced echelon form", () => {
        matrixA.addRow([0, 0, 0]);
        matrixA.addRow([0, 0, 0]);
        matrixA.addRow([0, 0, 0]);

        const result = toReducedEchelonForm(matrixA);

        expect(result.getRow(0)).toEqual([0, 0, 0]);
        expect(result.getRow(1)).toEqual([0, 0, 0]);
        expect(result.getRow(2)).toEqual([0, 0, 0]);
    });

    test("should convert  a matrix with fractional values to reduced echelon form", () => {
        matrixA.addRow([0.5, 1.5, -2.5]);
        matrixA.addRow([1.5, -0.5, 2.5]);
        matrixA.addRow([-2.5, 2.5, 0.5]);

        const result = toReducedEchelonForm(matrixA);

        expect(result.getRow(0)).toEqual([1, 0, 0]);
        expect(result.getRow(1)).toEqual([-0, 1, -0]);
        expect(result.getRow(2)).toEqual([0, 0, 1]);
    });

    test("should convert a non-square matrix to reduced echelon form", () => {
        matrixA.addRow([1, 2, 3]);
        matrixA.addRow([4, 5, 6]);

        const result = toReducedEchelonForm(matrixA);

        expect(result.getRow(0)).toEqual([1, 0, -1]);
        expect(result.getRow(1)).toEqual([-0, 1, 2]);
    });
});
