import moment from 'moment'
import {getFilters} from './filters.js'
import {sortNotes, getNotes} from './notes.js'
let createDOM=(element)=>{
    const notes = getNotes();
    let fillDisp= document.createElement("a");
    let texts= document.createElement("p");
    let status= document.createElement("p");
    
    
    if(element.title.length>0)
     {  texts.textContent=element.title; }
    else {
        texts.textContent="No title";
    }
    fillDisp.appendChild(texts);
    fillDisp.classList.add("list-item");
    texts.classList.add("list-item__title");
    fillDisp.setAttribute('href',`/edit.html#${element.id}`)
    status.textContent=keepTime(notes.updated);
    status.classList.add("list-item__subtitle")
    fillDisp.appendChild(status);
    return fillDisp;
    }
    


let renderDisplay= ()=>{
    const filterText=getFilters();
    const notes= sortNotes(filterText.sortBy);
    let notesDisp= document.querySelector("#disp");
    let filtered=notes.filter((item)=>{return (item.title.toLowerCase().includes(filterText.searchText.toLowerCase()));});
    console.log(filtered);  
   notesDisp.innerHTML='';
     
    if(filtered.length>0){
        filtered.forEach(element => {
            const newText=  createDOM(element);
   
           notesDisp.appendChild(newText);
           
       });    
   }
    
    else{
          let noteR=document.createElement("p");
           noteR.classList.add('empty-message');
           noteR.textContent="no notes are there";
          notesDisp.appendChild(noteR); 
    }
    
}

const intializeNotes=(noteId)=>{
    const notes= getNotes();
    const note=notes.find((item)=>{
        return item.id===noteId;})
    console.log(note);
    if(!note){
        location.assign("/index.html");
    }
  
    document.querySelector("#enter-title").value=note.title;
    document.querySelector("#note-body").value=note.body;
    let dateEl= document.querySelector("#date-display");
    dateEl.textContent=keepTime(note.updated);
    return note;
   
}

const keepTime=(timestamp)=>{
    return `The note was updated ${moment(timestamp).fromNow()}`}

export {keepTime,renderDisplay,createDOM,intializeNotes}    