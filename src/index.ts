import "bootstrap/dist/css/bootstrap.min.css";

import { Book } from "./models/Book";
import { User } from "./models/User";
import { IBook } from "./models/interfaces/IBook";
import { IUser } from "./models/interfaces/IUser";

import { Library } from "./services/Library";
import { StorageService } from "./services/Storage";
import { NotificationService } from "./services/NotificationService";

import { createBookForm } from "./ui/components/BookForm";
import { createBookList } from "./ui/components/BookList";
import { createUserForm } from "./ui/components/UserForm";
import { createUserList } from "./ui/components/UserList";
import { createBorrowForm } from "./ui/components/BorrowForm";

// ==========================================
// LIBRARIES AND STORAGE
// ==========================================

const bookLibrary: Library<Book> = new Library<Book>();

const userLibrary: Library<User> = new Library<User>();

const storage: StorageService = new StorageService();

const notifications: NotificationService = new NotificationService();

// ==========================================
// APP
// ==========================================

function getApp(): HTMLElement {
    const element: HTMLElement | null = document.getElementById("app");

    if (element === null) {
        throw new Error("App element not found");
    }

    return element;
}

const app: HTMLElement = getApp();

// ==========================================
// STORAGE
// ==========================================

function saveData(): void {
    storage.save("books", bookLibrary.getAll());

    storage.save("users", userLibrary.getAll());
}

function loadBooks(): void {
    const books: IBook[] = storage.load<IBook>("books");

    books.forEach((data: IBook): void => {
        const book: Book = new Book(
            data.id,
            data.title,
            data.author,
            data.publicationYear
        );

        if (data.isBorrowed && data.borrowedBy !== null) {
            book.borrow(data.borrowedBy);
        }

        bookLibrary.add(book);
    });
}

function loadUsers(): void {
    const users: IUser[] = storage.load<IUser>("users");

    users.forEach((data: IUser): void => {
        const user: User = new User(data.id, data.name);

        data.borrowedBookIds.forEach((bookId: string): void => {
            user.borrowBook(bookId);
        });

        userLibrary.add(user);
    });
}

// ==========================================
// INITIAL DATA
// ==========================================

function createInitialData(): void {
    const initialBook: Book = new Book(
        "book-1",
        "The Hobbit",
        "J.R.R. Tolkien",
        1937
    );

    const initialUser: User = new User("1", "Yevhen");

    bookLibrary.add(initialBook);
    userLibrary.add(initialUser);

    saveData();
}

// ==========================================
// RENDER BOOKS
// ==========================================

function renderBooks(): void {
    const oldBookList: HTMLElement | null =
        document.getElementById("book-list");

    if (oldBookList !== null) {
        oldBookList.remove();
    }

    const bookList: HTMLElement = createBookList(
        bookLibrary.getAll(),
        (bookId: string): void => {
            const book: Book | undefined = bookLibrary.find(bookId);

            if (book !== undefined && book.isBorrowed) {
                notifications.show(
                    "Cannot delete a borrowed book. Return it first.",
                    "warning"
                );
                return;
            }

            bookLibrary.remove(bookId);

            saveData();
            renderBooks();
        }
    );

    bookList.id = "book-list";

    app.appendChild(bookList);
}

// ==========================================
// RENDER USERS
// ==========================================

function renderUsers(): void {
    const oldUserList: HTMLElement | null =
        document.getElementById("user-list");

    if (oldUserList !== null) {
        oldUserList.remove();
    }

    const userList: HTMLElement = createUserList(
        userLibrary.getAll(),
        (userId: string): void => {
            const user: User | undefined = userLibrary.find(userId);

            if (user === undefined) {
                return;
            }

            if (user.borrowedBookIds.length > 0) {
                notifications.show(
                    "Cannot delete a user with borrowed books. Return all books first.",
                    "warning"
                );
                return;
            }

            userLibrary.remove(userId);

            saveData();
            renderUsers();
        }
    );

    userList.id = "user-list";

    app.appendChild(userList);
}

// ==========================================
// LOAD DATA
// ==========================================

loadBooks();
loadUsers();

// ==========================================
// CREATE INITIAL DATA IF STORAGE IS EMPTY
// ==========================================

if (bookLibrary.count === 0 && userLibrary.count === 0) {
    createInitialData();
}

// ==========================================
// CREATE UI FORMS
// ==========================================

const bookForm: HTMLElement = createBookForm(bookLibrary, (): void => {
    saveData();
    renderBooks();
});

const userForm: HTMLElement = createUserForm(userLibrary, (): void => {
    saveData();
    renderUsers();
});

const borrowForm: HTMLElement = createBorrowForm(
    bookLibrary,
    userLibrary,
    notifications,
    (): void => {
        saveData();

        renderBooks();
        renderUsers();
    }
);

// ==========================================
// ADD UI TO PAGE
// ==========================================

app.appendChild(bookForm);
app.appendChild(userForm);
app.appendChild(borrowForm);

// ==========================================
// INITIAL RENDER
// ==========================================

renderBooks();
renderUsers();
