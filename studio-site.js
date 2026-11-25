"use strict";

const switcher = document.querySelector(".tabs");
if (switcher) {
  const buttons = [...switcher.querySelectorAll("button[data-panel]")];
  const panels = buttons.map(button => document.getElementById(button.dataset.panel));
  if (panels.every(Boolean)) {
    function showPanel(active) {
      for (const [index, button] of buttons.entries()) {
        const selected = index === active;
        button.setAttribute("aria-pressed", String(selected));
        panels[index].hidden = !selected;
      }
    }
    for (const [index, button] of buttons.entries()) {
      button.addEventListener("click", () => showPanel(index));
    }
    showPanel(0);
    switcher.hidden = false;
  }
}
