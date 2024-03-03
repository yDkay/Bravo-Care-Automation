// Import commands.js using ES2015 syntax:
import "./commands";

// Hide fetch/XHR requests
// I like using this function to make the test run more clear and readable;
const app = window.top;
if (!app.document.head.querySelector("[data-hide-command-log-request]")) {
  const style = app.document.createElement("style");
  style.innerHTML =
    ".command-name-request, .command-name-xhr { display: none }";
  style.setAttribute("data-hide-command-log-request", "");

  app.document.head.appendChild(style);
}
