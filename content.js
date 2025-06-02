chrome.storage.sync.get(["blockedUsers", "contentOnly"], (data) => {
  const blocked_users = (data.blockedUsers || "").split(",").map(s => s.trim()).filter(Boolean);
  const contentOnly = !!data.contentOnly;
  let postCounter = 0

  const style = document.createElement("style");
  style.textContent = "body { display: none !important; }";
  document.documentElement.appendChild(style);

  window.addEventListener("DOMContentLoaded", () => {
    const authorCells = document.querySelectorAll("td.dfautorlevy");

    authorCells.forEach(cell => {
      const authorName = cell.textContent.trim();
      if (blocked_users.some(name => authorName.includes(name))) {
        const trToRemove = cell.closest("tr");
        const nextTr = trToRemove?.nextElementSibling;
        postCounter++;

        if (trToRemove && !contentOnly) {
          trToRemove.remove();
        }
        if (nextTr && nextTr.tagName === "TR") {
          nextTr.remove();
        }
      }
    });

    style.remove();
    console.log(`K-Report user blocker: Blocked ${postCounter} posts`)
  });
});