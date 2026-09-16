import { User } from "../../models/User";

export function createUserList(users: User[]): HTMLElement {
    const container: HTMLDivElement = document.createElement("div");

    container.className = "container mt-4";

    const title: HTMLHeadingElement = document.createElement("h2");

    title.textContent = "Users";

    container.appendChild(title);

    const list: HTMLDivElement = document.createElement("div");

    list.className = "row";

    users.forEach((user: User) => {
        const column: HTMLDivElement = document.createElement("div");

        column.className = "col-md-4 mb-3";

        const card: HTMLDivElement = document.createElement("div");

        card.className = "card h-100";

        const cardBody: HTMLDivElement = document.createElement("div");

        cardBody.className = "card-body";

        const userName: HTMLHeadingElement =
            document.createElement("h5");

        userName.className = "card-title";
        userName.textContent = user.name;

        const userId: HTMLParagraphElement =
            document.createElement("p");

        userId.className = "card-text";
        userId.textContent = `ID: ${user.id}`;

        const borrowedBooks: HTMLParagraphElement =
            document.createElement("p");

        borrowedBooks.className = "card-text";
        borrowedBooks.textContent =
            `Borrowed books: ${user.borrowedBookIds.length}`;

        cardBody.appendChild(userName);
        cardBody.appendChild(userId);
        cardBody.appendChild(borrowedBooks);

        card.appendChild(cardBody);
        column.appendChild(card);
        list.appendChild(column);
    });

    container.appendChild(list);

    return container;
}