// myscript.js — REB CBC Official 5-Column Format (Teacher Activities, Learners Activities, G.C., C.C.I.)
// Rwanda CBC Primary Mathematics Lesson Plan Generator (P1–P6)

const form = document.getElementById('lpForm');
const printable = document.getElementById('printable');
const classSelect = document.getElementById('classSelect');
const dateInput = document.getElementById('dateInput');
const rebStatusText = document.getElementById('rebStatusText');
const unitTopicSelect = document.getElementById('unitTopicSelect');
const customTopicInput = document.getElementById('customTopicInput');

const aiGenerateBtn = document.getElementById('aiGenerateBtn');
const aiGenerateBtnBottom = document.getElementById('aiGenerateBtnBottom');
const toggleAiSettingsBtn = document.getElementById('toggleAiSettingsBtn');
const aiSettingsDrawer = document.getElementById('aiSettingsDrawer');
const aiProviderSelect = document.getElementById('aiProviderSelect');
const aiModelInput = document.getElementById('aiModelInput');
const aiApiKeyInput = document.getElementById('aiApiKeyInput');
const aiEndpointInput = document.getElementById('aiEndpointInput');
const saveAiSettingsBtn = document.getElementById('saveAiSettingsBtn');
const aiSettingsStatus = document.getElementById('aiSettingsStatus');

const lsStatusBadge = document.getElementById('lsStatusBadge');
const saveHeadersBtn = document.getElementById('saveHeadersBtn');
const clearHeadersBtn = document.getElementById('clearHeadersBtn');

const aiProgressModal = document.getElementById('aiProgressModal');
const modalTitle = document.getElementById('modalTitle');
const modalStepText = document.getElementById('modalStepText');
const modalProgressBar = document.getElementById('modalProgressBar');

const generateBtn = document.getElementById('generateBtn');
const printBtn = document.getElementById('printBtn');

const LS_HEADER_KEY = 'mwalimu_lp_header_metadata_v2';
const LS_AI_SETTINGS_KEY = 'mwalimu_ai_settings_v2';

const HEADER_FIELDS = ['school','teacher','term','date','subject','class','unitNo','lessonNo','duration','classBoys','classGirls','classSize','sen','planLocation'];

// REB Official Lists
const REB_GC_LIST = ["Critical Thinking","Problem Solving","Creativity and Innovation","Communication","Collaboration","Digital Literacy","Lifelong Learning","Cultural Identity","Self-Confidence"];
const REB_CCI_LIST = ["Peace and Values Education","Gender","Inclusive Education","Environment","Financial Education","Standardization Culture","Impact of Social Media","Comprehensive Sexuality Education","Genocide Studies","Disaster Risk Reduction"];

