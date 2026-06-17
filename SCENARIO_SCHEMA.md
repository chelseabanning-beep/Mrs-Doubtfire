# Scenario Schema

## Purpose

This document defines the structure for roleplay scenarios. It should guide scenario data, prompt inputs, fallback scripts, and test coverage.

## Scenario Object

```json
{
  "id": "calling-out-grade-3-5-demo",
  "title": "Calling Out During Instruction",
  "gradeBand": "3-5",
  "category": "behavior",
  "classroomMoment": "A student repeatedly calls out answers during direct instruction while other students are raising hands.",
  "teacherGoal": "Redirect without embarrassing the student.",
  "coachingFocus": "Warmth plus clear boundary",
  "primaryRelationshipMove": "connect_before_correct",
  "secondaryRelationshipMove": "path_back",
  "selCompetencies": ["self-management", "relationship skills", "responsible decision-making"],
  "studentProfile": {
    "emotion": "excited and eager to be noticed",
    "need": "belonging and a way to participate appropriately",
    "motivation": "wants to show they know the answer",
    "difficulty": "realistic",
    "likelyFirstPushback": "But I knew the answer!"
  },
  "safeForRoleplay": true,
  "redirectTriggers": ["public_shaming", "sarcasm", "vague_threat", "identity_label"],
  "escalationTriggers": ["safety_threat", "self_harm", "abuse_disclosure", "real_student_name"],
  "successCriteria": [
    "Teacher acknowledges the student's desire to participate.",
    "Teacher names the one-voice expectation.",
    "Teacher gives a path back into discussion.",
    "Teacher avoids shame, sarcasm, or public humiliation."
  ]
}
```

## Required Fields

| Field | Purpose |
| --- | --- |
| `id` | Stable scenario identifier. |
| `title` | Human-readable scenario name. |
| `gradeBand` | Grade range for student language and context. |
| `category` | High-level scenario type. |
| `classroomMoment` | Specific moment being practiced. |
| `teacherGoal` | What the teacher wants to practice. |
| `coachingFocus` | Main mentor coaching target. |
| `primaryRelationshipMove` | Main teacher move to practice. |
| `secondaryRelationshipMove` | Supporting move. |
| `selCompetencies` | CASEL-aligned competencies. |
| `studentProfile` | Student emotion, need, motivation, and response style. |
| `safeForRoleplay` | Whether the app should proceed. |
| `redirectTriggers` | Teacher responses that require mentor correction. |
| `escalationTriggers` | Scenario features that stop roleplay. |
| `successCriteria` | What a strong teacher response should include. |

## Supported V1 Categories

| Category | Safe For V1? | Notes |
| --- | --- | --- |
| `behavior` | Yes | Calling out, side conversations, mild disruption. |
| `work_refusal` | Yes | Low-level refusal or avoidance. |
| `relationship_repair` | Yes | Teacher wants to repair after a tense moment. |
| `peer_conflict_low_level` | Yes | Minor disagreement, no threats or harassment. |
| `authority_challenge` | Yes | Student tests a redirection without safety threat. |
| `safety` | No | Redirect to human support. |
| `mandated_reporting` | No | Redirect to school policy/human support. |
| `special_education_decision` | No | Redirect to local process/support team. |
| `medical_or_crisis` | No | Redirect to emergency/school support. |

## Relationship Move Values

Use these values from `RELATIONSHIP_MOVES.md`:

- `connect_before_correct`
- `private_over_public`
- `name_expectation`
- `path_back`
- `bounded_choice`
- `regulate_first`
- `brief_redirect`
- `repair_later`
- `neutral_language`
- `escalate_support`

## Redirect Trigger Values

