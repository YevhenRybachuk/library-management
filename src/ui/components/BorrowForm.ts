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

    const userLabel: HTMLLabelElement =
        document.createElement("label");

    userLabel.className = "form-label";
    userLabel.textContent = "User";

    const userSelect: HTMLSelectElement =
        document.createElement("select");

    userSelect.className = "form-select mb-3";

    const bookLabel: HTMLLabelElement =
        document.createElement("label");

    bookLabel.className = "form-label";
    bookLabel.textContent = "Book";

    const bookSelect: HTMLSelectElement =
        document.createElement("select");

    bookSelect.className = "form-select mb-3";

    const errorMessage: HTMLDivElement =
        document.createElement("div");

    errorMessage.className = "text-danger mb-3";

    const borrowButton: HTMLButtonElement =
        document.createElement("button");

    borrowButton.className = "btn btn-success me-2";
    borrowButton.textContent = "Borrow Book";

    const returnButton: HTMLButtonElement =
        document.createElement("button");

    returnButton.className = "btn btn-warning";
    returnButton.textContent = "Return Book";

    container.appendChild(userLabel);
    container.appendChild(userSelect);

    container.appendChild(bookLabel);
    container.appendChild(bookSelect);

    container.appendChild(errorMessage);

    container.appendChild(borrowButton);
    container.appendChild(returnButton);

    function renderOptions(): void {
        userSelect.innerHTML = "";
        bookSelect.innerHTML = "";

        const users: User[] = userLibrary.getAll();

        users.forEach((user: User) => {
            const option: HTMLOptionElement =
                document.createElement("option");

            option.value = user.id;
            option.textContent = `${user.name} (ID: ${user.id})`;

            userSelect.appendChild(option);
        });

        const availableBooks: Book[] =
            bookLibrary
                .getAll()
                .filter((book: Book) => !book.isBorrowed);

        availableBooks.forEach((book: Book) => {
            const option: HTMLOptionElement =
                document.createElement("option");

            option.value = book.id;
            option.textContent =
                `${book.title} — ${book.author}`;

            bookSelect.appendChild(option);
        });
    }

    borrowButton.addEventListener(
        "click",
        (): void => {
            errorMessage.textContent = "";

            const userId: string = userSelect.value;
            const bookId: string = bookSelect.value;

            const user: User | undefined =
                userLibrary.find(userId);

            const book: Book | undefined =
                bookLibrary.find(bookId);

            if (user === undefined || book === undefined) {
                errorMessage.textContent =
                    "User or book not found.";

                return;
            }

            if (user.borrowedBookIds.length >= 3) {
                errorMessage.textContent =
                    "A user cannot borrow more than 3 books.";

                return;
            }

            if (book.isBorrowed) {
                errorMessage.textContent =
                    "This book is already borrowed.";

                return;
            }

            book.borrow(user.id);
            user.borrowBook(book.id);

            renderOptions();
            onChange();
        }
    );

    returnButton.addEventListener(
        "click",
        (): void => {
            errorMessage.textContent = "";

            const userId: string = userSelect.value;
            const bookId: string = bookSelect.value;

            const user: User | undefined =
                userLibrary.find(userId);

            const book: Book | undefined =
                bookLibrary.find(bookId);

            if (user === undefined || book === undefined) {
                errorMessage.textContent =
                    "User or book not found.";

                return;
            }

            if (!book.isBorrowed) {
                errorMessage.textContent =
                    "This book is not borrowed.";

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
        }
    );

    renderOptions();

    return container;
}