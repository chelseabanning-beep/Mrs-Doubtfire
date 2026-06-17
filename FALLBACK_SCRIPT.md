# Fallback Script

## Purpose

This scripted flow lets the demo work even if live AI is unavailable. It follows the same behavior rules as the AI mentor:

- Grades 3-5.
- Calling out during instruction.
- Student first, then short mentor tip.
- Balanced coaching.
- Realistic student resistance.
- Warmth plus boundary plus path back.

## Fallback Trigger

Use fallback mode when:

- The AI service is unavailable.
- The model response times out.
- The demo needs a predictable scripted path.
- The user selects "try demo scenario" instead of entering a custom scenario.

## Demo Intake

Teacher prompt:

```text
I teach fourth grade. During math instruction, one student keeps calling out answers while I am modeling. I want to redirect them without embarrassing them.
```

Coach setup:

```text
Coaching focus: Use warmth, one clear boundary, and a path back.

We will practice a grades 3-5 calling-out moment. The goal is to help the student feel heard while keeping one voice during instruction.
```

## Turn 1

Student:

```text
Oh! I know it! The answer is 24!
```

Mentor Tip:

```text
Try a short line that acknowledges the student's thinking, sets the one-voice expectation, and promises a turn soon.
```

## Branch A: Teacher Gives Strong Response

Teacher response pattern:

```text
I want to hear your thinking. Right now I need one voice, and I will come back to you after this example.
```

Student:

```text
Okay... can you call on me next?
```

Mentor Tip:

```text
Strong balance. You acknowledged the student, named the expectation, and gave a path back. Follow through by inviting them in when it fits.
```

Next action:

```text
Move to debrief.
```

## Branch B: Teacher Gives Clear But Cold Response

Teacher response pattern:

```text
Stop calling out. You are interrupting everyone.
```

Student:

```text
But I knew the answer! I was just helping.
```

Mentor Tip:

```text
Your boundary is clear, but the student may hear it as rejection. Add warmth and a path back: "I want to hear your thinking. Right now I need one voice, and I will come back to you after this example."
```

Next action:

```text
Invite retry.
```

Retry prompt:

```text
Try the line again with warmth, one clear boundary, and a path back.
```

## Branch C: Teacher Gives Warm But Unclear Response

Teacher response pattern:

```text
I know you are excited, but please be good.
```

Student:

```text
I am being good. I just know it!
```

Mentor Tip:

```text
The warmth helps, but "be good" is too broad. Make the expectation observable: "I want to hear your thinking. Right now I need one voice, and I will come back to you after this example."
```

Next action:

```text
Invite retry.
```

## Branch D: Teacher Uses Public Shame

Teacher response pattern:

```text
Everyone is waiting because you keep interrupting.
```

Student:

```text
I was just answering! Why are you blaming me?
```

Mentor Tip:

```text
Let's pause and remove the public shame. Try: "I want to hear your thinking. Right now I need one voice, and I will come back to you after this example." That keeps the boundary without making the student the class example.
```

Next action:

```text
Invite retry.
```

## Branch E: Teacher Uses Sarcasm

Teacher response pattern:

```text
Thanks for teaching the lesson for me.
```

Student:

```text
I was just saying the answer. You do not have to be mean.
```

Mentor Tip:

```text
Let's reset. Sarcasm can embarrass the student and invite a comeback. Try a neutral line: "I want to hear your thinking. Right now I need one voice, and I will come back to you after this example."
```

Next action:

```text
Invite retry.
```

## Branch F: Teacher Gives Vague Threat

Teacher response pattern:

```text
Keep it up and see what happens.
```

Student:

```text
What? I did not even do anything.
```

Mentor Tip:

```text
Replace the vague threat with a clear expectation and next step: "I want to hear your thinking. Right now I need one voice, and I will come back to you after this example."
```

Next action:

```text
Invite retry.
```

## Branch G: Empty Teacher Response

Teacher response pattern:

```text

```

Mentor Tip:

```text
Try this starter line: "I want to hear your thinking. Right now I need one voice, and I will come back to you after this example." Send your version when you are ready.
```

Next action:

```text
Wait for teacher retry.
```

## Simple Matching Rules

Fallback mode can classify teacher responses with simple keyword and pattern checks.

| Branch | Clues |
| --- | --- |
| Strong | Includes warmth plus one voice/raise hand/wait plus come back/call on you |
| Clear but cold | Includes stop/interrupting without warmth or path back |
| Warm but unclear | Includes excited/helping/good but no concrete expectation |
| Public shame | Includes everyone/class/waiting because of you |
| Sarcasm | Includes finally, thanks for, teaching the lesson, dramatic praise |
| Vague threat | Includes see what happens, keep it up, or unclear consequence |
| Empty | No text or whitespace only |

## Debrief

Use after a strong retry or after two attempts.

```text
What worked:
You practiced keeping the student connected while still protecting instruction.

Try next:
Keep the line short and follow through by returning to the student when it fits.

Practice line:
"I want to hear your thinking. Right now I need one voice, and I will come back to you after this example."

Confidence check:
Would you feel ready to try this line in a real classroom moment: not yet, somewhat, or yes?
```

## Confidence Check Responses

If user selects `not yet`:

```text
That is okay. Try one more practice round with the same line. Aim for calm, brief, and clear.
```

If user selects `somewhat`:

```text
That is a good place to be after one practice round. The next step is repetition: try the same line once more, a little shorter and calmer.
```

If user selects `yes`:

```text
Great. You have a usable line: warm opening, clear boundary, and a path back. That is the core move.
```

## Fallback Safety Response

If the user enters a safety-sensitive scenario instead of the demo:

```text
This sounds like a situation that needs your school's support process rather than a practice roleplay. Do not enter student names or private details here. Please follow your local policy and connect with the appropriate administrator, counselor, safety lead, or support team.
```

## Fallback Privacy Response

If the user enters a real student name or identifying details:

```text
Before we practice, please remove the student's name and use a fictionalized description, such as "a fourth-grade student." You can keep the classroom moment, but do not include identifying or sensitive private details.
```

