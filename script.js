const screens = {
  intake: document.querySelector("#screen-intake"),
  information: document.querySelector("#screen-information"),
  support: document.querySelector("#screen-support"),
  roleplay: document.querySelector("#screen-roleplay"),
  debrief: document.querySelector("#screen-debrief"),
};

const state = {
  profile: {
    teacherName: "Ms. Carter",
    gradeLevel: "4th grade",
    gradeBand: "3rd - 5th",
  },
  inputMode: "text",
  outputMode: "text",
  helpMode: "roleplay",
  urgency: "single",
  selectedPrompt: "",
  needsClarification: false,
  intake: {},
  triage: null,
  transcript: [],
  turn: 0,
  harshCount: 0,
  recognition: null,
  isListening: false,
  detailsRecognition: null,
  isListeningForDetails: false,
};

const categoryLabels = {
  behavior: "Behavior support",
  relationship: "Relationship-building",
  peer: "Peer conflict",
  safety: "Safety or escalation",
};

const goalLabels = {
  "connect-boundary-redirect": "Connect, boundary, redirect",
  "de-escalation": "De-escalation",
  "relationship-repair": "Relationship repair",
  "peer-mediation": "Peer conflict mediation",
  information: "Information",
  "parent-selection": "Parent/guardian conversation option",
};

const helpModeLabels = {
  roleplay: "Roleplay",
  information: "Information",
  parent: "Parent/guardian conversation",
};

const urgencyLabels = {
  single: "Single Occurrence",
  "repeated-pattern": "Repeated Occurrence",
};

const standardPrompts = {
  "calling-out": {
    challenge: "A student keeps calling out answers or comments during instruction, and other students are starting to react.",
    moment: "Whole-group instruction",
    skillGoal: "connect-boundary-redirect",
  },
  "off-task": {
    challenge: "A student is not starting the assignment and keeps looking around or distracting nearby classmates.",
    moment: "Independent work time",
    skillGoal: "connect-boundary-redirect",
  },
  "work-refusal": {
    challenge: "A student says they are not doing the work and puts their head down or pushes the assignment away.",
    moment: "Beginning of an independent assignment",
    skillGoal: "de-escalation",
  },
  "side-conversation": {
    challenge: "Two students continue a side conversation while I am giving directions to the class.",
    moment: "Teacher directions before an activity",
    skillGoal: "connect-boundary-redirect",
  },
  transition: {
    challenge: "Students are slow to move into the next activity, and the class noise level rises during the transition.",
    moment: "Transition between activities",
    skillGoal: "connect-boundary-redirect",
  },
  "peer-conflict": {
    challenge: "Two students are arguing about who caused the problem and both want me to take their side.",
    moment: "Partner or group work",
    skillGoal: "peer-mediation",
  },
  disrespect: {
    challenge: "A student responds to a direction with a rude comment or challenges me in front of the class.",
    moment: "During classroom directions",
    skillGoal: "relationship-repair",
  },
  "attention-seeking": {
    challenge: "A student makes jokes or dramatic comments to get classmates to laugh during the lesson.",
    moment: "Whole-group lesson",
    skillGoal: "connect-boundary-redirect",
  },
  other: {
    challenge: "",
    moment: "",
    skillGoal: "",
  },
};

