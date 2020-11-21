import {Deck} from './deck.js';
import { Player } from './player.js';
import {renderIsSet,renderShowSet,renderplayerscore,renderScoreTable,renderBacktoSettingsButton,renderDeck,rendernoplayers,render_win_message,render_lose_message,render_3_cards,render_players_buttons,renderwinner,render_no_selectedcards,render_3_cards_button} from "./render.js";

const players = [];
const noplayersdiv=document.querySelector('#noplayersdiv');
const noplayersselection = document.getElementById('nofplayersselection');    
const show_set_button = document.getElementById('show_set');
const Is_set_exist_button = document.getElementById('is_set_exist');
const game_mode_selection = document.getElementById('Modes');
const deal_3_cards_button = document.getElementById('deal_3_cards');
const start_game = document.getElementById('start_game');
const difficulty_selection = document.getElementById('Difficulties');
const Settingsdiv = document.getElementById('starting page');
const gamediv = document.getElementById('game page');
let deck = new Deck();
var table;

export function handleCardClick(evt){

    if(evt.target.id === 'selected'){
        evt.target.id = 'unselected';
        
    }
    else if(evt.target.id === 'unselected'){
        evt.target.id = 'selected';
    }  
}

export function handleplayerbuttonclick(e1){

    e1.target.disabled = true;
    var index = e1.target.id;
    if(players.length==1 && game_mode_selection === 'Practice'){
        players[0].singleplay();
    }
    else{
        players[index].play(index);
    }
 
}


function handleDifficulty(){

    if(difficulty_selection.value ==='Advanced'){
        deck.generate_deck('Advanced');
    }
    else{
        deck.generate_deck('Starter');
    }
}

export function handlenumberofplayers(){

    noplayersdiv.innerHTML='';
    for(let i=0;i<noplayersselection.value-1;i++){

        rendernoplayers(noplayersdiv,i+1);
    }
}

function displayplayers(){

    for(let i=0;i<players.length;i++){
        console.log(players[i]);
    }
}

export function isEndgame(){

}
export function displaywinner(){

    players.sort((a, b) => (a.score > b.score) ? -1 : 1)
    var maxscore = players[0].score;
    var winner = players[0].name;
    for(let i=0;i<players.length;i++){
        if(players[i].score>maxscore){
            maxscore = players[i].score; 
            winner = players[i].name;
        }
    }
    var message = 'The Winner is : '+winner+ ' With Score of : '+maxscore;
    renderScoreTable(players);
    console.log(message);
    renderwinner(message);
}

export function storeinplayerslist(){

    const playersinput = document.querySelectorAll("#Player");

    for(let i=0;i<noplayersselection.value;i++){

        players.push(new Player(playersinput[i].value));
       
    }
        noplayersselection.removeEventListener('change',handlenumberofplayers);

    }

function handleGameMode(){

    if(game_mode_selection.value==='Competitive'){

        show_set_button.disabled=true;
        Is_set_exist_button.disabled=true;
        //deal_3_cards_button.disabled = true;
    }
    else{
        show_set_button.disabled=false;
        Is_set_exist_button.disabled=false;
        deal_3_cards_button.disabled=false;
    }
}

export function remove_set_from_table(){

    const selectedcards = document.querySelectorAll('#selected');

    for(let i = 0 ;i<selectedcards.length;i++){

        selectedcards[i].parentNode.removeChild(selectedcards[i]);
    }
    render_3_cards(deck);
}

function enableallcards(){
    const table_cards = document.querySelectorAll('#unselected');

        for(let i=0;i<table_cards.length;i++){
            table_cards[i].addEventListener('click',handleCardClick);
    }
}

export function evaluate(id){

    var table_cards = document.querySelectorAll('#unselected');
    const selectedcards = document.querySelectorAll('#selected');


    if(selectedcards.length===3){
        for(let i=0;i<table_cards.length;i++){
            table_cards[i].removeEventListener('click',handleCardClick);
    }
    
    if(is_Set(selectedcards)){
        
        render_win_message();
        remove_set_from_table(); 
        players[id].score++; 
        renderplayerscore( players[id].name +' has score : '+ players[id].score);  
        console.log( players[id].name +' has score : '+ players[id].score);  
    }
    else{
        render_lose_message();
        for(let i=0;i<selectedcards.length;i++){
            selectedcards[i].id = 'unselected';
    }
        players[id].score--;
        renderplayerscore(players[id].name +' has score : '+ players[id].score);   
        console.log( players[id].name +' has score : '+ players[id].score);   
    }

    enableallcards();
}else{
    render_no_selectedcards();
}
 table_cards = document.querySelectorAll('#unselected');

for(let i=0;i<table_cards.length;i++){
    table_cards[i].removeEventListener('click',handleCardClick);
}

}


