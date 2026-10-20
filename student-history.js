/* Browser-local student history. This is convenience storage, not authentication or a private database. */
(function(){
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
  $('student-id').value=id;
  status.textContent=id?'Student ID selected: '+id:'No student ID selected.';
  list.innerHTML='';
  if(!id){list.innerHTML='<p class="history-empty">Set your student ID to view attempts saved in this browser.</p>';return;}
  const rows=(getAll()[id]||[]).slice().reverse();
  if(!rows.length){list.innerHTML='<p class="history-empty">No completed quizzes saved for this ID on this browser yet.</p>';return;}
  const table=document.createElement('table');table.className='history-table';
  table.innerHTML='<thead><tr><th>Completed</th><th>Topic</th><th>Paper</th><th>Score</th></tr></thead><tbody></tbody>';
  rows.forEach(row=>{
   const tr=document.createElement('tr');
   [new Date(row.completedAt).toLocaleString(),row.topic,row.mode,String(row.score)+' / '+String(row.max)].forEach(v=>{const td=document.createElement('td');td.textContent=v;tr.appendChild(td);});
   table.querySelector('tbody').appendChild(tr);
  });
  list.appendChild(table);
 }
 window.saveQuizAttempt=function(attempt){
  const id=getId();
  if(!id){const status=$('student-status');if(status)status.textContent='Quiz completed, but history was not saved. Set your student ID on the home page first.';return;}
  const all=getAll();all[id]??=[];
  all[id].push({...attempt,completedAt:attempt.completedAt||new Date().toISOString()});
  if(saveAll(all)){render();}else alert('Could not save history in this browser. Export your result as CSV instead.');
 };
 document.addEventListener('DOMContentLoaded',()=>{
  $('student-save')?.addEventListener('click',()=>{
   const id=normalise($('student-id').value);
   if(!id){alert('Enter your email address or registration number first.');return;}
   try{localStorage.setItem(ID_KEY,id);render();}catch(e){alert('This browser does not allow local storage.');}
  });
  $('student-clear')?.addEventListener('click',()=>{
   try{localStorage.removeItem(ID_KEY);}catch(e){}
   render();
  });
  render();
 });
})();