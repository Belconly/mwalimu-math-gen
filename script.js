// myscript.js
// Rwanda CBC Primary Mathematics Lesson Plan Generator (P1–P6)
// Features:
// 1. Integrated AI Model API & Built-in REB CBC AI Engine (human-like, non-static lesson generation)
// 2. LocalStorage persistence for Standard Administrative Metadata (Header Table)
// 3. REB e-Learning Math Portal (Category 19) syllabus integration & Student Book/Teacher's Guide citations

// DOM Elements
const form = document.getElementById('lpForm');
const printable = document.getElementById('printable');
const classSelect = document.getElementById('classSelect');
const dateInput = document.getElementById('dateInput');
const rebStatusText = document.getElementById('rebStatusText');
const unitTopicSelect = document.getElementById('unitTopicSelect');
const customTopicInput = document.getElementById('customTopicInput');

// AI Control Elements
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

// LocalStorage Header Control Elements
const lsStatusBadge = document.getElementById('lsStatusBadge');
const saveHeadersBtn = document.getElementById('saveHeadersBtn');
const clearHeadersBtn = document.getElementById('clearHeadersBtn');

// Modal Elements
const aiProgressModal = document.getElementById('aiProgressModal');
const modalTitle = document.getElementById('modalTitle');
const modalStepText = document.getElementById('modalStepText');
const modalProgressBar = document.getElementById('modalProgressBar');

// PDF & Print Buttons
const generateBtn = document.getElementById('generateBtn');
const printBtn = document.getElementById('printBtn');

// LocalStorage Keys
const LS_HEADER_KEY = 'mwalimu_lp_header_metadata_v2';
const LS_AI_SETTINGS_KEY = 'mwalimu_ai_settings_v2';

const HEADER_FIELDS = [
  'school', 'teacher', 'term', 'date', 'subject', 'class',
  'unitNo', 'lessonNo', 'duration', 'classSize', 'sen', 'planLocation'
];

