export interface IBook {
    id: string;
    title: string;
    author: string;
    publicationYear: number;
    isBorrowed: boolean;
    borrowedBy: string | null;
}