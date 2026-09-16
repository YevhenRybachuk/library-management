import { User } from "../../models/User";
import { Library } from "../../services/Library";
import { Validation } from "../../utils/validators";

export function createUserForm(
    userLibrary: Library<User>,
    onUserAdded: () => void
): HTMLElement {
    const form: HTMLFormElement = document.createElement("form");

    form.className = "container mt-4";

    const title: HTMLHeadingElement = document.createElement("h2");

    title.textContent = "Add User";

    const idGroup: HTMLDivElement = document.createElement("div");

    idGroup.className = "mb-3";

    const idLabel: HTMLLabelElement = document.createElement("label");

    idLabel.className = "form-label";
    idLabel.textContent = "User ID";

    const idInput: HTMLInputElement = document.createElement("input");

    idInput.type = "text";
    idInput.className = "form-control";
    idInput.placeholder = "Enter user ID";

    const nameGroup: HTMLDivElement = document.createElement("div");

    nameGroup.className = "mb-3";

    const nameLabel: HTMLLabelElement =
        document.createElement("label");

    nameLabel.className = "form-label";
    nameLabel.textContent = "Name";

    const nameInput: HTMLInputElement =
        document.createElement("input");

    nameInput.type = "text";
    nameInput.className = "form-control";
    nameInput.placeholder = "Enter user name";

    const errorMessage: HTMLDivElement =
        document.createElement("div");

    errorMessage.className = "text-danger mb-3";

    const submitButton: HTMLButtonElement =
        document.createElement("button");

    submitButton.type = "submit";
    submitButton.className = "btn btn-primary";
    submitButton.textContent = "Add User";

    idGroup.appendChild(idLabel);
    idGroup.appendChild(idInput);

    nameGroup.appendChild(nameLabel);
    nameGroup.appendChild(nameInput);

    form.appendChild(title);
    form.appendChild(idGroup);
    form.appendChild(nameGroup);
    form.appendChild(errorMessage);
    form.appendChild(submitButton);

    form.addEventListener("submit", (event: SubmitEvent) => {
        event.preventDefault();

        errorMessage.textContent = "";

        const id: string = idInput.value.trim();
        const name: string = nameInput.value.trim();

        if (!Validation.isRequired(id)) {
            errorMessage.textContent = "User ID is required.";
            return;
        }

        if (!Validation.isUserIdValid(id)) {
            errorMessage.textContent =
                "User ID must contain only digits.";
            return;
        }

        if (!Validation.isNameValid(name)) {
            errorMessage.textContent =
                "Name can contain only letters, spaces, dots and hyphens.";
            return;
        }

        if (userLibrary.find(id) !== undefined) {
            errorMessage.textContent =
                "A user with this ID already exists.";
            return;
        }

        const user: User = new User(id, name);

        userLibrary.add(user);

        idInput.value = "";
        nameInput.value = "";

        onUserAdded();
    });

    return form;
}