import { expect } from "chai";

import { Library } from "../src/services/Library";
import { Book } from "../src/models/Book";

describe("Library", (): void => {
    let library: Library<Book>;

    beforeEach((): void => {
        library = new Library<Book>();
    });

    it("should add a book", (): void => {
        const book: Book = new Book("1", "The Hobbit", "J.R.R. Tolkien", 1937);

        library.add(book);

        expect(library.count).to.equal(1);
        expect(library.find("1")).to.equal(book);
    });

    it("should find a book by id", (): void => {
        const book: Book = new Book("1", "The Hobbit", "J.R.R. Tolkien", 1937);

        library.add(book);

        const foundBook: Book | undefined = library.find("1");

        expect(foundBook).to.equal(book);
    });

    it("should return undefined for missing book", (): void => {
        const foundBook: Book | undefined = library.find("999");

        expect(foundBook).to.be.undefined;
    });

    it("should remove a book", (): void => {
        const book: Book = new Book("1", "The Hobbit", "J.R.R. Tolkien", 1937);

        library.add(book);

        const removed: boolean = library.remove("1");

        expect(removed).to.equal(true);
        expect(library.count).to.equal(0);
        expect(library.find("1")).to.be.undefined;
    });

    it("should return false when removing missing book", (): void => {
        const removed: boolean = library.remove("999");

        expect(removed).to.equal(false);
    });

    it("should return all books", (): void => {
        const book1: Book = new Book("1", "The Hobbit", "J.R.R. Tolkien", 1937);

        const book2: Book = new Book("2", "1984", "George Orwell", 1949);

        library.add(book1);
        library.add(book2);

        const books: Book[] = library.getAll();

        expect(books).to.have.lengthOf(2);
        expect(books[0]).to.equal(book1);
        expect(books[1]).to.equal(book2);
    });

    it("should clear all books", (): void => {
        const book: Book = new Book("1", "The Hobbit", "J.R.R. Tolkien", 1937);

        library.add(book);

        library.clear();

        expect(library.count).to.equal(0);
    });
});