const documentGuidance = {
  behavior: {
    title: "Classroom behavior guidance",
    summary:
      "Use a calm classroom response first: reinforce expectations, protect student dignity, and return the student to the learning task. If positive classroom strategies are exhausted, follow campus escalation steps.",
    points: [
      "The handbook describes a structured, safe, and orderly environment where respect and courtesy are expected.",
      "Positive discipline is used to reinforce appropriate behavior and maintain a calm classroom environment.",
      "Students are expected to conduct themselves honestly, responsibly, respectfully, and maturely.",
    ],
    sources: ["HTML_Handbook.md: Student Code of Conduct", "HTML_Handbook.md: Positive discipline"],
  },
  relationship: {
    title: "Relationship and dignity guidance",
    summary:
      "Keep correction respectful and private when possible. Use communication that protects student dignity while making the classroom expectation clear.",
    points: [
      "Respect and courtesy are recurring student expectations in the handbook.",
      "Positive discipline should be used to reinforce appropriate behavior.",
      "Teacher response should avoid public shaming and keep the student connected to learning.",
    ],
    sources: ["HTML_Handbook.md: Student expectations", "HTML_Handbook.md: Positive discipline"],
  },
  peer: {
    title: "Peer conflict guidance",
    summary:
      "Separate blame from facts, keep students safe, and use respectful-conduct expectations to guide the next step.",
    points: [
      "The handbook includes expectations for respectful, responsible conduct.",
      "Bullying, harassment, or threats should be escalated through approved procedures.",
      "For ordinary conflict, preserve dignity and give students a structured way back to the task.",
    ],
    sources: ["HTML_Handbook.md: Student Code of Conduct", "HTML_Handbook.md: Bullying and harassment"],
  },
  safety: {
    title: "Safety and escalation guidance",
    summary:
      "Do not roleplay safety, abuse, harassment, threat, weapon, or medical-emergency scenarios. Use campus leadership and approved reporting procedures.",
    points: [
      "The handbook states that student and staff safety is of utmost importance.",
      "Threats are taken seriously and reported to school administration under the threat assessment process.",
      "Bullying and harassment reports are taken seriously and investigated through school procedures.",
    ],
    sources: ["HTML_Handbook.md: Threats", "HTML_Handbook.md: Bullying and harassment", "Campus procedures"],
  },
  privacy: {
    title: "Privacy reminder",
    summary:
      "Keep student names, private identifiers, and sensitive records out of the tool. Use de-identified details for practice or information lookup.",
    points: [
      "FERPA protects the privacy of student education records.",
      "The prototype should not save transcripts or request student names.",
    ],
    sources: ["HTML_Handbook.md: FERPA", "Project privacy guardrail"],
  },
};

const intakeForm = document.querySelector("#intake-form");
const challengeField = document.querySelector("#challenge-details");
const detailsMicButton = document.querySelector("#details-mic-button");
const urgencyField = document.querySelector("#urgency");
const textComposer = document.querySelector("#text-composer");
const voiceComposer = document.querySelector("#voice-composer");
const teacherResponse = document.querySelector("#teacher-response");
const scenarioTitle = document.querySelector("#scenario-title");
const scenarioDescription = document.querySelector("#scenario-description");
const scenarioStudentLine = document.querySelector("#scenario-student-line");
const scenarioTeacherLine = document.querySelector("#scenario-teacher-line");
const scenarioFollowupLine = document.querySelector("#scenario-followup-line");
const recordingState = document.querySelector("#recording-state");
const transcriptText = document.querySelector("#transcript-text");
const recordButton = document.querySelector("#record-button");

intakeForm.addEventListener("submit", handleIntake);
document.querySelector("#information-roleplay").addEventListener("click", practiceFromInformation);
document.querySelector("#send-response").addEventListener("click", sendTextResponse);
document.querySelector("#end-practice").addEventListener("click", showDebrief);
document.querySelector("#retry-practice").addEventListener("click", startRoleplay);
document.querySelector("#finish-button").addEventListener("click", completeSession);
document.querySelector("#speak-instead").addEventListener("click", () => setInputMode("voice"));
document.querySelector("#type-instead").addEventListener("click", () => setInputMode("text"));
document.querySelector("#try-again").addEventListener("click", resetVoiceDraft);
document.querySelector("#use-response").addEventListener("click", sendVoiceResponse);
recordButton.addEventListener("click", startVoiceInput);
detailsMicButton.addEventListener("click", toggleDetailsVoiceInput);
urgencyField.addEventListener("change", (event) => setUrgency(event.target.value));