const FALLBACK_SYLLABUS = {
  "P1": {
    "classLevel": "Primary 1 (P1)",
    "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19",
    "studentBookTitle": "REB Primary Mathematics P1 Student Book (SB)",
    "teacherGuideTitle": "REB Primary Mathematics P1 Teacher's Guide (TG)",
    "units": [
      {
        "unitNo": "Unit 1",
        "unitTitle": "Numbers and Counting from 0 to 20",
        "keyUnitCompetence": "Develop number sense up to 20 and perform simple operations of addition and subtraction within 20.",
        "lessons": [
          {
            "lessonNo": "Lesson 1",
            "lessonTitle": "Counting and Reading Whole Numbers from 1 to 20",
            "instrObjective": "Using number cards and real classroom objects, learners should be able to count, read, and write whole numbers from 1 to 20 correctly without hesitation.",
            "materials": "Number cards (1-20), chalkboard, counters, bottle caps, small sticks, Manila paper, REB P1 Student Book pp. 12-16",
            "references": "REB Primary Mathematics P1 Student Book (SB), Unit 1, pp. 12-16; REB P1 Teacher's Guide (TG), pp. 8-11; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)",
            "crossCutting": "Inclusive Education",
            "intro": "Teacher greets the class and sings a short counting rhyme from 1 to 10 with learners. Teacher shows 5 bottle caps and asks learners to count aloud together, activating prior knowledge of numbers.",
            "development": "Teacher models counting objects up to 20 on the teacher's table. Learners work in small groups of 4 with counters to make groups of 10, 15, and 20. Teacher circulates to assist learners with SEN by providing tactile number cards and guiding their hand counting. Selected learners come to the chalkboard to write numbers corresponding to groups of counters drawn by the teacher.",
            "conclusion": "Teacher leads a quick class recap where learners count aloud from 20 backwards to 1. Teacher praises correct participation and clarifies any confusion between numbers like 12 and 20.",
            "evaluation": "Learners complete Exercise 1 in REB P1 Student Book page 15: matching drawn object sets with correct number symbols from 1 to 20. Teacher checks notebooks and provides immediate remedial feedback."
          }
        ]
      },
      {
        "unitNo": "Unit 2",
        "unitTitle": "Identifying 2D Shapes and Patterns",
        "keyUnitCompetence": "Recognise, name, and draw basic two-dimensional shapes (squares, rectangles, triangles, circles) in the environment.",
        "lessons": [
          {
            "lessonNo": "Lesson 1",
            "lessonTitle": "Identifying Squares, Rectangles, Triangles, and Circles",
            "instrObjective": "Using paper cutouts and classroom objects, learners should be able to identify, name, and sort basic 2D shapes correctly.",
            "materials": "Cardboard shape cutouts, rulers, scissors, classroom objects (books, clocks), REB P1 Student Book pp. 45-48",
            "references": "REB Primary Mathematics P1 Student Book (SB), Unit 2, pp. 45-48; REB P1 Teacher's Guide (TG), pp. 30-33; REB e-Learning Portal (elearning.reb.rw)",
            "crossCutting": "Environment",
            "intro": "Teacher shows a classroom clock and a textbook, asking learners to describe their outline shapes.",
            "development": "Teacher introduces square, rectangle, triangle, and circle cutouts, explaining their features (corners and sides). Learners in small groups sort mixed paper shapes into matching piles and find matching shapes around the classroom.",
            "conclusion": "Learners share which shapes they discovered in the classroom environment and explain why a circle is different from a square.",
            "evaluation": "Worksheet: color all triangles green, circles red, squares blue, and rectangles yellow."
          }
        ]
      }
    ]
  },
  "P2": {
    "classLevel": "Primary 2 (P2)",
    "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19",
    "studentBookTitle": "REB Primary Mathematics P2 Student Book (SB)",
    "teacherGuideTitle": "REB Primary Mathematics P2 Teacher's Guide (TG)",
    "units": [{ "unitNo": "Unit 1", "unitTitle": "Whole Numbers from 0 to 100", "keyUnitCompetence": "Read, write, count, compare, and represent whole numbers up to 100 in terms of tens and ones.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Place Value of Numbers up to 100 (Tens and Ones)", "instrObjective": "Using bundles of 10 sticks and loose sticks, learners should be able to decompose 2-digit numbers into tens and ones correctly.", "materials": "Bundles of 10 sticks, rubber bands, place-value table chart, number cards, REB P2 Student Book pp. 10-14", "references": "REB Primary Mathematics P2 Student Book (SB), Unit 1, pp. 10-14; REB P2 Teacher's Guide (TG), pp. 8-12; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Inclusive Education", "intro": "Teacher asks learners to count from 10 to 50 by tens (10, 20, 30...). Teacher displays 3 bundles of 10 sticks and 4 single sticks and asks how many sticks are shown in total.", "development": "Teacher introduces the Place Value Chart (Tens | Ones) on the chalkboard. Teacher explains that 34 has 3 Tens and 4 Ones. Learners work in pairs with counting sticks to build numbers called out by the teacher (e.g., 47, 62, 85). Teacher gives learners with SEN color-coded tens and ones cards to reinforce the concept visually and tactilely.", "conclusion": "Teacher invites three learners to write numbers on the chalkboard place-value chart and explain their tens and ones digits.", "evaluation": "Learners complete Exercise 2 in REB P2 Student Book p. 13: writing tens and ones for given 2-digit numbers (e.g., 58 = ___ Tens and ___ Ones)." }] }]
  },
  "P3": { "classLevel": "Primary 3 (P3)", "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19", "studentBookTitle": "REB Primary Mathematics P3 Student Book (SB)", "teacherGuideTitle": "REB Primary Mathematics P3 Teacher's Guide (TG)", "units": [{ "unitNo": "Unit 1", "unitTitle": "Whole Numbers up to 1,000", "keyUnitCompetence": "Read, write, compare, and perform addition and subtraction of whole numbers up to 1,000 in real-life contexts.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Reading, Writing, and Place Value of Numbers up to 1,000", "instrObjective": "Using place-value abacus charts and base-ten blocks, learners should be able to identify hundreds, tens, and ones in 3-digit numbers correctly.", "materials": "Base-ten blocks, wooden abacus, place value cards (Hundreds, Tens, Ones), REB P3 Student Book pp. 8-13", "references": "REB Primary Mathematics P3 Student Book (SB), Unit 1, pp. 8-13; REB P3 Teacher's Guide (TG), pp. 6-10; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Inclusive Education", "intro": "Teacher asks learners to count by 100s up to 500 (100, 200, 300...). Teacher writes 345 on the chalkboard and asks learners what each digit stands for.", "development": "Teacher demonstrates representing 345 on a 3-spike abacus (3 Hundreds, 4 Tens, 5 Ones). In groups of 5, learners use number cards to construct 3-digit numbers called out by the teacher and decompose them into expanded form (300 + 40 + 5). Teacher supports SEN learners by using large print number flashcards and physical base-ten blocks.", "conclusion": "Learners volunteer to come to the front and challenge the class to read a 3-digit number they have formed on the abacus.", "evaluation": "Exercise in REB P3 Student Book p. 12: Write 5 given numbers in words and in expanded place value form." }] }] },
  "P4": { "classLevel": "Primary 4 (P4)", "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19", "studentBookTitle": "REB Primary Mathematics P4 Student Book (SB)", "teacherGuideTitle": "REB Primary Mathematics P4 Teacher's Guide (TG)", "units": [{ "unitNo": "Unit 1", "unitTitle": "Whole Numbers up to 100,000", "keyUnitCompetence": "Read, write, compare, and round whole numbers up to 100,000 and apply operations in daily life.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Place Value and Value of Digits up to 100,000", "instrObjective": "Using place value charts up to Ten Thousands, learners should be able to identify the place value and numeric value of each digit in a 5-digit number correctly.", "materials": "Place value table (Ten Thousands, Thousands, Hundreds, Tens, Ones), number flashcards, REB P4 Student Book pp. 14-19", "references": "REB Primary Mathematics P4 Student Book (SB), Unit 1, pp. 14-19; REB P4 Teacher's Guide (TG), pp. 10-14; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Inclusive Education", "intro": "Teacher asks learners to read 9,999 on the chalkboard, then asks what number comes next when we add 1.", "development": "Teacher introduces 10,000 and expands the place value chart to 5 columns. Teacher writes 64,825 and guides learners to state the place value of 6 (Ten Thousands) and its value (60,000). In groups, learners draw 5-digit place value tables on Manila paper and represent numbers given by the teacher. Teacher provides enlarged digit cards for SEN learners with visual difficulties.", "conclusion": "Learners summarize the difference between 'place value' (name of the column) and 'value' (number of units).", "evaluation": "REB P4 Student Book p. 18 Exercise 1: State the place value and value of the underlined digits in 6 given 5-digit numbers." }] }, { "unitNo": "Unit 5", "unitTitle": "Fractions and Decimals", "keyUnitCompetence": "Understand, compare, and perform basic operations on proper fractions, mixed numbers, and simple decimals.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Identifying and Comparing Proper, Improper Fractions, and Mixed Numbers", "instrObjective": "Using fraction strips and circular models, learners should be able to distinguish between proper fractions, improper fractions, and mixed numbers accurately.", "materials": "Fraction strips, cardboard circular pies, colored markers, REB P4 Student Book pp. 68-73", "references": "REB Primary Mathematics P4 Student Book (SB), Unit 5, pp. 68-73; REB P4 Teacher's Guide (TG), pp. 50-55; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Peace", "intro": "Teacher displays 3 equal paper loaves of bread and asks how 2 learners can share 3 loaves equally.", "development": "Teacher explains proper fractions (numerator < denominator, e.g., 3/4), improper fractions (numerator >= denominator, e.g., 5/4), and mixed numbers (whole number + fraction, e.g., 1 1/4). Learners work in small groups with paper models to convert 5/4 into 1 1/4 by combining whole circles and remaining quarters.", "conclusion": "Learners explain the relationship between improper fractions and mixed numbers on the chalkboard.", "evaluation": "Exercise: Classify a list of 10 fractions into Proper, Improper, or Mixed Numbers in exercise books." }] }] },
  "P5": { "classLevel": "Primary 5 (P5)", "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19", "studentBookTitle": "REB Primary Mathematics P5 Student Book (SB)", "teacherGuideTitle": "REB Primary Mathematics P5 Teacher's Guide (TG)", "units": [{ "unitNo": "Unit 1", "unitTitle": "Whole Numbers up to 1,000,000 (LCM and GCF)", "keyUnitCompetence": "Read, write, compare, and perform operations on numbers up to 1,000,000; find Prime Numbers, LCM, and GCF.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Finding Lowest Common Multiple (LCM) and Greatest Common Factor (GCF) using Prime Factorization", "instrObjective": "Using factor trees and prime factorization tables, learners should be able to calculate the LCM and GCF of two or three whole numbers correctly.", "materials": "Factor tree charts, multiplication tables, REB P5 Student Book pp. 20-25", "references": "REB Primary Mathematics P5 Student Book (SB), Unit 1, pp. 20-25; REB P5 Teacher's Guide (TG), pp. 15-20; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Inclusive Education", "intro": "Teacher writes the numbers 12 and 18 on the board and asks learners to list all numbers that divide 12 without a remainder.", "development": "Teacher demonstrates prime factorization using factor trees for 12 (2 x 2 x 3) and 18 (2 x 3 x 3). Teacher explains how to extract GCF (common prime factors = 2 x 3 = 6) and LCM (highest powers = 36). In groups of 4, learners solve real-life problems involving recurring events (e.g., two buses departing every 15 and 20 mins). Teacher assists SEN learners with clear step-by-step division ladders.", "conclusion": "Learners present their factor trees on the chalkboard and explain the practical difference between LCM and GCF.", "evaluation": "REB P5 Student Book p. 24 Exercise 3: Calculate the GCF and LCM for three pairs of numbers (16 and 24; 20 and 30; 18 and 27)." }] }] },
  "P6": { "classLevel": "Primary 6 (P6)", "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19", "studentBookTitle": "REB Primary Mathematics P6 Student Book (SB)", "teacherGuideTitle": "REB Primary Mathematics P6 Teacher's Guide (TG)", "units": [{ "unitNo": "Unit 1", "unitTitle": "Whole Numbers up to 10,000,000 (Powers, Indices, and Roots)", "keyUnitCompetence": "Read, write, compare, and apply operations on numbers up to 10,000,000; solve problems involving indices and square roots.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Powers, Indices, and Calculating Square Roots of Perfect Squares", "instrObjective": "Using prime factorization, learners should be able to express numbers in index notation and calculate square roots of perfect squares accurately.", "materials": "Square grid paper, prime factorization charts, scientific calculator (for verification), REB P6 Student Book pp. 15-21", "references": "REB Primary Mathematics P6 Student Book (SB), Unit 1, pp. 15-21; REB P6 Teacher's Guide (TG), pp. 12-16; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Inclusive Education", "intro": "Teacher draws a 4x4 square on grid paper and asks learners to count the total squares (16). Teacher explains 4 squared = 4 x 4 = 16.", "development": "Teacher introduces square root notation and models finding the square root of 144 using prime factorization (144 = 2^4 x 3^2, square root = 2^2 x 3 = 12). In small groups, learners find square roots of 196, 225, and 400 using prime factor trees. Teacher supports SEN learners by providing visual reference tables of squares from 1x1 to 15x15.", "conclusion": "Learners explain the inverse relationship between squaring a number and finding its square root.", "evaluation": "REB P6 Student Book p. 20 Exercise 2: Calculate the square root of 5 given perfect squares using prime factorization." }] }] }
};