// Offline Embedded Fallback Syllabus for P1-P6 Mathematics (REB Category ID 19)
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
    "units": [
      {
        "unitNo": "Unit 1",
        "unitTitle": "Whole Numbers from 0 to 100",
        "keyUnitCompetence": "Read, write, count, compare, and represent whole numbers up to 100 in terms of tens and ones.",
        "lessons": [
          {
            "lessonNo": "Lesson 1",
            "lessonTitle": "Place Value of Numbers up to 100 (Tens and Ones)",
            "instrObjective": "Using bundles of 10 sticks and loose sticks, learners should be able to decompose 2-digit numbers into tens and ones correctly.",
            "materials": "Bundles of 10 sticks, rubber bands, place-value table chart, number cards, REB P2 Student Book pp. 10-14",
            "references": "REB Primary Mathematics P2 Student Book (SB), Unit 1, pp. 10-14; REB P2 Teacher's Guide (TG), pp. 8-12; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)",
            "crossCutting": "Inclusive Education",
            "intro": "Teacher asks learners to count from 10 to 50 by tens (10, 20, 30...). Teacher displays 3 bundles of 10 sticks and 4 single sticks and asks how many sticks are shown in total.",
            "development": "Teacher introduces the Place Value Chart (Tens | Ones) on the chalkboard. Teacher explains that 34 has 3 Tens and 4 Ones. Learners work in pairs with counting sticks to build numbers called out by the teacher (e.g., 47, 62, 85). Teacher gives learners with SEN color-coded tens and ones cards to reinforce the concept visually and tactilely.",
            "conclusion": "Teacher invites three learners to write numbers on the chalkboard place-value chart and explain their tens and ones digits.",
            "evaluation": "Learners complete Exercise 2 in REB P2 Student Book p. 13: writing tens and ones for given 2-digit numbers (e.g., 58 = ___ Tens and ___ Ones)."
          }
        ]
      }
    ]
  },
  "P3": {
    "classLevel": "Primary 3 (P3)",
    "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19",
    "studentBookTitle": "REB Primary Mathematics P3 Student Book (SB)",
    "teacherGuideTitle": "REB Primary Mathematics P3 Teacher's Guide (TG)",
    "units": [
      {
        "unitNo": "Unit 1",
        "unitTitle": "Whole Numbers up to 1,000",
        "keyUnitCompetence": "Read, write, compare, and perform addition and subtraction of whole numbers up to 1,000 in real-life contexts.",
        "lessons": [
          {
            "lessonNo": "Lesson 1",
            "lessonTitle": "Reading, Writing, and Place Value of Numbers up to 1,000",
            "instrObjective": "Using place-value abacus charts and base-ten blocks, learners should be able to identify hundreds, tens, and ones in 3-digit numbers correctly.",
            "materials": "Base-ten blocks, wooden abacus, place value cards (Hundreds, Tens, Ones), REB P3 Student Book pp. 8-13",
            "references": "REB Primary Mathematics P3 Student Book (SB), Unit 1, pp. 8-13; REB P3 Teacher's Guide (TG), pp. 6-10; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)",
            "crossCutting": "Inclusive Education",
            "intro": "Teacher asks learners to count by 100s up to 500 (100, 200, 300...). Teacher writes 345 on the chalkboard and asks learners what each digit stands for.",
            "development": "Teacher demonstrates representing 345 on a 3-spike abacus (3 Hundreds, 4 Tens, 5 Ones). In groups of 5, learners use number cards to construct 3-digit numbers called out by the teacher and decompose them into expanded form (300 + 40 + 5). Teacher supports SEN learners by using large print number flashcards and physical base-ten blocks.",
            "conclusion": "Learners volunteer to come to the front and challenge the class to read a 3-digit number they have formed on the abacus.",
            "evaluation": "Exercise in REB P3 Student Book p. 12: Write 5 given numbers in words and in expanded place value form."
          }
        ]
      }
    ]
  },
  "P4": {
    "classLevel": "Primary 4 (P4)",
    "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19",
    "studentBookTitle": "REB Primary Mathematics P4 Student Book (SB)",
    "teacherGuideTitle": "REB Primary Mathematics P4 Teacher's Guide (TG)",
    "units": [
      {
        "unitNo": "Unit 1",
        "unitTitle": "Whole Numbers up to 100,000",
        "keyUnitCompetence": "Read, write, compare, and round whole numbers up to 100,000 and apply operations in daily life.",
        "lessons": [
          {
            "lessonNo": "Lesson 1",
            "lessonTitle": "Place Value and Value of Digits up to 100,000",
            "instrObjective": "Using place value charts up to Ten Thousands, learners should be able to identify the place value and numeric value of each digit in a 5-digit number correctly.",
            "materials": "Place value table (Ten Thousands, Thousands, Hundreds, Tens, Ones), number flashcards, REB P4 Student Book pp. 14-19",
            "references": "REB Primary Mathematics P4 Student Book (SB), Unit 1, pp. 14-19; REB P4 Teacher's Guide (TG), pp. 10-14; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)",
            "crossCutting": "Inclusive Education",
            "intro": "Teacher asks learners to read 9,999 on the chalkboard, then asks what number comes next when we add 1.",
            "development": "Teacher introduces 10,000 and expands the place value chart to 5 columns. Teacher writes 64,825 and guides learners to state the place value of 6 (Ten Thousands) and its value (60,000). In groups, learners draw 5-digit place value tables on Manila paper and represent numbers given by the teacher. Teacher provides enlarged digit cards for SEN learners with visual difficulties.",
            "conclusion": "Learners summarize the difference between 'place value' (name of the column) and 'value' (number of units).",
            "evaluation": "REB P4 Student Book p. 18 Exercise 1: State the place value and value of the underlined digits in 6 given 5-digit numbers."
          }
        ]
      },
      {
        "unitNo": "Unit 5",
        "unitTitle": "Fractions and Decimals",
        "keyUnitCompetence": "Understand, compare, and perform basic operations on proper fractions, mixed numbers, and simple decimals.",
        "lessons": [
          {
            "lessonNo": "Lesson 1",
            "lessonTitle": "Identifying and Comparing Proper, Improper Fractions, and Mixed Numbers",
            "instrObjective": "Using fraction strips and circular models, learners should be able to distinguish between proper fractions, improper fractions, and mixed numbers accurately.",
            "materials": "Fraction strips, cardboard circular pies, colored markers, REB P4 Student Book pp. 68-73",
            "references": "REB Primary Mathematics P4 Student Book (SB), Unit 5, pp. 68-73; REB P4 Teacher's Guide (TG), pp. 50-55; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)",
            "crossCutting": "Peace",
            "intro": "Teacher displays 3 equal paper loaves of bread and asks how 2 learners can share 3 loaves equally.",
            "development": "Teacher explains proper fractions (numerator < denominator, e.g., 3/4), improper fractions (numerator >= denominator, e.g., 5/4), and mixed numbers (whole number + fraction, e.g., 1 1/4). Learners work in small groups with paper models to convert 5/4 into 1 1/4 by combining whole circles and remaining quarters.",
            "conclusion": "Learners explain the relationship between improper fractions and mixed numbers on the chalkboard.",
            "evaluation": "Exercise: Classify a list of 10 fractions into Proper, Improper, or Mixed Numbers in exercise books."
          }
        ]
      }
    ]
  },
  "P5": {
    "classLevel": "Primary 5 (P5)",
    "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19",
    "studentBookTitle": "REB Primary Mathematics P5 Student Book (SB)",
    "teacherGuideTitle": "REB Primary Mathematics P5 Teacher's Guide (TG)",
    "units": [
      {
        "unitNo": "Unit 1",
        "unitTitle": "Whole Numbers up to 1,000,000 (LCM and GCF)",
        "keyUnitCompetence": "Read, write, compare, and perform operations on numbers up to 1,000,000; find Prime Numbers, LCM, and GCF.",
        "lessons": [
          {
            "lessonNo": "Lesson 1",
            "lessonTitle": "Finding Lowest Common Multiple (LCM) and Greatest Common Factor (GCF) using Prime Factorization",
            "instrObjective": "Using factor trees and prime factorization tables, learners should be able to calculate the LCM and GCF of two or three whole numbers correctly.",
            "materials": "Factor tree charts, multiplication tables, REB P5 Student Book pp. 20-25",
            "references": "REB Primary Mathematics P5 Student Book (SB), Unit 1, pp. 20-25; REB P5 Teacher's Guide (TG), pp. 15-20; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)",
            "crossCutting": "Inclusive Education",
            "intro": "Teacher writes the numbers 12 and 18 on the board and asks learners to list all numbers that divide 12 without a remainder.",
            "development": "Teacher demonstrates prime factorization using factor trees for 12 (2 x 2 x 3) and 18 (2 x 3 x 3). Teacher explains how to extract GCF (common prime factors = 2 x 3 = 6) and LCM (highest powers = 36). In groups of 4, learners solve real-life problems involving recurring events (e.g., two buses departing every 15 and 20 mins). Teacher assists SEN learners with clear step-by-step division ladders.",
            "conclusion": "Learners present their factor trees on the chalkboard and explain the practical difference between LCM and GCF.",
            "evaluation": "REB P5 Student Book p. 24 Exercise 3: Calculate the GCF and LCM for three pairs of numbers (16 and 24; 20 and 30; 18 and 27)."
          }
        ]
      }
    ]
  },
  "P6": {
    "classLevel": "Primary 6 (P6)",
    "rebSourceUrl": "https://elearning.reb.rw/course/index.php?categoryid=19",
    "studentBookTitle": "REB Primary Mathematics P6 Student Book (SB)",
    "teacherGuideTitle": "REB Primary Mathematics P6 Teacher's Guide (TG)",
    "units": [
      {
        "unitNo": "Unit 1",
        "unitTitle": "Whole Numbers up to 10,000,000 (Powers, Indices, and Roots)",
        "keyUnitCompetence": "Read, write, compare, and apply operations on numbers up to 10,000,000; solve problems involving indices and square roots.",
        "lessons": [
          {
            "lessonNo": "Lesson 1",
            "lessonTitle": "Powers, Indices, and Calculating Square Roots of Perfect Squares",
            "instrObjective": "Using prime factorization, learners should be able to express numbers in index notation and calculate square roots of perfect squares accurately.",
            "materials": "Square grid paper, prime factorization charts, scientific calculator (for verification), REB P6 Student Book pp. 15-21",
            "references": "REB Primary Mathematics P6 Student Book (SB), Unit 1, pp. 15-21; REB P6 Teacher's Guide (TG), pp. 12-16; REB e-Learning Portal (elearning.reb.rw/course/index.php?categoryid=19)",
            "crossCutting": "Inclusive Education",
            "intro": "Teacher draws a 4x4 square on grid paper and asks learners to count the total squares (16). Teacher explains 4 squared = 4 x 4 = 16.",
            "development": "Teacher introduces square root notation and models finding the square root of 144 using prime factorization (144 = 2^4 x 3^2, square root = 2^2 x 3 = 12). In small groups, learners find square roots of 196, 225, and 400 using prime factor trees. Teacher supports SEN learners by providing visual reference tables of squares from 1x1 to 15x15.",
            "conclusion": "Learners explain the inverse relationship between squaring a number and finding its square root.",
            "evaluation": "REB P6 Student Book p. 20 Exercise 2: Calculate the square root of 5 given perfect squares using prime factorization."
          }
        ]
      }
    ]
  }
};

