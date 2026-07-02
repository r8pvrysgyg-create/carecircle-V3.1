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

setupAuth(
  async (user, profile) => {
    appState.currentUser = user;
    appState.currentProfile = profile;

    await Promise.all([loadAppointments(), loadTasks(), loadNotes()]);
    renderDashboard();
    renderFamily();
    await loadAdminPanel();
  },
  () => {
    appState.currentUser = null;
    appState.currentProfile = null;
    appState.appointments = [];
    appState.tasks = [];
    appState.notes = [];
    appState.users = [];

    document.querySelectorAll("#appContent div[id]").forEach(el => {
      if (el.id) el.innerHTML = "";
    });
  }
);
