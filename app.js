const TF_KEY=[
[1,0,1,1,1],[0,1,1,0,1],[1,1,1,0,1],[1,1,1,0,1],[0,1,1,1,1],
[1,1,0,1,0],[1,0,1,0,1],[1,0,1,1,0],[1,1,0,1,0],[1,1,0,1,1],
[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,0,1,1,1],[1,1,0,1,0],
[1,1,1,1,0],[1,1,1,0,1],[1,1,1,0,1],[1,1,1,0,1],[1,1,1,0,1],
[1,1,1,1,0],[1,1,1,0,1],[1,1,0,1,0],[1,1,0,1,1],[1,1,0,1,0],
[1,0,1,1,1],[1,0,1,1,0],[1,1,0,1,1],[1,1,0,1,0],[1,0,1,1,0]
];
const SBA_KEY=['B','A','C','A','B','D','A','C','D','B','D','E','A','E','A','C','B','A','C','B','D','E','A','B','C','D','E','B','C','D'];
let growthBank=null, currentBank=null, currentTopic='growth', mode='tf', revisionMode=false, index=0, answers={tf:{},sba:{},essay:{}}, results=null, essaySelfReview={};
const $=id=>document.getElementById(id);
const show=id=>$(id).classList.remove('hidden');
const hide=id=>$(id).classList.add('hidden');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const topicLabel=()=>window.PSYCHIATRY_MODULE_BANKS?.[currentTopic]?.label||(currentTopic==='jaundice'?'Neonatal Jaundice':currentTopic==='schizophrenia'?'Schizophrenia':currentTopic==='child-psychiatry'?'Child Psychiatry':currentTopic==='bipolar-affective'?'Bipolar Affective Disorder':'Growth & Development');
const formatLabel=()=>mode==='tf'?'TRUE / FALSE':mode==='sba'?'SINGLE BEST ANSWER':'ESSAY QUESTIONS';
function data(){return currentBank[mode==='essay'?'essays':mode];}
function tfItem(q,si,qi=index){
 const raw=q.statements[si];
 if(typeof raw==='string')return {text:raw,answer:currentTopic==='growth'?Boolean(TF_KEY[qi][si]):false,explanation:''};
 if(Array.isArray(raw))return {text:raw[0],answer:currentTopic==='growth'?Boolean(TF_KEY[qi][si]):Boolean(raw[1]),explanation:raw[2]||''};
 return {text:raw.text,answer:currentTopic==='growth'?Boolean(TF_KEY[qi][si]):Boolean(raw.answer),explanation:raw.explanation||''};
}
function sbaKey(q,qi){return currentTopic==='growth'?SBA_KEY[qi]:q.answer;}
function normalize(s){return String(s||'').toLowerCase().replace(/[^a-z0-9\s]/g,' ').replace(/\s+/g,' ').trim();}
async function loadBank(){
 try{
  if(!window.QUESTION_BANK_GZIP_B64)throw new Error('Growth & Development question bank was not found.');
  const raw=atob(window.QUESTION_BANK_GZIP_B64.replace(/\s/g,''));
  const bytes=Uint8Array.from(raw,c=>c.charCodeAt(0));
  const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  growthBank=JSON.parse(await new Response(stream).text());
  if(growthBank.tf.length!==30||growthBank.sba.length!==30)throw new Error('Growth & Development question count check failed.');
  if(!window.NEONATAL_JAUNDICE_BANK||window.NEONATAL_JAUNDICE_BANK.tf.length!==30||window.NEONATAL_JAUNDICE_BANK.sba.length!==30||window.NEONATAL_JAUNDICE_BANK.essays.length!==3)throw new Error('Neonatal Jaundice question bank did not load correctly.');
  if(!window.SCHIZOPHRENIA_BANK||window.SCHIZOPHRENIA_BANK.tf.length!==30||window.SCHIZOPHRENIA_BANK.sba.length!==30||window.SCHIZOPHRENIA_BANK.essays.length!==3)throw new Error('Schizophrenia question bank did not load correctly.');
  if(!window.CHILD_PSYCHIATRY_BANK||window.CHILD_PSYCHIATRY_BANK.tf.length!==30||window.CHILD_PSYCHIATRY_BANK.sba.length!==32||window.CHILD_PSYCHIATRY_BANK.essays.length!==3)throw new Error('Child Psychiatry question bank did not load correctly.');
  if(!window.BIPOLAR_AFFECTIVE_BANK||window.BIPOLAR_AFFECTIVE_BANK.tf.length!==30||window.BIPOLAR_AFFECTIVE_BANK.sba.length!==30||window.BIPOLAR_AFFECTIVE_BANK.essays.length!==3)throw new Error('Bipolar Affective Disorder question bank count check failed.');
  const moduleBanks=window.PSYCHIATRY_MODULE_BANKS;
  if(!moduleBanks)throw new Error('Psychiatry study modules did not load.');
  for(const [id,bank] of Object.entries(moduleBanks)){
   if(!bank.label||!Array.isArray(bank.tf)||bank.tf.length<1||bank.tf.some(q=>!Array.isArray(q.statements)||q.statements.length!==5||q.statements.some(st=>!Array.isArray(st)||st.length<2))||!Array.isArray(bank.sba)||bank.sba.length<3||bank.sba.some(q=>!q.stem||!q.options||!q.answer||!q.options[q.answer])||!Array.isArray(bank.essays)||bank.essays.length!==4||bank.essays.some(e=>e.max!==20||e.rubric.reduce((n,c)=>n+c.points,0)!==20))throw new Error('Psychiatry module validation failed: '+id);
  }
 }catch(e){
  $('home').innerHTML='<h1>Question bank could not be loaded</h1><p class="intro">Please check that both question-bank files are available in the repository.</p><pre>'+esc(e.message)+'</pre>';
  throw e;
 }
}
function selectTopic(topic){
 currentTopic=topic;currentBank=window.PSYCHIATRY_MODULE_BANKS?.[topic]||(topic==='growth'?growthBank:topic==='jaundice'?window.NEONATAL_JAUNDICE_BANK:topic==='child-psychiatry'?window.CHILD_PSYCHIATRY_BANK:topic==='bipolar-affective'?window.BIPOLAR_AFFECTIVE_BANK:window.SCHIZOPHRENIA_BANK);
 const module=window.PSYCHIATRY_MODULE_BANKS?.[topic];
 if(module){
  $('selected-topic-title').textContent=module.label+' practice.';
  $('selected-topic-desc').textContent='Focused Final MBBS psychiatry module with True/False, Single Best Answer and one structured essay. Revision mode reveals answer explanations and the essay marking scheme.';
  show('essay-mode-card');
  $('essay-mode-card').querySelector('.mode-desc').textContent='4 essays · 20 marks each · model answers and point-by-point rubrics.';
  document.querySelector('[data-mode="tf"] .mode-desc').textContent=(currentBank.tf.length*5)+' True/False statements across '+currentBank.tf.length+' groups.';
  document.querySelector('[data-mode="sba"] .mode-desc').textContent=currentBank.sba.length+' single-best-answer questions with keyed explanations.';
 }else{
  $('selected-topic-title').innerHTML=topic==='jaundice'?'Neonatal Jaundice <em>practice.</em>':topic==='schizophrenia'?'Schizophrenia <em>practice.</em>':topic==='child-psychiatry'?'Child Psychiatry <em>practice.</em>':topic==='bipolar-affective'?'Bipolar Affective Disorder <em>practice.</em>':'Growth &amp; Development <em>practice.</em>';
  $('selected-topic-desc').textContent=topic==='jaundice'?'Choose True/False, Single Best Answer or structured essay practice. The essay paper includes a formative marking rubric.':topic==='schizophrenia'?'Practise core concepts, diagnosis, clinical features, risk assessment, treatment and recovery. Essays use a formative point-based rubric.':topic==='child-psychiatry'?'Practise child development, autism, ADHD, emotional and behavioural disorders, safeguarding and management.':topic==='bipolar-affective'?'Psychiatry Test 01: bipolar spectrum, mania and hypomania, differential diagnosis, risk assessment, acute and long-term management. Includes T/F, SBA and essays with marking schemes.':'Choose True/False or Single Best Answer practice for Growth & Development.';
  if(topic==='jaundice'||topic==='schizophrenia'||topic==='child-psychiatry'||topic==='bipolar-affective')show('essay-mode-card');else hide('essay-mode-card');
  $('essay-mode-card').querySelector('.mode-desc').textContent=topic==='schizophrenia'?'3 schizophrenia essays · 20 marks each · point-by-point rubric and missing-point suggestions.':topic==='child-psychiatry'?'3 child psychiatry essays · 20 marks each · model answers and point-by-point marking rubrics.':topic==='bipolar-affective'?'3 Psychiatry Test 01 essays · 20 marks each · model answers and point-by-point marking rubrics.':'3 neonatal jaundice essays · 20 marks each · point-by-point rubric and missing-point suggestions.';
  document.querySelector('[data-mode="tf"] .mode-desc').textContent=topic==='child-psychiatry'?'30 groups · 5 statements each. Mark each statement True or False.':'30 groups · 5 statements each. Mark every statement True or False in a compact table.';
  document.querySelector('[data-mode="sba"] .mode-desc').textContent=topic==='child-psychiatry'?'32 single-best-answer questions covering core child psychiatry topics.':'30 questions with one best answer. No topic labels or category hints before submission.';
 }
 const revision=$('revision-mode');if(revision){revision.checked=revisionMode;revision.onchange=()=>{revisionMode=revision.checked;render();};}
 hide('home');hide('exam');hide('results');show('mode-select');window.scrollTo({top:0,behavior:'smooth'});
}
function start(which){
 const bank=window.PSYCHIATRY_MODULE_BANKS?.[currentTopic]||(currentTopic==='growth'?growthBank:currentTopic==='jaundice'?window.NEONATAL_JAUNDICE_BANK:currentTopic==='child-psychiatry'?window.CHILD_PSYCHIATRY_BANK:currentTopic==='bipolar-affective'?window.BIPOLAR_AFFECTIVE_BANK:window.SCHIZOPHRENIA_BANK);
 const paperKey=which==='essay'?'essays':which;
 if(!bank||!Array.isArray(bank[paperKey])||bank[paperKey].length===0){
  alert('This paper is not available yet. Please return to topic selection and try again.');
  return;
 }
 currentBank=bank;mode=which;index=0;
 answers[mode]={};essaySelfReview={};results=null;
 hide('home');hide('mode-select');hide('results');show('exam');
 render();
 window.scrollTo({top:0,behavior:'smooth'});
}
function getAnswer(qi,si){return mode==='tf'?(answers.tf[qi]?.[si]??''):mode==='sba'?(answers.sba[qi]??''):(answers.essay[qi]??'');}
function answeredCount(){
 if(mode==='tf')return Object.values(answers.tf).reduce((n,g)=>n+Object.values(g).filter(Boolean).length,0);
 if(mode==='sba')return Object.values(answers.sba).filter(Boolean).length;
 return Object.values(answers.essay).filter(v=>String(v||'').trim().length>0).length;
}
function totalResponseCount(){return mode==='tf'?data().length*5:data().length;}
function questionStatus(qi){
 if(mode==='tf'){
  const n=Object.values(answers.tf[qi]||{}).filter(Boolean).length;
  return n===5?'answered':n>0?'partial':'unanswered';
 }
 if(mode==='sba')return answers.sba[qi]?'answered':'unanswered';
 return String(answers.essay[qi]||'').trim()?'answered':'unanswered';
}
function renderNav(){
 const nav=$('question-nav');nav.innerHTML='';
 data().forEach((q,qi)=>{
  const b=document.createElement('button');b.type='button';b.className='nav-number '+questionStatus(qi)+(qi===index?' current':'');
  b.textContent=String(qi+1);b.setAttribute('aria-label','Go to '+(mode==='tf'?'group ':'question ')+(qi+1)+', '+questionStatus(qi));
  b.setAttribute('aria-current',qi===index?'step':'false');
  b.addEventListener('click',()=>{index=qi;render();window.scrollTo({top:0,behavior:'smooth'});});
  nav.appendChild(b);
 });
}
function renderProgress(){
 const done=answeredCount(),total=totalResponseCount();
 $('progress-fill').style.width=(done/total*100)+'%';
 $('saved').textContent=mode==='essay'?done+' / '+total+' essays started':done+' / '+total+' responses selected';
 renderNav();
}
function render(){
 const q=data()[index];
 $('exam-label').textContent=topicLabel().toUpperCase()+' · '+formatLabel();
 $('counter').textContent=String(index+1).padStart(2,'0')+' / '+data().length+(mode==='essay'?' essays':'');
 $('q-number').textContent=mode==='tf'?'GROUP '+String(index+1).padStart(2,'0'):mode==='essay'?'ESSAY '+String(index+1).padStart(2,'0'):'QUESTION '+String(index+1).padStart(2,'0');
 $('q-title').textContent=mode==='tf'?'Statement group '+String(index+1).padStart(2,'0'):mode==='essay'?'Essay question '+String(index+1).padStart(2,'0'):'Question '+String(index+1).padStart(2,'0');
 $('q-stem').textContent=mode==='tf'?'Mark each statement True or False.':mode==='sba'?q.stem:q.prompt;
 const body=$('question-body');body.innerHTML='';
 if(mode==='tf'){
  const rows=q.statements.map((raw,si)=>{
   const st=tfItem(q,si,index).text,saved=getAnswer(index,si),scheme=revisionMode?'<small class="revision-key">Answer: <b>'+(tfItem(q,si,index).answer?'True':'False')+'</b> · '+esc(tfItem(q,si,index).explanation||'Review the relevant concept.')+'</small>':'';
   return '<tr><td class="tf-num">'+(si+1)+'</td><td class="tf-statement">'+esc(st)+scheme+'</td><td class="tf-choice"><label><input type="radio" name="tf-'+index+'-'+si+'" value="1" '+(saved==='1'?'checked':'')+' aria-label="Statement '+(si+1)+', True"><span>True</span></label></td><td class="tf-choice"><label><input type="radio" name="tf-'+index+'-'+si+'" value="0" '+(saved==='0'?'checked':'')+' aria-label="Statement '+(si+1)+', False"><span>False</span></label></td></tr>';
  }).join('');
  body.innerHTML='<div class="tf-table-wrap"><table class="tf-table"><thead><tr><th>#</th><th>Statement</th><th>True</th><th>False</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  body.querySelectorAll('input[type="radio"]').forEach(input=>input.addEventListener('change',()=>{const m=input.name.match(/^tf-(\d+)-(\d+)$/);answers.tf[Number(m[1])]??={};answers.tf[Number(m[1])][Number(m[2])]=input.value;renderProgress();}));
 }else if(mode==='sba'){
  const card=document.createElement('article');card.className='sba-card';const saved=getAnswer(index);
  Object.entries(q.options).forEach(([letter,option])=>{
   const label=document.createElement('label');label.className='sba-option'+(saved===letter?' selected':'');
   label.innerHTML='<input type="radio" name="sba-'+index+'" value="'+letter+'" '+(saved===letter?'checked':'')+'><span class="letter">'+letter+'</span><span>'+esc(option)+(revisionMode&&letter===q.answer?' <b class="revision-correct">Correct answer</b>':'')+'</span>';
   label.querySelector('input').addEventListener('change',e=>{answers.sba[index]=e.target.value;card.querySelectorAll('.sba-option').forEach(el=>el.classList.remove('selected'));label.classList.add('selected');renderProgress();});
   card.appendChild(label);
  });body.appendChild(card);if(revisionMode){const key=document.createElement('p');key.className='revision-key';key.innerHTML='<b>Answer: '+esc(q.answer)+'</b> · '+esc(q.explanation||'');body.appendChild(key);}
 }else{
  const wrap=document.createElement('div');wrap.className='essay-editor';
  const answer=String(getAnswer(index)||'');
  wrap.innerHTML='<div class="essay-editor-head"><span>Suggested structure: identify the problem, explain your reasoning, then give a clear plan.</span><span id="word-count">'+(answer.trim()?answer.trim().split(/\s+/).length:0)+' words</span></div><textarea id="essay-input" rows="14" placeholder="Write your answer here. Include the important points, reasoning and management plan where relevant.">'+esc(answer)+'</textarea><p class="essay-helper">Your answer stays in this browser. The marking rubric will be shown after you submit.</p>';
  body.appendChild(wrap);if(revisionMode){const scheme=document.createElement('details');scheme.open=true;scheme.className='revision-key';scheme.innerHTML='<summary>Marking scheme and model answer</summary><p>'+esc(q.modelAnswer||'')+'</p><ul>'+q.rubric.map(c=>'<li><b>'+esc(c.label)+'</b> — '+c.points+' marks. '+esc(c.feedback)+'</li>').join('')+'</ul>';body.appendChild(scheme);}
  $('essay-input').addEventListener('input',e=>{answers.essay[index]=e.target.value;const n=e.target.value.trim()?e.target.value.trim().split(/\s+/).length:0;$('word-count').textContent=n+' words';renderProgress();});
 }
 $('prev').disabled=index===0;$('next').textContent=index===data().length-1?'Last question':'Next →';
 $('submit').textContent='Submit '+(mode==='tf'?'T/F':mode==='sba'?'SBA':'essay')+' paper & view results';
 renderProgress();
}
function calculate(){
 if(mode==='tf'){
  let total=0;const per=data().map((q,qi)=>{
   let raw=0;
   const items=q.statements.map((_,si)=>{
    const a=answers.tf[qi]?.[si]??'',item=tfItem(q,si,qi),key=item.answer?'1':'0';
    let points=0;if(a==='1')points=key==='1'?1:-1;else if(a==='0')points=key==='0'?1:-1;
    raw+=points;
    return {answer:a,key,correct:(a===key),points,explanation:item.explanation};
   });
   const score=Math.max(0,raw);total+=score;
   return {title:q.title||'Group '+(qi+1),category:q.category||q.title||'Review',score,max:5,items,question:q};
  });
  return {score:total,max:per.length*5,per};
 }
 if(mode==='sba'){
  let score=0;const per=data().map((q,qi)=>{const a=answers.sba[qi]||'',key=sbaKey(q,qi),correct=a===key;if(correct)score+=3;return {title:q.title||'Question '+(qi+1),category:q.category||q.title||'Review',score:correct?3:0,max:3,answer:a,key,correct,question:q};});
  return {score,max:per.length*3,per};
 }
 let score=0;const per=data().map((q,qi)=>{
  const answer=String(answers.essay[qi]||''),normalized=normalize(answer);
  const rubric=q.rubric.map(c=>{
   const detected=normalized.length>0&&c.groups.every(group=>group.some(phrase=>normalized.includes(normalize(phrase))));
   return {label:c.label,points:c.points,feedback:c.feedback,detected};
  });
  const mark=rubric.reduce((n,c)=>n+(c.detected?c.points:0),0);score+=mark;
  return {title:q.title,category:q.category,score:mark,max:q.max,answer,question:q,rubric};
 });
 return {score,max:per.reduce((n,r)=>n+r.max,0),per};
}
function categoryTag(category){return '<span class="category-tag">REVIEW TOPIC · '+esc(category||'General')+'</span>';}