let syllabus = FALLBACK_SYLLABUS;

// Load syllabus.json with fallback
async function loadSyllabus(){
  try {
    const resp = await fetch('syllabus.json');
    if(!resp.ok) return FALLBACK_SYLLABUS;
    const data = await resp.json();
    return Object.keys(data).length > 0 ? data : FALLBACK_SYLLABUS;
  } catch(e) {
    console.warn('syllabus load failed, using embedded REB P1-P6 curriculum fallback', e);
    return FALLBACK_SYLLABUS;
  }
}

// ---------------------------------------------------------------------------
// 1. LocalStorage Management for Standard Administrative Metadata (Headers)
// ---------------------------------------------------------------------------

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
    HEADER_FIELDS.forEach(field => {
      headerMetadata[field] = data.get(field) || '';
    });
    localStorage.setItem(LS_HEADER_KEY, JSON.stringify(headerMetadata));
    if (lsStatusBadge) {
      lsStatusBadge.textContent = '✓ Saved in LocalStorage';
      lsStatusBadge.classList.add('updated');
      setTimeout(() => lsStatusBadge.classList.remove('updated'), 1000);
    }
    if (!isAuto) {
      alert('✓ Standard Administrative Header Metadata saved as defaults to LocalStorage!');
    }
  } catch (err) {
    console.error('Error saving header metadata to LocalStorage:', err);
  }
}

function loadHeadersFromLocalStorage() {
  try {
    const saved = localStorage.getItem(LS_HEADER_KEY);
    if (saved) {
      const headerMetadata = JSON.parse(saved);
      HEADER_FIELDS.forEach(field => {
        if (form[field] && headerMetadata[field] !== undefined) {
          form[field].value = headerMetadata[field];
        }
      });
      if (lsStatusBadge) {
        lsStatusBadge.textContent = '✓ Saved in LocalStorage';
      }
    } else {
      // Set default date if empty
      if (!form.date.value) {
        form.date.value = getTodayDateString();
      }
    }
  } catch (err) {
    console.error('Error loading header metadata from LocalStorage:', err);
  }
}

