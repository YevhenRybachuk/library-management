import "bootstrap/dist/css/bootstrap.min.css";

const app: HTMLElement | null = document.getElementById("app");

if (app === null) {
    throw new Error("App container not found");
}

const container: HTMLDivElement = document.createElement("div");
container.className = "container mt-5";

const title: HTMLHeadingElement = document.createElement("h1");
title.className = "mb-4";
title.textContent = "Library Management";

const message: HTMLParagraphElement = document.createElement("p");
message.className = "text-muted";
message.textContent = "Library application is running.";

container.appendChild(title);
container.appendChild(message);
app.appendChild(container);