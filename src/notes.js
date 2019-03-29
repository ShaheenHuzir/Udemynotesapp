import uuidv4 from 'uuid/v4'
import moment from 'moment'



let notes =[];

function loadNotes(){
    const notesJSON= localStorage.getItem('notes');
    try{
    return ((notesJSON)?JSON.parse(notesJSON):[]);
}
catch(e){
    return [];
}
}

notes= loadNotes();

//expose notes from module
const getNotes=()=> notes;

let saveNotes=(notes)=>
{ localStorage.setItem('notes',JSON.stringify(notes)); }

const createNote=()=>{
    const id=uuidv4();
    const timeStamp= moment().valueOf();
  notes.push( {id:id, 
              title:'',
               body:'',
               created:timeStamp,
               updated: timeStamp
                     });
        saveNotes(notes);
        return id;            
}

let removeItems=(id)=>{
    const noteId=notes.findIndex(function(element){
        return element.id===id;
    })
    if(noteId>-1){
        notes.splice(noteId,1);
        saveNotes(notes);
    }
}
//sorting notes
let sortNotes =(sortBy)=>
 {
      if(sortBy==="edited"){
          return notes.sort((a,b)=>{
              if(a.updated>b.updated){
                  return -1;
              }
              else if(b.updated>a.updated){
                  return 1;
              }
             else{
                 return 0;
             } 
          } )
      }
     else if(sortBy==="recent")   
        {
            return notes.sort((a,b)=>{
                if(a.created>b.created){
                    return -1;
                }
                else if(b.created>a.created){
                    return 1;
                }
                else{
                    return 0 ;
                }
            })
        }
      else if(sortBy==="letter"){
           return notes.sort((a,b)=>{
               if(a.title.toLowerCase()<b.title.toLowerCase()){
                   return -1;
               }
               else if(a.title.toLowerCase()<b.title.toLowerCase()){
                   return 1;
               }
               else{
                   return 0;
               }
           })
      }  

        else{
            return notes;
        }

  }

  const updateNotes=(id,updates)=>{
      const note = notes.find((note)=>{return note.id===id});
       
     
        if(!note){
          return
      }
      
      if(typeof updates.title==="string"){
          note.title= updates.title;
          note.updated= moment().valueOf();
      }      
      
      if(typeof updates.body==="string"){
          note.body= updates.body;
          note.updated= moment().valueOf();
      }
      saveNotes();
      return note;
  }


export {getNotes,createNote,removeItems,sortNotes,updateNotes,saveNotes}