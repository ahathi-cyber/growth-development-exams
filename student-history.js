/* Browser-local student history. This is convenience storage, not authentication or a private database. */
(function(){
 'use strict';
 const ID_KEY='finalmbbs.studentId.v1';
 const HISTORY_KEY='finalmbbs.attempts.v1';
 const DRIVE_STATUS_ID='drive-sync-status';
 const $=id=>document.getElementById(id);
 const normalise=s=>String(s||'').trim().toLowerCase();
 const getId=()=>{try{return normalise(localStorage.getItem(ID_KEY));}catch(e){return '';}};
 const getAll=()=>{try{return JSON.parse(localStorage.getItem(HISTORY_KEY)||'{}');}catch(e){return {};}};
 const saveAll=o=>{try{localStorage.setItem(HISTORY_KEY,JSON.stringify(o));return true;}catch(e){return false;}};
 function render(){
  const id=getId(),status=$('student-status'),list=$('student-history-list');
  if(!status||!list)return;
  const input=$('student-id'),go=$('student-continue');
  if(input && !input.value)input.value=id;
  if(go)go.disabled=!id;
  const dashboardId=$('dashboard-student-id'),memorySummary=$('dashboard-memory-summary');
  if(dashboardId)dashboardId.textContent=id?'Signed in as: '+id:'No student ID saved';
  const allAttempts=getAll(),attempts=id&&Array.isArray(allAttempts[id])?allAttempts[id]:[];
  if(memorySummary)memorySummary.textContent=attempts.length
    ? attempts.length+' completed quiz '+(attempts.length===1?'attempt is':'attempts are')+' saved in this browser for this ID.'
    : 'No completed quizzes saved for this ID on this browser yet.';
  status.textContent=id?'Student ID selected: '+id+'. You can continue to choose a topic and start a paper.':'No student ID selected.';
  list.replaceChildren();
  if(!id){list.innerHTML='<p class="history-empty">Set your student ID to view attempts saved in this browser.</p>';return;}
  const all=getAll(),rows=Array.isArray(all[id])?all[id].slice().reverse():[];
  if(!rows.length){list.innerHTML='<p class="history-empty">No completed quizzes saved for this ID on this browser yet.</p>';return;}
  const table=document.createElement('table');table.className='history-table';
  table.innerHTML='<thead><tr><th>Completed</th><th>Topic</th><th>Paper</th><th>Score</th></tr></thead><tbody></tbody>';
  rows.forEach(row=>{
   const tr=document.createElement('tr');
   [new Date(row.completedAt).toLocaleString(),row.topic,row.mode,String(row.score)+' / '+String(row.max)].forEach(v=>{const td=document.createElement('td');td.textContent=String(v??'');tr.appendChild(td);});
   table.querySelector('tbody').appendChild(tr);
  });
  list.appendChild(table);
 }
 function continueToQuizzes(){
  if(!getId()){alert('Set your student ID first.');$('student-id')?.focus();return;}
  const signin=$('signin'),home=$('home');
  if(signin)signin.classList.add('hidden');
  const title=$('signin-title');if(title)title.innerHTML='Welcome back.<br><em>Let’s get focused.</em>';
  const intro=$('signin')?.querySelector('.intro');if(intro)intro.textContent='Enter your student ID to open your personal practice dashboard.';
  if(home)home.classList.remove('hidden');
  const grid=home?.querySelector('.subject-folder-grid');
  $('mode-select')?.classList.add('hidden');
  $('exam')?.classList.add('hidden');
  $('results')?.classList.add('hidden');
  grid?.scrollIntoView({behavior:'smooth',block:'start'});
  const first=grid?.querySelector('[data-topic]');
  first?.focus({preventScroll:true});
  const status=$('student-status');
  if(status)status.textContent='Ready. Choose a topic, select a paper format, and start your quiz.';
 }
 function init(){
  $('student-save')?.addEventListener('click',()=>{
   const id=normalise($('student-id')?.value);
   if(!id){alert('Enter your email address or registration number first.');$('student-id')?.focus();return;}
   try{
    localStorage.setItem(ID_KEY,id);
    render();
    continueToQuizzes();
   }catch(e){alert('This browser does not allow local storage. Your student ID could not be saved.');}
  });
  $('student-clear')?.addEventListener('click',()=>{
   try{localStorage.removeItem(ID_KEY);}catch(e){}
   const signin=$('signin'),home=$('home');
   if(home)home.classList.add('hidden');
   if(signin)signin.classList.remove('hidden');
   render();
   $('student-id')?.focus();
  });
  $('student-continue')?.addEventListener('click',continueToQuizzes);
  $('manage-account')?.addEventListener('click',()=>{
   const signin=$('signin'),home=$('home');
   if(home)home.classList.add('hidden');
   if(signin)signin.classList.remove('hidden');
   const title=$('signin-title');
   if(title)title.innerHTML='Your account.<br><em>Your progress.</em>';
   const intro=$('signin')?.querySelector('.intro');
   if(intro)intro.textContent='Update your student ID or review the quiz history saved for this browser.';
   render();
   $('student-id')?.focus();
   window.scrollTo({top:0,behavior:'smooth'});
  });
  render();
  const signin=$('signin'),home=$('home');
  if(getId()){if(signin)signin.classList.add('hidden');if(home)home.classList.remove('hidden');}
  else {if(home)home.classList.add('hidden');if(signin)signin.classList.remove('hidden');}
 }
 async function uploadAttemptToDrive(attempt,id){
  const status=$(DRIVE_STATUS_ID);
  const endpoint=String(window.GOOGLE_DRIVE_SUBMISSION_ENDPOINT||'').trim();
  if(!endpoint){
   if(status){status.classList.add('hidden');status.textContent='';}
   return {configured:false};
  }
  if(status){status.classList.remove('hidden');status.textContent='Sending this attempt to the central answer collection…';}
  const payload={schemaVersion:1,submissionId:(window.crypto&&crypto.randomUUID?crypto.randomUUID():String(Date.now())+'-'+Math.random().toString(36).slice(2)),submittedAt:new Date().toISOString(),studentId:id,site:'Final MBBS Practice Exams',...attempt};
  try{
   await fetch(endpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload),keepalive:true});
   if(status)status.textContent='Submission sent to the Google Drive endpoint. Because of browser security restrictions, delivery must be confirmed by checking the Drive folder.';
   return {configured:true,sent:true};
  }catch(error){
   if(status)status.textContent='Could not send this attempt to Google Drive. Your local history is still saved; export the results as CSV and retry later.';
   return {configured:true,sent:false};
  }
 }
 window.saveQuizAttempt=function(attempt){
  const id=getId();
  if(!id){const status=$('student-status');if(status)status.textContent='Quiz completed, but history was not saved. Set your student ID on the home page first.';return false;}
  const all=getAll();
  if(!Array.isArray(all[id]))all[id]=[];
  const {responses,...localSummary}=attempt;
  all[id].push({...localSummary,completedAt:attempt.completedAt||new Date().toISOString()});
  const saved=saveAll(all);
  if(saved)render();
  else alert('Could not save history in this browser. The Drive upload will still be attempted.');
  uploadAttemptToDrive(attempt,id);
  return saved;
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
 else init();
})();