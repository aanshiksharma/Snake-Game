const dropdownToggleButton = document.getElementById("dropdown-toggle-button");
const dropdownList = document.getElementById("dropdown-list");
const dropdownUnderlay = document.getElementById("dropdown-underlay");

const uiToggleButton = document.getElementById("ui-toggle-button");
const uiDropdownLsit = document.getElementById("ui-dropdown-list");
const uiDropdownUnderlay = document.getElementById("ui-dropdown-underlay");
const newUI = document.getElementById("new-ui");
const oldUI = document.getElementById("old-ui");
const uiButtons = document.querySelectorAll(".ui-button");

window.onload = () => {
  dropdownList.classList.add("hidden");
  dropdownUnderlay.classList.add("hidden");
  dropdownToggleButton.classList.remove("selected");
};

// Speed Dropdown Toggling
dropdownToggleButton.addEventListener("click", () => {
  dropdownList.classList.toggle("hidden");
  dropdownUnderlay.classList.toggle("hidden");
  dropdownToggleButton.classList.toggle("selected");
});

dropdownUnderlay.addEventListener("click", () => {
  dropdownList.classList.toggle("hidden");
  dropdownUnderlay.classList.toggle("hidden");
  dropdownToggleButton.classList.toggle("selected");
});

// UI Dropdown Toggling
uiToggleButton.addEventListener("click", () => {
  uiDropdownLsit.classList.toggle("hidden");
  uiDropdownUnderlay.classList.toggle("hidden");
  uiToggleButton.classList.toggle("selected");
});

uiDropdownUnderlay.addEventListener("click", () => {
  uiDropdownLsit.classList.toggle("hidden");
  uiDropdownUnderlay.classList.toggle("hidden");
  uiToggleButton.classList.toggle("selected");
});

Array.from(uiButtons).forEach((button) => {
  button.addEventListener("click", () => {
    if (button.innerText === "New UI") {
      newUI.classList.remove("hidden");
      oldUI.classList.add("hidden");
      uiToggleButton.innerHTML = `New UI
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>`;

      b = window.innerWidth <= 1000 ? 14 : 20;
      snakeArr = [{ x: b / 2 + 1, y: b / 2 }];
      food = {
        x: Math.floor(a + (b - a) * Math.random()),
        y: Math.floor(a + (b - a) * Math.random()),
      };
    } else if (button.innerText === "Old UI") {
      newUI.classList.add("hidden");
      oldUI.classList.remove("hidden");
      uiToggleButton.innerHTML = `Old UI
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-chevron-down"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
            />
          </svg>`;

      b = 30;
      fps = 8;
      snakeArr = [{ x: b / 2 + 1, y: b / 2 }];
      food = {
        x: Math.floor(a + (b - a) * Math.random()),
        y: Math.floor(a + (b - a) * Math.random()),
      };
    }
    uiDropdownLsit.classList.toggle("hidden");
    uiDropdownUnderlay.classList.toggle("hidden");
    uiToggleButton.classList.toggle("selected");
  });
});
