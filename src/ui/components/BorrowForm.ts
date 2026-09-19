import { Book } from "../../models/Book";
import { User } from "../../models/User";
import { Library } from "../../services/Library";
import { NotificationService } from "../../services/NotificationService";
import { showModal } from "./Modal";

export function createBorrowForm(
    bookLibrary: Library<Book>,
    userLibrary: Library<User>,
    notifications: NotificationService,
    onChange: () => void
): HTMLElement {
    const container: HTMLDivElement = document.createElement("div");

    container.className = "container mt-4";

    const title: HTMLHeadingElement = document.createElement("h2");

    title.textContent = "Borrow / Return";

    container.appendChild(title);

    // USER

    const userLabel: HTMLLabelElement = document.createElement("label");

    userLabel.className = "form-label";
    userLabel.textContent = "User";

    const userSelect: HTMLSelectElement = document.createElement("select");

    userSelect.className = "form-select mb-3";

    // BORROW

    const borrowLabel: HTMLLabelElement = document.createElement("label");

    borrowLabel.className = "form-label";
    borrowLabel.textContent = "Book to borrow";

    const borrowSelect: HTMLSelectElement = document.createElement("select");

    borrowSelect.className = "form-select mb-3";

    const borrowButton: HTMLButtonElement = document.createElement("button");

    borrowButton.className = "btn btn-success me-2";
    borrowButton.textContent = "Borrow Book";

    // RETURN

    const returnLabel: HTMLLabelElement = document.createElement("label");

    returnLabel.className = "form-label mt-3";
    returnLabel.textContent = "Book to return";

    const returnSelect: HTMLSelectElement = document.createElement("select");

    returnSelect.className = "form-select mb-3";

    const returnButton: HTMLButtonElement = document.createElement("button");

    returnButton.className = "btn btn-warning";
    returnButton.textContent = "Return Book";

    // ADD ELEMENTS

    container.appendChild(userLabel);
    container.appendChild(userSelect);

    container.appendChild(borrowLabel);
    container.appendChild(borrowSelect);
    container.appendChild(borrowButton);

    container.appendChild(returnLabel);
    container.appendChild(returnSelect);
    container.appendChild(returnButton);

    // OPTIONS

    function renderOptions(): void {
        userSelect.innerHTML = "";
        borrowSelect.innerHTML = "";
        returnSelect.innerHTML = "";

        const users: User[] = userLibrary.getAll();

        users.forEach((user: User): void => {
            const option: HTMLOptionElement = document.createElement("option");

            option.value = user.id;

            option.textContent = `${user.name} (ID: ${user.id})`;

            userSelect.appendChild(option);
        });

        const selectedUser: User | undefined = userLibrary.find(
            userSelect.value
        );

        const availableBooks: Book[] = bookLibrary
            .getAll()
            .filter((book: Book): boolean => !book.isBorrowed);

        availableBooks.forEach((book: Book): void => {
            const option: HTMLOptionElement = document.createElement("option");

            option.value = book.id;

            option.textContent = `${book.title} — ${book.author}`;

            borrowSelect.appendChild(option);
        });

        if (selectedUser !== undefined) {
            selectedUser.borrowedBookIds.forEach((bookId: string): void => {
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

    // USER CHANGE

    userSelect.addEventListener("change", (): void => {
        renderOptions();
    });

    // BORROW

    borrowButton.addEventListener("click", (): void => {
        const userId: string = userSelect.value;

        const bookId: string = borrowSelect.value;

        const user: User | undefined = userLibrary.find(userId);

        const book: Book | undefined = bookLibrary.find(bookId);

        if (user === undefined) {
            notifications.show("User not found.", "danger");

            return;
        }

        if (book === undefined) {
            notifications.show("Book not found.", "danger");

            return;
        }

        if (user.borrowedBookIds.length >= 3) {
            showModal(
                "Borrowing limit reached",
                "A user cannot borrow more than 3 books."
            );

            return;
        }

        if (book.isBorrowed) {
            notifications.show("This book is already borrowed.", "warning");

            return;
        }

        book.borrow(user.id);
        user.borrowBook(book.id);

        notifications.show("Book borrowed successfully.", "success");

        renderOptions();

        onChange();
    });

    // RETURN

    returnButton.addEventListener("click", (): void => {
        const userId: string = userSelect.value;

        const bookId: string = returnSelect.value;

        const user: User | undefined = userLibrary.find(userId);

        const book: Book | undefined = bookLibrary.find(bookId);

        if (user === undefined) {
            notifications.show("User not found.", "danger");

            return;
        }

        if (book === undefined) {
            notifications.show("Book not found.", "danger");

            return;
        }

        if (!book.isBorrowed) {
            notifications.show("This book is not borrowed.", "warning");

            return;
        }

        if (book.borrowedBy !== user.id) {
            notifications.show(
                "This book was borrowed by another user.",
                "warning"
            );

            return;
        }

        book.returnBook();
        user.returnBook(book.id);

        notifications.show("Book returned successfully.", "success");

        renderOptions();

        onChange();
    });

    renderOptions();

    return container;
}
