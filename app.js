const TF_KEY=[
[1,0,1,1,1],[0,1,1,0,1],[1,1,1,0,1],[1,1,1,0,1],[0,1,1,1,1],
[1,1,0,1,0],[1,0,1,0,1],[1,0,1,1,0],[1,1,0,1,0],[1,1,0,1,1],
[1,0,1,1,1],[1,0,1,0,1],[1,0,1,1,1],[1,0,1,1,1],[1,1,0,1,0],
[1,1,1,1,0],[1,1,1,0,1],[1,1,1,0,1],[1,1,1,0,1],[1,1,1,0,1],
[1,1,1,1,0],[1,1,1,0,1],[1,1,0,1,0],[1,1,0,1,1],[1,1,0,1,0],
[1,0,1,1,1],[1,0,1,1,0],[1,1,0,1,1],[1,1,0,1,0],[1,0,1,1,0]
];
const SBA_KEY=['B','A','C','A','B','D','A','C','D','B','D','E','A','E','A','C','B','A','C','B','D','E','A','B','C','D','E','B','C','D'];
let bank=null, mode='tf', index=0, answers={tf:{},sba:{}}, submitted=false, results=null;
const $=id=>document.getElementById(id);
const show=id=>$(id).classList.remove('hidden');
const hide=id=>$(id).classList.add('hidden');
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
async function loadBank(){
 try{
  if(!window.QUESTION_BANK_GZIP_B64) throw new Error('Question bank data not found');
  const raw=atob(window.QUESTION_BANK_GZIP_B64.replace(/\s/g,''));
  const bytes=Uint8Array.from(raw,c=>c.charCodeAt(0));
  const stream=new Blob([bytes]).stream().pipeThrough(new DecompressionStream('gzip'));
  bank=JSON.parse(await new Response(stream).text());
  if(bank.tf.length!==30||bank.sba.length!==30) throw new Error('Question count check failed');
 }catch(e){$('home').innerHTML='<h1>Question bank could not be loaded</h1><p class="intro">The bundled question data failed to decode. Please check the questions.js file in the repository.</p><pre>'+esc(e.message)+'</pre>';throw e;}
}
function start(which){mode=which;index=0;answers[mode]={};submitted=false;results=null;hide('home');hide('results');show('exam');render();}
function data(){return bank[mode];}
function getAnswer(qi,si){return mode==='tf'?(answers.tf[qi]?.[si]??''):(answers.sba[qi]??'');}
function setTF(qi,si,val){answers.tf[qi]??={};answers.tf[qi][si]=val;renderProgress();}
function render(){
 const q=data()[index];
 $('exam-label').textContent=mode==='tf'?'TRUE / FALSE PRACTICE':'SINGLE BEST ANSWER';
 $('counter').textContent=String(index+1).padStart(2,'0')+' / '+data().length;
 $('q-number').textContent=(mode==='tf'?'GROUP ':'QUESTION ')+String(index+1).padStart(2,'0');
 $('q-title').textContent=q.title;
 $('q-stem').textContent=mode==='sba'?q.stem:'Choose True, False, or Unsure for each statement. Unsure scores zero.';
 $('q-stem').classList.toggle('hidden',mode==='tf'&&false);
 const body=$('question-body');body.innerHTML='';
 if(mode==='tf'){
  q.statements.forEach((statement,si)=>{
   const card=document.createElement('article');card.className='statement';
   const saved=getAnswer(index,si);
   card.innerHTML='<div class="statement-num">'+String(si+1).padStart(2,'0')+'</div><div class="statement-content"><p>'+esc(statement)+'</p><div class="choices" role="group" aria-label="Statement '+(si+1)+'"><label class="choice"><input type="radio" name="tf-'+index+'-'+si+'" value="1" '+(saved==='1'?'checked':'')+'><span>True</span></label><label class="choice"><input type="radio" name="tf-'+index+'-'+si+'" value="0" '+(saved==='0'?'checked':'')+'><span>False</span></label><label class="choice unsure"><input type="radio" name="tf-'+index+'-'+si+'" value="u" '+(saved==='u'?'checked':'')+'><span>Unsure</span></label></div></div>';
   card.querySelectorAll('input').forEach(input=>input.addEventListener('change',()=>{setTF(index,si,input.value);}));
   body.appendChild(card);
  });
 }else{
  const card=document.createElement('article');card.className='sba-card';
  const saved=getAnswer(index);
  Object.entries(q.options).forEach(([letter,option])=>{
   const label=document.createElement('label');label.className='sba-option'+(saved===letter?' selected':'');
   label.innerHTML='<input type="radio" name="sba-'+index+'" value="'+letter+'" '+(saved===letter?'checked':'')+'><span class="letter">'+letter+'</span><span>'+esc(option)+'</span>';
   label.querySelector('input').addEventListener('change',e=>{answers.sba[index]=e.target.value;body.querySelectorAll('.sba-option').forEach(el=>el.classList.remove('selected'));label.classList.add('selected');});
   card.appendChild(label);
  });body.appendChild(card);
 }
 $('prev').disabled=index===0;$('next').textContent=index===data().length-1?'Last question':'Next →';
 $('submit').textContent='Submit '+(mode==='tf'?'T/F':'SBA')+' answers & view results';
 renderProgress();
}
function renderProgress(){
 const total=mode==='tf'?data().length*5:data().length;
 let done=0;
 if(mode==='tf')Object.values(answers.tf).forEach(group=>done+=Object.values(group).filter(Boolean).length);
 else done=Object.values(answers.sba).filter(Boolean).length;
 $('progress-fill').style.width=(done/total*100)+'%';
 $('saved').textContent=done+' / '+total+' responses selected';
}
function calculate(){
 if(mode==='tf'){
  let total=0;const per=data().map((q,qi)=>{let raw=0;const items=q.statements.map((_,si)=>{const a=getAnswer(qi,si),key=TF_KEY[qi][si];if(a==='1')raw+=key===1?1:-1;else if(a==='0')raw+=key===0?1:-1;return {answer:a,key:String(key),correct:(a==='1'&&key===1)||(a==='0'&&key===0)};});const score=Math.max(0,raw);total+=score;return {title:q.title,score,max:5,items,question:q};});return {score:total,max:150,per};
 }
 let score=0;const per=data().map((q,qi)=>{const a=getAnswer(qi),key=SBA_KEY[qi],correct=a===key;if(correct)score+=3;return {title:q.title,score:correct?3:0,max:3,answer:a,key,correct,question:q};});return {score,max:90,per};
}
function submit(){
 results=calculate();submitted=true;hide('exam');show('results');
 $('score').textContent=results.score;$('out-of').textContent=' / '+results.max;
 const pct=results.score/results.max*100;
 $('feedback').textContent=pct>=80?'Excellent work. Review any missed questions to consolidate your knowledge.':pct>=60?'Good effort. Use the answer review to target topics for revision.':'Keep practising. Review each explanation and revisit the related topics.';
 const list=$('review-list');list.innerHTML='';
 results.per.forEach((r,qi)=>{
  const section=document.createElement('article');section.className='review-card';
  const correctCount=mode==='tf'?r.items.filter(x=>x.correct).length:(r.correct?1:0);
  let detail='';
  if(mode==='tf'){
   detail=r.question.statements.map((st,si)=>{const item=r.items[si];const key=item.key==='1'?'True':'False';const given=item.answer==='1'?'True':item.answer==='0'?'False':item.answer==='u'?'Unsure':'Blank';return '<div class="review-line"><span class="status '+(item.correct?'ok':'no')+'">'+(item.correct?'✓':'•')+'</span><div><p>'+esc(st)+'</p><small>Your answer: <b>'+given+'</b> · Correct: <b>'+key+'</b></small></div></div>';}).join('');
  }else{
   const opts=r.question.options;detail='<p class="review-stem">'+esc(r.question.stem)+'</p>'+Object.entries(opts).map(([letter,text])=>'<div class="option-review '+(letter===r.key?'correct-option':letter===r.answer?'wrong-option':'')+'"><b>'+letter+'</b><span>'+esc(text)+'</span>'+(letter===r.key?'<strong>Correct</strong>':'')+'</div>').join('')+'<p class="answer-note">Your answer: <b>'+(r.answer?esc(r.answer):'Blank')+'</b> · Correct answer: <b>'+r.key+'</b></p>';
  }
  section.innerHTML='<div class="review-head"><div><span class="eyebrow">'+(mode==='tf'?'GROUP ':'QUESTION ')+String(qi+1).padStart(2,'0')+'</span><h3>'+esc(r.title)+'</h3></div><span class="mini-score">'+r.score+' / '+r.max+'</span></div>'+detail;
  list.appendChild(section);
 });
 window.scrollTo({top:0,behavior:'smooth'});
}
function exportCSV(){
 if(!results)return;
 const rows=[['Mode','Question','Item','Prompt','Your answer','Correct answer','Points','Maximum']];
 results.per.forEach((r,qi)=>{
  if(mode==='tf')r.question.statements.forEach((st,si)=>{const it=r.items[si];rows.push(['True/False',r.title,si+1,st,it.answer==='1'?'True':it.answer==='0'?'False':it.answer==='u'?'Unsure':'Blank',it.key==='1'?'True':'False',it.correct?1:(it.answer===''||it.answer==='u'?0:-1),1]);});
  else rows.push(['SBA',r.title,qi+1,r.question.stem,r.answer||'Blank',r.key,r.score,3]);
 });
 rows.push([]);rows.push(['TOTAL',mode.toUpperCase(),'', '', '', '',results.score,results.max]);
 const csv=rows.map(row=>row.map(v=>'"'+String(v??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
 const blob=new Blob(['\ufeff'+csv],{type:'text/csv;charset=utf-8;'}),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='growth-development-'+mode+'-results.csv';a.click();URL.revokeObjectURL(url);
}
document.querySelectorAll('[data-mode]').forEach(btn=>btn.addEventListener('click',()=>start(btn.dataset.mode)));
$('back').addEventListener('click',()=>{hide('exam');show('home');});
$('prev').addEventListener('click',()=>{if(index>0){index--;render();window.scrollTo({top:0,behavior:'smooth'});}});
$('next').addEventListener('click',()=>{if(index<data().length-1){index++;render();window.scrollTo({top:0,behavior:'smooth'});}});
$('submit').addEventListener('click',()=>{const total=mode==='tf'?data().length*5:data().length;let done=0;if(mode==='tf')Object.values(answers.tf).forEach(g=>done+=Object.values(g).filter(Boolean).length);else done=Object.values(answers.sba).filter(Boolean).length;if(done<total&&!confirm('You have answered '+done+' of '+total+' items. Submit anyway?'))return;submit();});
$('csv').addEventListener('click',exportCSV);
$('retry').addEventListener('click',()=>start(mode));
$('dashboard').addEventListener('click',()=>{hide('results');show('home');window.scrollTo({top:0,behavior:'smooth'});});
loadBank().catch(()=>{});
