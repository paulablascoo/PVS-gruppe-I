const API = "http://localhost:8080/todos";

// ✅ Templates (frontend-only). Clicking one fills the form.
// You can edit the notes (kg/reps) before saving.
const EXERCISES = [
  {
    title: "Push-ups",
    description: "Upper body exercise focusing on chest, shoulders and triceps"
  },
  {
    title: "Bench Press",
    description: "Chest press exercise using a barbell or dumbbells"
  },
  {
    title: "Incline Dumbbell Press",
    description: "Upper chest exercise using dumbbells on an incline bench"
  },
  {
    title: "Pull-ups",
    description: "Upper body pulling exercise focusing on back and biceps"
  },
  {
    title: "Lat Pulldown",
    description: "Back exercise targeting the latissimus dorsi muscles"
  },
  {
    title: "Barbell Row",
    description: "Compound back exercise focusing on upper and middle back"
  },
  {
    title: "Squats",
    description: "Lower body exercise targeting quadriceps and glutes"
  },
  {
    title: "Deadlift",
    description: "Full-body strength exercise focusing on posterior chain"
  },
  {
    title: "Leg Press",
    description: "Lower body machine exercise focusing on legs and glutes"
  },
  {
    title: "Shoulder Press",
    description: "Shoulder exercise targeting deltoids using barbell or dumbbells"
  },
  {
    title: "Lateral Raises",
    description: "Isolation exercise focusing on the lateral deltoids"
  },
  {
    title: "Plank",
    description: "Core stability exercise focusing on abdominal endurance"
  }
];


const elList = document.getElementById("list");
const elErr = document.getElementById("error");
const elStatus = document.getElementById("status");
const elCount = document.getElementById("countLabel");
const elEmpty = document.getElementById("empty");
const elTemplates = document.getElementById("templates");

const elTitle = document.getElementById("title");
const elDesc = document.getElementById("description");
const elSearch = document.getElementById("searchInput");

let allTodos = [];

function setStatus(msg, type = "ok") {
  elStatus.textContent = msg;
  elStatus.className = `status status-${type}`;
}

function showError(e) {
  const msg = (e && e.message) ? e.message : String(e);
  elErr.textContent = msg;
  setStatus("Error", "err");
}

function clearError() {
  elErr.textContent = "";
}

async function apiFetch(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`HTTP ${res.status} ${res.statusText}\n${text}`);
  }
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) return res.json();
  return null;
}

function escapeHtml(s) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;"
  }[c]));
}

function matchesSearch(todo, q) {
  if (!q) return true;
  const hay = `${todo.title ?? ""} ${todo.description ?? ""}`.toLowerCase();
  return hay.includes(q.toLowerCase());
}

// ---------- Templates UI ----------
function renderTemplates() {
  elTemplates.innerHTML = "";

  for (const ex of EXERCISES) {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "tpl";
    btn.innerHTML = `
      <div class="tpl-title">${escapeHtml(ex.title)}</div>
      <div class="tpl-desc">${escapeHtml(ex.description)}</div>
    `;

   btn.onclick = () => {
  clearError();
  elTitle.value = ex.title;

  elDesc.value =
`${ex.description}

Repetitions:
Kg:`;

  elDesc.focus();
  elDesc.selectionStart = elDesc.selectionEnd = elDesc.value.length;
  setStatus(`Template loaded: ${ex.title}`, "ok");
};


    elTemplates.appendChild(btn);
  }
}

// ---------- Todos UI ----------
function renderList(todos) {
  elList.innerHTML = "";

  for (const t of todos) {
    const li = document.createElement("li");
    li.className = "card";

    const done = !!(t.completed ?? t.isCompleted);

    const left = document.createElement("div");
    left.className = "card-left";
    left.innerHTML = `
      <div class="card-title">
        <span class="dot ${done ? "dot-done" : "dot-open"}"></span>
        <span>${escapeHtml(t.title)}</span>
      </div>
      <div class="card-desc">${escapeHtml(t.description || "—")}</div>
    `;

    const right = document.createElement("div");
    right.className = "card-right";

    const delBtn = document.createElement("button");
    delBtn.className = "btn btn-danger";
    delBtn.type = "button";
    delBtn.textContent = "Delete";
    delBtn.onclick = async () => {
      const ok = confirm(`Delete workout #${t.id}?\n\n"${t.title}"`);
      if (!ok) return;

      try {
        clearError();
        setStatus("Deleting...", "warn");
        await apiFetch(`${API}/${t.id}`, { method: "DELETE" });
        setStatus(`Deleted #${t.id}`, "ok");
        await refresh();
      } catch (e) {
        showError(e);
      }
    };

    right.appendChild(delBtn);
    li.appendChild(left);
    li.appendChild(right);
    elList.appendChild(li);
  }

  elEmpty.classList.toggle("hidden", todos.length !== 0);
}

function render() {
  const q = elSearch.value.trim();
  const filtered = allTodos.filter(t => matchesSearch(t, q));

  renderList(filtered);
  elCount.textContent = `${filtered.length} shown • ${allTodos.length} total`;
  setStatus(`Loaded ${allTodos.length} workouts`, "ok");
}

async function refresh() {
  try {
    clearError();
    setStatus("Loading...", "warn");
    allTodos = await apiFetch(API) || [];
    render();
  } catch (e) {
    showError(e);
  }
}

// ---------- Events ----------
document.getElementById("refreshBtn").addEventListener("click", refresh);

document.getElementById("clearBtn").addEventListener("click", () => {
  elTitle.value = "";
  elDesc.value = "";
  elTitle.focus();
  clearError();
  setStatus("Cleared", "ok");
});

document.getElementById("createForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    clearError();

    const title = elTitle.value.trim();
    const description = elDesc.value.trim();

    if (!title) {
      elTitle.focus();
      elErr.textContent = "Please enter an exercise name.";
      setStatus("Title required", "err");
      return;
    }

    setStatus("Saving...", "warn");

    await apiFetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, completed: false }),
    });

    elTitle.value = "";
    elDesc.value = "";
    elTitle.focus();

    setStatus("Workout saved", "ok");
    await refresh();
  } catch (err) {
    showError(err);
  }
});

elSearch.addEventListener("input", () => render());

// Ctrl+Enter to submit from textarea
elDesc.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    document.getElementById("createForm").requestSubmit();
  }
});

// Init
renderTemplates();
refresh();