document.querySelectorAll("[data-go]").forEach((button) => {
  button.addEventListener("click", () => showScreen(button.dataset.go));
});

document.querySelectorAll("[data-prompt]").forEach((button) => {
  button.addEventListener("click", () => applyStandardPrompt(button.dataset.prompt));
});

setUrgency(state.urgency);
setHelpMode(state.helpMode);
setInputMode(state.inputMode);
applyStandardPrompt("calling-out");

function handleIntake(event) {
  event.preventDefault();
  stopDetailsVoiceInput();

  const clarifyAnswer = document.querySelector("#clarify-answer").value.trim();
  const intake = {
    gradeBand: state.profile.gradeBand,
    challenge: challengeField.value.trim(),
    moment: selectedPromptMoment(),
    urgency: urgencyField.value,
    helpMode: state.helpMode,
    skillGoal:
      state.helpMode === "roleplay"
        ? selectedPromptSkillGoal()
        : state.helpMode === "parent"
          ? "parent-selection"
          : "information",
  };

  if (state.needsClarification && clarifyAnswer) {
    intake.challenge = `${intake.challenge} ${clarifyAnswer}`;
  }

  state.intake = intake;
  const triage = triageScenario(intake);
  state.triage = triage;
  if (triage.skillGoal) {
    state.intake.skillGoal = triage.skillGoal;
  }

  if (triage.status === "clarify") {
    state.needsClarification = true;
    document.querySelector("#clarify-question").textContent = triage.question;
    document.querySelector("#clarify-box").hidden = false;
    document.querySelector("#clarify-answer").focus();
    return;
  }

  state.needsClarification = false;
  document.querySelector("#clarify-box").hidden = true;
  document.querySelector("#clarify-answer").value = "";

  if (triage.status === "support") {
    showSupportNotice(triage.message);
    return;
  }

  startSelectedSupport();
}

function triageScenario(intake) {
  const text =
    `${state.profile.gradeLevel} ${intake.gradeBand} ${intake.challenge} ${intake.moment} ${intake.urgency} ${intake.helpMode} ${intake.skillGoal}`.toLowerCase();
  const sensitivePatterns = [
    "self-harm",
    "suicide",
    "weapon",
    "gun",
    "knife",
    "assault",
    "abuse",
    "neglect",
    "sexual",
    "threat",
    "blood",
    "medical emergency",
    "racist",
    "harassment",
  ];
  const hasSensitiveContent = sensitivePatterns.some((pattern) => text.includes(pattern));

  if (hasSensitiveContent && intake.helpMode !== "information") {
    return {
      status: "support",
      message:
        "This situation needs human and policy support before practice. Keep students safe, contact campus leadership, and use approved reporting or documentation channels before turning it into a roleplay.",
    };
  }

  const sparseChallenge = intake.challenge.split(/\s+/).filter(Boolean).length < 6;
  const sparseMoment = intake.moment.split(/\s+/).filter(Boolean).length < 2;
  if (sparseChallenge || sparseMoment) {
    return {
      status: "clarify",
      question: "What does the student do or say in the moment you want help with?",
    };
  }

  const category = hasSensitiveContent ? "safety" : detectCategory(text);
  const roleplayGoal = intake.skillGoal || suggestRoleplayGoal(category);
  const focus =
    intake.helpMode === "information"
      ? buildInformationFocus(category)
      : intake.helpMode === "parent"
        ? "Parent/guardian conversation option selected for this repeated occurrence. This prototype does not generate that conversation yet."
        : buildFocus(category, roleplayGoal);
  const setupVerb =
    intake.helpMode === "information"
      ? "Review information for"
      : intake.helpMode === "parent"
        ? "Flag parent/guardian conversation option for"
        : `Practice a ${categoryLabels[category].toLowerCase()} response during`;

  return {
    status: "ready",
    helpMode: intake.helpMode,
    urgency: intake.urgency,
    category,
    focus,
    skillGoal: roleplayGoal,
    setup: `${setupVerb} ${intake.moment}. The student moment is: ${intake.challenge}`,
  };
}

