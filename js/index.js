const list = document.querySelector("ul");
const input = document.querySelector("input");

input.addEventListener("keypress", (event) => {
  if (event.key === "Enter") {
    event.preventDefault();
    const task = input.value.trim();
    if (task !== "") {
      
      const li = document.createElement("li");
      li.setAttribute("class", "list-group-item");
      li.textContent = task;
      // add css in the appended list as 80% width and align the list on left
      li.style.width = "80%"
      li.style.textAlign = "left";
      list.appendChild(li);
      input.value = "";
    }
    console.log(list);
  }
});