# Mrs-Doubtfire

Classroom Coach is a planned web app where new teachers practice common classroom moments through safe roleplay and warm mentor coaching.

## Prototype Flow

- Starts with a guided classroom-scenario intake.
- Uses profile context for teacher name and grade instead of asking every session.
- Shows the privacy reminder before the teacher describes what happened.
- Lets the teacher choose text or voice input and Coach text or voice output before the scenario begins.
- Offers quick-select challenge options, including `Other`, with editable details.
- Lets the teacher choose when the situation happened, including `A repeated pattern`.
- Lets the teacher choose `Roleplay` or `Information` from policy/procedure documents.
- Reveals a parent/guardian conversation option when `A repeated pattern` is selected.
- Records the parent/guardian conversation option as a selected route, but does not create that conversation yet.
- Greets the teacher at the start of the help session using the selected output mode.
- Runs a short teacher-only roleplay with `Student` and `Coach` messages.
- Redirects sensitive scenarios to human and policy support.
- Ends with a short debrief, retry option, and confidence check.

## Project Docs

- [PLAN.md](PLAN.md): Product plan and V1 scope.
- [THEORY_FOUNDATION.md](THEORY_FOUNDATION.md): SEL and relationship-building theory foundation.
- [COACHING_LOGIC.md](COACHING_LOGIC.md): AI mentor behavior, redirect rules, and safety boundaries.
- [RELATIONSHIP_MOVES.md](RELATIONSHIP_MOVES.md): Practical teacher moves the mentor should coach.
- [ROLEPLAY_TEST_CASES.md](ROLEPLAY_TEST_CASES.md): Gold-standard test scenarios for the roleplay experience.
- [AI_PROMPT_SPEC.md](AI_PROMPT_SPEC.md): Buildable AI mentor instructions and first system prompt draft.
- [SCENARIO_SCHEMA.md](SCENARIO_SCHEMA.md): Scenario data shape, triage outputs, and escalation fields.
- [DEMO_FLOW.md](DEMO_FLOW.md): First 2-3 minute live demo path.
- [FALLBACK_SCRIPT.md](FALLBACK_SCRIPT.md): Scripted demo behavior if live AI is unavailable.

## Primary SEL Anchor

The app is anchored in CASEL's Fundamentals of SEL:

https://casel.org/fundamentals-of-sel/
