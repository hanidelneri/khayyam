import { Matrix } from "./matrix";
import { toEchelonForm } from "./arithmetic";

export function areLinearlyIndependent(...vectors: number[][]): boolean {
    const length = vectors[0]?.length;
    if (!length) {
        return true;
    }
    vectors.forEach((vector) => {
        if (vector.length !== length) {
            throw new Error("Vectors must have the same length");
        }
    });
    const echelonForm = toEchelonForm(buildMatrix(...vectors));
    console.log(echelonForm);
    return areAllColumnsPivotColumn(echelonForm);
}

export function buildMatrix(...vectors: number[][]): Matrix {
    const result = new Matrix();
    for (let i = 0; i < vectors[0].length; i++) {
        const row: number[] = [];
        for (let j = 0; j < vectors.length; j++) {
            row.push(vectors[j][i]);
        }
        result.addRow(row);
    }
    return result;
}

export function areAllColumnsPivotColumn(a: Matrix): boolean {
    return a.rows.every((row, index) => {
        const pivotColumnIndex = row.findIndex((value) => value !== 0);
        return pivotColumnIndex === index;
    });
}
