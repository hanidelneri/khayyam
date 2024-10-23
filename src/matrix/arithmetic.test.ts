import { Matrix } from "./matrix";
import {
    add,
    multiply,
    transpose,
    toEchelonFrom,
    reduceRowsComparedToPivot,
    toReducedEchelonForm,
    toAugmentedMatrix,
    identityMatrix,
    inverse,
} from "./arithmetic";

describe("add", () => {
    test("should add two matrices of the same dimensions", () => {
        const result = add(
            new Matrix([
                [1, 2, 3],
                [4, 5, 6],
            ]),
            new Matrix([
                [7, 8, 9],
                [10, 11, 12],
            ])
        );

        expect(result.rows).toEqual([
            [8, 10, 12],
            [14, 16, 18],
        ]);
    });

    test("should throw an error when adding matrices of different dimensions", () => {
        expect(() => add(new Matrix([[1, 2, 3]]), new Matrix([[4, 5]]))).toThrow("Matrices must have the same dimensions");
    });

    test("should add matrices with negative and positive numbers", () => {
        const result = add(
            new Matrix([
                [-1, -2, -3],
                [4, 5, 6],
            ]),
            new Matrix([
                [1, 2, 3],
                [-4, -5, -6],
            ])
        );

        expect(result.rows).toEqual([
            [0, 0, 0],
            [0, 0, 0],
        ]);
    });
});

describe("multiply", () => {
    test("should throw an error when multiplying matrices with incompatible dimensions", () => {
        expect(() =>
            multiply(
                new Matrix([
                    [1, 2],
                    [3, 4],
                ]),
                new Matrix([[5, 6, 7]])
            )
        ).toThrow("The number of columns in the first matrix must be equal to the number of rows in the second matrix");
    });

    test("should multiply matrices with negative and positive numbers", () => {
        const result = multiply(
            new Matrix([
                [-1, 2],
                [3, -4],
            ]),
            new Matrix([
                [5, -6],
                [-7, 8],
            ])
        );

        expect(result.rows).toEqual([
            [-19, 22],
            [43, -50],
        ]);
    });

    test("should multiply two matrices with compatible dimensions", () => {
        const result = multiply(
            new Matrix([
                [1, 2, 3],
                [4, 5, 6],
            ]),
            new Matrix([
                [7, 8],
                [9, 10],
                [11, 12],
            ])
        );

        expect(result.rows).toEqual([
            [58, 64],
            [139, 154],
        ]);
    });
});

describe("transpose", () => {
    test("should transpose a matrix with multiple rows and columns", () => {
        const result = transpose(
            new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ])
        );
        expect(result.rows).toEqual([
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
        ]);
    });

    test("should transpose a matrix with a single row and column", () => {
        const result = transpose(new Matrix([[1]]));

        expect(result.rows).toEqual([[1]]);
    });

    test("should transpose a matrix with different numbers of rows and columns", () => {
        const result = transpose(
            new Matrix([
                [1, 2],
                [3, 4],
                [5, 6],
            ])
        );

        expect(result.rows).toEqual([
            [1, 3, 5],
            [2, 4, 6],
        ]);
    });
});