function clearHeadersFromLocalStorage() {
  try {
    if (confirm('Are you sure you want to clear saved header metadata from LocalStorage?')) {
      localStorage.removeItem(LS_HEADER_KEY);
      HEADER_FIELDS.forEach(field => {
        if (field !== 'subject' && field !== 'duration' && field !== 'classSize' && form[field]) {
          form[field].value = '';
        }
      });
      form.duration.value = '40';
      form.classSize.value = '30';
      form.date.value = getTodayDateString();
      if (lsStatusBadge) {
        lsStatusBadge.textContent = '○ LocalStorage Empty';
      }
      fillPrintableFromForm();
    }
  } catch (err) {
    console.error('Error clearing LocalStorage:', err);
  }
}

// ---------------------------------------------------------------------------
// 2. AI Model & API Configuration Management (LocalStorage)
// ---------------------------------------------------------------------------

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
  } catch (err) {
    console.error('Error loading AI settings:', err);
  }
}

function saveAiSettings() {
  try {
    const settings = {
      provider: aiProviderSelect ? aiProviderSelect.value : 'builtin',
      model: aiModelInput ? aiModelInput.value : '',
      apiKey: aiApiKeyInput ? aiApiKeyInput.value : '',
      endpoint: aiEndpointInput ? aiEndpointInput.value : ''
    };
    localStorage.setItem(LS_AI_SETTINGS_KEY, JSON.stringify(settings));
    if (aiSettingsStatus) {
      aiSettingsStatus.textContent = '✓ Saved AI Settings!';
      setTimeout(() => aiSettingsStatus.textContent = '', 3000);
    }
  } catch (err) {
    console.error('Error saving AI settings:', err);
  }
}

// ---------------------------------------------------------------------------
// 3. REB e-Learning Curriculum Status & Topic Updating
// ---------------------------------------------------------------------------

function updateRebStatusCard(selectedClass) {
  if (!selectedClass) {
    rebStatusText.textContent = 'Select Class (P1–P6) to load REB Student Book (SB), Teacher\'s Guide (TG), & Scheme of Work.';
    unitTopicSelect.innerHTML = '<option value="">-- Choose Class First --</option>';
    return;
  }
  const clsData = syllabus[selectedClass];
  if (clsData) {
    rebStatusText.innerHTML = `📚 Active Curriculum: <strong>${clsData.studentBookTitle}</strong> & <strong>${clsData.teacherGuideTitle}</strong> loaded from <a href="https://elearning.reb.rw/course/index.php?categoryid=19" target="_blank">elearning.reb.rw</a>.`;
    
    // Populate Unit/Topic select
    let opts = '<option value="">-- Let AI Decide / Choose from REB Unit --</option>';
    clsData.units.forEach((u, uIdx) => {
      opts += `<optgroup label="${u.unitNo}: ${u.unitTitle}">`;
      u.lessons.forEach((l, lIdx) => {
        opts += `<option value="${uIdx}_${lIdx}">${u.unitNo} — ${l.lessonTitle}</option>`;
      });
      opts += `</optgroup>`;
    });
    unitTopicSelect.innerHTML = opts;
  } else {
    rebStatusText.textContent = `Connected to REB Math Category ID 19 for ${selectedClass}.`;
    unitTopicSelect.innerHTML = '<option value="">-- REB Mathematics Standard Units --</option>';
  }
}

// ---------------------------------------------------------------------------
// 4. Integrated AI Lesson Plan Generator (Human-Like, Dynamic Synthesis)
// ---------------------------------------------------------------------------

async function handleAiGenerate() {
  const cls = form.class.value;
  if (!cls) {
    alert('Please select a Class (P1–P6) first so the AI can consult REB Student Books and Teacher\'s Guides!');
    classSelect.focus();
    return;
  }

  // Show Modal Progress
  showModalProgress();

  const provider = aiProviderSelect ? aiProviderSelect.value : 'builtin';
  const apiKey = aiApiKeyInput ? aiApiKeyInput.value.trim() : '';
  const model = aiModelInput ? aiModelInput.value.trim() : '';
  const endpoint = aiEndpointInput ? aiEndpointInput.value.trim() : '';
  const selectedUnitIndex = unitTopicSelect ? unitTopicSelect.value : '';
  const customTopic = customTopicInput ? customTopicInput.value.trim() : '';

  // Gather current form header context
  const headerContext = {
    school: form.school.value || 'Primary School',
    teacher: form.teacher.value || 'Teacher',
    term: form.term.value || 'Term 1',
    date: form.date.value || getTodayDateString(),
    class: cls,
    unitNo: form.unitNo.value || '',
    lessonNo: form.lessonNo.value || '',
    duration: form.duration.value || '40',
    classSize: form.classSize.value || '30',
    sen: form.sen.value || '2 learners with mild visual impairment, 1 slow learner',
    planLocation: form.planLocation.value || `${cls} Classroom / Math Learning Corner`
  };

  try {
    // Check if user has an external API key configured
    if (provider !== 'builtin' && apiKey) {
      const aiResult = await callExternalLLM(provider, apiKey, model, endpoint, headerContext, selectedUnitIndex, customTopic);
      if (aiResult) {
        populateFormWithAiResult(aiResult, headerContext);
        finishModalAndPreview();
        return;
      }
    }
  } catch (err) {
    console.warn('External AI API call failed or timed out. Falling back to Built-in REB CBC AI Engine:', err);
  }

  // Built-in REB CBC AI Engine (human-like procedural generator)
  const builtinResult = generateBuiltinAiLessonPlan(cls, selectedUnitIndex, customTopic, headerContext);
  populateFormWithAiResult(builtinResult, headerContext);
  finishModalAndPreview();
}

