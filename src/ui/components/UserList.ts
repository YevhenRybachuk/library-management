import { User } from "../../models/User";

export function createUserList(
    users: User[],
    onUserDeleted: (userId: string) => void
): HTMLElement {
    const container: HTMLDivElement = document.createElement("div");

    container.className = "container mt-4";

    const title: HTMLHeadingElement = document.createElement("h2");

    title.textContent = "Users";

    container.appendChild(title);

    const list: HTMLDivElement = document.createElement("div");

    list.className = "row";

    container.appendChild(list);

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

    const usersPerPage: number = 5;

    let currentPage: number = 1;

    function renderUsers(): void {
        list.innerHTML = "";

        const totalPages: number = Math.max(
            1,
            Math.ceil(users.length / usersPerPage)
        );

        if (currentPage > totalPages) {
            currentPage = totalPages;
        }

        const startIndex: number = (currentPage - 1) * usersPerPage;

        const endIndex: number = startIndex + usersPerPage;

        const usersToShow: User[] = users.slice(startIndex, endIndex);

        if (usersToShow.length === 0) {
            const message: HTMLParagraphElement = document.createElement("p");

            message.className = "text-muted";
            message.textContent = "No users found.";

            list.appendChild(message);
        }

        usersToShow.forEach((user: User): void => {
            const column: HTMLDivElement = document.createElement("div");

            column.className = "col-md-4 mb-3";

            const card: HTMLDivElement = document.createElement("div");

            card.className = "card h-100";

            const cardBody: HTMLDivElement = document.createElement("div");

            cardBody.className = "card-body";

            const userName: HTMLHeadingElement = document.createElement("h5");

            userName.className = "card-title";

            userName.textContent = user.name;

            const userId: HTMLParagraphElement = document.createElement("p");

            userId.className = "card-text";

            userId.textContent = `ID: ${user.id}`;

            const borrowedBooks: HTMLParagraphElement =
                document.createElement("p");

            borrowedBooks.className = "card-text";

            borrowedBooks.textContent = `Borrowed books: ${user.borrowedBookIds.length}`;

            const deleteButton: HTMLButtonElement =
                document.createElement("button");

            deleteButton.className = "btn btn-danger";

            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", (): void => {
                onUserDeleted(user.id);
            });

            cardBody.appendChild(userName);
            cardBody.appendChild(userId);
            cardBody.appendChild(borrowedBooks);
            cardBody.appendChild(deleteButton);

            card.appendChild(cardBody);
            column.appendChild(card);
            list.appendChild(column);
        });

        pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;

        previousButton.disabled = currentPage === 1;
        nextButton.disabled = currentPage === totalPages;
    }

    previousButton.addEventListener("click", (): void => {
        if (currentPage > 1) {
            currentPage--;

            renderUsers();
        }
    });

    nextButton.addEventListener("click", (): void => {
        const totalPages: number = Math.max(
            1,
            Math.ceil(users.length / usersPerPage)
        );

        if (currentPage < totalPages) {
            currentPage++;

            renderUsers();
        }
    });

    renderUsers();

    return container;
}