function detectCategory(text) {
  const peerTerms = ["argument", "peer", "partner", "group work", "teasing", "excluded", "friend", "conflict"];
  const relationshipTerms = ["rapport", "relationship", "trust", "angry", "shutdown", "disrespect", "rude", "defiant"];

  if (peerTerms.some((term) => text.includes(term))) return "peer";
  if (relationshipTerms.some((term) => text.includes(term))) return "relationship";
  return "behavior";
}

function buildFocus(category, skillGoal) {
  if (category === "safety") return "Pause practice and follow safety, reporting, and campus escalation procedures.";
  if (skillGoal === "peer-mediation" || category === "peer") {
    return "Name the shared expectation, separate blame from facts, and give both students a next step.";
  }
  if (skillGoal === "relationship-repair" || category === "relationship") {
    return "Keep dignity intact, acknowledge emotion, and invite the student back into the learning task.";
  }
  if (skillGoal === "de-escalation") return "Lower the temperature, use a private voice, and offer one calm choice.";
  return "Connect with the student, state the boundary, and redirect to the next learning action.";
}

function buildInformationFocus(category) {
  if (category === "safety") return "Find the relevant safety, reporting, and escalation guidance in project documents.";
  if (category === "peer") return "Find peer-conflict, bullying, harassment, and respectful-conduct guidance in project documents.";
  if (category === "relationship") return "Find dignity, respect, communication, and classroom-conduct guidance in project documents.";
  return "Find classroom behavior, positive discipline, and student-expectation guidance in project documents.";
}

function setUrgency(urgency) {
  if (!urgencyLabels[urgency]) return;

  state.urgency = urgency;
  urgencyField.value = urgency;
  if (urgency !== "repeated-pattern" && state.helpMode === "parent") {
    setHelpMode("roleplay");
  }
}

function setHelpMode(mode) {
  if (!helpModeLabels[mode]) return;
  if (mode === "parent" && state.urgency !== "repeated-pattern") return;

  state.helpMode = mode;
}

function setInputMode(mode) {
  if (!["text", "voice"].includes(mode)) return;

  state.inputMode = mode;
  textComposer.hidden = mode !== "text";
  voiceComposer.hidden = mode !== "voice";
  document.querySelector("#mode-tag-roleplay").textContent = mode === "voice" ? "Voice input" : "Text input";
  teacherResponse.placeholder =
    mode === "voice" ? "Use voice input, then review or edit the draft before sending." : "Type what you would say to the student.";

  if (mode === "text") stopVoiceInput();

}

function selectedPromptMoment() {
  const prompt = standardPrompts[state.selectedPrompt];
  return prompt?.moment || "Teacher-described classroom challenge";
}

function selectedPromptSkillGoal() {
  const prompt = standardPrompts[state.selectedPrompt];
  return prompt?.skillGoal || "";
}

function applyStandardPrompt(promptKey) {
  const prompt = standardPrompts[promptKey];
  if (!prompt) return;

  state.selectedPrompt = promptKey;
  challengeField.value = prompt.challenge;
  document.querySelector("#clarify-box").hidden = true;
  document.querySelector("#clarify-answer").value = "";
  state.needsClarification = false;

  document.querySelectorAll("[data-prompt]").forEach((button) => {
    const selected = button.dataset.prompt === promptKey;
    button.classList.toggle("is-selected", selected);
    button.setAttribute("aria-pressed", String(selected));
  });

  if (promptKey === "other") {
    challengeField.placeholder = "Describe the classroom challenge in your own words. Keep names and sensitive details out.";
    challengeField.focus();
  } else {
    challengeField.placeholder = "Add or adjust details about what the student or class is doing. Keep names and sensitive details out.";
  }
}

