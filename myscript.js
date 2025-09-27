// script.js
// Uses html2pdf.js (CDN included in index.html)
// Reference to uploaded template: lesson plan structure. :contentReference[oaicite:1]{index=1}

const form = document.getElementById('lpForm');
const printable = document.getElementById('printable');
const classSelect = document.getElementById('classSelect');
const autoFillBtn = document.getElementById('autoFillBtn');
const printBtn = document.getElementById('printBtn');

async function loadSyllabus(){
  try{
    const resp = await fetch('syllabus.json');
    if(!resp.ok) return {};
    return await resp.json();
  } catch(e){ console.warn('syllabus load failed',e); return {}; }
}
let syllabus = {};
loadSyllabus().then(s=> syllabus=s);

autoFillBtn.addEventListener('click', ()=>{
  const cls = form.class.value;
  if(!cls){ alert('Select class first.'); return; }
  if(syllabus[cls]){
    // fill some fields with syllabus example
    form.unitTitle.value = syllabus[cls].sampleUnit || '';
    form.keyUnitCompetence.value = syllabus[cls].sampleCompetence || '';
    form.instrObjective.value = syllabus[cls].sampleObjective || '';
    form.learningMaterials.value = syllabus[cls].materials || '';
    form.lessonTitle.value = syllabus[cls].sampleLesson || '';
    form.intro.value = syllabus[cls].sampleIntro || '';
    form.development.value = syllabus[cls].sampleDevelopment || '';
    form.conclusion.value = syllabus[cls].sampleConclusion || '';
    form.evaluation.value = syllabus[cls].sampleEval || '';
  } else {
    alert('No syllabus data for selected class (sample data missing).');
  }
});

form.addEventListener('submit', (e)=>{
  e.preventDefault();
  fillPrintableFromForm();
  // generate PDF with html2pdf
  const opt = {
    margin: 0.4,
    filename: `${form.class.value || 'class'}-LP-${(new Date()).toISOString().slice(0,10)}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
  };
  // trigger download
  html2pdf().set(opt).from(printable).save();
});

printBtn.addEventListener('click', ()=>{
  fillPrintableFromForm();
  window.print();
});

function fillPrintableFromForm(){
  // map form fields to printable placeholders
  const data = new FormData(form);
  const map = {
    p_school: data.get('school')||'',
    p_teacher: data.get('teacher')||'',
    p_term: data.get('term')||'',
    p_date: data.get('date')||'',
    p_subject: data.get('subject')||'',
    p_class: data.get('class')||'',
    p_unitNo: data.get('unitNo')||'',
    p_lessonNo: data.get('lessonNo')||'',
    p_duration: (data.get('duration')||'') + ' mins',
    p_classSize: data.get('classSize')||'',
    p_sen: data.get('sen')||'',
    p_unitTitle: data.get('unitTitle')||'',
    p_keyUnitCompetence: data.get('keyUnitCompetence')||'',
    p_lessonTitle: data.get('lessonTitle')||'',
    p_instrObjective: data.get('instrObjective')||'',
    p_planLocation: data.get('planLocation')||'',
    p_learningMaterials: data.get('learningMaterials')||'',
    p_references: data.get('references')||'',
    p_crossCutting: data.get('crossCutting')||'',
    p_intro: data.get('intro')||'',
    p_development: data.get('development')||'',
    p_conclusion: data.get('conclusion')||'',
    p_evaluation: data.get('evaluation')||''
  };
  for(const k in map){
    const el = document.getElementById(k);
    if(el) el.textContent = map[k];
  }
}