let syllabus = FALLBACK_SYLLABUS;

async function loadSyllabus(){
  try {
    const resp = await fetch('syllabus.json');
    if(!resp.ok) return FALLBACK_SYLLABUS;
    const data = await resp.json();
    return Object.keys(data).length > 0 ? data : FALLBACK_SYLLABUS;
  } catch(e) {
    console.warn('syllabus load failed, using embedded fallback', e);
    return FALLBACK_SYLLABUS;
  }
}

function getTodayDateString() {
  const d = new Date();
  const yr = d.getFullYear();
  const mo = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${yr}-${mo}-${day}`;
}

function saveHeadersToLocalStorage(isAuto = true) {
  try {
    const data = new FormData(form);
    const headerMetadata = {};
    HEADER_FIELDS.forEach(field => { headerMetadata[field] = data.get(field) || ''; });
    localStorage.setItem(LS_HEADER_KEY, JSON.stringify(headerMetadata));
    if (lsStatusBadge) {
      lsStatusBadge.textContent = '✓ Saved in LocalStorage';
      lsStatusBadge.classList.add('updated');
      setTimeout(() => lsStatusBadge.classList.remove('updated'), 1000);
    }
    if (!isAuto) alert('✓ Standard Administrative Header Metadata saved as defaults to LocalStorage!');
  } catch (err) { console.error('Error saving header metadata', err); }
}

function loadHeadersFromLocalStorage() {
  try {
    const saved = localStorage.getItem(LS_HEADER_KEY);
    if (saved) {
      const headerMetadata = JSON.parse(saved);
      HEADER_FIELDS.forEach(field => { if (form[field] && headerMetadata[field] !== undefined) form[field].value = headerMetadata[field]; });
      if (lsStatusBadge) lsStatusBadge.textContent = '✓ Saved in LocalStorage';
    } else {
      if (!form.date.value) form.date.value = getTodayDateString();
    }
  } catch (err) { console.error('Error loading header metadata', err); }
}

function clearHeadersFromLocalStorage() {
  try {
    if (confirm('Are you sure you want to clear saved header metadata from LocalStorage?')) {
      localStorage.removeItem(LS_HEADER_KEY);
      HEADER_FIELDS.forEach(field => { if (field !== 'subject' && field !== 'duration' && field !== 'classSize' && form[field]) form[field].value = ''; });
      form.duration.value = '40';
      form.classSize.value = '30';
      form.date.value = getTodayDateString();
      if (lsStatusBadge) lsStatusBadge.textContent = '○ LocalStorage Empty';
      fillPrintableFromForm();
    }
  } catch (err) { console.error('Error clearing LocalStorage', err); }
}

function loadAiSettings() {
  try {
    const saved = localStorage.getItem(LS_AI_SETTINGS_KEY);
    if (saved) {
      const s = JSON.parse(saved);
      if (s.provider && aiProviderSelect) aiProviderSelect.value = s.provider;
      if (s.model && aiModelInput) aiModelInput.value = s.model;
      if (s.apiKey && aiApiKeyInput) aiApiKeyInput.value = s.apiKey;
      if (s.endpoint && aiEndpointInput) aiEndpointInput.value = s.endpoint;
    }
  } catch (err) { console.error('Error loading AI settings', err); }
}

function saveAiSettings() {
  try {
    const settings = { provider: aiProviderSelect ? aiProviderSelect.value : 'builtin', model: aiModelInput ? aiModelInput.value : '', apiKey: aiApiKeyInput ? aiApiKeyInput.value : '', endpoint: aiEndpointInput ? aiEndpointInput.value : '' };
    localStorage.setItem(LS_AI_SETTINGS_KEY, JSON.stringify(settings));
    if (aiSettingsStatus) { aiSettingsStatus.textContent = '✓ Saved AI Settings!'; setTimeout(() => aiSettingsStatus.textContent = '', 3000); }
  } catch (err) { console.error('Error saving AI settings', err); }
}

function updateRebStatusCard(selectedClass) {
  if (!selectedClass) {
    rebStatusText.textContent = 'Select Class (P1–P6) to load REB Student Book (SB), Teacher\'s Guide (TG), & Scheme of Work.';
    unitTopicSelect.innerHTML = '<option value="">-- Choose Class First --</option>';
    return;
  }
  const clsData = syllabus[selectedClass];
  if (clsData) {
    rebStatusText.innerHTML = `📚 Active Curriculum: <strong>${clsData.studentBookTitle}</strong> & <strong>${clsData.teacherGuideTitle}</strong> loaded from <a href="https://elearning.reb.rw/course/index.php?categoryid=19" target="_blank">elearning.reb.rw</a>.`;
    let opts = '<option value="">-- Let AI Decide / Choose from REB Unit --</option>';
    clsData.units.forEach((u, uIdx) => {
      opts += `<optgroup label="${u.unitNo}: ${u.unitTitle}">`;
      u.lessons.forEach((l, lIdx) => { opts += `<option value="${uIdx}_${lIdx}">${u.unitNo} — ${l.lessonTitle}</option>`; });
      opts += `</optgroup>`;
    });
    unitTopicSelect.innerHTML = opts;
  } else {
    rebStatusText.textContent = `Connected to REB Math Category ID 19 for ${selectedClass}.`;
    unitTopicSelect.innerHTML = '<option value="">-- REB Mathematics Standard Units --</option>';
  }
}

async function handleAiGenerate() {
  const cls = form.class.value;
  if (!cls) { alert('Please select a Class (P1–P6) first so the AI can consult REB Student Books and Teacher\'s Guides!'); classSelect.focus(); return; }
  showModalProgress();
  const provider = aiProviderSelect ? aiProviderSelect.value : 'builtin';
  const apiKey = aiApiKeyInput ? aiApiKeyInput.value.trim() : '';
  const model = aiModelInput ? aiModelInput.value.trim() : '';
  const endpoint = aiEndpointInput ? aiEndpointInput.value.trim() : '';
  const selectedUnitIndex = unitTopicSelect ? unitTopicSelect.value : '';
  const customTopic = customTopicInput ? customTopicInput.value.trim() : '';
  const headerContext = { school: form.school.value || 'Primary School', teacher: form.teacher.value || 'Teacher', term: form.term.value || 'Term 1', date: form.date.value || getTodayDateString(), class: cls, unitNo: form.unitNo.value || '', lessonNo: form.lessonNo.value || '', duration: form.duration.value || '40', classSize: form.classSize.value || '30', sen: form.sen.value || '2 learners with mild visual impairment, 1 slow learner', planLocation: form.planLocation.value || `${cls} Classroom / Math Learning Corner` };
  try {
    if (provider !== 'builtin' && apiKey) {
      const aiResult = await callExternalLLM(provider, apiKey, model, endpoint, headerContext, selectedUnitIndex, customTopic);
      if (aiResult) { populateFormWithAiResult(aiResult, headerContext); finishModalAndPreview(); return; }
    }
  } catch (err) { console.warn('External AI API call failed, fallback to builtin', err); }
  const builtinResult = generateBuiltinAiLessonPlan(cls, selectedUnitIndex, customTopic, headerContext);
  populateFormWithAiResult(builtinResult, headerContext);
  finishModalAndPreview();
}

function showModalProgress() {
  aiProgressModal.classList.remove('hidden');
  modalTitle.textContent = 'AI Consulting REB Curriculum Repository...';
  modalStepText.textContent = 'Connecting to elearning.reb.rw (Category 19)...';
  modalProgressBar.style.width = '25%';
  setTimeout(() => { modalTitle.textContent = 'Reading Student Books (SB) & Teacher\'s Guides (TG)...'; modalStepText.textContent = `Analyzing Rwanda CBC Mathematics syllabus for Class ${form.class.value}...`; modalProgressBar.style.width = '55%'; }, 600);
  setTimeout(() => { modalTitle.textContent = 'Synthesizing Human-Like Pedagogical Activities...'; modalStepText.textContent = 'Formulating SMART objectives, SEN differentiation, and timed stage activities...'; modalProgressBar.style.width = '85%'; }, 1300);
}

function finishModalAndPreview() {
  setTimeout(() => {
    modalTitle.textContent = 'Lesson Plan Generated Successfully!';
    modalStepText.textContent = 'Updating standard administrative metadata and printable preview...';
    modalProgressBar.style.width = '100%';
    setTimeout(() => { aiProgressModal.classList.add('hidden'); saveHeadersToLocalStorage(true); fillPrintableFromForm(); highlightUpdatedFields(); }, 400);
  }, 1900);
}

function highlightUpdatedFields() {
  const fields = ['unitTitle','keyUnitCompetence','lessonTitle','instrObjective','learningMaterials','references','crossCutting','activityOverview','selfAssessment','step1_time','step1_teacher','step1_learner','step1_note','step2_time','step2_teacher','step2_learner','step2_note','step3_time','step3_teacher','step3_learner','step3_note'];
  fields.forEach(f => { const el = form[f]; if (el) { el.style.backgroundColor = '#f0fdf4'; setTimeout(() => el.style.backgroundColor = '', 1500); } });
}

function defaultStageTimings(durationMins) {
  const d = parseInt(durationMins, 10) || 40;
  const intro = Math.max(5, Math.round(d * 0.125));
  const conclusion = Math.max(5, Math.round(d * 0.25));
  const development = Math.max(10, d - intro - conclusion);
  return {
    step1: `${intro} minutes`,
    step2: `${development} minutes`,
    step3: `${conclusion} minutes`
  };
}

function toHyphenBullets(...texts) {
  const items = [];
  texts.filter(Boolean).forEach(text => {
    String(text).split(/\n+/).forEach(line => {
      const cleaned = line.replace(/^[-•*]\s*/, '').trim();
      if (!cleaned) return;
      const sentences = cleaned.split(/(?<=[.!?])\s+(?=[A-Z“"'])/).map(s => s.trim()).filter(Boolean);
      (sentences.length ? sentences : [cleaned]).forEach(s => {
        const item = s.replace(/\s+/g, ' ').trim();
        if (item) items.push(item.replace(/[.]+$/, ''));
      });
    });
  });
  const unique = [];
  items.forEach(item => { if (!unique.includes(item)) unique.push(item); });
  return unique.map(item => `- ${item}.`.replace(/\.\.$/, '.')).join('\n');
}

function formatGcciCell(gc, cci, note) {
  if (note && String(note).trim()) return String(note).trim();
  const lines = [];
  if (gc) lines.push(`G.C: ${gc}`);
  if (cci) lines.push(`C.C.I: ${cci}`);
  return lines.join('\n');
}

function formatClassSize(data) {
  const boys = data.get('classBoys');
  const girls = data.get('classGirls');
  const total = data.get('classSize') || '';
  if (boys !== null && boys !== '' || girls !== null && girls !== '') {
    return `Boys: ${boys || 0}\nGirls: ${girls || 0}\nTotal: ${total || ((parseInt(boys, 10) || 0) + (parseInt(girls, 10) || 0))}`;
  }
  return total;
}

function collapseLegacySteps(aiData) {
  if (!aiData) return aiData;
  const hasLegacy = !!(aiData.step4_teacher || aiData.step5_teacher || aiData.step6_teacher || aiData.step4 || aiData.step5 || aiData.step6);
  if (!hasLegacy) return aiData;
  const out = { ...aiData };
  out.step2_teacher = toHyphenBullets(aiData.step2_teacher || aiData.step2, aiData.step3_teacher || aiData.step3, aiData.step4_teacher || aiData.step4);
  out.step2_learner = toHyphenBullets(aiData.step2_learner, aiData.step3_learner, aiData.step4_learner);
  out.step2_gc = aiData.step2_gc || aiData.step3_gc || aiData.step4_gc || '';
  out.step2_cci = aiData.step2_cci || aiData.step3_cci || aiData.step4_cci || '';
  out.step2_note = [aiData.step2_note, aiData.step3_note, aiData.step4_note].filter(Boolean).join('\n') || out.step2_note;
  out.step3_teacher = toHyphenBullets(aiData.step5_teacher || aiData.step5, aiData.step6_teacher || aiData.step6);
  out.step3_learner = toHyphenBullets(aiData.step5_learner, aiData.step6_learner);
  out.step3_gc = aiData.step5_gc || aiData.step3_gc || aiData.step6_gc || '';
  out.step3_cci = aiData.step5_cci || aiData.step3_cci || aiData.step6_cci || '';
  out.step3_note = [aiData.step5_note, aiData.step6_note, aiData.step3_note].filter(Boolean).join('\n') || out.step3_note;
  return out;
}

// Helper to split combined activity into teacher/learner
function splitTeacherLearner(activity) {
  if (!activity) return {teacher:'', learner:''};
  // Try to split on "Learner" keyword
  const learnerIdx = activity.search(/Learners? /i);
  if (learnerIdx > 10) {
    return { teacher: activity.slice(0, learnerIdx).trim().replace(/\.$/,'.'), learner: activity.slice(learnerIdx).trim() };
  }
  // fallback: split sentences in half
  const sentences = activity.split('. ').filter(s=>s.trim());
  if (sentences.length >= 2) {
    const half = Math.ceil(sentences.length/2);
    return { teacher: sentences.slice(0,half).join('. ') + '.', learner: sentences.slice(half).join('. ') + '.' };
  }
  return { teacher: activity, learner: 'Learners respond, participate actively, and complete assigned tasks as guided by the teacher.' };
}

function parseGcCci(gcOrCci) {
  if (!gcOrCci) return {gc:'', cci:''};
  const parts = gcOrCci.split(' - ');
  const label = parts[0].trim();
  // Check which list it belongs to
  if (REB_GC_LIST.includes(label)) return {gc: label, cci: parts[1] ? parts[1] : '' };
  if (REB_CCI_LIST.includes(label)) return {gc: '', cci: label };
  // Try to detect both
  // e.g., "Critical Thinking - Inclusive Education"
  if (parts.length >=2 && REB_GC_LIST.includes(parts[0]) && REB_CCI_LIST.includes(parts[1].split(' ')[0])) {
    return {gc: parts[0], cci: parts[1]};
  }
  // default treat as CCI
  return {gc:'', cci: label };
}

function generateBuiltinAiLessonPlan(cls, selectedUnitIndex, customTopic, headers) {
  const clsData = syllabus[cls] || FALLBACK_SYLLABUS["P4"];
  let unitObj = clsData.units[0];
  let lessonObj = unitObj.lessons[0];
  if (selectedUnitIndex && selectedUnitIndex.includes('_')) {
    const [uIdx,lIdx] = selectedUnitIndex.split('_').map(Number);
    if (clsData.units[uIdx]) { unitObj = clsData.units[uIdx]; if (unitObj.lessons[lIdx]) lessonObj = unitObj.lessons[lIdx]; }
  } else if (customTopic) {
    for (const u of clsData.units) for (const l of u.lessons) if (l.lessonTitle.toLowerCase().includes(customTopic.toLowerCase()) || u.unitTitle.toLowerCase().includes(customTopic.toLowerCase())) { unitObj=u; lessonObj=l; break; }
  }

  const finalLessonTitle = customTopic ? `Rwanda CBC Focus: ${customTopic}` : lessonObj.lessonTitle;
  const finalObjective = customTopic ? `Using concrete classroom materials and REB textbooks, learners should be able to understand, calculate, and solve problems involving ${customTopic} correctly and explain their steps in pairs.` : lessonObj.instrObjective;

  const timings = defaultStageTimings(headers.duration || (form.duration && form.duration.value) || 40);

  // If syllabus has detailed steps, collapse them into the 3-row plan
  if (lessonObj.steps && lessonObj.steps.length >= 3) {
    const mapStep = (idx, defaults) => {
      const s = lessonObj.steps[idx] || {};
      const split = splitTeacherLearner(s.activity || '');
      const parsed = parseGcCci(s.gcOrCci);
      // For GC/CCI, try to intelligently assign: if gcOrCci contains GC label, use it; otherwise default
      let gc = parsed.gc || defaults.gc;
      let cci = parsed.cci || defaults.cci;
      // If still empty, infer from step index defaults
      return { teacher: split.teacher, learner: split.learner, gc, cci };
    };
    const m1 = mapStep(0, {gc:'Communication', cci:'Inclusive Education'});
    const m2 = mapStep(1, {gc:'Critical Thinking', cci:'Inclusive Education'});
    const m3 = mapStep(2, {gc:'Collaboration', cci:'Peace and Values Education'});
    const m4 = mapStep(3, {gc:'Communication', cci:'Peace and Values Education'});
    const m5 = mapStep(4, {gc:'Problem Solving', cci:'Gender'});
    const m6 = mapStep(5, {gc:'Lifelong Learning', cci:'Inclusive Education'});
    return {
      unitNo: form.unitNo.value || unitObj.unitNo || 'Unit 1',
      lessonNo: form.lessonNo.value || lessonObj.lessonNo || 'Lesson 1 of 6',
      unitTitle: unitObj.unitTitle,
      keyUnitCompetence: unitObj.keyUnitCompetence,
      lessonTitle: finalLessonTitle,
      instrObjective: finalObjective,
      planLocation: form.planLocation.value || `${cls} Primary Classroom / Math Corner`,
      learningMaterials: lessonObj.materials,
      references: `${unitObj.unitTitle} — REB Primary Mathematics ${cls} Student Book (SB) & Teacher's Guide (TG); elearning.reb.rw/course/index.php?categoryid=19`,
      crossCutting: lessonObj.crossCutting || m1.cci,
      activityOverview: `In introduction, learners brainstorm their experience related to ${lessonObj.lessonTitle}. In lesson development, learners work in pairs/groups to discover, present, and exploit the concept. In the conclusion, learners work with the teacher to summarize the lesson.`,
      selfAssessment: 'The lesson was completed as planned.',
      step1_time: timings.step1,
      step1_teacher: toHyphenBullets(m1.teacher), step1_learner: toHyphenBullets(m1.learner), step1_gc: m1.gc, step1_cci: m1.cci, step1_note: `G.C: ${m1.gc}\nLearners activate prior knowledge through discussion.\nC.C.I: ${m1.cci}`,
      step2_time: timings.step2,
      step2_teacher: toHyphenBullets(m2.teacher, m3.teacher, m4.teacher), step2_learner: toHyphenBullets(m2.learner, m3.learner, m4.learner), step2_gc: m2.gc || m3.gc, step2_cci: m2.cci || m3.cci, step2_note: `G.C: ${m2.gc || m3.gc}\nDeveloped when learners manipulate materials, present productions, and discuss strategies.\nC.C.I: ${m2.cci || m3.cci}`,
      step3_time: timings.step3,
      step3_teacher: toHyphenBullets(m5.teacher, m6.teacher), step3_learner: toHyphenBullets(m5.learner, m6.learner), step3_gc: m5.gc, step3_cci: m5.cci, step3_note: `G.C: ${m5.gc}\nDeveloped as learners recall, apply, and explain the concept.\nC.C.I: ${m5.cci}`
    };
  }

  // Fallback procedural generation for lessons without detailed steps
  const teacherNames = headers.teacher || 'Teacher';
  const senContext = headers.sen || 'learners with mild SEN';
  const introSplit = splitTeacherLearner(lessonObj.intro || '');
  const devSplit = splitTeacherLearner(lessonObj.development || '');
  const concSplit = splitTeacherLearner(lessonObj.conclusion || '');
  const evalSplit = splitTeacherLearner(lessonObj.evaluation || '');
  return {
    unitNo: form.unitNo.value || unitObj.unitNo || 'Unit 1',
    lessonNo: form.lessonNo.value || lessonObj.lessonNo || 'Lesson 1 of 6',
    unitTitle: unitObj.unitTitle,
    keyUnitCompetence: unitObj.keyUnitCompetence,
    lessonTitle: finalLessonTitle,
    instrObjective: finalObjective,
    planLocation: form.planLocation.value || `${cls} Primary Classroom / Math Corner`,
    learningMaterials: lessonObj.materials,
    references: `${unitObj.unitTitle} — REB Primary Mathematics ${cls} Student Book (SB) & Teacher's Guide (TG); elearning.reb.rw/course/index.php?categoryid=19`,
    crossCutting: lessonObj.crossCutting || 'Inclusive Education',
    activityOverview: `In introduction, learners brainstorm their experience related to ${lessonObj.lessonTitle}. In lesson development, learners work in pairs/groups to discover, present, and exploit the concept. In the conclusion, learners work with the teacher to summarize the lesson.`,
    selfAssessment: 'The lesson was completed as planned.',
    step1_time: timings.step1,
    step1_teacher: toHyphenBullets(introSplit.teacher || `${teacherNames} greets the ${cls} learners warmly, checks attendance and homework, and sings a counting rhyme to activate prior knowledge of ${unitObj.unitTitle.toLowerCase()}.`),
    step1_learner: toHyphenBullets(introSplit.learner || `Learners respond to greeting, sing along, recall previous lesson content, and answer probing questions about ${lessonObj.lessonTitle}.`),
    step1_gc: "Communication",
    step1_cci: "Inclusive Education",
    step1_note: `G.C: Communication\nLearners activate prior knowledge through discussion.\nC.C.I: Inclusive Education`,
    step2_time: timings.step2,
    step2_teacher: toHyphenBullets(devSplit.teacher || `Teacher models ${lessonObj.lessonTitle} on the chalkboard using visual aids and REB SB examples.`, `Teacher circulates to support ${senContext} with enlarged charts and tactile materials.`, `Teacher invites groups to present productions and guides exploitation of their strategies.`),
    step2_learner: toHyphenBullets(devSplit.learner || `Learners observe the demonstration and work in groups of 4 with concrete materials.`, `Learners present solutions on the chalkboard and verify each other's work respectfully.`),
    step2_gc: "Collaboration",
    step2_cci: "Inclusive Education",
    step2_note: `G.C: Collaboration\nDeveloped when learners manipulate materials, present productions, and discuss strategies.\nC.C.I: Inclusive Education`,
    step3_time: timings.step3,
    step3_teacher: toHyphenBullets(concSplit.teacher || `Teacher leads a short recap and asks learners to state the golden rules learned.`, evalSplit.teacher || `Teacher administers a short formative assessment from REB SB and gives immediate feedback.`),
    step3_learner: toHyphenBullets(concSplit.learner || `Learners summarise key concepts and explain rules to the class.`, evalSplit.learner || `Learners complete the assessment individually, self-check answers, and note homework.`),
    step3_gc: "Problem Solving",
    step3_cci: "Gender",
    step3_note: `G.C: Problem Solving\nDeveloped as learners recall, apply, and explain the concept.\nC.C.I: Gender`
  };
}

