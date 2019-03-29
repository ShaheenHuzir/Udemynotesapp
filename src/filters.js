 let filterText={
        searchText:"",
        sortBy:"recent"
    
    }
    
const getFilters=()=> filterText;

const setFilters=(updates)=>{
    if(typeof updates.searchText==="string"){
        filterText.searchText=updates.searchText;
    }
    if(typeof updates.sortBy==="string"){
        filterText.sortBy=updates.sortBy;
    }
}

export {getFilters,setFilters}