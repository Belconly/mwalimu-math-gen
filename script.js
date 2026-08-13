// myscript.js — REB CBC Official 5-Column Format (Teacher Activities, Learners Activities, G.C., C.C.I.)
// Rwanda CBC Primary Mathematics Lesson Plan Generator (P1–P6)

const form = document.getElementById('lpForm');
const printable = document.getElementById('printable');
const classSelect = document.getElementById('classSelect');
const dateInput = document.getElementById('dateInput');
const rebStatusText = document.getElementById('rebStatusText');
const unitTitleSearch = document.getElementById('unitTitleSearch');
const lessonTitleSearch = document.getElementById('lessonTitleSearch');
const lookupResult = document.getElementById('lookupResult');
const yearUnitList = document.getElementById('yearUnitList');
const yearUnitIndex = document.getElementById('yearUnitIndex');

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

const HEADER_FIELDS = ['school','teacher','term','date','subject','class','unitNo','lessonNo','duration','classSize','sen','planLocation'];

function getField(name) {
  if (!form) return null;
  return form.elements[name] || form[name] || document.querySelector(`[name="${name}"]`);
}
function getFieldValue(name, fallback = '') {
  const el = getField(name);
  return (el && el.value !== undefined && el.value !== '') ? el.value : fallback;
}
function setFieldValue(name, val) {
  const el = getField(name);
  if (el) el.value = val;
}

// REB Official Lists
const REB_GC_LIST = ["Critical Thinking","Problem Solving","Creativity and Innovation","Communication","Collaboration","Digital Literacy","Lifelong Learning","Cultural Identity","Self-Confidence"];
const REB_CCI_LIST = ["Peace and Values Education","Gender","Inclusive Education","Environment","Financial Education","Standardization Culture","Impact of Social Media","Comprehensive Sexuality Education","Genocide Studies","Disaster Risk Reduction"];

