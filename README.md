# mwalimu-math-gen
**Rwanda Competency-Based Curriculum (CBC) Primary Mathematics Lesson Plan Generator (P1–P6)**

An AI-powered web tool that helps Rwandan Primary School Mathematics teachers generate official REB CBC lesson plans instantly without backend server dependencies.

## ✨ Key Features

1. **Year-locked curriculum lookup (P1–P6):**
   - The AI reads **only the selected year's Teacher's Guide (TG) and Pupil's Book (PB)**. It never borrows a unit or lesson from another class's book.
   - The teacher types a **Unit title**; the engine searches for it inside that year's TG/PB only.
   - When the unit is found, the engine then **indexes the Lesson title** the teacher typed **inside that unit**.
   - If the unit is **not** in that year's books, generation **stops** and the page **lists that year's units** (with their lessons) so the teacher can pick a real one.
   - Number matching is strict, so `Whole Numbers up to 1,000` (P3) can never resolve to `Whole Numbers up to 100,000` (P4).
   - Sources are the official [REB e-Learning Mathematics Repository](https://elearning.reb.rw/course/index.php?categoryid=19) (Category ID 19).

2. **Integrated AI Model API & Built-in REB CBC AI Engine:**
   - **Human-like pedagogical generation:** Instead of static programmed canned sentences, generates realistic, human-teacher-style lesson plans with SMART objectives, differentiated SEN support strategies, and collaborative group activities.
   - **Built-in REB CBC AI Engine (Free):** Instant client-side procedural generator trained on authentic REB Mathematics P1–P6 syllabus structures (no API key required).
   - **External AI API Integration:** Optional settings drawer to connect your own API Key for **OpenAI (ChatGPT/GPT-4o)**, **Google Gemini (Gemini 1.5 Flash/Pro)**, **Anthropic Claude**, or **OpenRouter/Custom OpenAI-compatible API**.

3. **Standard Administrative Metadata with LocalStorage Persistence:**
   - Collects all essential header metadata: School Name, Teacher's Name, Term (`Term 1`–`Term 3`), Date, Subject (`Mathematics`), Class (`P1`–`P6`), Unit No, Lesson No, Duration, **Number of students**, SEN Info, and Plan Location.
   - The roll is a single **Number of students** field — there is no boys/girls split anywhere in the form or the printed plan.
   - **Auto-saves to LocalStorage:** Automatically saves and restores header metadata across sessions so teachers do not have to re-type their School Name, Teacher Name, Term, or Class Size. Includes quick action controls (`💾 Save Header Defaults` and `🗑️ Clear Saved Headers`).

4. **3-row timed activities table (editable timings + hyphen bullets):**
   - **Introduction** (default ~5 mins): Warm-up, activating prior knowledge, checking attendance/homework.
   - **Lesson development** (default ~25 mins): Discovery, presentation, and exploitation of learners’ productions.
   - **Conclusion** (default ~10 mins): Recap, formative assessment, and homework.
   - Each stage timing is editable. Teacher and learner activities render as hyphen bullets.

5. **Instant A4 PDF Download & Browser Print:**
   - Generates official Basic Education Board (REB) A4 PDF lesson plans locally in the browser using `html2pdf.js`.
   - Supports clean paper printing via print-optimized CSS rules (`@media print`).

## 🚀 Usage / Deployment
- Open `myindex.html` (or `index.html`) in any modern browser, or serve via any static HTTP server (e.g. `python3 -m http.server 8080`).
- Select your Class / Year (`P1`–`P6`) — this locks the AI to that year's Teacher's Guide and Pupil's Book.
- Type the **Unit title** as it appears in that year's books, then the **Lesson title** inside that unit.
- Click **`✨ AI Generate Lesson Plan (from this year's TG & Pupil's Book only)`**.
- Expand **`📖 Units available in the selected year's TG & Pupil's Book`** at any time to see exactly what that year contains.