function buildSubmissionResponses(){
 const rows=[];
 results.per.forEach((r,qi)=>{
  if(mode==='tf'){
   r.question.statements.forEach((_,si)=>{
    const item=r.items[si];
    rows.push({questionNumber:qi+1,statementNumber:si+1,category:r.category,prompt:tfItem(r.question,si,qi).text,studentAnswer:item.answer==='1'?'True':item.answer==='0'?'False':'Blank',correctAnswer:item.key==='1'?'True':'False',correct:item.correct,points:item.points,maxPoints:1,explanation:item.explanation||''});
   });
  }else if(mode==='sba'){
   rows.push({questionNumber:qi+1,category:r.category,prompt:r.question.stem,options:r.question.options,studentAnswer:r.answer||'Blank',correctAnswer:r.key,correct:r.correct,points:r.score,maxPoints:r.max,explanation:r.question.explanation||''});
  }else{
   rows.push({questionNumber:qi+1,category:r.category,prompt:r.question.prompt,studentAnswer:r.answer||'',points:r.score,maxPoints:r.max,rubric:r.rubric.map(c=>({criterion:c.label,points:c.points,detected:c.detected,feedback:c.feedback})),selfReviewedCriteria:essaySelfReview[qi]||[]});
  }
 });
 return rows;
}