const FALLBACK_SYLLABUS = {
  "P1": {
    "classLevel": "Primary 1 (P1)",
    "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19",
    "pupilBookTitle": "REB Primary Mathematics P1 Pupil's Book (PB)",
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
            "materials": "Number cards (1-20), chalkboard, counters, bottle caps, small sticks, Manila paper, REB P1 Pupil's Book pp. 12-16",
            "references": "REB Primary Mathematics P1 Pupil's Book (PB), Unit 1, pp. 12-16; REB P1 Teacher's Guide (TG), pp. 8-11; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)",
            "crossCutting": "Inclusive Education",
            "intro": "Teacher greets the class and sings a short counting rhyme from 1 to 10 with learners. Teacher shows 5 bottle caps and asks learners to count aloud together, activating prior knowledge of numbers.",
            "development": "Teacher models counting objects up to 20 on the teacher's table. Learners work in small groups of 4 with counters to make groups of 10, 15, and 20. Teacher circulates to assist learners with SEN by providing tactile number cards and guiding their hand counting. Selected learners come to the chalkboard to write numbers corresponding to groups of counters drawn by the teacher.",
            "conclusion": "Teacher leads a quick class recap where learners count aloud from 20 backwards to 1. Teacher praises correct participation and clarifies any confusion between numbers like 12 and 20.",
            "evaluation": "Learners complete Exercise 1 in REB P1 Pupil's Book page 15: matching drawn object sets with correct number symbols from 1 to 20. Teacher checks notebooks and provides immediate remedial feedback."
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
            "materials": "Cardboard shape cutouts, rulers, scissors, classroom objects (books, clocks), REB P1 Pupil's Book pp. 45-48",
            "references": "REB Primary Mathematics P1 Pupil's Book (PB), Unit 2, pp. 45-48; REB P1 Teacher's Guide (TG), pp. 30-33; REB e-Learning Portal (elearning.reb.rw)",
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
    "pupilBookTitle": "REB Primary Mathematics P2 Pupil's Book (PB)",
    "teacherGuideTitle": "REB Primary Mathematics P2 Teacher's Guide (TG)",
    "units": [{ "unitNo": "Unit 1", "unitTitle": "Whole Numbers from 0 to 100", "keyUnitCompetence": "Read, write, count, compare, and represent whole numbers up to 100 in terms of tens and ones.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Place Value of Numbers up to 100 (Tens and Ones)", "instrObjective": "Using bundles of 10 sticks and loose sticks, learners should be able to decompose 2-digit numbers into tens and ones correctly.", "materials": "Bundles of 10 sticks, rubber bands, place-value table chart, number cards, REB P2 Pupil's Book pp. 10-14", "references": "REB Primary Mathematics P2 Pupil's Book (PB), Unit 1, pp. 10-14; REB P2 Teacher's Guide (TG), pp. 8-12; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Inclusive Education", "intro": "Teacher asks learners to count from 10 to 50 by tens (10, 20, 30...). Teacher displays 3 bundles of 10 sticks and 4 single sticks and asks how many sticks are shown in total.", "development": "Teacher introduces the Place Value Chart (Tens | Ones) on the chalkboard. Teacher explains that 34 has 3 Tens and 4 Ones. Learners work in pairs with counting sticks to build numbers called out by the teacher (e.g., 47, 62, 85). Teacher gives learners with SEN color-coded tens and ones cards to reinforce the concept visually and tactilely.", "conclusion": "Teacher invites three learners to write numbers on the chalkboard place-value chart and explain their tens and ones digits.", "evaluation": "Learners complete Exercise 2 in REB P2 Pupil's Book p. 13: writing tens and ones for given 2-digit numbers (e.g., 58 = ___ Tens and ___ Ones)." }] }]
  },
  "P3": { "classLevel": "Primary 3 (P3)", "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19", "pupilBookTitle": "REB Primary Mathematics P3 Pupil's Book (PB)", "teacherGuideTitle": "REB Primary Mathematics P3 Teacher's Guide (TG)", "units": [{ "unitNo": "Unit 1", "unitTitle": "Whole Numbers up to 1,000", "keyUnitCompetence": "Read, write, compare, and perform addition and subtraction of whole numbers up to 1,000 in real-life contexts.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Reading, Writing, and Place Value of Numbers up to 1,000", "instrObjective": "Using place-value abacus charts and base-ten blocks, learners should be able to identify hundreds, tens, and ones in 3-digit numbers correctly.", "materials": "Base-ten blocks, wooden abacus, place value cards (Hundreds, Tens, Ones), REB P3 Pupil's Book pp. 8-13", "references": "REB Primary Mathematics P3 Pupil's Book (PB), Unit 1, pp. 8-13; REB P3 Teacher's Guide (TG), pp. 6-10; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Inclusive Education", "intro": "Teacher asks learners to count by 100s up to 500 (100, 200, 300...). Teacher writes 345 on the chalkboard and asks learners what each digit stands for.", "development": "Teacher demonstrates representing 345 on a 3-spike abacus (3 Hundreds, 4 Tens, 5 Ones). In groups of 5, learners use number cards to construct 3-digit numbers called out by the teacher and decompose them into expanded form (300 + 40 + 5). Teacher supports SEN learners by using large print number flashcards and physical base-ten blocks.", "conclusion": "Learners volunteer to come to the front and challenge the class to read a 3-digit number they have formed on the abacus.", "evaluation": "Exercise in REB P3 Pupil's Book p. 12: Write 5 given numbers in words and in expanded place value form." }] }] },
  "P4": { "classLevel": "Primary 4 (P4)", "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19", "pupilBookTitle": "REB Primary Mathematics P4 Pupil's Book (PB)", "teacherGuideTitle": "REB Primary Mathematics P4 Teacher's Guide (TG)", "units": [{ "unitNo": "Unit 1", "unitTitle": "Whole Numbers up to 100,000", "keyUnitCompetence": "Read, write, compare, and round whole numbers up to 100,000 and apply operations in daily life.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Place Value and Value of Digits up to 100,000", "instrObjective": "Using place value charts up to Ten Thousands, learners should be able to identify the place value and numeric value of each digit in a 5-digit number correctly.", "materials": "Place value table (Ten Thousands, Thousands, Hundreds, Tens, Ones), number flashcards, REB P4 Pupil's Book pp. 14-19", "references": "REB Primary Mathematics P4 Pupil's Book (PB), Unit 1, pp. 14-19; REB P4 Teacher's Guide (TG), pp. 10-14; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Inclusive Education", "intro": "Teacher asks learners to read 9,999 on the chalkboard, then asks what number comes next when we add 1.", "development": "Teacher introduces 10,000 and expands the place value chart to 5 columns. Teacher writes 64,825 and guides learners to state the place value of 6 (Ten Thousands) and its value (60,000). In groups, learners draw 5-digit place value tables on Manila paper and represent numbers given by the teacher. Teacher provides enlarged digit cards for SEN learners with visual difficulties.", "conclusion": "Learners summarize the difference between 'place value' (name of the column) and 'value' (number of units).", "evaluation": "REB P4 Pupil's Book p. 18 Exercise 1: State the place value and value of the underlined digits in 6 given 5-digit numbers." }] }, { "unitNo": "Unit 5", "unitTitle": "Fractions and Decimals", "keyUnitCompetence": "Understand, compare, and perform basic operations on proper fractions, mixed numbers, and simple decimals.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Identifying and Comparing Proper, Improper Fractions, and Mixed Numbers", "instrObjective": "Using fraction strips and circular models, learners should be able to distinguish between proper fractions, improper fractions, and mixed numbers accurately.", "materials": "Fraction strips, cardboard circular pies, colored markers, REB P4 Pupil's Book pp. 68-73", "references": "REB Primary Mathematics P4 Pupil's Book (PB), Unit 5, pp. 68-73; REB P4 Teacher's Guide (TG), pp. 50-55; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Peace", "intro": "Teacher displays 3 equal paper loaves of bread and asks how 2 learners can share 3 loaves equally.", "development": "Teacher explains proper fractions (numerator < denominator, e.g., 3/4), improper fractions (numerator >= denominator, e.g., 5/4), and mixed numbers (whole number + fraction, e.g., 1 1/4). Learners work in small groups with paper models to convert 5/4 into 1 1/4 by combining whole circles and remaining quarters.", "conclusion": "Learners explain the relationship between improper fractions and mixed numbers on the chalkboard.", "evaluation": "Exercise: Classify a list of 10 fractions into Proper, Improper, or Mixed Numbers in exercise books." }] }] },
  "P5": { "classLevel": "Primary 5 (P5)", "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19", "pupilBookTitle": "REB Primary Mathematics P5 Pupil's Book (PB)", "teacherGuideTitle": "REB Primary Mathematics P5 Teacher's Guide (TG)", "units": [{ "unitNo": "Unit 1", "unitTitle": "Whole Numbers up to 1,000,000 (LCM and GCF)", "keyUnitCompetence": "Read, write, compare, and perform operations on numbers up to 1,000,000; find Prime Numbers, LCM, and GCF.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Finding Lowest Common Multiple (LCM) and Greatest Common Factor (GCF) using Prime Factorization", "instrObjective": "Using factor trees and prime factorization tables, learners should be able to calculate the LCM and GCF of two or three whole numbers correctly.", "materials": "Factor tree charts, multiplication tables, REB P5 Pupil's Book pp. 20-25", "references": "REB Primary Mathematics P5 Pupil's Book (PB), Unit 1, pp. 20-25; REB P5 Teacher's Guide (TG), pp. 15-20; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Inclusive Education", "intro": "Teacher writes the numbers 12 and 18 on the board and asks learners to list all numbers that divide 12 without a remainder.", "development": "Teacher demonstrates prime factorization using factor trees for 12 (2 x 2 x 3) and 18 (2 x 3 x 3). Teacher explains how to extract GCF (common prime factors = 2 x 3 = 6) and LCM (highest powers = 36). In groups of 4, learners solve real-life problems involving recurring events (e.g., two buses departing every 15 and 20 mins). Teacher assists SEN learners with clear step-by-step division ladders.", "conclusion": "Learners present their factor trees on the chalkboard and explain the practical difference between LCM and GCF.", "evaluation": "REB P5 Pupil's Book p. 24 Exercise 3: Calculate the GCF and LCM for three pairs of numbers (16 and 24; 20 and 30; 18 and 27)." }] }] },
  "P6": { "classLevel": "Primary 6 (P6)", "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19", "pupilBookTitle": "REB Primary Mathematics P6 Pupil's Book (PB)", "teacherGuideTitle": "REB Primary Mathematics P6 Teacher's Guide (TG)", "units": [{ "unitNo": "Unit 1", "unitTitle": "Whole Numbers up to 10,000,000 (Powers, Indices, and Roots)", "keyUnitCompetence": "Read, write, compare, and apply operations on numbers up to 10,000,000; solve problems involving indices and square roots.", "lessons": [{ "lessonNo": "Lesson 1", "lessonTitle": "Powers, Indices, and Calculating Square Roots of Perfect Squares", "instrObjective": "Using prime factorization, learners should be able to express numbers in index notation and calculate square roots of perfect squares accurately.", "materials": "Square grid paper, prime factorization charts, scientific calculator (for verification), REB P6 Pupil's Book pp. 15-21", "references": "REB Primary Mathematics P6 Pupil's Book (PB), Unit 1, pp. 15-21; REB P6 Teacher's Guide (TG), pp. 12-16; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)", "crossCutting": "Inclusive Education", "intro": "Teacher draws a 4x4 square on grid paper and asks learners to count the total squares (16). Teacher explains 4 squared = 4 x 4 = 16.", "development": "Teacher introduces square root notation and models finding the square root of 144 using prime factorization (144 = 2^4 x 3^2, square root = 2^2 x 3 = 12). In small groups, learners find square roots of 196, 225, and 400 using prime factor trees. Teacher supports SEN learners by providing visual reference tables of squares from 1x1 to 15x15.", "conclusion": "Learners explain the inverse relationship between squaring a number and finding its square root.", "evaluation": "REB P6 Pupil's Book p. 20 Exercise 2: Calculate the square root of 5 given perfect squares using prime factorization." }] }] }
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
      HEADER_FIELDS.forEach(field => {
        if (headerMetadata[field] !== undefined) setFieldValue(field, headerMetadata[field]);
      });
      if (lsStatusBadge) lsStatusBadge.textContent = '✓ Saved in LocalStorage';
    } else {
      if (!getFieldValue('date')) setFieldValue('date', getTodayDateString());
    }
  } catch (err) { console.error('Error loading header metadata', err); }
}

