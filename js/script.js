const dropdownToggleButton = document.getElementById("dropdown-toggle-button");
const dropdownList = document.getElementById("dropdown-list");

// dropdown Toggling
dropdownToggleButton.addEventListener("click", () => {
  dropdownList.classList.toggle("hidden");
  dropdownToggleButton.classList.toggle("selected");
});