async function callExternalLLM(provider, apiKey, model, endpoint, headers, selectedUnitIndex, customTopic) {
  const cls = headers.class || 'P4';
  const prompt = `You are an expert Rwandan Primary School Mathematics teacher.\nGenerate a 3-row lesson plan JSON for Class ${cls}: Introduction, Lesson development, Conclusion.\nContext: Class ${cls}, Term ${headers.term}, Duration ${headers.duration} mins, SEN ${headers.sen}, Topic ${customTopic || 'standard REB unit for '+cls}\nReturn ONLY JSON with keys: unitNo, lessonNo, unitTitle, keyUnitCompetence, lessonTitle, instrObjective, planLocation, learningMaterials, references, crossCutting, activityOverview, selfAssessment, step1_time, step1_teacher, step1_learner, step1_gc, step1_cci, step1_note, step2_time, step2_teacher, step2_learner, step2_gc, step2_cci, step2_note, step3_time, step3_teacher, step3_learner, step3_gc, step3_cci, step3_note\nWrite teacher and learner activities as hyphen bullets, one action per line (e.g. \"- Greet the class\").\nGC must be one of: Critical Thinking, Problem Solving, Creativity and Innovation, Communication, Collaboration, Digital Literacy, Lifelong Learning, Cultural Identity, Self-Confidence\nCCI must be one of: Peace and Values Education, Gender, Inclusive Education, Environment, Financial Education, Standardization Culture, Impact of Social Media, Comprehensive Sexuality Education, Genocide Studies, Disaster Risk Reduction`;
  let apiUrl='', fetchOptions={};
  if (provider==='openai' || provider==='custom') { apiUrl = endpoint || 'https://api.openai.com/v1/chat/completions'; const chosenModel=model||'gpt-4o-mini'; fetchOptions={method:'POST', headers:{'Content-Type':'application/json','Authorization':`Bearer ${apiKey}`}, body:JSON.stringify({model:chosenModel, messages:[{role:'user',content:prompt}], temperature:0.7})}; }
  else if (provider==='gemini') { const chosenModel=model||'gemini-1.5-flash'; apiUrl=`https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${apiKey}`; fetchOptions={method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({contents:[{parts:[{text:prompt}]}]})}; }
  else if (provider==='claude') { apiUrl='https://api.anthropic.com/v1/messages'; const chosenModel=model||'claude-3-5-sonnet-20241022'; fetchOptions={method:'POST', headers:{'Content-Type':'application/json','x-api-key':apiKey,'anthropic-version':'2023-06-01'}, body:JSON.stringify({model:chosenModel, max_tokens:1500, messages:[{role:'user',content:prompt}]})}; }
  const response = await fetch(apiUrl, fetchOptions);
  if (!response.ok) throw new Error(`AI API request failed ${response.status}`);
  const resJson = await response.json();
  let contentText='';
  if (provider==='openai' || provider==='custom') contentText=resJson.choices[0].message.content;
  else if (provider==='gemini') contentText=resJson.candidates[0].content.parts[0].text;
  else if (provider==='claude') contentText=resJson.content[0].text;
  const jsonMatch = contentText.match(/\{[\s\S]*\}/);
  if (jsonMatch) return JSON.parse(jsonMatch[0]);
  return null;
}

