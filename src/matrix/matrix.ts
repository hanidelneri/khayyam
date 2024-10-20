export class Matrix {
    private data: number[][] = [];

    constructor(data: number[][] | null = null) {
        if (data) {
            this.validateDimensions(data);
            this.data = data;
        }
    }

    validateDimensions(data: number[][]): void {
        let rowLength: number | null = null;
        data.forEach((row) => {
            if (rowLength === null) {
                rowLength = row.length;
            } else if (row.length !== rowLength) {
                throw new Error(`Row length must be ${rowLength}`);
            }
        });
    }

    addRow(row: number[]): Matrix {
        if (this.rowLength === null) {
            this.data.push(row);
            return this;
        }
        if (row.length !== this.rowLength) {
            throw new Error(`Row length must be ${this.rowLength}`);
        }
        this.data.push(row);

        return this;
    }

    replaceRow(index: number, row: number[]): Matrix {
        if (row.length !== this.rowLength) {
            throw new Error(`Row length must be ${this.rowLength}`);
        }
        this.data[index] = row;

        return this;
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

    get rowLength(): number | null {
        return this.data.length > 0 ? this.data[0].length : null;
    }

    get rows(): number[][] {
        return this.data;
    }

    get columns(): number[][] {
        return Array.from({ length: this.numberOfColumns }, (_, index) => this.getColumn(index));
    }

    clone(): Matrix {
        const clone = new Matrix();
        this.data.forEach((row) => clone.addRow([...row]));
        return clone;
    }
}