| Trigger | Meaning | Mentor Response |
| --- | --- | --- |
| `public_shaming` | Teacher makes the student the class example. | Pause or reframe toward private, dignified correction. |
| `sarcasm` | Teacher uses cutting or mocking language. | Pause and replace with neutral language. |
| `vague_threat` | Teacher threatens unclear consequences. | Replace with clear expectation and next step. |
| `identity_label` | Teacher labels the student instead of behavior. | Shift to observable behavior. |
| `power_struggle` | Teacher argues for control in front of class. | Step out of contest and offer bounded choice. |
| `too_permissive` | Teacher offers warmth without a boundary. | Add clear expectation. |
| `too_punitive` | Teacher jumps to harsh consequence. | Rebalance with instruction and path back. |

## Escalation Trigger Values

| Trigger | Meaning | App Behavior |
| --- | --- | --- |
| `real_student_name` | User enters identifying information. | Ask user to de-identify before continuing. |
| `self_harm` | Student may hurt self. | Stop roleplay; refer to school safety process. |
| `abuse_disclosure` | Possible abuse or neglect. | Stop roleplay; refer to mandated process. |
| `violence_threat` | Threat to harm others. | Stop roleplay; refer to safety process. |
| `weapon` | Weapon involved. | Stop roleplay; refer to safety process. |
| `sexual_harassment` | Sexual misconduct or harassment. | Stop roleplay; refer to school process. |
| `medical_crisis` | Health emergency. | Stop roleplay; refer to emergency/school process. |
| `disability_or_special_education_decision` | User asks for disability-specific determination. | Refer to appropriate support team and local process. |

## Demo Scenario

```json
{
  "id": "demo-3-5-calling-out",
  "title": "Calling Out During Instruction",
  "gradeBand": "3-5",
  "category": "behavior",
  "classroomMoment": "A fourth-grade student keeps calling out answers while the teacher is modeling a math strategy.",
  "teacherGoal": "Redirect the student without embarrassing them or losing lesson momentum.",
  "coachingFocus": "Use warmth, one clear boundary, and a path back.",
  "primaryRelationshipMove": "connect_before_correct",
  "secondaryRelationshipMove": "path_back",
  "selCompetencies": ["self-management", "relationship skills", "responsible decision-making"],
  "studentProfile": {
    "emotion": "excited",
    "need": "to feel heard and included",
    "motivation": "wants to show they know the answer",
    "difficulty": "realistic",
    "likelyFirstPushback": "But I knew the answer!"
  },
  "safeForRoleplay": true,
  "redirectTriggers": ["public_shaming", "sarcasm", "vague_threat", "identity_label", "power_struggle"],
  "escalationTriggers": ["real_student_name", "self_harm", "abuse_disclosure", "violence_threat", "weapon"],
  "successCriteria": [
    "Teacher acknowledges the student's thinking or eagerness.",
    "Teacher clearly says only one voice is needed right now.",
    "Teacher gives the student a way to participate soon.",
    "Teacher keeps the correction short.",
    "Teacher avoids shame, sarcasm, labels, or vague threats."
  ]
}
```

## Triage Output Shape

```json
{
  "status": "ready_for_roleplay",
  "category": "behavior",
  "coachingFocus": "Use warmth, one clear boundary, and a path back.",
  "recommendedMove": "connect_before_correct",
  "supportLevel": "practice",
  "followUpQuestion": null,
  "privacyReminder": "Use a fictionalized version of the situation. Do not include student names or identifying details."
}
```

## Vague Intake Output Shape

```json
{
  "status": "needs_clarification",
  "category": null,
  "coachingFocus": null,
  "recommendedMove": null,
  "supportLevel": "clarify",
  "followUpQuestion": "What is one specific moment you want to practice, such as calling out, side conversations, refusal to work, or a peer conflict?",
  "privacyReminder": "Please keep the scenario fictionalized and avoid student names or private details."
}
```

## Human Support Output Shape

```json
{
  "status": "refer_to_human_support",
  "category": "safety",
  "coachingFocus": null,
  "recommendedMove": "escalate_support",
  "supportLevel": "human_support",
  "followUpQuestion": null,
  "message": "This sounds like a situation that needs your school's support process rather than a practice roleplay. Do not enter student names or private details here. Please follow your local policy and connect with the appropriate administrator, counselor, safety lead, or support team."
}
```