function startSelectedSupport() {
  if (state.triage?.helpMode === "information") {
    showInformation();
    return;
  }

  if (state.triage?.helpMode === "parent") {
    showSupportNotice(
      "Parent/guardian conversation option selected. This prototype flags the route for a repeated occurrence, but does not create the parent conversation yet."
    );
    return;
  }

  startRoleplay();
}

function showSupportNotice(message) {
  document.querySelector("#support-message").textContent = message;
  showScreen("support");
}

function showInformation() {
  const greeting = buildCoachGreeting("information");
  renderDocumentGuidance(greeting);
  showScreen("information");
  speakCoachGreeting(greeting);
}

function renderDocumentGuidance(greeting) {
  const guidance = documentGuidance[state.triage.category] || documentGuidance.behavior;
  const sections = [guidance, documentGuidance.privacy];
  const sectionHtml = sections.map(renderGuidanceCard).join("");

  document.querySelector("#guidance-content").innerHTML = `
    <section class="guidance-card coach-greeting">
      <p class="eyebrow">Coach greeting</p>
      <p>${escapeHtml(greeting)}</p>
    </section>
    <section class="guidance-card">
      <p class="eyebrow">Request</p>
      <h3>${escapeHtml(categoryLabels[state.triage.category])}</h3>
      <p>${escapeHtml(state.triage.setup)}</p>
    </section>
    ${sectionHtml}
    <p class="document-note">This is a project-document summary for teacher support. For campus-specific action, confirm the current procedure with school leadership.</p>
  `;
}

function renderGuidanceCard(section) {
  return `
    <section class="guidance-card">
      <h3>${escapeHtml(section.title)}</h3>
      <p>${escapeHtml(section.summary)}</p>
      <ul>
        ${section.points.map((point) => `<li>${escapeHtml(point)}</li>`).join("")}
      </ul>
      <div class="source-list">
        ${section.sources.map((source) => `<span>${escapeHtml(source)}</span>`).join("")}
      </div>
    </section>
  `;
}

function practiceFromInformation() {
  if (state.triage?.category === "safety") {
    showSupportNotice(
      "This looks like a safety or reporting issue. Use the document guidance and contact campus leadership before practicing a student interaction."
    );
    return;
  }

  state.helpMode = "roleplay";
  setHelpMode("roleplay");
  const skillGoal = suggestRoleplayGoal(state.triage.category);
  state.intake.helpMode = "roleplay";
  state.intake.skillGoal = skillGoal;
  state.triage = triageScenario(state.intake);

  if (state.triage.status === "ready") {
    startRoleplay();
  }
}

function suggestRoleplayGoal(category) {
  if (category === "peer") return "peer-mediation";
  if (category === "relationship") return "relationship-repair";
  return "connect-boundary-redirect";
}

function startRoleplay() {
  state.transcript = [];
  state.turn = 0;
  state.harshCount = 0;
  teacherResponse.value = "";
  resetVoiceDraft();
  setInputMode(state.inputMode);

  document.querySelector("#roleplay-title").textContent = `Scenario: ${categoryLabels[state.triage.category]}`;
  renderPracticeScenario();
  document.querySelector("#coach-tip").textContent = state.triage.focus;
  document.querySelector("#sample-line").textContent = sampleLineForCategory(state.triage.category);

  const greeting = buildCoachGreeting("roleplay");
  addMessage("Coach", greeting);
  speakCoachGreeting(greeting);
  addMessage("Student", openingStudentLine());
  addMessage("Coach", openingMentorTip());
  showScreen("roleplay");
  teacherResponse.focus();
}

function buildCoachGreeting(kind) {
  const inputLabel = state.inputMode === "voice" ? "voice" : "text";
  const outputLabel = state.outputMode === "voice" ? "I can read the greeting aloud" : "I will keep my coaching on screen";

  if (kind === "information") {
    return `Hi ${state.profile.teacherName}. I can help you look through the project documents for the guidance that fits this classroom moment. You can use ${inputLabel} for your request, and ${outputLabel}.`;
  }

  return `Hi ${state.profile.teacherName}. We will practice this classroom moment together. You can respond by ${inputLabel}, and ${outputLabel}.`;
}

