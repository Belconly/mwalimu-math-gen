# mwalimu-math-gen
**Rwanda Competency-Based Curriculum (CBC) Primary Mathematics Lesson Plan Generator (P1–P6)**

An AI-powered web tool that helps Rwandan Primary School Mathematics teachers generate official REB CBC lesson plans instantly without backend server dependencies.

## ✨ Key Features

1. **REB e-Learning Curriculum Integration (Category ID 19):**
   - Directly connects to the official [REB e-Learning Mathematics Repository](https://elearning.reb.rw/course/index.php?categoryid=19).
   - Supports **P1, P2, P3, P4, P5, and P6** Mathematics curriculum, referencing official REB **Student Books (SB)**, **Teacher's Guides (TG)**, and **Scheme of Work** page citations.

2. **Integrated AI Model API & Built-in REB CBC AI Engine:**
   - **Human-like pedagogical generation:** Instead of static programmed canned sentences, generates realistic, human-teacher-style lesson plans with SMART objectives, differentiated SEN support strategies, and collaborative group activities.
   - **Built-in REB CBC AI Engine (Free):** Instant client-side procedural generator trained on authentic REB Mathematics P1–P6 syllabus structures (no API key required).
   - **External AI API Integration:** Optional settings drawer to connect your own API Key for **OpenAI (ChatGPT/GPT-4o)**, **Google Gemini (Gemini 1.5 Flash/Pro)**, **Anthropic Claude**, or **OpenRouter/Custom OpenAI-compatible API**.

3. **Standard Administrative Metadata with LocalStorage Persistence:**
   - Collects all essential header metadata: School Name, Teacher's Name, Term (`Term 1`–`Term 3`), Date, Subject (`Mathematics`), Class (`P1`–`P6`), Unit No, Lesson No, Duration, Class Size, SEN Info, and Plan Location.
   - **Auto-saves to LocalStorage:** Automatically saves and restores header metadata across sessions so teachers do not have to re-type their School Name, Teacher Name, Term, or Class Size. Includes quick action controls (`💾 Save Header Defaults` and `🗑️ Clear Saved Headers`).

4. **Timed Stage-by-Stage Activities Table:**
   - Structured according to REB Scheme of Work and daily pedagogical stages:
     - **Introduction (5–10 mins):** Warm-up, activating prior knowledge, checking attendance/homework.
     - **Development (20–25 mins):** Interactive teaching & learning, group/pair work, chalkboard modeling, SEN differentiation.
     - **Conclusion (5 mins):** Reflection, chalkboard recap, student feedback.
     - **Evaluation / Assessment (5 mins):** Formative quiz, exercise book check, or chalkboard challenge.

5. **Instant A4 PDF Download & Browser Print:**
   - Generates official Basic Education Board (REB) A4 PDF lesson plans locally in the browser using `html2pdf.js`.
   - Supports clean paper printing via print-optimized CSS rules (`@media print`).

## 🚀 Usage / Deployment
- Open `myindex.html` (or `index.html`) in any modern browser, or serve via any static HTTP server (e.g. `python3 -m http.server 8080`).
- Select your Class (`P1`–`P6`), optionally pick a topic or type a custom focus, and click **`✨ AI Generate Lesson Plan (from REB SB, TG & Scheme of Work)`**.