// export function is_Set(selectedcards){

// if(selectedcards[0].className === selectedcards[1].className && selectedcards[1].className === selectedcards[2].className){
//     return true;
// }
// else if (selectedcards[0].className != selectedcards[1].className && selectedcards[1].className != selectedcards[2].className && selectedcards[0].className != selectedcards[2].className){
//     return true;
// }
// else{
//     return false;
// }
// }

export function is_Set(selectedcards){

if(selectedcards[0].classList[1] === selectedcards[1].classList[1] && selectedcards[1].classList[1] === selectedcards[2].classList[1] &&selectedcards[0].classList[1] === selectedcards[2].classList[1]
    &&selectedcards[0].classList[2] === selectedcards[1].classList[2] && selectedcards[1].classList[2] === selectedcards[2].classList[2] &&selectedcards[0].classList[2] === selectedcards[2].classList[2]
    &&selectedcards[0].classList[3] === selectedcards[1].classList[3] && selectedcards[1].classList[3] === selectedcards[2].classList[3] 
        &&selectedcards[0].classList[4] === selectedcards[1].classList[4] && selectedcards[1].classList[4] === selectedcards[2].classList[4] &&selectedcards[0].classList[4] === selectedcards[2].classList[4]){
        return true;
}
else if (selectedcards[0].classList[1] != selectedcards[1].classList[1] && selectedcards[1].classList[1] != selectedcards[2].classList[1] &&selectedcards[0].classList[1] != selectedcards[2].classList[1]
    &&selectedcards[0].classList[2] != selectedcards[1].classList[2] && selectedcards[1].classList[2] != selectedcards[2].classList[2] &&selectedcards[0].classList[2] != selectedcards[2].classList[2]
    &&selectedcards[0].classList[3] != selectedcards[1].classList[3] && selectedcards[1].classList[3] != selectedcards[2].classList[3] 
        &&selectedcards[0].classList[4] != selectedcards[1].classList[4] && selectedcards[1].classList[4] != selectedcards[2].classList[4] &&selectedcards[0].classList[4] != selectedcards[2].classList[4]){
    return true;
}
else{
    return false;
}

}

function handleStartGame(){

    Settingsdiv.style.display = 'none';
    gamediv.style.display = 'block';
    storeinplayerslist();
    render_players_buttons(players);
    handleDifficulty();
    deck.shuffle();
    const mytable = deck.deal(12);
    deck.print_deck();
    renderDeck(mytable);
    console.log(mytable);
    handleGameMode();
    renderBacktoSettingsButton();
    
}
export function handleBacktoSettingsClick(){
    location.reload();
    Settingsdiv.style.display = 'block';
    gamediv.style.display = 'none';
    
}
function handleDeal3cardsclick(){

    render_3_cards_button(deck);
}
function handleIsSetclick(){

    var tablecards = document.querySelectorAll('#unselected');
    for(let x=0;x<tablecards.length;x++){
        for(let y=0;y<tablecards.length;y++){
            for(let z=0;z<tablecards.length;z++){
                if(x!=y && y!=z && x!=z){
                    if(is_Set([tablecards[x],tablecards[y],tablecards[z]])) 
                    {
                        renderIsSet();
                    }
                    }
                }
            }
        }
}

function handleShowSetclick(){

     var tablecards = document.querySelectorAll('#unselected');
    for(let x=0;x<tablecards.length;x++){
        for(let y=0;y<tablecards.length;y++){
            for(let z=0;z<tablecards.length;z++){
                if(x!=y && y!=z && x!=z){
                    if(is_Set([tablecards[x],tablecards[y],tablecards[z]])) 
                    {
                        renderShowSet(x,y,z);
                    }
                    }
                }
            }
        }
}
game_mode_selection.addEventListener('change',handleGameMode);
difficulty_selection.addEventListener('change',handleDifficulty);
noplayersselection.addEventListener('change',handlenumberofplayers);
start_game.addEventListener('click',handleStartGame);
deal_3_cards_button.addEventListener('click',handleDeal3cardsclick);
Is_set_exist_button.addEventListener('click',handleIsSetclick);
show_set_button.addEventListener('click',handleShowSetclick);