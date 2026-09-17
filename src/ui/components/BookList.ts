import { Book } from "../../models/Book";

export function createBookList(
    books: Book[],
    onBookDeleted: (bookId: string) => void
): HTMLElement {
    const container: HTMLDivElement = document.createElement("div");

    container.className = "container mt-4";

    const title: HTMLHeadingElement = document.createElement("h2");

    title.textContent = "Books";

    // =========================
    // SEARCH
    // =========================

    const searchInput: HTMLInputElement = document.createElement("input");

    searchInput.type = "text";
    searchInput.className = "form-control mb-3";
    searchInput.placeholder = "Search by title or author";

    container.appendChild(title);
    container.appendChild(searchInput);

    // =========================
    // BOOK LIST
    // =========================

    const list: HTMLDivElement = document.createElement("div");

    list.className = "row";

    container.appendChild(list);

    // =========================
    // PAGINATION
    // =========================

    const pagination: HTMLDivElement = document.createElement("div");

    pagination.className =
        "d-flex justify-content-center align-items-center gap-3 mt-3";

    container.appendChild(pagination);

    const previousButton: HTMLButtonElement = document.createElement("button");

    previousButton.className = "btn btn-secondary";

    previousButton.textContent = "Previous";

    const pageInfo: HTMLSpanElement = document.createElement("span");

    const nextButton: HTMLButtonElement = document.createElement("button");

    nextButton.className = "btn btn-secondary";

    nextButton.textContent = "Next";

    pagination.appendChild(previousButton);
    pagination.appendChild(pageInfo);
    pagination.appendChild(nextButton);

    // =========================
    // PAGINATION SETTINGS
    // =========================

    const booksPerPage: number = 5;

    let currentPage: number = 1;

    let filteredBooks: Book[] = [...books];

    // =========================
    // RENDER BOOKS
    // =========================

    function renderBooks(): void {
        list.innerHTML = "";

        const totalPages: number = Math.max(
            1,
            Math.ceil(filteredBooks.length / booksPerPage)
        );

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const startIndex: number = (currentPage - 1) * booksPerPage;

        const endIndex: number = startIndex + booksPerPage;

        const booksToShow: Book[] = filteredBooks.slice(startIndex, endIndex);

        if (booksToShow.length === 0) {
            const message: HTMLParagraphElement = document.createElement("p");

            message.className = "text-muted";

            message.textContent = "No books found.";

            list.appendChild(message);
        }

        booksToShow.forEach((book: Book): void => {
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

            // =========================
            // DELETE BUTTON
            // =========================

            const deleteButton: HTMLButtonElement =
                document.createElement("button");

            deleteButton.className = "btn btn-danger";

            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", (): void => {
                onBookDeleted(book.id);
            });

            cardBody.appendChild(bookTitle);

            cardBody.appendChild(author);

            cardBody.appendChild(year);

            cardBody.appendChild(status);

            cardBody.appendChild(deleteButton);

            card.appendChild(cardBody);

            column.appendChild(card);

            list.appendChild(column);
        });

        // =========================
        // UPDATE PAGINATION
        // =========================

        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        previousButton.disabled = currentPage === 1;

        nextButton.disabled = currentPage === totalPages;
    }

    // =========================
    // SEARCH
    // =========================

    searchInput.addEventListener("input", (): void => {
        const query: string = searchInput.value.trim().toLowerCase();

        filteredBooks = books.filter(
            (book: Book): boolean =>
                book.title.toLowerCase().includes(query) ||
                book.author.toLowerCase().includes(query)
        );

        currentPage = 1;

        renderBooks();
    });

    // =========================
    // PREVIOUS PAGE
    // =========================

    previousButton.addEventListener("click", (): void => {
        if (currentPage > 1) {
            currentPage--;

            renderBooks();
        }
    });

    // =========================
    // NEXT PAGE
    // =========================

    nextButton.addEventListener("click", (): void => {
        const totalPages: number = Math.max(
            1,
            Math.ceil(filteredBooks.length / booksPerPage)
        );

        if (currentPage < totalPages) {
            currentPage++;

            renderBooks();
        }
    });

    // =========================
    // INITIAL RENDER
    // =========================

    renderBooks();

    return container;
}
