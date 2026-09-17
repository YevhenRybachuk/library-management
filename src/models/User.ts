import { IUser } from "./interfaces/IUser";

export class User implements IUser {
    private _id: string;
    private _name: string;
    private _borrowedBookIds: string[];

    constructor(id: string, name: string) {
        this._id = id;
        this._name = name;
        this._borrowedBookIds = [];
    }

    get id(): string {
        return this._id;
    }

    set id(value: string) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get borrowedBookIds(): string[] {
        return [...this._borrowedBookIds];
    }

    borrowBook(bookId: string): void {
        if (!this._borrowedBookIds.includes(bookId)) {
            this._borrowedBookIds.push(bookId);
        }
    }

    returnBook(bookId: string): void {
        this._borrowedBookIds = this._borrowedBookIds.filter(
            (id: string) => id !== bookId
        );
    }

    toJSON(): IUser {
        return {
            id: this.id,
            name: this.name,
            borrowedBookIds: this.borrowedBookIds,
        };
    }
}