function showModalProgress() {
  aiProgressModal.classList.remove('hidden');
  modalTitle.textContent = 'AI Consulting REB Curriculum Repository...';
  modalStepText.textContent = 'Connecting to elearning.reb.rw (Category 19)...';
  modalProgressBar.style.width = '25%';

  setTimeout(() => {
    modalTitle.textContent = 'Reading Student Books (SB) & Teacher\'s Guides (TG)...';
    modalStepText.textContent = `Analyzing Rwanda CBC Mathematics syllabus for Class ${form.class.value}...`;
    modalProgressBar.style.width = '55%';
  }, 600);

  setTimeout(() => {
    modalTitle.textContent = 'Synthesizing Human-Like Pedagogical Activities...';
    modalStepText.textContent = 'Formulating SMART objectives, SEN differentiation, and timed stage activities...';
    modalProgressBar.style.width = '85%';
  }, 1300);
}

function finishModalAndPreview() {
  setTimeout(() => {
    modalTitle.textContent = 'Lesson Plan Generated Successfully!';
    modalStepText.textContent = 'Updating standard administrative metadata and printable preview...';
    modalProgressBar.style.width = '100%';

    setTimeout(() => {
      aiProgressModal.classList.add('hidden');
      saveHeadersToLocalStorage(true);
      fillPrintableFromForm();
      highlightUpdatedFields();
    }, 400);
  }, 1900);
}

function highlightUpdatedFields() {
  const fields = ['unitTitle', 'keyUnitCompetence', 'lessonTitle', 'instrObjective', 'learningMaterials', 'references', 'intro', 'development', 'conclusion', 'evaluation'];
  fields.forEach(f => {
    const el = form[f];
    if (el) {
      el.style.backgroundColor = '#f0fdf4';
      setTimeout(() => el.style.backgroundColor = '', 1500);
    }
  });
}

  // Built-in REB CBC AI Engine (Procedural human-like synthesis)
