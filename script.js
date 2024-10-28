const inputBox = document.querySelector('.input-box');
const searchBtn = document.querySelector('.search-btn');
const wordText = document.getElementById('word');
const partOfSpeech = document.querySelector(".part-of-speech");
const breakedText = document.querySelector(".breaked-text");
const audioOfWord = document.querySelector('.audio');
const audioIcon = document.querySelector('.audio-icon');
const meaningText = document.querySelector('.meaning');
const exampleText = document.querySelector('.example');
const bottmContainer = document.querySelector('.container-bottom');

const getWordData = async ()=>{
    let word = inputBox.value.trim();
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try{
        let response = await fetch(apiUrl);
        let data = await response.json();
        console.log(data);
        
        const {meanings,phonetics} = data[0];

        wordText.innerText = data[0 ].word;

        partOfSpeech.innerText = meanings[0].partOfSpeech;
        
        breakedText.innerText = phonetics[1].text;

        meaningText.innerText = meanings[0].definitions[0].definition;

        if(meanings[0].definitions[0].example !== undefined){
            exampleText.innerText = `Ex : ${meanings[0].definitions[0].example};`
        }else if(meanings[0].definitions[1].example !== undefined){
            exampleText.innerText = `Ex : ${meanings[0].definitions[1].example};`
        }else if(meanings[0].definitions[2].example !== undefined){
            exampleText.innerText = `Ex : ${meanings[0].definitions[2].example};`
        }

        
        if(phonetics[0].audio !== ''){
            audioOfWord.setAttribute('src',`${phonetics[0].audio}`);
            playSound();
        }else if(phonetics[1].audio !== ''){
            audioOfWord.setAttribute('src',`${phonetics[1].audio}`);
            playSound();
        }else{
            audioOfWord.setAttribute('src',`${phonetics[2].audio}`);
            playSound();
        }
      

    }catch(error){
        alert('Word Not Found!, Try another');
        bottmContainer.style.display = 'none';
    }
}


document.querySelector('form').addEventListener('submit',(e)=>{
    bottmContainer.style.display = 'flex';
    e.preventDefault();
    getWordData();
    inputBox.value = '';
    exampleText.innerText = 'No example found!';
})


function playSound(){
    audioOfWord.play();
}
audioIcon.addEventListener('click',playSound);