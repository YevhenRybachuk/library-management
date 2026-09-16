import { Book } from "../../models/Book";

export function createBookList(books: Book[]): HTMLElement {
    const container: HTMLDivElement = document.createElement("div");

    container.className = "container mt-4";

    const title: HTMLHeadingElement = document.createElement("h2");

    title.textContent = "Books";

    container.appendChild(title);

    const list: HTMLDivElement = document.createElement("div");

    list.className = "row";

    books.forEach((book: Book) => {
        const column: HTMLDivElement = document.createElement("div");

        column.className = "col-md-4 mb-3";

        const card: HTMLDivElement = document.createElement("div");

        card.className = "card h-100";

        const cardBody: HTMLDivElement = document.createElement("div");

        cardBody.className = "card-body";

        const bookTitle: HTMLHeadingElement = document.createElement("h5");

        bookTitle.className = "card-title";
        bookTitle.textContent = book.title;

        const author: HTMLParagraphElement = document.createElement("p");

        author.className = "card-text";
        author.textContent = `Author: ${book.author}`;

        const year: HTMLParagraphElement = document.createElement("p");

        year.className = "card-text";
        year.textContent = `Publication year: ${book.publicationYear}`;

        const status: HTMLParagraphElement = document.createElement("p");

        status.className = "card-text";
        status.textContent = book.isBorrowed
            ? "Status: Borrowed"
            : "Status: Available";

        cardBody.appendChild(bookTitle);
        cardBody.appendChild(author);
        cardBody.appendChild(year);
        cardBody.appendChild(status);

        card.appendChild(cardBody);
        column.appendChild(card);
        list.appendChild(column);
    });

    container.appendChild(list);

    return container;
}