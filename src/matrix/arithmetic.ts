import { leastCommendMultiple } from "../natural_number/arithmetic";
import { Matrix } from "./matrix";

export function add(a: Matrix, b: Matrix): Matrix {
    if (a.numberOfRows !== b.numberOfRows || a.numberOfColumns !== b.numberOfColumns) {
        throw new Error("Matrices must have the same dimensions");
    }
    const result = new Matrix();
    a.rows.forEach((row, index) => {
        const newRow: number[] = [];
        row.forEach((value, columnIndex) => {
            newRow.push(value + (b.getRow(index)?.[columnIndex] ?? 0));
        });
        result.addRow(newRow);
    });

    return result;
}

export function multiply(a: Matrix, b: Matrix): Matrix {
    if (a.numberOfColumns !== b.numberOfRows) {
        throw new Error("The number of columns in the first matrix must be equal to the number of rows in the second matrix");
    }

    const result = new Matrix();

    a.rows.forEach((row, index) => {
        const newRow: number[] = [];
        b.columns.forEach((column) => {
            newRow.push(reduceRowsByMultiplication(row, column));
        });
        result.addRow(newRow);
    });

    return result;
}

function reduceRowsByMultiplication(a: number[], b: number[]): number {
    return a.reduce((sum, value, index) => sum + value * b[index], 0);
}

export function transpose(a: Matrix): Matrix {
    const result = new Matrix();
    
    a.columns.forEach((column) => {
        result.addRow(column);
    });

    return result;
}

export function toEchelonFrom(a: Matrix): Matrix {
    const result = a.clone();

    for (let i = 0; i < Math.min(a.numberOfColumns, a.numberOfRows); i++) {
        const pivot = result.getRow(i)?.[i];
        if (pivot === undefined) {
            throw new Error(`Pivot element at row ${i} is undefined`);
        }
        for (let j = i + 1; j < a.numberOfRows; j++) {
            const element = result.getRow(j)?.[i];
            if (element === undefined) {
                throw new Error(`Element at row ${j}, column ${i} is undefined`);
            }
            const rowI = result.getRow(i);
            const rowJ = result.getRow(j);
            if (rowI && rowJ) {
                result.replaceRow(j, reduceRowsComparedToPivot(rowI, rowJ, i));
            }
        }
    }

    return result;
}

export function toReducedEchelonForm(a: Matrix, index?: number): Matrix {
    if (index === undefined) {
        index = a.numberOfColumns - 1;
    }
    const result = a.clone();

    for (let i = 0; i < a.numberOfRows; i++) {
        const pivot = a.getRow(i)?.[i];
        if (pivot === undefined) {
            throw new Error(`Pivot element at row ${i} is undefined`);
        }
        for (let j = 0; j < a.numberOfRows; j++) {
            if (i !== j) {
                const rowI = result.getRow(i);
                const rowJ = result.getRow(j);
                if (rowI && rowJ) {
                    result.replaceRow(j, reduceRowsComparedToPivot(rowI, rowJ, i));
                }
            }
        }
    }

    for (let i = 0; i < a.numberOfRows; i++) {
        const row = result.getRow(i);
        if (row) {
            const pivot = row[i];
            if (pivot) {
                result.replaceRow(
                    i,
                    row.map((value) => value / pivot)
                );
            }
        }
    }

    return result;
}

export function reduceRowsComparedToPivot(pivotRow: number[], targetRow: number[], pivotIndex: number): number[] {
    if (pivotRow[pivotIndex] === 0 || targetRow[pivotIndex] === 0) {
        return targetRow;
    }
    const lcm = leastCommendMultiple(pivotRow[pivotIndex], targetRow[pivotIndex]);

    return targetRow.map(
        (value, index) => (value * lcm) / targetRow[pivotIndex] - (pivotRow[index] * lcm) / pivotRow[pivotIndex]
    );
}

export function toAugmentedMatrix(a: Matrix, b: Matrix): Matrix {
    if (a.numberOfRows !== b.numberOfRows) {
        throw new Error("Matrices must have the same number of rows");
    }
    const result = new Matrix();
    a.rows.forEach((row, index) => {
        const newRow = row.concat(b.getRow(index) ?? []);
        result.addRow(newRow);
    });

    return result;
}

export function identityMatrix(size: number): Matrix {
    const result = new Matrix();
    for (let i = 0; i < size; i++) {
        const row: number[] = [];
        for (let j = 0; j < size; j++) {
            row.push(i === j ? 1 : 0);
        }
        result.addRow(row);
    }

    return result;
}

export function inverse(a: Matrix): Matrix {
    if (a.numberOfRows !== a.numberOfColumns) {
        throw new Error("Matrix must be square");
    }
    const augmentedMatrix = toAugmentedMatrix(a, identityMatrix(a.numberOfRows));
    const echelonForm = toReducedEchelonForm(augmentedMatrix, a.numberOfColumns);

    return new Matrix(echelonForm.rows.map((row) => row.slice(a.numberOfRows)));
}
