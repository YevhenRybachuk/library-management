import { Book } from "../../models/Book";
import { User } from "../../models/User";
import { Library } from "../../services/Library";

export function createBorrowForm(
    bookLibrary: Library<Book>,
    userLibrary: Library<User>,
    onChange: () => void
): HTMLElement {
    const container: HTMLDivElement = document.createElement("div");

    container.className = "container mt-4";

    const title: HTMLHeadingElement = document.createElement("h2");
    title.textContent = "Borrow / Return";

    container.appendChild(title);

    // =========================
    // USER
    // =========================

    const userLabel: HTMLLabelElement = document.createElement("label");

    userLabel.className = "form-label";
    userLabel.textContent = "User";

    const userSelect: HTMLSelectElement = document.createElement("select");

    userSelect.className = "form-select mb-3";

    container.appendChild(userLabel);
    container.appendChild(userSelect);

    // =========================
    // BORROW
    // =========================

    const borrowLabel: HTMLLabelElement = document.createElement("label");

    borrowLabel.className = "form-label";
    borrowLabel.textContent = "Book to borrow";

    const borrowSelect: HTMLSelectElement = document.createElement("select");

    borrowSelect.className = "form-select mb-3";

    const borrowButton: HTMLButtonElement = document.createElement("button");

    borrowButton.className = "btn btn-success me-2";
    borrowButton.textContent = "Borrow Book";

    container.appendChild(borrowLabel);
    container.appendChild(borrowSelect);
    container.appendChild(borrowButton);

    // =========================
    // RETURN
    // =========================

    const returnLabel: HTMLLabelElement = document.createElement("label");

    returnLabel.className = "form-label mt-3";
    returnLabel.textContent = "Book to return";

    const returnSelect: HTMLSelectElement = document.createElement("select");

    returnSelect.className = "form-select mb-3";

    const returnButton: HTMLButtonElement = document.createElement("button");

    returnButton.className = "btn btn-warning";
    returnButton.textContent = "Return Book";

    container.appendChild(returnLabel);
    container.appendChild(returnSelect);
    container.appendChild(returnButton);

    // =========================
    // ERROR MESSAGE
    // =========================

    const errorMessage: HTMLDivElement = document.createElement("div");

    errorMessage.className = "text-danger mt-3";

    container.appendChild(errorMessage);

    // =========================
    // RENDER OPTIONS
    // =========================

    function renderOptions(): void {
        userSelect.innerHTML = "";
        borrowSelect.innerHTML = "";
        returnSelect.innerHTML = "";

        const users: User[] = userLibrary.getAll();

        users.forEach((user: User) => {
            const option: HTMLOptionElement = document.createElement("option");

            option.value = user.id;
            option.textContent = `${user.name} (ID: ${user.id})`;

            userSelect.appendChild(option);
        });

        const selectedUser: User | undefined = userLibrary.find(
            userSelect.value
        );

        // =========================
        // AVAILABLE BOOKS
        // =========================

        const availableBooks: Book[] = bookLibrary
            .getAll()
            .filter((book: Book) => !book.isBorrowed);

        availableBooks.forEach((book: Book) => {
            const option: HTMLOptionElement = document.createElement("option");

            option.value = book.id;
            option.textContent = `${book.title} — ${book.author}`;

            borrowSelect.appendChild(option);
        });

        // =========================
        // USER'S BORROWED BOOKS
        // =========================

        if (selectedUser !== undefined) {
            selectedUser.borrowedBookIds.forEach((bookId: string) => {
                const book: Book | undefined = bookLibrary.find(bookId);

                if (book !== undefined) {
                    const option: HTMLOptionElement =
                        document.createElement("option");

                    option.value = book.id;
                    option.textContent = `${book.title} — ${book.author}`;

                    returnSelect.appendChild(option);
                }
            });
        }
    }

    // =========================
    // USER CHANGE
    // =========================

    userSelect.addEventListener("change", (): void => {
        errorMessage.textContent = "";
        renderOptions();
    });

    // =========================
    // BORROW BOOK
    // =========================

    borrowButton.addEventListener("click", (): void => {
        errorMessage.textContent = "";

        const userId: string = userSelect.value;

        const bookId: string = borrowSelect.value;

        const user: User | undefined = userLibrary.find(userId);

        const book: Book | undefined = bookLibrary.find(bookId);

        if (user === undefined) {
            errorMessage.textContent = "User not found.";

            return;
        }

        if (book === undefined) {
            errorMessage.textContent = "Book not found.";

            return;
        }

        if (user.borrowedBookIds.length >= 3) {
            errorMessage.textContent =
                "A user cannot borrow more than 3 books.";

            return;
        }

        if (book.isBorrowed) {
            errorMessage.textContent = "This book is already borrowed.";

            return;
        }

        book.borrow(user.id);
        user.borrowBook(book.id);

        renderOptions();
        onChange();
    });

    // =========================
    // RETURN BOOK
    // =========================

    returnButton.addEventListener("click", (): void => {
        errorMessage.textContent = "";

        const userId: string = userSelect.value;

        const bookId: string = returnSelect.value;

        const user: User | undefined = userLibrary.find(userId);

        const book: Book | undefined = bookLibrary.find(bookId);

        if (user === undefined) {
            errorMessage.textContent = "User not found.";

            return;
        }

        if (book === undefined) {
            errorMessage.textContent = "Book not found.";

            return;
        }

        if (!book.isBorrowed) {
            errorMessage.textContent = "This book is not borrowed.";

            return;
        }

        if (book.borrowedBy !== user.id) {
            errorMessage.textContent =
                "This book was borrowed by another user.";

            return;
        }

        book.returnBook();
        user.returnBook(book.id);

        renderOptions();
        onChange();
    });

    renderOptions();

    return container;
}
