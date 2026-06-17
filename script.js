const screens = {
  intake: document.querySelector("#screen-intake"),
  confirm: document.querySelector("#screen-confirm"),
  roleplay: document.querySelector("#screen-roleplay"),
  debrief: document.querySelector("#screen-debrief"),
};

const exampleScenario = {
  grade: "6-8",
  moment: "A student keeps calling out during direct instruction, and I'm losing the flow of the lesson.",
  goal: "Setting a boundary while keeping the relationship positive.",
};

const state = {
  grade: "6-8",
  moment: exampleScenario.moment,
  goal: exampleScenario.goal,
  mode: "text",
};

const intakeForm = document.querySelector("#intake-form");
const gradeField = document.querySelector("#grade-level");
const momentField = document.querySelector("#classroom-moment");
const goalField = document.querySelector("#practice-goal");
const modeInputs = document.querySelectorAll("input[name='practice-mode']");
const segmentLabels = document.querySelectorAll(".segment");
const textComposer = document.querySelector("#text-composer");
const voiceComposer = document.querySelector("#voice-composer");
const teacherResponse = document.querySelector("#teacher-response");
const chatThread = document.querySelector("#chat-thread");
const recordingState = document.querySelector("#recording-state");
const transcriptText = document.querySelector("#transcript-text");
const recordButton = document.querySelector("#record-button");

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle("is-active", key === name);
  });

  document.querySelectorAll(".rail-dot").forEach((dot) => {
    dot.classList.toggle("is-active", dot.dataset.rail === name);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function selectedModeLabel() {
  return state.mode === "voice" ? "Voice practice" : "Text practice";
}

function syncStateFromForm() {
  state.grade = gradeField.value;
  state.moment = momentField.value.trim() || state.moment;
  state.goal = goalField.value;
  state.mode = document.querySelector("input[name='practice-mode']:checked").value;
}

function renderScenario() {
  document.querySelector("#grade-tag").textContent = `Grade ${state.grade}`;
  document.querySelector("#confirm-moment").textContent = state.moment;
  document.querySelector("#confirm-focus").textContent = state.goal;
  document.querySelector("#mode-tag-confirm").textContent = selectedModeLabel();
  document.querySelector("#mode-tag-roleplay").textContent = selectedModeLabel();
  textComposer.hidden = state.mode !== "text";
  voiceComposer.hidden = state.mode !== "voice";
}

function updateSegments() {
  segmentLabels.forEach((label) => {
    const input = label.querySelector("input");
    label.classList.toggle("is-selected", input.checked);
  });
}

function addMessage(speaker, text) {
  const row = document.createElement("div");
  row.className = `message-row ${speaker === "You" ? "teacher" : "student"}`;

  const label = document.createElement("p");
  label.className = "message-label";
  label.textContent = speaker;

  const bubble = document.createElement("div");
  bubble.className = "message-bubble";
  bubble.textContent = text;

  row.append(label, bubble);
  chatThread.append(row);
  chatThread.scrollTop = chatThread.scrollHeight;
}

document.querySelector("#use-example").addEventListener("click", () => {
  gradeField.value = exampleScenario.grade;
  momentField.value = exampleScenario.moment;
  goalField.value = exampleScenario.goal;
  document.querySelector("input[value='text']").checked = true;
  updateSegments();
});

modeInputs.forEach((input) => {
  input.addEventListener("change", updateSegments);
});

intakeForm.addEventListener("submit", (event) => {
  event.preventDefault();
  syncStateFromForm();
  renderScenario();
  showScreen("confirm");
});

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => {
    if (button.dataset.go === "roleplay") {
      syncStateFromForm();
      renderScenario();
    }
    showScreen(button.dataset.go);
  });
});

document.querySelector("#speak-instead").addEventListener("click", () => {
  state.mode = "voice";
  document.querySelector("input[value='voice']").checked = true;
  updateSegments();
  renderScenario();
});

document.querySelector("#type-instead").addEventListener("click", () => {
  state.mode = "text";
  document.querySelector("input[value='text']").checked = true;
  updateSegments();
  renderScenario();
});

document.querySelector("#send-response").addEventListener("click", () => {
  const response = teacherResponse.value.trim() || "I'll check in with you in two minutes. For now, track with the class.";
  addMessage("You", response);
  teacherResponse.value = "";

  window.setTimeout(() => {
    addMessage("Student", "Okay. I'll follow along for now.");
  }, 300);
});

recordButton.addEventListener("click", () => {
  recordButton.classList.add("is-recording");
  recordingState.textContent = "Recording...";
  transcriptText.textContent = "Listening for your calm redirection.";

  window.setTimeout(() => {
    recordButton.classList.remove("is-recording");
    recordingState.textContent = "Recording complete";
    transcriptText.textContent = "I'll check in with you in two minutes. For now, track with the class.";
  }, 900);
});

document.querySelector("#try-again").addEventListener("click", () => {
  recordButton.classList.remove("is-recording");
  recordingState.textContent = "Ready to record";
  transcriptText.textContent = "Press record to simulate a spoken response.";
});

document.querySelector("#use-response").addEventListener("click", () => {
  addMessage("You", transcriptText.textContent);
  window.setTimeout(() => {
    addMessage("Student", "Okay. I'll track with the class.");
  }, 300);
});

document.querySelector("#finish-button").addEventListener("click", () => {
  showScreen("intake");
});

momentField.value = state.moment;
renderScenario();
updateSegments();