describe("echelon-form", () => {
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
        const result = toEchelonFrom(
            new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ])
        );
        expect(result.rows).toEqual([
            [1, 2, 3],
            [0, -3, -6],
            [0, 0, 0],
        ]);
    });

    test("should convert a matrix to echelon form for non-square matrix", () => {
        let result = toEchelonFrom(
            new Matrix([
                [1, 2, 3, 4],
                [5, 6, 7, 8],
                [9, 10, 11, 12],
            ])
        );
        expect(result.rows).toEqual([
            [1, 2, 3, 4],
            [0, -4, -8, -12],
            [0, 0, 0, 0],
        ]);

        result = toEchelonFrom(
            new Matrix([
                [1, 2],
                [3, 4],
                [5, 6],
                [7, 8],
            ])
        );

        expect(result.rows).toEqual([
            [1, 2],
            [0, -2],
            [0, 0],
            [0, 0],
        ]);
    });

    test("should convert a matrix to reduced echelon form", () => {
        const result = toReducedEchelonForm(
            new Matrix([
                [1, 2, 3],
                [4, 5, 6],
                [7, 8, 9],
            ])
        );

        expect(result.rows).toEqual([
            [1, 0, -1],
            [0, 1, 2],
            [0, 0, 0],
        ]);
    });

    test("should return the same matrix if it is already in reduced echelon form", () => {
        const result = toReducedEchelonForm(
            new Matrix([
                [1, 0, 0],
                [0, 1, 0],
                [0, 0, 1],
            ])
        );

        expect(result.rows).toEqual([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ]);
    });

    test("should convert a matrix with all zero rows to reduced echelon form", () => {
        const result = toReducedEchelonForm(
            new Matrix([
                [0, 0, 0],
                [0, 0, 0],
                [0, 0, 0],
            ])
        );

        expect(result.rows).toEqual([
            [0, 0, 0],
            [0, 0, 0],
            [0, 0, 0],
        ]);
    });

    test("should convert  a matrix with fractional values to reduced echelon form", () => {
        const result = toReducedEchelonForm(
            new Matrix([
                [0.5, 1.5, -2.5],
                [1.5, -0.5, 2.5],
                [-2.5, 2.5, 0.5],
            ])
        );

        expect(result.rows).toEqual([
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
        ]);
    });

    test("should convert a non-square matrix to reduced echelon form", () => {
        const result = toReducedEchelonForm(
            new Matrix([
                [1, 2, 3],
                [4, 5, 6],
            ])
        );

        expect(result.rows).toEqual([
            [1, 0, -1],
            [0, 1, 2],
        ]);
    });

    test("test", () => {
        const result = toEchelonFrom(
            new Matrix([
                [1, 1, -1],
                [2, 1, -2],
                [-3, 0, 1],
                [4, 2, 1],
            ])
        );
    });
});

describe("augmented matrix", () => {
    test("should augment two matrices with the same number of rows", () => {
        const matrixA = new Matrix([
            [1, 2],
            [3, 4],
        ]);
        const matrixB = new Matrix([
            [5, 6],
            [7, 8],
        ]);

        const result = toAugmentedMatrix(matrixA, matrixB);

        expect(result.rows).toEqual([
            [1, 2, 5, 6],
            [3, 4, 7, 8],
        ]);
    });

    test("should throw an error when augmenting matrices with different numbers of rows", () => {
        const matrixA = new Matrix([[1, 2]]);
        const matrixB = new Matrix([
            [3, 4],
            [5, 6],
        ]);

        expect(() => toAugmentedMatrix(matrixA, matrixB)).toThrow("Matrices must have the same number of rows");
    });
});

describe("identity matrix", () => {
    test("should create an identity matrix of size 1", () => {
        const result = identityMatrix(1);

        expect(result.rows).toEqual([[1]]);
    });

    test("should create an identity matrix of size 2", () => {
        const result = identityMatrix(2);

        expect(result.rows).toEqual([
            [1, 0],
            [0, 1],
        ]);
    });
});

describe("inverse", () => {
    test("should throw an error when calculating the inverse of a non-square matrix", () => {
        expect(() => inverse(new Matrix([[1, 2]]))).toThrow("Matrix must be square");
    });

    // test("should throw an error when calculating the inverse of a matrix with a determinant of zero", () => {
    //     expect(() => inverse(new Matrix([[1, 1], [2, 2]])).toThrow("Matrix must have a non-zero determinant");
    // });

    test("should calculate the inverse of a 2x2 matrix", () => {
        const result = inverse(
            new Matrix([
                [1, 2],
                [3, 4],
            ])
        );

        expect(result.rows).toEqual([
            [-2, 1],
            [1.5, -0.5],
        ]);
    });

    test("should calculate the inverse of a 3x3 matrix", () => {
        const result = inverse(
            new Matrix([
                [1, 2, 3],
                [0, 1, 4],
                [5, 6, 0],
            ])
        );

        expect(result.rows).toEqual([
            [-24, 18, 5],
            [20, -15, -4],
            [-5, 4, 1],
        ]);
    });
});