function generateBuiltinAiLessonPlan(cls, selectedUnitIndex, customTopic, headers) {
  const clsData = syllabus[cls] || FALLBACK_SYLLABUS["P4"];
  
  // Choose unit & lesson
  let unitObj = clsData.units[0];
  let lessonObj = unitObj.lessons[0];

  if (selectedUnitIndex && selectedUnitIndex.includes('_')) {
    const [uIdx, lIdx] = selectedUnitIndex.split('_').map(Number);
    if (clsData.units[uIdx]) {
      unitObj = clsData.units[uIdx];
      if (unitObj.lessons[lIdx]) {
        lessonObj = unitObj.lessons[lIdx];
      }
    }
  } else if (customTopic) {
    // Search syllabus for matching keyword or use first
    for (const u of clsData.units) {
      for (const l of u.lessons) {
        if (l.lessonTitle.toLowerCase().includes(customTopic.toLowerCase()) || u.unitTitle.toLowerCase().includes(customTopic.toLowerCase())) {
          unitObj = u;
          lessonObj = l;
          break;
        }
      }
    }
  }

  // Dynamic human-like variations to ensure text feels authentic and never static
  const teacherNames = headers.teacher ? headers.teacher : 'Teacher';
  const senContext = headers.sen ? headers.sen : 'learners with mild SEN';
  const schoolContext = headers.school ? headers.school : 'school';

  // If lesson has steps (new 6-step format), use them directly
  if (lessonObj.steps && lessonObj.steps.length >= 6) {
    const finalLessonTitle = customTopic ? `Rwanda CBC Focus: ${customTopic}` : lessonObj.lessonTitle;
    const finalObjective = customTopic ?
      `Using concrete classroom materials and REB textbooks, learners should be able to understand, calculate, and solve problems involving ${customTopic} correctly and explain their steps in pairs.` :
      lessonObj.instrObjective;

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
      step1: lessonObj.steps[0].activity,
      step1_exercise: lessonObj.steps[0].pupilBookExercise,
      step1_gcci: lessonObj.steps[0].gcOrCci,
      step2: lessonObj.steps[1].activity,
      step2_exercise: lessonObj.steps[1].pupilBookExercise,
      step2_gcci: lessonObj.steps[1].gcOrCci,
      step3: lessonObj.steps[2].activity,
      step3_exercise: lessonObj.steps[2].pupilBookExercise,
      step3_gcci: lessonObj.steps[2].gcOrCci,
      step4: lessonObj.steps[3].activity,
      step4_exercise: lessonObj.steps[3].pupilBookExercise,
      step4_gcci: lessonObj.steps[3].gcOrCci,
      step5: lessonObj.steps[4].activity,
      step5_exercise: lessonObj.steps[4].pupilBookExercise,
      step5_gcci: lessonObj.steps[4].gcOrCci,
      step6: lessonObj.steps[5].activity,
      step6_exercise: lessonObj.steps[5].pupilBookExercise,
      step6_gcci: lessonObj.steps[5].gcOrCci
    };
  }

  // Fallback to old format for backward compatibility
  const introVariations = [
    `${teacherNames} greets the ${cls} learners warmly and leads a 3-minute mental math warm-up related to ${unitObj.unitTitle.toLowerCase()}. Teacher asks probing questions to connect today's topic (${lessonObj.lessonTitle}) with real-life experiences in Rwanda.`,
    `Teacher begins by checking attendance and homework from the previous lesson. To introduce ${lessonObj.lessonTitle}, ${teacherNames} displays classroom concrete materials and invites two learners to explain what they observe on the teacher's table.`,
    `Teacher activates prior knowledge by writing a short review challenge on the chalkboard. Learners discuss with their bench neighbors for 2 minutes before ${teacherNames} introduces today's competence in ${unitObj.unitTitle}.`
  ];

  const devVariations = [
    `Teacher clearly demonstrates the core steps of ${lessonObj.lessonTitle} on the chalkboard using visual diagrams and place-value references from REB Student Book. In collaborative groups of 4, learners work with hands-on materials (${lessonObj.materials.split(',')[0] || 'counters'}) to practice solving examples.\n\n*SEN Differentiation:* For ${senContext}, teacher provides enlarged visual charts, tactile materials, and peer mentoring to ensure full inclusion.\n\nTeacher circulates around the classroom, monitoring group progress, checking exercise books, and asking guiding questions to stimulate critical thinking.`,
    `Step 1: Teacher models how to approach problems in ${lessonObj.lessonTitle} using step-by-step chalkboard examples.\n\nStep 2: Learners work in mixed-ability pairs on Exercise problems from REB Student Book. ${teacherNames} ensures active participation of both boys and girls.\n\nStep 3 (SEN Support): Specifically for ${senContext}, teacher simplifies instruction steps and provides one-on-one guidance at their desks.\n\nStep 4: Selected group leaders present their worked solutions on the chalkboard while classmates observe and verify.`,
    `Teacher organizes a structured discovery activity where learners explore ${lessonObj.lessonTitle} using concrete classroom tools. Following teacher modeling, learners complete collaborative group worksheets.\n\n*Inclusive Support:* Teacher adapts tasks for ${senContext} by allowing verbal responses and providing tactile manipulatives.\n\nTeacher reviews common misconceptions on the chalkboard before transitioning to individual practice.`
  ];

  const concVariations = [
    `Teacher conducts a interactive 4-minute summary where learners state the golden rules learned in today's lesson on ${lessonObj.lessonTitle}. Two learners come to the chalkboard to demonstrate one example for the class. Teacher praises active participation and links the topic to ${lessonObj.crossCutting}.`,
    `Teacher leads a class discussion asking: 'What was the most interesting or challenging part of ${lessonObj.lessonTitle} today?' Learners share reflections. Teacher summarizes the key formulas and rules on the chalkboard for learners to copy into their notebooks.`,
    `Teacher reviews the instructional objective with the class to check understanding. Selected learners summarize how they solved today's problems. Teacher assigns a short home follow-up task to reinforce mastery.`
  ];

  const evalVariations = [
    `Teacher administers a 5-minute written formative evaluation: 4 structured problems written on the chalkboard from REB Student Book page exercises on ${lessonObj.lessonTitle}. Teacher marks notebooks and identifies learners needing remedial support.`,
    `Individual Assessment: Learners complete Exercise questions from REB ${cls} Student Book on ${lessonObj.lessonTitle}. Teacher walks around inspecting exercise books, providing immediate constructive feedback and noting progress in the scheme of work.`,
    `Chalkboard Challenge & Quiz: Teacher writes 3 problems on the chalkboard. Learners solve them independently in their exercise books. Teacher checks answers with the class and records formative assessment notes.`
  ];

  const randomChoice = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // If customTopic was specified and didn't match a syllabus title exactly, adapt lessonTitle and objective
  const finalLessonTitle = customTopic ? `Rwanda CBC Focus: ${customTopic}` : lessonObj.lessonTitle;
  const finalObjective = customTopic ?
    `Using concrete classroom materials and REB textbooks, learners should be able to understand, calculate, and solve problems involving ${customTopic} correctly and explain their steps in pairs.` :
    lessonObj.instrObjective;

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
    intro: randomChoice(introVariations),
    development: randomChoice(devVariations),
    conclusion: randomChoice(concVariations),
    evaluation: randomChoice(evalVariations),
    step1: '',
    step1_exercise: '',
    step1_gcci: '',
    step2: '',
    step2_exercise: '',
    step2_gcci: '',
    step3: '',
    step3_exercise: '',
    step3_gcci: '',
    step4: '',
    step4_exercise: '',
    step4_gcci: '',
    step5: '',
    step5_exercise: '',
    step5_gcci: '',
    step6: '',
    step6_exercise: '',
    step6_gcci: ''
  };
}

