import "bootstrap/dist/css/bootstrap.min.css";

import { Book } from "./models/Book";
import { User } from "./models/User";
import { Library } from "./services/Library";

const bookLibrary: Library<Book> = new Library<Book>();
const userLibrary: Library<User> = new Library<User>();

const book: Book = new Book(
    "book-1",
    "The Hobbit",
    "J.R.R. Tolkien",
    1937
);

const user: User = new User(
    "user-1",
    "Yevhen"
);

bookLibrary.add(book);
userLibrary.add(user);

console.log("Books:", bookLibrary.getAll());
console.log("Users:", userLibrary.getAll());
console.log("Found book:", bookLibrary.find("book-1"));