function populateFormWithAiResult(aiData, headers) {
  if (!aiData) return;
  aiData = collapseLegacySteps(aiData);
  if (aiData.unitNo) form.unitNo.value = aiData.unitNo;
  if (aiData.lessonNo) form.lessonNo.value = aiData.lessonNo;
  if (aiData.unitTitle) form.unitTitle.value = aiData.unitTitle;
  if (aiData.keyUnitCompetence) form.keyUnitCompetence.value = aiData.keyUnitCompetence;
  if (aiData.lessonTitle) form.lessonTitle.value = aiData.lessonTitle;
  if (aiData.instrObjective) form.instrObjective.value = aiData.instrObjective;
  if (aiData.planLocation) form.planLocation.value = aiData.planLocation;
  if (aiData.learningMaterials) form.learningMaterials.value = aiData.learningMaterials;
  if (aiData.references) form.references.value = aiData.references;
  if (aiData.crossCutting) form.crossCutting.value = aiData.crossCutting;
  if (aiData.activityOverview && form.activityOverview) form.activityOverview.value = aiData.activityOverview;
  if (aiData.selfAssessment && form.selfAssessment) form.selfAssessment.value = aiData.selfAssessment;
  const timings = defaultStageTimings((headers && headers.duration) || (form.duration && form.duration.value) || 40);
  for (let i=1;i<=3;i++) {
    if (form[`step${i}_time`]) form[`step${i}_time`].value = aiData[`step${i}_time`] || timings[`step${i}`];
    if (aiData[`step${i}_teacher`] && form[`step${i}_teacher`]) form[`step${i}_teacher`].value = toHyphenBullets(aiData[`step${i}_teacher`]);
    if (aiData[`step${i}_learner`] && form[`step${i}_learner`]) form[`step${i}_learner`].value = toHyphenBullets(aiData[`step${i}_learner`]);
    if (aiData[`step${i}_gc`] && form[`step${i}_gc`]) form[`step${i}_gc`].value = aiData[`step${i}_gc`];
    if (aiData[`step${i}_cci`] && form[`step${i}_cci`]) form[`step${i}_cci`].value = aiData[`step${i}_cci`];
    if (aiData[`step${i}_note`] && form[`step${i}_note`]) form[`step${i}_note`].value = aiData[`step${i}_note`];
    if (aiData[`step${i}`] && form[`step${i}_teacher`] && !form[`step${i}_teacher`].value) {
      const split = splitTeacherLearner(aiData[`step${i}`]);
      form[`step${i}_teacher`].value = toHyphenBullets(split.teacher);
      form[`step${i}_learner`].value = toHyphenBullets(split.learner);
    }
    if (aiData[`step${i}_gcci`] && form[`step${i}_gc`]) {
      const parsed = parseGcCci(aiData[`step${i}_gcci`]);
      if (parsed.gc) form[`step${i}_gc`].value = parsed.gc;
      if (parsed.cci) form[`step${i}_cci`].value = parsed.cci;
    }
  }
  if (aiData.intro && form.step1_teacher && !form.step1_teacher.value) {
    const s = splitTeacherLearner(aiData.intro);
    form.step1_teacher.value = toHyphenBullets(s.teacher);
    form.step1_learner.value = toHyphenBullets(s.learner);
  }
  if (aiData.development && form.step2_teacher && !form.step2_teacher.value) {
    const s = splitTeacherLearner(aiData.development);
    form.step2_teacher.value = toHyphenBullets(s.teacher);
    form.step2_learner.value = toHyphenBullets(s.learner);
  }
  if (aiData.conclusion && form.step3_teacher && !form.step3_teacher.value) {
    const s = splitTeacherLearner(aiData.conclusion + ' ' + (aiData.evaluation || ''));
    form.step3_teacher.value = toHyphenBullets(s.teacher);
    form.step3_learner.value = toHyphenBullets(s.learner);
  }
}

