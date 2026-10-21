# Paediatrics Final MBBS Practice Exams

A responsive educational revision site with topic selection, True/False, Single Best Answer (SBA), and formative essay self-marking.

## Topics
- **Ordered Psychiatry study modules (16):** Foundations/MSE; Mood Disorders and Suicide Risk; Schizophrenia and Psychotic Disorders; Anxiety/OCD; Stress, Somatic and Dissociative Disorders; Alcohol and Substance Use; Personality and Impulse Control; Child and Adolescent Psychiatry; Psychiatry of Older Adults; Intellectual Disability and Learning Disorders; Eating and Sleep Disorders; Human Sexuality; Psychopharmacology and Psychological Treatments; Psychiatric Emergencies; Forensic Psychiatry/Ethics/Law; and Liaison Psychiatry/Miscellaneous. Each module contains a five-statement T/F group, 3 keyed SBA questions, and one 20-mark essay with model answer and rubric. The existing dedicated Child Psychiatry, Schizophrenia and Bipolar Affective Disorder papers remain available as focused practice tests.
- **Growth & Development:** existing 30 True/False groups and 30 SBA questions.
- **Neonatal Jaundice:** 30 True/False groups (5 statements per group), 30 SBA questions, and 3 structured essay questions (20 marks each).
- **Bipolar Affective Disorder (Psychiatry Test 01):** exactly 30 T/F groups (5 statements per group), 30 SBA questions, and 3 structured essays (20 marks each), with answer explanations and point-by-point essay marking rubrics. Revision mode can reveal marking schemes while answering; exam mode keeps them for submission review.
- **Schizophrenia (Psychiatry):** 30 True/False groups (5 statements per group), 30 SBA questions, and 3 structured essay questions (20 marks each). Covers clinical features, first-episode assessment, differential diagnosis, risk, antipsychotic treatment and adverse effects, clozapine, psychosocial interventions and recovery.

## Exam interface
- Compact table layout for True/False statements; only True and False are offered.
- Clickable numbered question navigation.
- Navigation colours show unanswered, partly answered, answered and current questions.
- Topic/category labels and explanations are withheld until submission.
- Objective answer review, scoring and local CSV export.

## Marking
- Revision mode is optional and reveals answers/explanations for T/F and SBA, plus model answers and essay rubrics. With revision mode off, marking schemes are revealed after submission.
- True/False: +1 correct, −1 incorrect, blank 0; each 5-statement group is floored at 0.
- SBA: +3 correct; incorrect/blank 0.
- Essays: 3 essays, 20 marks each, using a structured key-point rubric. The app highlights detected concepts and suggests important points that were not detected. A student can tick a missing concept if they believe it was included in different wording; the UI then shows a separate self-reviewed estimate.
- **Essay scoring is provisional keyword-supported formative feedback, not true semantic marking.** The detector can miss valid paraphrases and may sometimes match a phrase without fully understanding it. Review the rubric manually; it must not be used for high-stakes or official grading without human review.

## Sources and clinical caution
The Neonatal Jaundice content was drafted with reference to the project's *Illustrated Textbook of Paediatrics*, *Nelson Essentials of Pediatrics*, and the supplied Paediatrics Categorized MCQ collection. Psychiatry Test 01 focuses on bipolar spectrum diagnosis, mania and hypomania, differential diagnosis, risk, acute care, maintenance treatment, medication safety and relapse prevention. The Schizophrenia practice bank was shaped around themes in the uploaded *Psychiatry – Categorized MCQ* collections (including the September 2025 and January 2024 additions) and *Psych MCQs by M*: first-rank symptoms and psychopathology, differential diagnosis, prognosis, cannabis use, antipsychotic adverse effects, clozapine, neuroleptic malignant syndrome and psychosocial management. Questions and rubric wording are newly written practice material, not verbatim copies of exam questions. Clinical guidance and diagnostic criteria can vary by jurisdiction and change over time; use current local guidelines, clinical supervision and specialist advice. This site is for educational revision and is not a clinical decision tool.

## Deploy on GitHub Pages
1. Open repository **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. The workflow at `.github/workflows/pages.yml` runs after commits to `main`.
4. Open the **Actions** tab and wait for **Deploy practice site to GitHub Pages** to complete.
5. Website: https://ahathi-cyber.github.io/growth-development-exams/

## Prototype limitations
This is a browser-only prototype. The objective answer keys are delivered to the browser and can be inspected; it is not secure for proctored or high-stakes exams. Scores and CSV exports remain on the user's device. There is no central results database or teacher dashboard. Secure server-side marking and central collection require a backend with answer keys stored server-side.
