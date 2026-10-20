# Paediatrics Final MBBS Practice Exams

A responsive educational revision site with topic selection, True/False, Single Best Answer (SBA), and formative essay self-marking.

## Topics
- **Growth & Development:** existing 30 True/False groups and 30 SBA questions.
- **Neonatal Jaundice:** 30 True/False groups (5 statements per group), 30 SBA questions, and 3 structured essay questions (20 marks each).

## Exam interface
- Compact table layout for True/False statements; only True and False are offered.
- Clickable numbered question navigation.
- Navigation colours show unanswered, partly answered, answered and current questions.
- Topic/category labels and explanations are withheld until submission.
- Objective answer review, scoring and local CSV export.

## Marking
- True/False: +1 correct, −1 incorrect, blank 0; each 5-statement group is floored at 0.
- SBA: +3 correct; incorrect/blank 0.
- Essays: 3 essays, 20 marks each, using a structured key-point rubric. The app highlights detected concepts and suggests important points that were not detected. A student can tick a missing concept if they believe it was included in different wording; the UI then shows a separate self-reviewed estimate.
- **Essay scoring is provisional keyword-supported formative feedback, not true semantic marking.** The detector can miss valid paraphrases and may sometimes match a phrase without fully understanding it. Review the rubric manually; it must not be used for high-stakes or official grading without human review.

## Sources and clinical caution
The Neonatal Jaundice content was drafted with reference to the project's *Illustrated Textbook of Paediatrics*, *Nelson Essentials of Pediatrics*, and the supplied Paediatrics Categorized MCQ collection. Questions and rubric wording are original practice material, not copied exam answers. Some clinical details vary by local protocol; bilirubin thresholds, phototherapy and exchange-transfusion decisions must always follow current local neonatal guidance and specialist advice. This site is for educational revision and is not a clinical decision tool.

## Deploy on GitHub Pages
1. Open repository **Settings → Pages**.
2. Set **Build and deployment → Source** to **GitHub Actions**.
3. The workflow at `.github/workflows/pages.yml` runs after commits to `main`.
4. Open the **Actions** tab and wait for **Deploy practice site to GitHub Pages** to complete.
5. Website: https://ahathi-cyber.github.io/growth-development-exams/

## Prototype limitations
This is a browser-only prototype. The objective answer keys are delivered to the browser and can be inspected; it is not secure for proctored or high-stakes exams. Scores and CSV exports remain on the user's device. There is no central results database or teacher dashboard. Secure server-side marking and central collection require a backend with answer keys stored server-side.
