import { Book } from "../../models/Book";
import { Library } from "../../services/Library";
import { Validation } from "../../utils/validators";

export function createBookForm(
    bookLibrary: Library<Book>,
    onBookAdded: () => void
): HTMLElement {
    const form: HTMLFormElement = document.createElement("form");

    form.className = "container mt-4";

    const title: HTMLHeadingElement = document.createElement("h2");

    title.textContent = "Add Book";

    const titleGroup: HTMLDivElement = document.createElement("div");

    titleGroup.className = "mb-3";

    const titleLabel: HTMLLabelElement = document.createElement("label");

    titleLabel.className = "form-label";
    titleLabel.textContent = "Title";

    const titleInput: HTMLInputElement = document.createElement("input");

    titleInput.type = "text";
    titleInput.className = "form-control";
    titleInput.placeholder = "Enter book title";

    const authorGroup: HTMLDivElement = document.createElement("div");

    authorGroup.className = "mb-3";

    const authorLabel: HTMLLabelElement = document.createElement("label");

    authorLabel.className = "form-label";
    authorLabel.textContent = "Author";

    const authorInput: HTMLInputElement = document.createElement("input");

    authorInput.type = "text";
    authorInput.className = "form-control";
    authorInput.placeholder = "Enter author name";

    const yearGroup: HTMLDivElement = document.createElement("div");

    yearGroup.className = "mb-3";

    const yearLabel: HTMLLabelElement = document.createElement("label");

    yearLabel.className = "form-label";
    yearLabel.textContent = "Publication year";

    const yearInput: HTMLInputElement = document.createElement("input");

    yearInput.type = "text";
    yearInput.className = "form-control";
    yearInput.placeholder = "Enter publication year";

    const errorMessage: HTMLDivElement = document.createElement("div");

    errorMessage.className = "text-danger mb-3";

    const submitButton: HTMLButtonElement =
        document.createElement("button");

    submitButton.type = "submit";
    submitButton.className = "btn btn-primary";
    submitButton.textContent = "Add Book";

    titleGroup.appendChild(titleLabel);
    titleGroup.appendChild(titleInput);

    authorGroup.appendChild(authorLabel);
    authorGroup.appendChild(authorInput);

    yearGroup.appendChild(yearLabel);
    yearGroup.appendChild(yearInput);

    form.appendChild(title);
    form.appendChild(titleGroup);
    form.appendChild(authorGroup);
    form.appendChild(yearGroup);
    form.appendChild(errorMessage);
    form.appendChild(submitButton);

    form.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault();

        errorMessage.textContent = "";

        const bookTitle: string = titleInput.value.trim();
        const author: string = authorInput.value.trim();
        const year: string = yearInput.value.trim();

        if (!Validation.isRequired(bookTitle)) {
            errorMessage.textContent = "Title is required.";
            return;
        }

        if (!Validation.isNameValid(author)) {
            errorMessage.textContent =
                "Author can contain only letters, spaces, dots and hyphens.";
            return;
        }

        if (!Validation.isPublicationYearValid(year)) {
            errorMessage.textContent =
                "Publication year must contain exactly 4 digits.";
            return;
        }

        const book: Book = new Book(
            crypto.randomUUID(),
            bookTitle,
            author,
            Number(year)
        );

        bookLibrary.add(book);

        titleInput.value = "";
        authorInput.value = "";
        yearInput.value = "";

        onBookAdded();
    });

    return form;
}