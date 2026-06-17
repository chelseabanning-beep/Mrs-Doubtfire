# Classroom Coach Revised Plan

## Summary
Build a calm, professional web app where new teachers enter their own classroom challenge, then Classroom Coach turns it into safe support: roleplay practice, project-document guidance, or a future parent/guardian conversation route for repeated occurrences.

Primary promise: **Confidence to teach.**

## Key Changes
- Replace the preset-only scenario model with a guided custom scenario intake.
- Teacher profile stores teacher name and grade/grade band, so those are not asked each time help is needed.
- Teacher enters only session-specific details: behavior/challenge details, urgency, and support type.
- Teacher can choose from easy-select challenge options for standard classroom issues, choose `Other`, and add/edit details in their own words.
- Teacher chooses whether the situation is a `Single Occurrence` or `Repeated Occurrence`.
- Teacher chooses whether they want `Roleplay` practice or `Information` from policies, procedures, and other documents added to the project.
- If the situation is `Repeated Occurrence`, the teacher can also select `Parent/guardian conversation` as a possible follow-up route.
- The parent/guardian conversation route is selectable only; the actual parent conversation will be created later.
- Unsupported or sensitive scenarios are redirected to human/policy support instead of roleplayed.
- Keep practice teacher-only, fictionalized/de-identified, and unsaved. Teachers are told not to enter student names or sensitive details.

## Experience And AI Flow
- Start with a guided form, not a scenario picker.
- Show profile context quietly, but do not make the teacher re-enter name or grade for each practice session.
- Show the no-student-names/privacy reminder as plain text before the teacher starts describing what happened.
- Offer classroom challenge options such as calling out, off-task behavior, work refusal, side conversations, transition trouble, peer conflict, disrespectful responses, attention-seeking behavior, and `Other`.
- Provide a microphone inside the details field so the teacher can dictate scenario details, then review/edit before continuing.
- Ask when the situation happened with two options: `Single Occurrence` or `Repeated Occurrence`.
- Ask whether the teacher wants roleplay practice or information. Roleplay uses a teacher response area with a Coach guidance panel; information summarizes relevant project-document guidance and sources.
- If `Repeated Occurrence` is selected, reveal a parent/guardian conversation option for the teacher to select. Do not generate the parent conversation in this prototype.
- If the teacher input is vague, the tool asks one clarifying question.
- The tool creates a short setup from the selected challenge, category, focus, and what the teacher will practice or review.
- At the start of a help session, Coach greets the teacher on screen.
- Teacher practices with either text input or browser voice input for teacher replies, without a visible chat transcript on the left side.
- Parent/guardian conversation is only captured as a selected route for now; the actual parent-focused conversation flow is not created yet.
- Debrief is short and non-scored, focused on relationship plus policy.

## Interfaces
- Planned endpoints:
  - `triageScenario`: accepts teacher profile context plus session intake, returns category, coaching focus, support status, and optional follow-up question.
  - `roleplayTurn`: accepts scenario context and teacher reply, returns student reply and mentor tip.
  - `debriefSession`: accepts transcript summary, returns short mentor note and retry prompt.
  - `documentGuidance`: accepts scenario context and available project documents, returns relevant policy/procedure guidance and source references.
- Fallback mode uses scripted example scenarios if live AI is unavailable.
- Future roadmap: parent/guardian conversation flow, more scenario categories, deeper handbook grounding, and richer voice practice.

## Test Plan
- Custom scenario happy path: teacher enters calling-out scenario, starts roleplay directly, completes debrief, retry, and confidence check.
- Vague input: tool asks one helpful follow-up.
- Empty teacher response: Coach offers a starter line.
- Harsh/public-shaming response: Coach gently redirects.
- Unsupported scenario: tool redirects to human/policy support.
- Information mode: selecting `Information` hides roleplay focus, returns document guidance, and avoids roleplaying safety-sensitive issues.
- Privacy reminder check: no student names requested, no transcripts saved, and the reminder appears before the scenario description fields.
- Profile check: teacher name and grade come from the profile, not the repeated help form.
- Challenge option check: selecting a standard classroom issue prefills editable session details and a suggested response skill goal; choosing `Other` provides a blank detail space.
- Details voice-entry check: the microphone appears inside the details box, can capture dictated details when supported by the browser, and leaves the text editable before support is built.
- Repeated-occurrence check: selecting `Repeated Occurrence` reveals the parent/guardian conversation option; choosing it records the selection and shows a short notice, without creating a parent conversation.

## Assumptions
- Demo case: teacher enters a calling-out-during-lesson scenario.
- App is optimized for laptop browser and a 2-3 minute live demo.
- V1 uses sample policy rules, not the full handbook.
- V1 may use lightweight profile context and basic browser voice input; no saved history, dashboard, or full policy upload in v1.
