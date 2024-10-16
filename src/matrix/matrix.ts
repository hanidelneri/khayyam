export class Matrix {
    private data: number[][];
    private rowLength: number | null;

    constructor() {
        this.data = [];
        this.rowLength = null;
    }

    addRow(row: number[]): void {
        if (this.rowLength === null) {
            this.rowLength = row.length;
        } else if (row.length !== this.rowLength) {
            throw new Error(`Row length must be ${this.rowLength}`);
        }
        this.data.push(row);
    }

    replaceRow(index: number, row: number[]): void {
        if (row.length !== this.rowLength) {
            throw new Error(`Row length must be ${this.rowLength}`);
        }
        this.data[index] = row;
    }

    getRow(index: number): number[] | undefined {
        return this.data[index];
    }

    getColumn(index: number): number[] {
        return this.data.map((row) => row[index]);
    }

    get numberOfRows(): number {
        return this.data.length;
    }

    get numberOfColumns(): number {
        return this.rowLength !== null ? this.rowLength : 0;
    }

    clone(): Matrix {
        const clone = new Matrix();
        this.data.forEach((row) => clone.addRow([...row]));
        return clone;
    }
}
