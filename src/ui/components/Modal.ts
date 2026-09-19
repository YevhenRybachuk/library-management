export function showModal(title: string, message: string): void {
    const backdrop: HTMLDivElement = document.createElement("div");

    backdrop.className = "modal fade show";

    backdrop.style.display = "block";
    backdrop.setAttribute("role", "dialog");

    const dialog: HTMLDivElement = document.createElement("div");

    dialog.className = "modal-dialog";

    const content: HTMLDivElement = document.createElement("div");

    content.className = "modal-content";

    const header: HTMLDivElement = document.createElement("div");

    header.className = "modal-header";

    const heading: HTMLHeadingElement = document.createElement("h5");

    heading.className = "modal-title";

    heading.textContent = title;

    const closeButton: HTMLButtonElement = document.createElement("button");

    closeButton.type = "button";
    closeButton.className = "btn-close";
    closeButton.setAttribute("aria-label", "Close");

    const body: HTMLDivElement = document.createElement("div");

    body.className = "modal-body";

    body.textContent = message;

    const footer: HTMLDivElement = document.createElement("div");

    footer.className = "modal-footer";

    const okButton: HTMLButtonElement = document.createElement("button");

    okButton.type = "button";
    okButton.className = "btn btn-primary";

    okButton.textContent = "OK";

    function close(): void {
        backdrop.remove();
    }

    closeButton.addEventListener("click", close);

    okButton.addEventListener("click", close);

    header.appendChild(heading);
    header.appendChild(closeButton);

    footer.appendChild(okButton);

    content.appendChild(header);
    content.appendChild(body);
    content.appendChild(footer);

    dialog.appendChild(content);
    backdrop.appendChild(dialog);

    document.body.appendChild(backdrop);
}
