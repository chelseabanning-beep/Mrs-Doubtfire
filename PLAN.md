# Classroom Coach Revised Plan

## Summary
Build a calm, professional web app where new teachers enter their own classroom challenge, then Classroom Coach turns it into a safe practice roleplay with warm mentor coaching. Example scenarios are used behind the scenes to teach the AI what good coaching looks like; the teacher's own scenario drives the session.

Primary promise: **Confidence to teach.**

## Key Changes
- Replace the preset-only scenario model with a guided custom scenario intake.
- Teacher enters: grade, behavior/challenge, classroom moment, and response skill goal.
- AI suggests a category and coaching focus; teacher confirms before roleplay starts.
- V1 supports behavior, relationship-building, and peer conflict scenarios.
- Unsupported or sensitive scenarios are redirected to human/policy support instead of roleplayed.
- Use behind-the-scenes examples for coaching style, realistic student responses, and fallback demo behavior.
- Keep practice teacher-only, fictionalized/de-identified, and unsaved. Teachers are told not to enter student names or sensitive details.

## Experience And AI Flow
- Start with a guided form, not a scenario picker.
- If the teacher input is vague, the tool asks one clarifying question.
- AI creates a short roleplay setup: category, focus, and what the teacher will practice.
- Teacher practices in text chat with labeled `Student` and `Mentor Tip` messages.
- Mentor uses connect-boundary-redirect and sample policy rules for dignity, classroom response, escalation, and safety.
- Debrief is short and non-scored, focused on relationship plus policy.
- Teacher can retry the same moment briefly, then completes a final confidence check.

## Interfaces
- Backend planned endpoints:
  - `triageScenario`: accepts teacher intake, returns category, coaching focus, support status, and optional follow-up question.
  - `roleplayTurn`: accepts scenario context and teacher reply, returns student reply and mentor tip.
  - `debriefSession`: accepts transcript summary, returns short mentor note and retry prompt.
- Fallback mode uses scripted example scenarios if live AI is unavailable.
- Future roadmap: more scenario categories first, then handbook grounding, then voice practice.

## Test Plan
- Custom scenario happy path: teacher enters calling-out scenario, confirms category/focus, completes roleplay, debrief, retry, and confidence check.
- Vague input: tool asks one helpful follow-up.
- Empty teacher response: mentor offers a starter line.
- Harsh/public-shaming response: mentor gently redirects.
- Unsupported scenario: tool redirects to human/policy support.
- AI unavailable: scripted fallback still completes the demo.
- Privacy check: no student names requested, no transcripts saved.

## Assumptions
- Demo case: teacher enters a calling-out-during-lesson scenario.
- App is optimized for laptop browser and a 2-3 minute live demo.
- V1 uses sample policy rules, not the full handbook.
- No accounts, saved history, dashboard, full policy upload, or voice mode in v1.
- The plan has been approved for this hackathon repo; this commit only adds the plan and does not build the app.
