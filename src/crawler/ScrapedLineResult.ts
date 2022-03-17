export class ScrapedLineResult {
    lineNumber: number;
    lineValue: string;

    constructor(lineNumber: number, lineValue: string) {
        this.lineNumber = lineNumber;
        this.lineValue = lineValue;
    }
}