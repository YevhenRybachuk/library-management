import "bootstrap/dist/css/bootstrap.min.css";

import { Book } from "./models/Book";
import { User } from "./models/User";
import { Library } from "./services/Library";
import { createBookForm } from "./ui/components/BookForm";
import { createBookList } from "./ui/components/BookList";
import { createUserForm } from "./ui/components/UserForm";
import { createUserList } from "./ui/components/UserList";
import { createBorrowForm } from "./ui/components/BorrowForm";

const bookLibrary: Library<Book> = new Library<Book>();
const userLibrary: Library<User> = new Library<User>();

const initialBook: Book = new Book(
    "book-1",
    "The Hobbit",
    "J.R.R. Tolkien",
    1937
);

const initialUser: User = new User(
    "1",
    "Yevhen"
);

bookLibrary.add(initialBook);
userLibrary.add(initialUser);

function getApp(): HTMLElement {
    const element: HTMLElement | null =
        document.getElementById("app");

    if (element === null) {
        throw new Error("App element not found");
    }

    return element;
}

const app: HTMLElement = getApp();

function renderBooks(): void {
    const oldBookList: HTMLElement | null =
        document.getElementById("book-list");

    if (oldBookList !== null) {
        oldBookList.remove();
    }

    const bookList: HTMLElement = createBookList(
        bookLibrary.getAll()
    );

    bookList.id = "book-list";

    app.appendChild(bookList);
}

function renderUsers(): void {
    const oldUserList: HTMLElement | null =
        document.getElementById("user-list");

    if (oldUserList !== null) {
        oldUserList.remove();
    }

    const userList: HTMLElement = createUserList(
        userLibrary.getAll()
    );

    userList.id = "user-list";

    app.appendChild(userList);
}

const bookForm: HTMLElement = createBookForm(
    bookLibrary,
    renderBooks
);

const userForm: HTMLElement = createUserForm(
    userLibrary,
    renderUsers
);

const borrowForm: HTMLElement = createBorrowForm(
    bookLibrary,
    userLibrary,
    (): void => {
        renderBooks();
        renderUsers();
    }
);

app.appendChild(bookForm);
app.appendChild(userForm);
app.appendChild(borrowForm);

renderBooks();
renderUsers();