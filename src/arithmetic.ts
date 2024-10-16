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