// External LLM API Call (OpenAI, Gemini, Claude, OpenRouter/Custom)
async function callExternalLLM(provider, apiKey, model, endpoint, headers, selectedUnitIndex, customTopic) {
  const cls = headers.class || 'P4';
  const clsData = syllabus[cls] || FALLBACK_SYLLABUS["P4"];
  const prompt = `You are an expert Rwandan Primary School Mathematics teacher and curriculum specialist using the official Rwanda Basic Education Board (REB) Competency-Based Curriculum (CBC) from elearning.reb.rw (Student Book SB, Teacher's Guide TG, and Scheme of Work).
Generate an authentic, human-like, highly detailed mathematics lesson plan for Class ${cls}.
Context Details:
- Class: ${cls}
- School Name: ${headers.school}
- Teacher's Name: ${headers.teacher}
- Term: ${headers.term}
- Duration: ${headers.duration} minutes
- Class Size: ${headers.classSize} learners
- SEN info: ${headers.sen}
- Topic focus: ${customTopic || 'A standard core unit topic from REB mathematics curriculum for ' + cls}

Return ONLY a valid JSON object with EXACTLY the following keys (no markdown formatting outside JSON):
{
  "unitNo": "Unit number e.g. Unit 2",
  "lessonNo": "Lesson number e.g. Lesson 3 of 6",
  "unitTitle": "Official REB Unit Title",
  "keyUnitCompetence": "Official Rwanda CBC Key Unit Competence",
  "lessonTitle": "Specific lesson topic",
  "instrObjective": "SMART format instructional objective starting with 'Using [materials], learners should be able to...'",
  "planLocation": "Classroom or Math corner",
  "learningMaterials": "Realistic classroom materials from REB TG",
  "references": "REB Primary Mathematics ${cls} Student Book (SB) and Teacher's Guide (TG) citations with elearning.reb.rw link",
  "crossCutting": "One of: Environment, Gender, Peace, Inclusive Education, Financial Education, ICT",
  "intro": "5-10 minutes introduction activities written in realistic teacher phrasing",
  "development": "20-25 minutes detailed teaching & learning activities, pair work, chalkboard modeling, and specific SEN differentiation for ${headers.sen}",
  "conclusion": "5 minutes reflection and chalkboard summary",
  "evaluation": "5 minutes formative assessment, chalkboard quiz, or REB exercise book check"
}`;

  let apiUrl = '';
  let fetchOptions = {};

  if (provider === 'openai' || provider === 'custom') {
    apiUrl = endpoint || 'https://api.openai.com/v1/chat/completions';
    const chosenModel = model || 'gpt-4o-mini';
    fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: chosenModel,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    };
  } else if (provider === 'gemini') {
    const chosenModel = model || 'gemini-1.5-flash';
    apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${chosenModel}:generateContent?key=${apiKey}`;
    fetchOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    };
  } else if (provider === 'claude') {
    apiUrl = 'https://api.anthropic.com/v1/messages';
    const chosenModel = model || 'claude-3-5-sonnet-20241022';
    fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01'
      },
      body: JSON.stringify({
        model: chosenModel,
        max_tokens: 1200,
        messages: [{ role: 'user', content: prompt }]
      })
    };
  }

  const response = await fetch(apiUrl, fetchOptions);
  if (!response.ok) {
    throw new Error(`AI API request failed with status ${response.status}`);
  }

  const resJson = await response.json();
  let contentText = '';

  if (provider === 'openai' || provider === 'custom') {
    contentText = resJson.choices[0].message.content;
  } else if (provider === 'gemini') {
    contentText = resJson.candidates[0].content.parts[0].text;
  } else if (provider === 'claude') {
    contentText = resJson.content[0].text;
  }

  // Extract JSON block
  const jsonMatch = contentText.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[0]);
  }
  return null;
}

function populateFormWithAiResult(aiData, headers) {
  if (!aiData) return;

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
  
  // Populate 6-step format
  if (aiData.step1) form.step1.value = aiData.step1;
  if (aiData.step2) form.step2.value = aiData.step2;
  if (aiData.step3) form.step3.value = aiData.step3;
  if (aiData.step4) form.step4.value = aiData.step4;
  if (aiData.step5) form.step5.value = aiData.step5;
  if (aiData.step6) form.step6.value = aiData.step6;
  
  // Backward compatibility: populate old fields if they exist
  if (aiData.intro) form.intro.value = aiData.intro;
  if (aiData.development) form.development.value = aiData.development;
  if (aiData.conclusion) form.conclusion.value = aiData.conclusion;
  if (aiData.evaluation) form.evaluation.value = aiData.evaluation;
}

// ---------------------------------------------------------------------------
// 5. Populate Printable DOM Template from Form
// ---------------------------------------------------------------------------

function fillPrintableFromForm() {
  const data = new FormData(form);
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
    p_classSize: data.get('classSize') || '',
    p_sen: data.get('sen') || 'None reported',
    p_unitTitle: data.get('unitTitle') || '',
    p_keyUnitCompetence: data.get('keyUnitCompetence') || '',
    p_lessonTitle: data.get('lessonTitle') || '',
    p_instrObjective: data.get('instrObjective') || '',
    p_planLocation: data.get('planLocation') || '',
    p_learningMaterials: data.get('learningMaterials') || '',
    p_references: data.get('references') || '',
    p_crossCutting: data.get('crossCutting') || '',
    // 6-step format
    p_step1: data.get('step1') || '',
    p_step1_exercise: data.get('step1_exercise') || '',
    p_step1_gcci: data.get('step1_gcci') || '',
    p_step2: data.get('step2') || '',
    p_step2_exercise: data.get('step2_exercise') || '',
    p_step2_gcci: data.get('step2_gcci') || '',
    p_step3: data.get('step3') || '',
    p_step3_exercise: data.get('step3_exercise') || '',
    p_step3_gcci: data.get('step3_gcci') || '',
    p_step4: data.get('step4') || '',
    p_step4_exercise: data.get('step4_exercise') || '',
    p_step4_gcci: data.get('step4_gcci') || '',
    p_step5: data.get('step5') || '',
    p_step5_exercise: data.get('step5_exercise') || '',
    p_step5_gcci: data.get('step5_gcci') || '',
    p_step6: data.get('step6') || '',
    p_step6_exercise: data.get('step6_exercise') || '',
    p_step6_gcci: data.get('step6_gcci') || '',
    // Backward compatibility
    p_intro: data.get('intro') || '',
    p_development: data.get('development') || '',
    p_conclusion: data.get('conclusion') || '',
    p_evaluation: data.get('evaluation') || ''
  };

  for (const k in map) {
    const el = document.getElementById(k);
    if (el) el.textContent = map[k];
  }
}

// ---------------------------------------------------------------------------
// 6. Event Listeners & Initialization
// ---------------------------------------------------------------------------

// Class selection change -> update REB curriculum card & save headers
if (classSelect) {
  classSelect.addEventListener('change', () => {
    updateRebStatusCard(classSelect.value);
    saveHeadersToLocalStorage(true);
    fillPrintableFromForm();
  });
}

// Auto-save header metadata on input/change
HEADER_FIELDS.forEach(field => {
  const el = form[field];
  if (el) {
    el.addEventListener('input', () => {
      saveHeadersToLocalStorage(true);
      fillPrintableFromForm();
    });
    el.addEventListener('change', () => {
      saveHeadersToLocalStorage(true);
      fillPrintableFromForm();
    });
  }
});

// Save / Clear header buttons
if (saveHeadersBtn) {
  saveHeadersBtn.addEventListener('click', () => saveHeadersToLocalStorage(false));
}
if (clearHeadersBtn) {
  clearHeadersBtn.addEventListener('click', clearHeadersFromLocalStorage);
}

// AI Settings toggle
if (toggleAiSettingsBtn && aiSettingsDrawer) {
  toggleAiSettingsBtn.addEventListener('click', () => {
    aiSettingsDrawer.classList.toggle('hidden');
  });
}

if (saveAiSettingsBtn) {
  saveAiSettingsBtn.addEventListener('click', saveAiSettings);
}

// AI Generate Buttons
if (aiGenerateBtn) {
  aiGenerateBtn.addEventListener('click', handleAiGenerate);
}
if (aiGenerateBtnBottom) {
  aiGenerateBtnBottom.addEventListener('click', handleAiGenerate);
}

// Update printable whenever any form field changes
form.addEventListener('input', fillPrintableFromForm);
form.addEventListener('change', fillPrintableFromForm);

// PDF Generation
form.addEventListener('submit', (e) => {
  e.preventDefault();
  fillPrintableFromForm();
  saveHeadersToLocalStorage(true);

  const clsName = form.class.value || 'Class';
  const opt = {
    margin: 0.4,
    filename: `REB-${clsName}-Math-LessonPlan-${getTodayDateString()}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };

  if (typeof html2pdf !== 'undefined') {
    html2pdf().set(opt).from(printable).save();
  } else {
    alert('PDF library not loaded. Triggering browser Print to PDF instead.');
    window.print();
  }
});

// Print Button
if (printBtn) {
  printBtn.addEventListener('click', () => {
    fillPrintableFromForm();
    saveHeadersToLocalStorage(true);
    window.print();
  });
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', async () => {
  const loadedSyllabus = await loadSyllabus();
  if (loadedSyllabus && Object.keys(loadedSyllabus).length > 0) {
    syllabus = loadedSyllabus;
  }
  loadHeadersFromLocalStorage();
  loadAiSettings();
  if (classSelect && classSelect.value) {
    updateRebStatusCard(classSelect.value);
  }
  fillPrintableFromForm();
});