function fillPrintableFromForm() {
  const data = new FormData(form);
  const timings = defaultStageTimings(data.get('duration') || 40);
  const map = {
    p_school: data.get('school') || '',
    p_teacher: data.get('teacher') || '',
    p_term: data.get('term') || '',
    p_date: data.get('date') || '',
    p_subject: data.get('subject') || 'Mathematics',
    p_class: data.get('class') || '',
    p_unitNo: data.get('unitNo') || '',
    p_lessonNo: data.get('lessonNo') || '',
    p_duration: (data.get('duration') || '') + ' mins',
    p_classSize: formatClassSize(data),
    p_sen: data.get('sen') || 'None reported',
    p_unitTitle: data.get('unitTitle') || '',
    p_keyUnitCompetence: data.get('keyUnitCompetence') || '',
    p_lessonTitle: data.get('lessonTitle') || '',
    p_instrObjective: data.get('instrObjective') || '',
    p_planLocation: data.get('planLocation') || '',
    p_learningMaterials: data.get('learningMaterials') || '',
    p_references: data.get('references') || '',
    p_crossCutting: data.get('crossCutting') || '',
    p_activityOverview: data.get('activityOverview') || '',
    p_selfAssessment: data.get('selfAssessment') || ''
  };
  for (let i=1;i<=3;i++) {
    map[`p_step${i}_time`] = data.get(`step${i}_time`) || timings[`step${i}`];
    map[`p_step${i}_teacher`] = toHyphenBullets(data.get(`step${i}_teacher`) || data.get(`step${i}`) || '');
    map[`p_step${i}_learner`] = toHyphenBullets(data.get(`step${i}_learner`) || '');
    map[`p_step${i}_gcci`] = formatGcciCell(data.get(`step${i}_gc`), data.get(`step${i}_cci`), data.get(`step${i}_note`));
  }
  for (const k in map) { const el = document.getElementById(k); if (el) el.textContent = map[k]; }
}