function submit(){
 results=calculate();hide('exam');show('results');
 $('score').textContent=results.score;$('out-of').textContent=' / '+results.max;
 const pct=results.max?results.score/results.max*100:0;
 $('feedback').textContent=mode==='essay'?'This is a provisional keyword-supported mark. Review the rubric and suggested missing points for each essay.':pct>=80?'Excellent work. Review any missed questions to consolidate your knowledge.':pct>=60?'Good effort. Use the answer review to target topics for revision.':'Keep practising. Review the explanations and revisit the related concepts.';
 if(mode==='essay')show('results-notice');else hide('results-notice');
 const list=$('review-list');list.innerHTML='';
 results.per.forEach((r,qi)=>{
  const section=document.createElement('article');section.className='review-card';
  if(mode==='tf'){
   const detail=r.question.statements.map((_,si)=>{
    const st=tfItem(r.question,si,qi).text,item=r.items[si],key=item.key==='1'?'True':'False',given=item.answer==='1'?'True':item.answer==='0'?'False':'Blank';
    return '<div class="review-line"><span class="status '+(item.correct?'ok':item.answer===''?'neutral':'no')+'">'+(item.correct?'✓':item.answer===''?'—':'×')+'</span><div><p>'+esc(st)+'</p><small>Your answer: <b>'+given+'</b> · Correct: <b>'+key+'</b> · Item mark: <b>'+(item.points>0?'+':'')+item.points+'</b></small>'+(item.explanation?'<p class="explanation">'+esc(item.explanation)+'</p>':'')+'</div></div>';
   }).join('');
   section.innerHTML='<div class="review-head"><div><span class="eyebrow">GROUP '+String(qi+1).padStart(2,'0')+'</span><h3>'+esc(r.title)+'</h3>'+categoryTag(r.category)+'</div><span class="mini-score">'+r.score+' / '+r.max+'</span></div>'+detail;
  }else if(mode==='sba'){
   const opts=r.question.options;
   const detail='<p class="review-stem">'+esc(r.question.stem)+'</p>'+Object.entries(opts).map(([letter,text])=>'<div class="option-review '+(letter===r.key?'correct-option':letter===r.answer?'wrong-option':'')+'"><b>'+letter+'</b><span>'+esc(text)+'</span>'+(letter===r.key?'<strong>Correct</strong>':'')+'</div>').join('')+'<p class="answer-note">Your answer: <b>'+(r.answer?esc(r.answer):'Blank')+'</b> · Correct answer: <b>'+r.key+'</b></p><p class="explanation">'+esc(r.question.explanation||'Review the relevant concept in your notes.')+'</p>';
   section.innerHTML='<div class="review-head"><div><span class="eyebrow">QUESTION '+String(qi+1).padStart(2,'0')+'</span><h3>'+esc(r.title)+'</h3>'+categoryTag(r.category)+'</div><span class="mini-score">'+r.score+' / '+r.max+'</span></div>'+detail;
  }else{
   section.dataset.essayIndex=String(qi);
   const rubric=r.rubric.map((c,ri)=>{
    const checked=Boolean(essaySelfReview[qi]?.includes(ri));
    return '<div class="rubric-item '+(c.detected?'rubric-detected':'rubric-missed')+'"><div class="rubric-line"><span class="rubric-status">'+(c.detected?'Detected':'Not detected')+'</span><b>'+esc(c.label)+'</b><span class="rubric-points">'+(c.detected?c.points:checked?c.points:0)+' / '+c.points+'</span></div>'+(c.detected?'<p class="rubric-feedback">Key concept detected in your response.</p>':'<p class="rubric-feedback">'+esc(c.feedback)+'</p><label class="self-check"><input type="checkbox" data-essay-q="'+qi+'" data-criterion="'+ri+'" '+(checked?'checked':'')+'> I included this idea in different wording</label>')+'</div>';
   }).join('');
   section.innerHTML='<div class="review-head"><div><span class="eyebrow">ESSAY '+String(qi+1).padStart(2,'0')+'</span><h3>'+esc(r.title)+'</h3>'+categoryTag(r.category)+'</div><span class="mini-score">'+r.score+' / '+r.max+' auto</span></div><p class="review-stem">'+esc(r.question.prompt)+'</p><div class="essay-response"><strong>Your response</strong><p>'+esc(r.answer||'No answer submitted.')+'</p></div>'+(r.question.modelAnswer?'<details class="model-answer"><summary>Model answer / key points</summary><div>'+esc(r.question.modelAnswer)+'</div></details>':'')+'<div class="essay-mark-summary" id="essay-adjusted-'+qi+'">Auto-detected score: '+r.score+' / '+r.max+' · Self-reviewed estimate: '+r.score+' / '+r.max+'</div><h4 class="rubric-heading">Marking rubric and points to consider</h4>'+rubric;
  }
  list.appendChild(section);
 });
 list.querySelectorAll('input[data-essay-q]').forEach(input=>input.addEventListener('change',()=>{
  const qi=Number(input.dataset.essayQ),ri=Number(input.dataset.criterion);essaySelfReview[qi]??=[];
  if(input.checked){if(!essaySelfReview[qi].includes(ri))essaySelfReview[qi].push(ri);}else essaySelfReview[qi]=essaySelfReview[qi].filter(n=>n!==ri);
  updateEssayScoreDisplay(qi);
 }));
 if(typeof saveQuizAttempt==='function')saveQuizAttempt({topic:topicLabel(),topicKey:currentTopic,mode:mode.toUpperCase(),score:results.score,max:results.max,completedAt:new Date().toISOString(),responses:buildSubmissionResponses()});
 window.scrollTo({top:0,behavior:'smooth'});
}
function updateEssayScoreDisplay(qi){
 const r=results?.per?.[qi];if(!r||mode!=='essay')return;
 const extra=r.rubric.reduce((n,c,ri)=>n+(!c.detected&&essaySelfReview[qi]?.includes(ri)?c.points:0),0);
 const el=$('essay-adjusted-'+qi);if(el)el.textContent='Auto-detected score: '+r.score+' / '+r.max+' · Self-reviewed estimate: '+(r.score+extra)+' / '+r.max;
 const section=document.querySelector('[data-essay-index="'+qi+'"]');
 if(section)section.querySelectorAll('.rubric-item').forEach((item,ri)=>{
  const c=r.rubric[ri],checked=Boolean(essaySelfReview[qi]?.includes(ri));
  if(!c.detected){item.classList.toggle('rubric-self-reviewed',checked);const points=item.querySelector('.rubric-points');if(points)points.textContent=(checked?c.points:0)+' / '+c.points;const status=item.querySelector('.rubric-status');if(status)status.textContent=checked?'Self-reviewed':'Not detected';}
 });
}
function exportCSV(){
 if(!results)return;
 const rows=[['Topic',topicLabel()],['Paper',mode.toUpperCase()],[],['Question','Category','Prompt / statement / criterion','Your answer','Correct answer / rubric status','Points','Maximum']];
 results.per.forEach((r,qi)=>{
  if(mode==='tf')r.question.statements.forEach((_,si)=>{const it=r.items[si],st=tfItem(r.question,si,qi).text;rows.push([qi+1,r.category,st,it.answer==='1'?'True':it.answer==='0'?'False':'Blank',it.key==='1'?'True':'False',it.points,1]);});
  else if(mode==='sba')rows.push([qi+1,r.category,r.question.stem,r.answer||'Blank',r.key,r.score,r.max]);
  else {rows.push([qi+1,r.category,r.question.prompt,r.answer,'Essay auto-detected score',r.score,r.max]);r.rubric.forEach(c=>rows.push([qi+1,r.category,c.label,'',c.detected?'Detected':'Not detected',c.detected?c.points:0,c.points]));}
 });
 rows.push([]);rows.push(['TOTAL',topicLabel()+' '+mode.toUpperCase(),'', '', '',results.score,results.max]);
 const csv=rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
 const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download=(window.PSYCHIATRY_MODULE_BANKS?.[currentTopic]?currentTopic:currentTopic==='jaundice'?'neonatal-jaundice':currentTopic==='schizophrenia'?'schizophrenia':currentTopic==='child-psychiatry'?'child-psychiatry':currentTopic==='bipolar-affective'?'bipolar-affective':'growth-development')+'-'+mode+'-results.csv';a.click();URL.revokeObjectURL(url);
}
document.querySelectorAll('[data-topic]').forEach(btn=>btn.addEventListener('click',()=>selectTopic(btn.dataset.topic)));
document.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>start(btn.dataset.mode)));
$('back-topics').addEventListener('click',()=>{hide('mode-select');show('home');window.scrollTo({top:0,behavior:'smooth'});});
$('back').addEventListener('click',()=>{hide('exam');show('mode-select');window.scrollTo({top:0,behavior:'smooth'});});
$('prev').addEventListener('click',()=>{if(index>0){index--;render();window.scrollTo({top:0,behavior:'smooth'});}});
$('next').addEventListener('click',()=>{if(index<data().length-1){index++;render();window.scrollTo({top:0,behavior:'smooth'});}});
$('submit').addEventListener('click',()=>{
 const done=answeredCount(),total=totalResponseCount();
 if(done<total&&!confirm('You have completed '+done+' of '+total+' '+(mode==='essay'?'essays':'responses')+'. Submit anyway?'))return;
 submit();
});
$('csv').addEventListener('click',exportCSV);
$('retry').addEventListener('click',()=>start(mode));
$('dashboard').addEventListener('click',()=>{hide('results');hide('exam');hide('mode-select');show('home');window.scrollTo({top:0,behavior:'smooth'});});
loadBank().catch(()=>{});
