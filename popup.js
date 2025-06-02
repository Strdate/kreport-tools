document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("h3").textContent = chrome.i18n.getMessage("blockedUsers");
  document.getElementById("usernames").placeholder = chrome.i18n.getMessage("placeholder");
  document.querySelector("label").lastChild.textContent = chrome.i18n.getMessage("checkboxLabel");
  document.getElementById("saveBtn").textContent = chrome.i18n.getMessage("save");
  document.getElementById("status").textContent = chrome.i18n.getMessage("saved");

  const usernamesEl = document.getElementById("usernames");
  const contentOnlyEl = document.getElementById("contentOnly");
  const statusEl = document.getElementById("status");
  const save = () => {
    chrome.storage.sync.set({
      blockedUsers: usernamesEl.value,
      contentOnly: contentOnlyEl.checked
    }, () => {
      statusEl.style.display = "block";
      setTimeout(() => statusEl.style.display = "none", 5000);
    });
  };

  chrome.storage.sync.get(["blockedUsers", "contentOnly"], (data) => {
    usernamesEl.value = data.blockedUsers || "";
    contentOnlyEl.checked = !!data.contentOnly;
  });

  document.getElementById("saveBtn").addEventListener("click", save);

  // 🆕 Submit on Enter key in textarea (but allow Shift+Enter for newlines)
  usernamesEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent newline
      save();
    }
  });
});