function speakCoachGreeting(greeting) {
  if (state.outputMode !== "voice" || !window.speechSynthesis) return;

  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(greeting);
  utterance.rate = 0.94;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

function openingStudentLine() {
  const category = state.triage.category;
  if (category === "peer") return "They started it. I am not working with them.";
  if (category === "relationship") return "Why are you always picking on me?";
  return "But I knew the answer. Why can't I just say it?";
}

function openingMentorTip() {
  const goal = goalLabels[state.intake.skillGoal] || "Connect, boundary, redirect";
  return `${goal}: start warm, keep it brief, and give the student a clear way back into the lesson.`;
}

function sampleLineForCategory(category) {
  if (category === "peer") return "\"I am going to hear both sides, then we will choose the next work step.\"";
  if (category === "relationship") return "\"I want to understand what feels hard, and I still need us back with the task.\"";
  return "\"I want to hear your thinking, and I need one voice at a time.\"";
}

function renderPracticeScenario() {
  const category = state.triage.category;
  const exchange = scenarioExchangeForCategory(category);
  const moment = state.intake.moment || "Classroom moment";
  const challenge = state.intake.challenge || "A student needs a calm, clear response before returning to the learning task.";

  scenarioTitle.textContent = `${categoryLabels[category]} scenario`;
  scenarioDescription.textContent = `${moment}: ${challenge}`;
  scenarioStudentLine.textContent = exchange.student;
  scenarioTeacherLine.textContent = exchange.teacher;
  scenarioFollowupLine.textContent = exchange.followup;
}

function scenarioExchangeForCategory(category) {
  if (category === "peer") {
    return {
      student: "They started it. I am not working with them.",
      teacher: "I am going to hear both sides, then we will choose the next work step.",
      followup: "Fine, but I want to explain what happened.",
    };
  }

  if (category === "relationship") {
    return {
      student: "Why are you always picking on me?",
      teacher: "I want to understand what feels hard, and I still need us back with the task.",
      followup: "Okay, but I still think you are mad at me.",
    };
  }

  return {
    student: "But I knew the answer. Why can't I just say it?",
    teacher: "I want to hear your thinking, and I need one voice at a time.",
    followup: "Okay. Can I write it down if I know it?",
  };
}

function sendTextResponse() {
  const reply = teacherResponse.value.trim();
  processTeacherReply(reply);
  teacherResponse.value = "";
}

function sendVoiceResponse() {
  const reply = transcriptText.textContent.trim();
  processTeacherReply(reply === "Press record to draft a spoken response." ? "" : reply);
  resetVoiceDraft();
}

function processTeacherReply(reply) {
  stopVoiceInput();

  if (!reply) {
    addMessage("Coach", "Starter line: I want to hear your thinking, and I need one voice at a time. Raise your hand for the next one.");
    return;
  }

  addMessage("You", reply);
  const review = reviewTeacherReply(reply);
  addMessage("Student", nextStudentLine(review));
  addMessage("Coach", review.tip);

  state.turn += 1;
  if (state.turn >= 3) showDebrief();
}

function reviewTeacherReply(reply) {
  const text = reply.toLowerCase();
  const isHarsh = ["shut up", "because i said", "office now", "embarrass", "everyone look", "detention", "punish"].some((term) =>
    text.includes(term)
  );

  if (isHarsh) {
    state.harshCount += 1;
    return {
      quality: "harsh",
      tip:
        "Keep the correction private and dignified. Try: I can see you want to join in, and I need one voice so everyone can think. Show me a raised hand for the next question.",
    };
  }

  const hasConnect = ["i hear", "i see", "sounds", "understand", "want", "frustrat", "excited"].some((term) => text.includes(term));
  const hasBoundary = ["need", "expect", "one voice", "safe", "respect", "class", "lesson"].some((term) => text.includes(term));
  const hasRedirect = ["raise", "try", "next", "choice", "first", "then", "show me", "write"].some((term) => text.includes(term));

  if (hasConnect && hasBoundary && hasRedirect) {
    return {
      quality: "strong",
      tip: "Strong mentor move: you protected dignity, named the expectation, and gave a concrete next action.",
    };
  }

  const tips = [];
  if (!hasConnect) tips.push("add a short connection");
  if (!hasBoundary) tips.push("name the expectation");
  if (!hasRedirect) tips.push("give one next action");

  return {
    quality: "developing",
    tip: `Good start. For the next turn, ${formatTipList(tips)}.`,
  };
}

function formatTipList(tips) {
  if (tips.length === 1) return tips[0];
  if (tips.length === 2) return `${tips[0]} and ${tips[1]}`;
  return `${tips[0]}, ${tips[1]}, and ${tips[2]}`;
}

function nextStudentLine(review) {
  const category = state.triage.category;

  if (review.quality === "strong") {
    if (category === "peer") return "Fine. I can tell what happened without yelling.";
    if (category === "relationship") return "Okay, but I still think you are mad at me.";
    return "Okay. Can I write it down if I know it?";
  }

  if (review.quality === "harsh") {
    if (category === "peer") return "See? Nobody listens to me anyway.";
    if (category === "relationship") return "This is exactly what I mean.";
    return "Whatever. I was just answering.";
  }

  if (category === "peer") return "But they are being annoying.";
  if (category === "relationship") return "I do not want to do this right now.";
  return "But I am not trying to be rude.";
}

function showDebrief() {
  stopVoiceInput();
  renderDebrief();
  showScreen("debrief");
}

function renderDebrief() {
  const teacherTurns = state.transcript.filter((entry) => entry.speaker === "You").length;
  const category = categoryLabels[state.triage.category].toLowerCase();
  const harshNote =
    state.harshCount > 0
      ? "One moment drifted toward public correction. In a real classroom, move consequences private and return to a calm next step."
      : "You kept the practice focused on dignity and a next action.";

  document.querySelector("#debrief-grid").innerHTML = `
    <section class="debrief-section">
      <h3>What worked</h3>
      <p>You completed ${teacherTurns} teacher ${teacherTurns === 1 ? "turn" : "turns"} in a ${category} scenario.</p>
    </section>
    <section class="debrief-section">
      <h3>Try next time</h3>
      <p>${harshNote}</p>
    </section>
    <section class="debrief-section phrase">
      <h3>Retry prompt</h3>
      <p>Make the response one sentence shorter while keeping connection, boundary, and redirect visible.</p>
    </section>
  `;
}

function completeSession() {
  const confidence = document.querySelector("input[name='confidence']:checked").value;
  document.querySelector("#debrief-grid").innerHTML = `
    <section class="debrief-section phrase">
      <h3>Session complete</h3>
      <p>Confidence check recorded locally as ${confidence} out of 5. No transcript was saved. Refreshing the page clears this practice.</p>
    </section>
  `;
}

function toggleDetailsVoiceInput() {
  const SpeechRecognition = getSpeechRecognition();

  if (!SpeechRecognition) {
    updateDetailsVoiceStatus("Voice entry is not available in this browser. You can type details instead.");
    challengeField.focus();
    return;
  }

  if (!state.detailsRecognition) {
    state.detailsRecognition = new SpeechRecognition();
    state.detailsRecognition.continuous = false;
    state.detailsRecognition.interimResults = true;
    state.detailsRecognition.lang = "en-US";

    state.detailsRecognition.onstart = () => {
      state.isListeningForDetails = true;
      detailsMicButton.classList.add("is-recording");
      detailsMicButton.setAttribute("aria-pressed", "true");
      updateDetailsVoiceStatus("Listening for details. Avoid student names or private identifiers.");
    };

    state.detailsRecognition.onresult = (event) => {
      let draft = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        draft += event.results[index][0].transcript;
      }
      if (draft.trim()) {
        challengeField.value = draft.trim();
      }
    };

    state.detailsRecognition.onerror = () => {
      state.isListeningForDetails = false;
      detailsMicButton.classList.remove("is-recording");
      detailsMicButton.setAttribute("aria-pressed", "false");
      updateDetailsVoiceStatus("Voice entry stopped. You can type or try the microphone again.");
    };

    state.detailsRecognition.onend = () => {
      state.isListeningForDetails = false;
      detailsMicButton.classList.remove("is-recording");
      detailsMicButton.setAttribute("aria-pressed", "false");
      updateDetailsVoiceStatus("Review and edit the dictated details before building support.");
      challengeField.focus();
    };
  }

  if (state.isListeningForDetails) {
    stopDetailsVoiceInput();
  } else {
    stopVoiceInput();
    state.detailsRecognition.start();
  }
}

