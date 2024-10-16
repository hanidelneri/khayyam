import { Matrix } from "./matrix";
import { add } from "./arithmetic";

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
