
import {createNote} from './notes.js'
import {setFilters} from './filters.js'
import {renderDisplay} from './view.js'



renderDisplay();

document.querySelector("#filter-text").addEventListener('input',function(e){
    setFilters({
        searchText: e.target.value,
    })
    renderDisplay();
})
document.querySelector("#selector").addEventListener('change',function(e){
             setFilters({
                 sortBy: e.target.value,
             })
               
               renderDisplay();
})   

document.querySelector("#add-note").addEventListener('click',function(e){
   const id = createNote() 
    location.assign(`/edit.html#${id}`);

})

window.addEventListener("storage",function(e){
    if(e.key==="notes"){
        renderDisplay();
    }

})