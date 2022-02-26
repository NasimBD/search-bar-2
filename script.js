const searchBar = document.querySelector("#searchBar");
const charactersList = document.querySelector("#charactersList");
const magnifyingGlass = document.querySelector(".fa-magnifying-glass");
const APIUrl = "https://hp-api.herokuapp.com/api/characters";

let characters = [];

searchBar.focus();

// filters fetched characters according to the search key
const filter = () => {
    const searchKey = searchBar.value.trim().toLowerCase();
    if(searchKey){
        const filteredCharacters = characters.filter(character => {
        const hasSearchKey = character.name.toLowerCase().includes(searchKey) ||
                             character.name.toLowerCase().includes(searchKey);
        return hasSearchKey;                        
    });
    appendCharacters(filteredCharacters);
}else return;
}

searchBar.addEventListener("keyup", filter);
/*  another method: by clicking on the search icon*/
// magnifyingGlass.addEventListener("click", filter);


/* Fetch data from an API */
const fetchCharacters = async () => {
    try{
        const res = await fetch(APIUrl);
        characters = await res.json();
        appendCharacters(characters);
    }catch(err){
        console.log(err);
    }
}
/* another method */
// const fetchCharacters = async () => {
    // fetch(APIUrl)
    // .then(res => res.json())
    // .then(data => {
    //     characters = data
    //     appendCharacters();
    // })
// }


/* Append list item elements inside the ul#charactersList */
const appendCharacters = (charactersArr) => {
    const charactersHtmlArr =  charactersArr.slice(0,20).map(character => {
        const characterHtml = ` 
            <li class="character">
                <h2>${character.name}</h2>
                <p>House: ${character.house}</p>
                <img src="${character.image}" alt="">
            </li>`;
        return characterHtml;    
    })
   charactersList.innerHTML =  charactersHtmlArr.join('');
}

fetchCharacters();