function syncClassTotal() {
  if (!form.classBoys || !form.classGirls || !form.classSize) return;
  const b = parseInt(form.classBoys.value, 10) || 0;
  const g = parseInt(form.classGirls.value, 10) || 0;
  form.classSize.value = String(b + g);
}
if (form.classBoys) form.classBoys.addEventListener('input', () => { syncClassTotal(); fillPrintableFromForm(); });
if (form.classGirls) form.classGirls.addEventListener('input', () => { syncClassTotal(); fillPrintableFromForm(); });
if (classSelect) classSelect.addEventListener('change', () => { updateRebStatusCard(classSelect.value); saveHeadersToLocalStorage(true); fillPrintableFromForm(); });
HEADER_FIELDS.forEach(field => { const el = form[field]; if (el) { el.addEventListener('input', () => { saveHeadersToLocalStorage(true); fillPrintableFromForm(); }); el.addEventListener('change', () => { saveHeadersToLocalStorage(true); fillPrintableFromForm(); }); } });
if (saveHeadersBtn) saveHeadersBtn.addEventListener('click', () => saveHeadersToLocalStorage(false));
if (clearHeadersBtn) clearHeadersBtn.addEventListener('click', clearHeadersFromLocalStorage);
if (toggleAiSettingsBtn && aiSettingsDrawer) toggleAiSettingsBtn.addEventListener('click', () => { aiSettingsDrawer.classList.toggle('hidden'); });
if (saveAiSettingsBtn) saveAiSettingsBtn.addEventListener('click', saveAiSettings);
if (aiGenerateBtn) aiGenerateBtn.addEventListener('click', handleAiGenerate);
if (aiGenerateBtnBottom) aiGenerateBtnBottom.addEventListener('click', handleAiGenerate);
form.addEventListener('input', fillPrintableFromForm);
form.addEventListener('change', fillPrintableFromForm);
form.addEventListener('submit', (e) => {
  e.preventDefault(); fillPrintableFromForm(); saveHeadersToLocalStorage(true);
  const clsName = form.class.value || 'Class';
  const opt = { margin: 0.4, filename: `REB-${clsName}-Math-LessonPlan-${getTodayDateString()}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
  if (typeof html2pdf !== 'undefined') html2pdf().set(opt).from(printable).save();
  else { alert('PDF library not loaded. Triggering browser Print to PDF instead.'); window.print(); }
});
if (printBtn) printBtn.addEventListener('click', () => { fillPrintableFromForm(); saveHeadersToLocalStorage(true); window.print(); });
document.addEventListener('DOMContentLoaded', async () => {
  const loadedSyllabus = await loadSyllabus();
  if (loadedSyllabus && Object.keys(loadedSyllabus).length > 0) syllabus = loadedSyllabus;
  loadHeadersFromLocalStorage();
  loadAiSettings();
  if (classSelect && classSelect.value) updateRebStatusCard(classSelect.value);
  fillPrintableFromForm();
});
