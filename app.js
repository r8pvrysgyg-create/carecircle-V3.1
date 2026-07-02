import { setupAuth } from "./auth.js";
import { setupNavigation } from "./ui.js";
import { addNote, loadNotes } from "./notes.js";
import { addAppointment, loadAppointments } from "./appointments.js";
import { addTask, loadTasks } from "./tasks.js";
import { renderDashboard } from "./dashboard.js";
import { renderFamily } from "./family.js";
import { setupSearch } from "./search.js";
import { appState } from "./state.js";

document.getElementById("addNote").onclick = addNote;
document.getElementById("addAppt").onclick = addAppointment;
document.getElementById("addTask").onclick = addTask;

setupNavigation();
setupSearch();

setupAuth(
  async () => {
    await Promise.all([loadAppointments(), loadTasks(), loadNotes()]);
    renderDashboard();
    renderFamily();
  },
  () => {
    appState.appointments = [];
    appState.tasks = [];
    appState.notes = [];
    document.querySelectorAll("#appContent div[id]").forEach(el => {
      if (el.id) el.innerHTML = "";
    });
  }
);
