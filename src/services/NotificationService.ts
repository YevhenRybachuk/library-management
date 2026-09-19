export class NotificationService {
    private readonly container: HTMLDivElement;

    constructor() {
        this.container = document.createElement("div");

        this.container.className = "position-fixed top-0 end-0 p-3";

        this.container.style.zIndex = "1100";

        document.body.appendChild(this.container);
    }

    show(
        message: string,
        type: "success" | "danger" | "warning" | "info" = "info"
    ): void {
        const notification: HTMLDivElement = document.createElement("div");

        notification.className = `alert alert-${type} alert-dismissible fade show`;

        notification.setAttribute("role", "alert");

        notification.textContent = message;

        const closeButton: HTMLButtonElement = document.createElement("button");

        closeButton.type = "button";
        closeButton.className = "btn-close";
        closeButton.setAttribute("aria-label", "Close");

        closeButton.addEventListener("click", (): void => {
            notification.remove();
        });

        notification.appendChild(closeButton);
        this.container.appendChild(notification);

        window.setTimeout((): void => {
            notification.remove();
        }, 3000);
    }
}
