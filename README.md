# Pediatrics Growth & Development Practice Exams

A responsive Final MBBS revision site covering growth assessment, faltering growth, developmental milestones, puberty, and common paediatric presentations.

## Included
- **True/False:** 30 groups with 5 statements each. Correct +1, incorrect −1, Unsure/blank 0; each group is floored at 0.
- **Single Best Answer:** 30 questions. Correct +3; incorrect/blank 0.
- Answer review and local CSV export.
- Responsive layout for desktop and mobile.
- GitHub Actions workflow for GitHub Pages.

## Enable the live website
1. Open the repository **Settings** tab.
2. Choose **Pages** in the left menu.
3. Under **Build and deployment**, set **Source** to **GitHub Actions**.
4. Return to **Actions** and open the latest **Deploy practice site to GitHub Pages** run. It should rerun on the latest commit; if needed, use **Re-run jobs**.
5. When the workflow succeeds, the website will be available at **https://ahathi-cyber.github.io/growth-development-exams/**.

The current GitHub integration can push code but does not have permission to enable the Pages setting itself. This one-time setting must be enabled by the repository owner.

## Important limitations
This is a browser-only practice prototype. The answer keys are delivered to the browser and can be inspected, so this is **not secure for proctored or high-stakes exams**. Results remain on the user's device and CSV export is local; there is no central results database or teacher dashboard. Secure server-side marking and central collection require a backend (for example, Supabase) with answer keys stored server-side.

## Educational use
Questions and answer keys are intended for revision and should be checked against current local guidance. They are not a substitute for clinical judgement.