function clearHeadersFromLocalStorage() {
  try {
    if (confirm('Are you sure you want to clear saved header metadata from LocalStorage?')) {
      localStorage.removeItem(LS_HEADER_KEY);
      HEADER_FIELDS.forEach(field => {
        if (field !== 'subject' && field !== 'duration' && field !== 'classSize') setFieldValue(field, '');
      });
      setFieldValue('duration', '40');
      setFieldValue('classSize', '30');
      setFieldValue('date', getTodayDateString());
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

// ---------------------------------------------------------------------------
// YEAR-LOCKED LOOKUP ENGINE
// The generator may ONLY read the Teacher's Guide (TG) and Pupil's Book (PB)
// of the class/year the teacher selected. It never falls back to another class.
// ---------------------------------------------------------------------------

function getYearBooks(cls) {
  const clsData = syllabus[cls];
  if (!clsData) return null;
  return {
    cls,
    teacherGuideTitle: clsData.teacherGuideTitle || `REB Primary Mathematics ${cls} Teacher's Guide (TG)`,
    pupilBookTitle: (clsData.pupilBookTitle || clsData.studentBookTitle || `REB Primary Mathematics ${cls} Pupil's Book (PB)`).replace(/Student Book \(SB\)/i, "Pupil's Book (PB)"),
    units: Array.isArray(clsData.units) ? clsData.units : []
  };
}

function normaliseTitle(text) {
  return String(text || '')
    .toLowerCase()
    .replace(/[’']/g, '')
    .replace(/(\d),(?=\d)/g, '$1')   // 1,000 -> 1000 so magnitudes stay distinguishable
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

const TITLE_STOPWORDS = new Set(['and','the','of','up','to','in','on','with','from','for','a','an','its','their','using']);

function titleTokens(text) {
  return normaliseTitle(text).split(' ').filter(Boolean);
}

function contentTokens(tokens) {
  return tokens.filter(t => !TITLE_STOPWORDS.has(t) && t.length > 2);
}

function numericTokens(tokens) {
  return tokens.filter(t => /^\d+$/.test(t));
}

// Score how well a typed title matches an indexed title (0 = no match).
// Numbers are compared strictly so "up to 1,000" can never match "up to 100,000".
function titleMatchScore(typed, candidate) {
  const aNorm = normaliseTitle(typed);
  const bNorm = normaliseTitle(candidate);
  if (!aNorm || !bNorm) return 0;
  if (aNorm === bNorm) return 100;

  const aTok = titleTokens(typed);
  const bTok = titleTokens(candidate);

  // Magnitude guard: every number the teacher typed must appear in the candidate.
  const aNums = numericTokens(aTok);
  const bNums = numericTokens(bTok);
  if (aNums.length && !aNums.every(n => bNums.includes(n))) return 0;

  const aContent = contentTokens(aTok);
  const bContent = contentTokens(bTok);
  if (!aContent.length || !bContent.length) return 0;

  // Contiguous run of the typed tokens inside the candidate (word-boundary safe).
  const joinedA = ' ' + aTok.join(' ') + ' ';
  const joinedB = ' ' + bTok.join(' ') + ' ';
  if (joinedB.includes(joinedA)) return 90;
  if (joinedA.includes(joinedB)) return 75;

  // Otherwise require nearly all typed content words to be present.
  const hits = aContent.filter(w => bContent.some(x => x === w || x.startsWith(w) || w.startsWith(x))).length;
  const ratio = hits / aContent.length;
  if (ratio < 0.8) return 0;
  const coverage = hits / bContent.length; // penalise matching a much longer, different title
  if (coverage < 0.4) return 0;
  return Math.round(40 + ratio * 25);
}

// Find the unit ONLY inside the selected year's books.
function findUnitInYear(cls, typedUnitTitle) {
  const books = getYearBooks(cls);
  if (!books) return { ok: false, reason: 'no-books', cls, units: [] };
  const unitList = books.units.map(u => `${u.unitNo}: ${u.unitTitle}`);
  const typed = String(typedUnitTitle || '').trim();
  if (!typed) return { ok: false, reason: 'empty', cls, books, units: unitList };
  let best = null, bestScore = 0;
  books.units.forEach((u, uIdx) => {
    const score = Math.max(
      titleMatchScore(typed, u.unitTitle),
      titleMatchScore(typed, `${u.unitNo} ${u.unitTitle}`),
      titleMatchScore(typed, u.unitNo)
    );
    if (score > bestScore) { bestScore = score; best = { unit: u, unitIndex: uIdx }; }
  });
  if (!best || bestScore < 40) {
    return { ok: false, reason: 'unit-not-in-year', cls, books, units: unitList, typed };
  }
  return { ok: true, cls, books, unit: best.unit, unitIndex: best.unitIndex, score: bestScore };
}

// Index the lesson the teacher typed INSIDE the matched unit only.
function findLessonInUnit(unit, typedLessonTitle) {
  const lessons = Array.isArray(unit.lessons) ? unit.lessons : [];
  const lessonList = lessons.map(l => `${l.lessonNo}: ${l.lessonTitle}`);
  const typed = String(typedLessonTitle || '').trim();
  if (!lessons.length) return { ok: false, reason: 'no-lessons', lessons: lessonList };
  if (!typed) return { ok: true, lesson: lessons[0], lessonIndex: 0, lessons: lessonList, assumed: true };
  let best = null, bestScore = 0;
  lessons.forEach((l, lIdx) => {
    const score = Math.max(
      titleMatchScore(typed, l.lessonTitle),
      titleMatchScore(typed, `${l.lessonNo} ${l.lessonTitle}`),
      titleMatchScore(typed, l.lessonNo)
    );
    if (score > bestScore) { bestScore = score; best = { lesson: l, lessonIndex: lIdx }; }
  });
  if (!best || bestScore < 40) {
    return { ok: false, reason: 'lesson-not-in-unit', lessons: lessonList, typed };
  }
  return { ok: true, lesson: best.lesson, lessonIndex: best.lessonIndex, lessons: lessonList, score: bestScore };
}

function renderYearUnitList(cls) {
  if (!yearUnitList) return;
  const books = getYearBooks(cls);
  if (!books) {
    yearUnitList.innerHTML = '<p class="small">Select a Class / Year (P1–P6) to list its units.</p>';
    return;
  }
  let html = `<p class="small"><strong>${cls}</strong> — indexed from <em>${books.teacherGuideTitle}</em> and <em>${books.pupilBookTitle}</em>:</p><ul class="unit-index-list">`;
  books.units.forEach(u => {
    const lessons = (u.lessons || []).map(l => `<li>${l.lessonNo}: ${l.lessonTitle}</li>`).join('');
    html += `<li><strong>${u.unitNo}: ${u.unitTitle}</strong>${lessons ? `<ul>${lessons}</ul>` : ''}</li>`;
  });
  html += '</ul>';
  yearUnitList.innerHTML = html;
}

function showLookupMessage(kind, html) {
  if (!lookupResult) return;
  lookupResult.className = `lookup-result lookup-${kind}`;
  lookupResult.innerHTML = html;
  lookupResult.classList.remove('hidden');
}

function clearLookupMessage() {
  if (!lookupResult) return;
  lookupResult.classList.add('hidden');
  lookupResult.innerHTML = '';
}

function reportUnitNotInYear(res) {
  const listHtml = res.units.length
    ? `<ul class="unit-index-list">${res.units.map(u => `<li>${u}</li>`).join('')}</ul>`
    : '<p class="small">No units are indexed for this year.</p>';
  showLookupMessage('error',
    `<strong>⛔ Stopped — “${res.typed || ''}” is not a unit in ${res.cls}.</strong>` +
    `<p class="small">The generator only reads <em>${res.books ? res.books.teacherGuideTitle : res.cls + " Teacher's Guide"}</em> and <em>${res.books ? res.books.pupilBookTitle : res.cls + " Pupil's Book"}</em>. It will not pull a unit from another class's book.</p>` +
    `<p class="small">Units available in ${res.cls}:</p>${listHtml}`);
  if (yearUnitIndex) yearUnitIndex.open = true;
}

function updateRebStatusCard(selectedClass) {
  if (!selectedClass) {
    rebStatusText.textContent = "Select the Class / Year (P1–P6). The AI will then read ONLY that year's Teacher's Guide (TG) and Pupil's Book (PB).";
    renderYearUnitList('');
    clearLookupMessage();
    return;
  }
  const books = getYearBooks(selectedClass);
  if (books) {
    rebStatusText.innerHTML = `📚 Locked to <strong>${selectedClass}</strong> only: <strong>${books.teacherGuideTitle}</strong> &amp; <strong>${books.pupilBookTitle}</strong> (source: <a href="https://elearning.reb.rw/course/index.php?categoryid=19" target="_blank">elearning.reb.rw</a>). ${books.units.length} unit(s) indexed.`;
  } else {
    rebStatusText.textContent = `No indexed Teacher's Guide / Pupil's Book found for ${selectedClass}.`;
  }
  renderYearUnitList(selectedClass);
  clearLookupMessage();
}

async function handleAiGenerate() {
  const cls = getFieldValue('class', classSelect ? classSelect.value : '');
  if (!cls) {
    alert("Please select a Class / Year (P1–P6) first — the AI reads only that year's Teacher's Guide and Pupil's Book.");
    if (classSelect) classSelect.focus();
    return;
  }

  // The lookup boxes are the single source of truth (they mirror the form fields).
  const typedUnit = (unitTitleSearch ? unitTitleSearch.value : getFieldValue('unitTitle')).trim();
  const typedLesson = (lessonTitleSearch ? lessonTitleSearch.value : getFieldValue('lessonTitle')).trim();

  // STEP 1 — search ONLY the selected year's TG & Pupil's Book for the unit.
  const unitRes = findUnitInYear(cls, typedUnit);
  if (!unitRes.ok) {
    if (unitRes.reason === 'no-books') {
      showLookupMessage('error', `<strong>⛔ Stopped — no Teacher's Guide / Pupil's Book is indexed for ${cls}.</strong><p class="small">Nothing will be generated from another class's book.</p>`);
      return;
    }
    if (unitRes.reason === 'empty') {
      const listHtml = unitRes.units.length ? `<ul class="unit-index-list">${unitRes.units.map(u => `<li>${u}</li>`).join('')}</ul>` : '';
      showLookupMessage('warn', `<strong>Type a Unit title first.</strong><p class="small">Units in ${cls}'s Teacher's Guide &amp; Pupil's Book:</p>${listHtml}`);
      if (yearUnitIndex) yearUnitIndex.open = true;
      if (unitTitleSearch) unitTitleSearch.focus();
      return;
    }
    reportUnitNotInYear(unitRes);
    return;
  }

  // STEP 2 — index the typed Lesson title INSIDE that unit only.
  const lessonRes = findLessonInUnit(unitRes.unit, typedLesson);
  if (!lessonRes.ok) {
    const listHtml = lessonRes.lessons.length ? `<ul class="unit-index-list">${lessonRes.lessons.map(l => `<li>${l}</li>`).join('')}</ul>` : '';
    showLookupMessage('error',
      `<strong>⛔ Stopped — “${typedLesson}” is not a lesson inside ${unitRes.unit.unitNo}: ${unitRes.unit.unitTitle} (${cls}).</strong>` +
      `<p class="small">Lessons indexed in this unit:</p>${listHtml}`);
    if (lessonTitleSearch) lessonTitleSearch.focus();
    return;
  }

  const matchedUnit = unitRes.unit;
  const matchedLesson = lessonRes.lesson;
  showLookupMessage('ok',
    `<strong>✅ Found in ${cls} only.</strong>` +
    `<p class="small">Unit indexed: <strong>${matchedUnit.unitNo}: ${matchedUnit.unitTitle}</strong><br>` +
    `Lesson indexed: <strong>${matchedLesson.lessonNo}: ${matchedLesson.lessonTitle}</strong>${lessonRes.assumed ? ' <em>(first lesson of the unit — no lesson title typed)</em>' : ''}<br>` +
    `Sources: ${unitRes.books.teacherGuideTitle} · ${unitRes.books.pupilBookTitle}</p>`);

  showModalProgress();
  const provider = aiProviderSelect ? aiProviderSelect.value : 'builtin';
  const apiKey = aiApiKeyInput ? aiApiKeyInput.value.trim() : '';
  const model = aiModelInput ? aiModelInput.value.trim() : '';
  const endpoint = aiEndpointInput ? aiEndpointInput.value.trim() : '';
  const headerContext = {
    school: getFieldValue('school', 'Primary School'),
    teacher: getFieldValue('teacher', 'Teacher'),
    term: getFieldValue('term', 'Term 1'),
    date: getFieldValue('date', getTodayDateString()),
    class: cls,
    unitNo: getFieldValue('unitNo', matchedUnit.unitNo || ''),
    lessonNo: getFieldValue('lessonNo', matchedLesson.lessonNo || ''),
    duration: getFieldValue('duration', '40'),
    classSize: getFieldValue('classSize', '30'),
    sen: getFieldValue('sen', '2 learners with mild visual impairment, 1 slow learner'),
    planLocation: getFieldValue('planLocation', `${cls} Classroom / Math Learning Corner`)
  };
  const bookContext = {
    teacherGuideTitle: unitRes.books.teacherGuideTitle,
    pupilBookTitle: unitRes.books.pupilBookTitle,
    unit: matchedUnit,
    lesson: matchedLesson
  };

  try {
    if (provider !== 'builtin' && apiKey) {
      const aiResult = await callExternalLLM(provider, apiKey, model, endpoint, headerContext, bookContext);
      if (aiResult) {
        // Never let an external model drift to another year's unit.
        aiResult.unitTitle = matchedUnit.unitTitle;
        aiResult.unitNo = aiResult.unitNo || matchedUnit.unitNo;
        aiResult.lessonTitle = matchedLesson.lessonTitle;
        aiResult.lessonNo = aiResult.lessonNo || matchedLesson.lessonNo;
        populateFormWithAiResult(aiResult, headerContext);
        finishModalAndPreview();
        return;
      }
    }
  } catch (err) { console.warn('External AI API call failed, falling back to the built-in year-locked engine', err); }

  const transcribedResult = transcribeLessonFromBooks(cls, matchedUnit, matchedLesson, unitRes.books, headerContext);
  populateFormWithAiResult(transcribedResult, headerContext);
  finishModalAndPreview();
}

function showModalProgress() {
  aiProgressModal.classList.remove('hidden');
  modalTitle.textContent = 'AI Consulting REB Curriculum Repository...';
  modalStepText.textContent = 'Connecting to elearning.reb.rw (Category 19)...';
  modalProgressBar.style.width = '25%';
  setTimeout(() => { modalTitle.textContent = 'Reading Student Books (SB) & Teacher\'s Guides (TG)...'; modalStepText.textContent = `Analyzing Rwanda CBC Mathematics syllabus for Class ${getFieldValue('class')}...`; modalProgressBar.style.width = '55%'; }, 600);
  setTimeout(() => { modalTitle.textContent = 'Synthesizing Human-Like Pedagogical Activities...'; modalStepText.textContent = 'Formulating SMART objectives, SEN differentiation, and timed stage activities...'; modalProgressBar.style.width = '85%'; }, 1300);
}

function finishModalAndPreview() {
  setTimeout(() => {
    modalTitle.textContent = 'Lesson Plan Generated Successfully!';
    modalStepText.textContent = 'Updating standard administrative metadata and printable preview...';
    modalProgressBar.style.width = '100%';
    setTimeout(() => { aiProgressModal.classList.add('hidden'); saveHeadersToLocalStorage(true); fillPrintableFromForm(); syncSearchBoxesFromForm(); highlightUpdatedFields(); }, 400);
  }, 1900);
}

function highlightUpdatedFields() {
  const fields = ['unitTitle','keyUnitCompetence','lessonTitle','instrObjective','learningMaterials','references','crossCutting','activityOverview','selfAssessment','step1_time','step1_teacher','step1_learner','step1_note','step2_time','step2_teacher','step2_learner','step2_note','step3_time','step3_teacher','step3_learner','step3_note'];
  fields.forEach(f => { const el = getField(f); if (el) { el.style.backgroundColor = '#f0fdf4'; setTimeout(() => el.style.backgroundColor = '', 1500); } });
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

function splitSentences(text) {
  if (!text) return [];
  const protectedText = String(text)
    .replace(/\b(pp?)\.\s+/gi, '$1_DOT_ ')
    .replace(/\be\.g\.\s+/gi, 'eg_DOT_ ')
    .replace(/\bi\.e\.\s+/gi, 'ie_DOT_ ')
    .replace(/\bvs\.\s+/gi, 'vs_DOT_ ')
    .replace(/\bno\.\s+/gi, 'no_DOT_ ')
    .replace(/\betc\.\s+/gi, 'etc_DOT_ ');
  const raw = protectedText.split(/(?<=[.!?])\s+|\n+/);
  return raw.map(s => s.replace(/_DOT_/g, '.').trim()).filter(Boolean);
}

function classifySentence(sentence) {
  const s = sentence.trim();
  if (/^(?:Teacher|The teacher)\b/i.test(s)) {
    return 'teacher';
  }
  return 'learner';
}

function toHyphenBullets(...texts) {
  const items = [];
  texts.filter(Boolean).forEach(text => {
    String(text).split(/\n+/).forEach(line => {
      const cleaned = line.replace(/^[-•*]\s*/, '').trim();
      if (!cleaned) return;
      const sentences = splitSentences(cleaned);
      (sentences.length ? sentences : [cleaned]).forEach(s => {
        const item = s.replace(/\s+/g, ' ').trim();
        if (item) items.push(item.replace(/[.]+$/, ''));
      });
    });
  });
  const unique = [];
  items.forEach(item => { if (!unique.includes(item)) unique.push(item); });
  if (!unique.length) return '';
  return unique.map(item => `- ${item}.`.replace(/\.\.$/, '.')).join('\n');
}

function extractActivities(steps) {
  const teacher = [];
  const learner = [];
  steps.forEach(st => {
    if (!st) return;
    const text = typeof st === 'string' ? st : (st.activity || '');
    splitSentences(text).forEach(s => {
      if (classifySentence(s) === 'teacher') {
        teacher.push(s);
      } else {
        learner.push(s);
      }
    });
  });
  return {
    teacher: toHyphenBullets(...teacher),
    learner: toHyphenBullets(...learner)
  };
}

function extractTeacherLearnerActivities(text) {
  return extractActivities([{ activity: text }]);
}

function formatGcciCell(gc, cci, note) {
  if (note && String(note).trim()) return String(note).trim();
  const lines = [];
  if (gc) lines.push(`G.C: ${gc}`);
  if (cci) lines.push(`C.C.I: ${cci}`);
  return lines.join('\n');
}

function formatClassSize(data) {
  return data.get('classSize') || '';
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

function parseGcCci(gcOrCci) {
  if (!gcOrCci) return {gc:'', cci:''};
  const parts = String(gcOrCci).split(' - ');
  const label = parts[0].trim();
  if (REB_GC_LIST.includes(label)) return {gc: label, cci: parts[1] ? parts[1].trim() : '' };
  if (REB_CCI_LIST.includes(label)) return {gc: '', cci: label };
  if (parts.length >= 2 && REB_GC_LIST.includes(parts[0]) && REB_CCI_LIST.includes(parts[1].split(' ')[0])) {
    return {gc: parts[0], cci: parts[1].trim()};
  }
  return {gc:'', cci: label };
}

function transcribeLessonFromBooks(cls, unitObj, lessonObj, books, headers) {
  if (!unitObj || !lessonObj) return null;
  const tgTitle = (books && books.teacherGuideTitle) || `REB Primary Mathematics ${cls} Teacher's Guide (TG)`;
  const pbTitle = (books && books.pupilBookTitle) || `REB Primary Mathematics ${cls} Pupil's Book (PB)`;
  const yearReferences = lessonObj.references
    ? String(lessonObj.references).replace(/Student Book \(SB\)/gi, "Pupil's Book (PB)")
    : `${tgTitle}, ${unitObj.unitNo}; ${pbTitle}, ${unitObj.unitNo}; elearning.reb.rw/course/index.php?categoryid=19`;

  const timings = defaultStageTimings((headers && headers.duration) || getFieldValue('duration', '40'));

  if (lessonObj.steps && lessonObj.steps.length >= 3) {
    const s1 = extractActivities([lessonObj.steps[0]]);
    const s2 = extractActivities([lessonObj.steps[1], lessonObj.steps[2], lessonObj.steps[3]]);
    const s3 = extractActivities([lessonObj.steps[4], lessonObj.steps[5]]);

    const p1 = parseGcCci(lessonObj.steps[0] && lessonObj.steps[0].gcOrCci);
    const p2 = parseGcCci(lessonObj.steps[1] && lessonObj.steps[1].gcOrCci);
    const p3 = parseGcCci(lessonObj.steps[4] && lessonObj.steps[4].gcOrCci);

    return {
      unitNo: (headers && headers.unitNo) || getFieldValue('unitNo') || unitObj.unitNo || '',
      lessonNo: (headers && headers.lessonNo) || getFieldValue('lessonNo') || lessonObj.lessonNo || '',
      unitTitle: unitObj.unitTitle || '',
      keyUnitCompetence: unitObj.keyUnitCompetence || '',
      lessonTitle: lessonObj.lessonTitle || '',
      instrObjective: lessonObj.instrObjective || '',
      planLocation: (headers && headers.planLocation) || getFieldValue('planLocation') || '',
      learningMaterials: lessonObj.materials || '',
      references: yearReferences,
      crossCutting: lessonObj.crossCutting || p1.cci || '',
      activityOverview: lessonObj.activityOverview || '',
      selfAssessment: lessonObj.selfAssessment || '',
      step1_time: timings.step1,
      step1_teacher: s1.teacher,
      step1_learner: s1.learner,
      step1_gc: p1.gc,
      step1_cci: p1.cci,
      step1_note: lessonObj.steps[0] && lessonObj.steps[0].gcOrCci ? lessonObj.steps[0].gcOrCci : '',
      step2_time: timings.step2,
      step2_teacher: s2.teacher,
      step2_learner: s2.learner,
      step2_gc: p2.gc,
      step2_cci: p2.cci,
      step2_note: lessonObj.steps[1] && lessonObj.steps[1].gcOrCci ? lessonObj.steps[1].gcOrCci : '',
      step3_time: timings.step3,
      step3_teacher: s3.teacher,
      step3_learner: s3.learner,
      step3_gc: p3.gc,
      step3_cci: p3.cci,
      step3_note: lessonObj.steps[4] && lessonObj.steps[4].gcOrCci ? lessonObj.steps[4].gcOrCci : ''
    };
  }

  // Fallback for legacy 4-field lessons (intro, development, conclusion, evaluation)
  const s1 = extractActivities([{ activity: lessonObj.intro }]);
  const s2 = extractActivities([{ activity: lessonObj.development }]);
  const s3 = extractActivities([{ activity: [lessonObj.conclusion, lessonObj.evaluation].filter(Boolean).join(' ') }]);

  return {
    unitNo: (headers && headers.unitNo) || getFieldValue('unitNo') || unitObj.unitNo || '',
    lessonNo: (headers && headers.lessonNo) || getFieldValue('lessonNo') || lessonObj.lessonNo || '',
    unitTitle: unitObj.unitTitle || '',
    keyUnitCompetence: unitObj.keyUnitCompetence || '',
    lessonTitle: lessonObj.lessonTitle || '',
    instrObjective: lessonObj.instrObjective || '',
    planLocation: (headers && headers.planLocation) || getFieldValue('planLocation') || '',
    learningMaterials: lessonObj.materials || '',
    references: yearReferences,
    crossCutting: lessonObj.crossCutting || '',
    activityOverview: lessonObj.activityOverview || '',
    selfAssessment: lessonObj.selfAssessment || '',
    step1_time: timings.step1,
    step1_teacher: s1.teacher,
    step1_learner: s1.learner,
    step1_gc: '',
    step1_cci: '',
    step1_note: '',
    step2_time: timings.step2,
    step2_teacher: s2.teacher,
    step2_learner: s2.learner,
    step2_gc: '',
    step2_cci: '',
    step2_note: '',
    step3_time: timings.step3,
    step3_teacher: s3.teacher,
    step3_learner: s3.learner,
    step3_gc: '',
    step3_cci: '',
    step3_note: ''
  };
}

async function callExternalLLM(provider, apiKey, model, endpoint, headers, bookContext) {
  const cls = headers.class || 'P4';
  const bc = bookContext || {};
  const unit = bc.unit || {};
  const lesson = bc.lesson || {};
  const sourceBlock = `SOURCE RESTRICTION — you may use ONLY these two books for Class ${cls}:\n` +
    `1) ${bc.teacherGuideTitle || cls + " Teacher's Guide (TG)"}\n` +
    `2) ${bc.pupilBookTitle || cls + " Pupil's Book (PB)"}\n` +
    `Do NOT use, cite, or borrow content from any other class/year's book.\n` +
    `The unit has already been located in these books: ${unit.unitNo || ''} — ${unit.unitTitle || ''}\n` +
    `Key Unit Competence (as printed): ${unit.keyUnitCompetence || ''}\n` +
    `The lesson indexed inside that unit is: ${lesson.lessonNo || ''} — ${lesson.lessonTitle || ''}\n` +
    `Keep unitTitle and lessonTitle EXACTLY as given above.`;
  const prompt = `You are an expert Rwandan Primary School Mathematics teacher.\nGenerate a 3-row lesson plan JSON for Class ${cls}: Introduction, Lesson development, Conclusion.\n${sourceBlock}\nContext: Class ${cls}, Term ${headers.term}, Duration ${headers.duration} mins, Number of students ${headers.classSize}, SEN ${headers.sen}\nReturn ONLY JSON with keys: unitNo, lessonNo, unitTitle, keyUnitCompetence, lessonTitle, instrObjective, planLocation, learningMaterials, references, crossCutting, activityOverview, selfAssessment, step1_time, step1_teacher, step1_learner, step1_gc, step1_cci, step1_note, step2_time, step2_teacher, step2_learner, step2_gc, step2_cci, step2_note, step3_time, step3_teacher, step3_learner, step3_gc, step3_cci, step3_note\nWrite teacher and learner activities as hyphen bullets, one action per line (e.g. \"- Greet the class\").\nGC must be one of: Critical Thinking, Problem Solving, Creativity and Innovation, Communication, Collaboration, Digital Literacy, Lifelong Learning, Cultural Identity, Self-Confidence\nCCI must be one of: Peace and Values Education, Gender, Inclusive Education, Environment, Financial Education, Standardization Culture, Impact of Social Media, Comprehensive Sexuality Education, Genocide Studies, Disaster Risk Reduction`;
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
  if (aiData.unitNo) setFieldValue('unitNo', aiData.unitNo);
  if (aiData.lessonNo) setFieldValue('lessonNo', aiData.lessonNo);
  if (aiData.unitTitle) setFieldValue('unitTitle', aiData.unitTitle);
  if (aiData.keyUnitCompetence) setFieldValue('keyUnitCompetence', aiData.keyUnitCompetence);
  if (aiData.lessonTitle) setFieldValue('lessonTitle', aiData.lessonTitle);
  if (aiData.instrObjective) setFieldValue('instrObjective', aiData.instrObjective);
  if (aiData.planLocation) setFieldValue('planLocation', aiData.planLocation);
  if (aiData.learningMaterials) setFieldValue('learningMaterials', aiData.learningMaterials);
  if (aiData.references) setFieldValue('references', aiData.references);
  if (aiData.crossCutting) setFieldValue('crossCutting', aiData.crossCutting);
  setFieldValue('activityOverview', aiData.activityOverview || '');
  setFieldValue('selfAssessment', aiData.selfAssessment || '');

  const timings = defaultStageTimings((headers && headers.duration) || getFieldValue('duration', '40'));
  for (let i=1;i<=3;i++) {
    setFieldValue(`step${i}_time`, aiData[`step${i}_time`] || timings[`step${i}`]);
    setFieldValue(`step${i}_teacher`, toHyphenBullets(aiData[`step${i}_teacher`] || ''));
    setFieldValue(`step${i}_learner`, toHyphenBullets(aiData[`step${i}_learner`] || ''));
    setFieldValue(`step${i}_gc`, aiData[`step${i}_gc`] || '');
    setFieldValue(`step${i}_cci`, aiData[`step${i}_cci`] || '');
    setFieldValue(`step${i}_note`, aiData[`step${i}_note`] || '');

    if (aiData[`step${i}`] && !getFieldValue(`step${i}_teacher`) && !getFieldValue(`step${i}_learner`)) {
      const split = extractTeacherLearnerActivities(aiData[`step${i}`]);
      setFieldValue(`step${i}_teacher`, split.teacher);
      setFieldValue(`step${i}_learner`, split.learner);
    }
    if (aiData[`step${i}_gcci`]) {
      const parsed = parseGcCci(aiData[`step${i}_gcci`]);
      if (parsed.gc) setFieldValue(`step${i}_gc`, parsed.gc);
      if (parsed.cci) setFieldValue(`step${i}_cci`, parsed.cci);
    }
  }
  if (aiData.intro && !getFieldValue('step1_teacher') && !getFieldValue('step1_learner')) {
    const s = extractTeacherLearnerActivities(aiData.intro);
    setFieldValue('step1_teacher', s.teacher);
    setFieldValue('step1_learner', s.learner);
  }
  if (aiData.development && !getFieldValue('step2_teacher') && !getFieldValue('step2_learner')) {
    const s = extractTeacherLearnerActivities(aiData.development);
    setFieldValue('step2_teacher', s.teacher);
    setFieldValue('step2_learner', s.learner);
  }
  if (aiData.conclusion && !getFieldValue('step3_teacher') && !getFieldValue('step3_learner')) {
    const s = extractTeacherLearnerActivities(aiData.conclusion + ' ' + (aiData.evaluation || ''));
    setFieldValue('step3_teacher', s.teacher);
    setFieldValue('step3_learner', s.learner);
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
    p_duration: data.get('duration') ? (data.get('duration') + ' mins') : '',
    p_classSize: formatClassSize(data),
    p_sen: data.get('sen') || '',
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

if (classSelect) classSelect.addEventListener('change', () => { updateRebStatusCard(classSelect.value); saveHeadersToLocalStorage(true); fillPrintableFromForm(); });
// Keep the lookup boxes and the form's Unit/Lesson title fields in sync so a
// stale value can never leak into the search. Typing also clears the last verdict.
function mirrorTitles(fromEl, toEl) {
  if (!fromEl || !toEl) return;
  fromEl.addEventListener('input', () => {
    toEl.value = fromEl.value;
    clearLookupMessage();
  });
}
mirrorTitles(unitTitleSearch, getField('unitTitle'));
mirrorTitles(getField('unitTitle'), unitTitleSearch);
mirrorTitles(lessonTitleSearch, getField('lessonTitle'));
mirrorTitles(getField('lessonTitle'), lessonTitleSearch);

function syncSearchBoxesFromForm() {
  const uField = getField('unitTitle');
  const lField = getField('lessonTitle');
  if (unitTitleSearch && uField) unitTitleSearch.value = uField.value || '';
  if (lessonTitleSearch && lField) lessonTitleSearch.value = lField.value || '';
}
HEADER_FIELDS.forEach(field => { const el = getField(field); if (el) { el.addEventListener('input', () => { saveHeadersToLocalStorage(true); fillPrintableFromForm(); }); el.addEventListener('change', () => { saveHeadersToLocalStorage(true); fillPrintableFromForm(); }); } });
if (saveHeadersBtn) saveHeadersBtn.addEventListener('click', () => saveHeadersToLocalStorage(false));
if (clearHeadersBtn) clearHeadersBtn.addEventListener('click', clearHeadersFromLocalStorage);
if (toggleAiSettingsBtn && aiSettingsDrawer) toggleAiSettingsBtn.addEventListener('click', () => { aiSettingsDrawer.classList.toggle('hidden'); });
if (saveAiSettingsBtn) saveAiSettingsBtn.addEventListener('click', saveAiSettings);
if (aiGenerateBtn) aiGenerateBtn.addEventListener('click', handleAiGenerate);
if (aiGenerateBtnBottom) aiGenerateBtnBottom.addEventListener('click', handleAiGenerate);
if (form) {
  form.addEventListener('input', fillPrintableFromForm);
  form.addEventListener('change', fillPrintableFromForm);
  form.addEventListener('submit', (e) => {
    e.preventDefault(); fillPrintableFromForm(); saveHeadersToLocalStorage(true);
    const clsName = getFieldValue('class', 'Class');
    const opt = { margin: 0.4, filename: `REB-${clsName}-Math-LessonPlan-${getTodayDateString()}.pdf`, image: { type: 'jpeg', quality: 0.98 }, html2canvas: { scale: 2, useCORS: true }, jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' } };
    if (typeof html2pdf !== 'undefined') html2pdf().set(opt).from(printable).save();
    else { alert('PDF library not loaded. Triggering browser Print to PDF instead.'); window.print(); }
  });
}
if (printBtn) printBtn.addEventListener('click', () => { fillPrintableFromForm(); saveHeadersToLocalStorage(true); window.print(); });
document.addEventListener('DOMContentLoaded', async () => {
  const loadedSyllabus = await loadSyllabus();
  if (loadedSyllabus && Object.keys(loadedSyllabus).length > 0) syllabus = loadedSyllabus;
  loadHeadersFromLocalStorage();
  loadAiSettings();
  updateRebStatusCard(classSelect ? classSelect.value : '');
  syncSearchBoxesFromForm(); // pre-fill the lookup boxes from any saved titles
  fillPrintableFromForm();
});
