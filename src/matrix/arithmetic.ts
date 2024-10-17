import { Matrix } from "./matrix";

export function add(a: Matrix, b: Matrix): Matrix {
    if (a.numberOfRows !== b.numberOfRows || a.numberOfColumns !== b.numberOfColumns) {
        throw new Error("Matrices must have the same dimensions");
    }
    const result = new Matrix();
    for (let i = 0; i < a.numberOfRows; i++) {
        const row: number[] = [];
        for (let j = 0; j < a.numberOfColumns; j++) {
            const aValue = a.getRow(i)?.[j];
            const bValue = b.getRow(i)?.[j];
            if (typeof aValue === "number" && typeof bValue === "number") {
                row.push(aValue + bValue);
            }
        }
        result.addRow(row);
    }

    return result;
}

export function multiply(a: Matrix, b: Matrix): Matrix {
    if (a.numberOfColumns !== b.numberOfRows) {
        throw new Error("The number of columns in the first matrix must be equal to the number of rows in the second matrix");
    }

    const result = new Matrix();

    for (let i = 0; i < a.numberOfRows; i++) {
        const row: number[] = [];
        for (let j = 0; j < b.numberOfColumns; j++) {
            let sum = 0;
            for (let k = 0; k < b.numberOfRows; k++) {
                const aValue = a.getRow(i)?.[k];
                const bValue = b.getRow(k)?.[j];
                if (typeof aValue === "number" && typeof bValue === "number") {
                    sum += aValue * bValue;
                }
            }
            row.push(sum);
        }
        result.addRow(row);
    }

    return result;
}

export function transpose(a: Matrix): Matrix {
    const result = new Matrix();

    for (let i = 0; i < a.numberOfColumns; i++) {
        result.addRow(a.getColumn(i));
    }

    return result;
}

export function toEchelonFrom(a: Matrix): Matrix {
    const result = new Matrix();

    return result;
}