/* Browser-local student history. This is convenience storage, not authentication or a private database. */
(function(){
 'use strict';
 const ID_KEY='finalmbbs.studentId.v1';
 const HISTORY_KEY='finalmbbs.attempts.v1';
 const $=id=>document.getElementById(id);
 const normalise=s=>String(s||'').trim().toLowerCase();
 const getId=()=>{try{return normalise(localStorage.getItem(ID_KEY));}catch(e){return '';}};
 const getAll=()=>{try{return JSON.parse(localStorage.getItem(HISTORY_KEY)||'{}');}catch(e){return {};}};
 const saveAll=o=>{try{localStorage.setItem(HISTORY_KEY,JSON.stringify(o));return true;}catch(e){return false;}};
 function render(){
  const id=getId(),status=$('student-status'),list=$('student-history-list');
  if(!status||!list)return;
  const input=$('student-id'),go=$('student-continue');
  if(input)input.value=id;
  if(go)go.disabled=!id;
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
  const home=$('home'),grid=home?.querySelector('.topic-grid');
  if(home)home.classList.remove('hidden');
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
   render();
   $('student-id')?.focus();
  });
  $('student-continue')?.addEventListener('click',continueToQuizzes);
  render();
 }
 window.saveQuizAttempt=function(attempt){
  const id=getId();
  if(!id){const status=$('student-status');if(status)status.textContent='Quiz completed, but history was not saved. Set your student ID on the home page first.';return false;}
  const all=getAll();
  if(!Array.isArray(all[id]))all[id]=[];
  all[id].push({...attempt,completedAt:attempt.completedAt||new Date().toISOString()});
  if(saveAll(all)){render();return true;}
  alert('Could not save history in this browser. Export your result as CSV instead.');
  return false;
 };
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init,{once:true});
 else init();
})();