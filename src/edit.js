import {getNotes,saveNotes, updateNotes,removeItems} from './notes.js'
import moment from 'moment'
import {keepTime,intializeNotes} from './view.js'

let notes=getNotes();
const noteId= location.hash.substring(1);
console.log(noteId);

const note=intializeNotes(noteId);

document.querySelector("#enter-title").value=note.title;
document.querySelector("#note-body").value=note.body;
document.querySelector("#enter-title").addEventListener("change",function(e){
     const note =    updateNotes(noteId,{
             title:e.target.value
         })   

       note.updated=moment().valueOf();
          saveNotes(notes)    
    })

 document.querySelector("#note-body").addEventListener("change",function(e){
     const note=updateNotes(noteId,{
         body:e.target.value,
     })
     note.updated=moment().valueOf();    
     saveNotes(notes);
 })   
 
 let dateEl= document.querySelector("#date-display");
 dateEl.textContent=keepTime(note.updated);
 
 document.querySelector("#save-notes").addEventListener("click",function(e){
    location.assign("/index.html");
 })

 document.querySelector("#removal-notes").addEventListener("click",function(e){
 removeItems(note.id);
 saveNotes(notes);
 location.assign("/index.html");
 })

 window.addEventListener('storage',function(e){
     
     if(e.key==="notes"){
    initializeNotes(noteId);
}
  })
  