function updateDetailsVoiceStatus(message) {
  detailsMicButton.setAttribute("title", message);
}

function stopDetailsVoiceInput() {
  if (!state.detailsRecognition || !state.isListeningForDetails) {
    state.isListeningForDetails = false;
    detailsMicButton.classList.remove("is-recording");
    detailsMicButton.setAttribute("aria-pressed", "false");
    return;
  }

  state.detailsRecognition.stop();
}

function getSpeechRecognition() {
  return window.SpeechRecognition || window.webkitSpeechRecognition;
}

function startVoiceInput() {
  const SpeechRecognition = getSpeechRecognition();

  if (!SpeechRecognition) {
    recordingState.textContent = "Voice input is not available in this browser.";
    transcriptText.textContent = "I'll check in with you in two minutes. For now, track with the class.";
    return;
  }

  if (!state.recognition) {
    state.recognition = new SpeechRecognition();
    state.recognition.continuous = false;
    state.recognition.interimResults = true;
    state.recognition.lang = "en-US";

    state.recognition.onstart = () => {
      state.isListening = true;
      recordButton.classList.add("is-recording");
      recordingState.textContent = "Listening...";
      transcriptText.textContent = "Listening for your calm response.";
    };

    state.recognition.onresult = (event) => {
      let draft = "";
      for (let index = event.resultIndex; index < event.results.length; index += 1) {
        draft += event.results[index][0].transcript;
      }
      transcriptText.textContent = draft.trim();
    };

    state.recognition.onerror = () => {
      state.isListening = false;
      recordButton.classList.remove("is-recording");
      recordingState.textContent = "Voice input stopped. You can type or try voice again.";
    };

    state.recognition.onend = () => {
      state.isListening = false;
      recordButton.classList.remove("is-recording");
      recordingState.textContent = "Review the drafted response, edit if needed, then use it.";
    };
  }

  if (state.isListening) {
    stopVoiceInput();
  } else {
    state.recognition.start();
  }
}

function stopVoiceInput() {
  if (!state.recognition || !state.isListening) {
    state.isListening = false;
    recordButton.classList.remove("is-recording");
    return;
  }

  state.recognition.stop();
}

function resetVoiceDraft() {
  stopVoiceInput();
  recordingState.textContent = "Ready to record";
  transcriptText.textContent = "Press record to draft a spoken response.";
}

function addMessage(speaker, text) {
  state.transcript.push({ speaker, text });
}

function showScreen(name) {
  Object.entries(screens).forEach(([key, screen]) => {
    screen.classList.toggle("is-active", key === name);
  });

  const railName = name === "support" ? "intake" : name;
  document.querySelectorAll(".rail-dot").forEach((dot) => {
    dot.classList.toggle("is-active", dot.dataset.rail === railName);
  });

  window.scrollTo({ top: 0, behavior: "smooth" });
}

function capitalize(value) {
  return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
