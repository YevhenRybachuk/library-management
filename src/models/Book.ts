import { IBook } from "./interfaces/IBook";

export class Book implements IBook {
    private _id: string;
    private _title: string;
    private _author: string;
    private _publicationYear: number;
    private _isBorrowed: boolean;
    private _borrowedBy: string | null;

    constructor(
        id: string,
        title: string,
        author: string,
        publicationYear: number
    ) {
        this._id = id;
        this._title = title;
        this._author = author;
        this._publicationYear = publicationYear;
        this._isBorrowed = false;
        this._borrowedBy = null;
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get title(): string {
        return this._title;
    }

    set title(value: string) {
        this._title = value;
    }

    get author(): string {
        return this._author;
    }

    set author(value: string) {
        this._author = value;
    }

    get publicationYear(): number {
        return this._publicationYear;
    }

    set publicationYear(value: number) {
        this._publicationYear = value;
    }

    get isBorrowed(): boolean {
        return this._isBorrowed;
    }

    get borrowedBy(): string | null {
        return this._borrowedBy;
    }

    borrow(userId: string): void {
        this._isBorrowed = true;
        this._borrowedBy = userId;
    }

    returnBook(): void {
        this._isBorrowed = false;
        this._borrowedBy = null;
    }

    toJSON(): IBook {
        return {
            id: this.id,
            title: this.title,
            author: this.author,
            publicationYear: this.publicationYear,
            isBorrowed: this.isBorrowed,
            borrowedBy: this.borrowedBy,
        };
    }
}
