import { setupAuth } from "./auth.js";
import { setupNavigation } from "./ui.js";
import { addNote, loadNotes } from "./notes.js";
import { addAppointment, loadAppointments } from "./appointments.js";
import { addTask, loadTasks } from "./tasks.js";
import { renderDashboard } from "./dashboard.js";
import { renderFamily } from "./family.js";
import { setupSearch } from "./search.js";
import { setupAdmin, loadAdminPanel } from "./admin.js";
import { appState } from "./state.js";

document.getElementById("addNote").onclick = addNote;
document.getElementById("addAppt").onclick = addAppointment;
document.getElementById("addTask").onclick = addTask;

setupNavigation();
setupSearch();
setupAdmin();

async function loadEverything(user, profile) {
  appState.currentUser = user;
  appState.currentProfile = profile;

  await Promise.all([
    loadAppointments(),
    loadTasks(),
    loadNotes()
  ]);

  renderDashboard();
  renderFamily();

  if (profile && profile.role === "admin") {
    await loadAdminPanel();
  }
}

function clearEverything() {
  appState.currentUser = null;
  appState.currentProfile = null;
  appState.appointments = [];
  appState.tasks = [];
  appState.notes = [];
  appState.users = [];

  const idsToClear = [
    "appointments",
    "todayAppointments",
    "tasks",
    "openTasks",
    "notes",
    "recentNotes",
    "familyGrid",
    "searchResults",
    "adminPanel"
  ];

  idsToClear.forEach(id => {
    const el = document.getElementById(id);
    if (el) el.innerHTML = "";
  });
}

setupAuth(
  async (user, profile) => {
    await loadEverything(user, profile);
  },
  () => {
    clearEverything();
  }
);
