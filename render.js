import {handleBacktoSettingsClick,handleplayerbuttonclick,displaywinner, isEndgame} from './index.js';
import {Deck} from './deck.js';

export function renderDeck(deck)
{
      document.getElementById("deck").innerHTML = "";
      for(let n=0;n<3;n++){
          let row=document.createElement("tr");
          for(let m=0;m<4;m++){
            let cell=document.createElement("td");
            let card = document.createElement("div");
              card.className = 'card '+ deck[m+n].shape +' '+ deck[m+n].color +' '+deck[m+n].number+' '+deck[m+n].shading;
              card.id = 'unselected';

              cell.appendChild(card);
              row.appendChild(cell);
              document.getElementById("deck").appendChild(row);
              //card.addEventListener('click',handleCardClick);
        }
      }
}

export function render_3_cards(deck){

if(deck.get_length()>=1){
  //var endgame = false;
  const empty_tds = document.querySelectorAll('td');
  const cards = deck.deal(3);

  for(let i =0;i<empty_tds.length;i++){
    var j=0;
    if(empty_tds[i].children.length==0){
      
      let card = document.createElement("div");
      card.className = 'card '+ cards[j].shape +' '+ cards[j].color +' '+cards[j].number+' '+cards[j].shading;
      card.id = 'unselected';
      empty_tds[i].appendChild(card);
      j++;
    }
  }
  let div = document.getElementById('no_remaining_cards');
  div.style.display = 'block';
  div.innerHTML = 'Number of remaining Cards in the Deck is : '+deck.get_length();
}
else{
  //endgame = true;
  let div = document.getElementById('no_remaining_cards');
  div.style.display = 'block';
  div.innerHTML ='There is No Remaining Cards in the Deck';
  console.log('is end game '+ isEndgame());
   if(isEndgame()){
     displaywinner();
   }
} 
}
export function render_3_cards_button(deck){

  if(deck.get_length()>=1){
    var endgame = false;
    const tds = document.querySelectorAll('td');
    const cards = deck.deal(3);
  
    for(let i =0;i<3;i++){
      var j=0;
      var randomindex = Math.floor(Math.random() * 12) ;
        tds[randomindex].removeChild(tds[randomindex].childNodes[0]); 
        let card = document.createElement("div");
        card.className = 'card '+ cards[j].shape +' '+ cards[j].color +' '+cards[j].number+' '+cards[j].shading;
        card.id = 'unselected';
        tds[randomindex].appendChild(card);
        j++;
    }
    let div = document.getElementById('no_remaining_cards');
    div.style.display = 'block';
    div.innerHTML = 'Number of remaining Cards in the Deck is : '+deck.get_length();
  }
  else{
    endgame = true;
    let div = document.getElementById('no_remaining_cards');
    div.style.display = 'block';
    div.innerHTML ='There is No Remaining Cards in the Deck';
    displaywinner();
  } 
  }

export function rendernoplayers(noplayersdiv,i){

  var input = document.createElement("INPUT");
  var label = document.createElement("LABEL");
  var br = document.createElement("br");
  input.setAttribute("type", "text");
  input.id = "Player";
  input.defaultValue = "Player"+ (i+1) ;
  label.innerHTML = "Player "+ (i+1) +" : ";
  noplayersdiv.appendChild(label);
  noplayersdiv.appendChild(input);
  noplayersdiv.appendChild(br);

}
export function render_players_buttons(players){

  let div = document.getElementById('players_buttons');

  for(let i=0;i<players.length;i++){

    var button = document.createElement('BUTTON');
    button.innerHTML = players[i].name;
    button.id = i;
    button.className = 'PlayerButton';
    div.appendChild(button);
    button.addEventListener('click',handleplayerbuttonclick);
    div.style.display = 'block';
  }
}
export function render_win_message(){

  let div = document.getElementById('message_container');
  div.style.display ='block'; 
  div.innerHTML = 'Great ! It is a SET!';

}
export function render_turns(message){

   let div = document.getElementById('message_container'); 
   div.style.display ='block';    
   div.innerHTML = message ;

 }

export function render_lose_message(){

  let div = document.getElementById('message_container');
  div.style.display ='block'; 
  div.innerHTML = 'Sorry ! it is not a SET';

}
export function renderwinner(msg){

   let div = document.getElementById('winner');    
   div.style.display ='block'; 
   div.innerHTML = msg ;
}
export function renderScoreTable(players){

  let div = document.getElementById('score');    
  var listView=document.createElement('ol');
   div.style.display ='block'; 
   div.appendChild(listView);
   for(let i=0;i<players.length;i++){
    var listViewItem=document.createElement('ul');
    listViewItem.innerHTML = players[i].name +" With Score : "+players[i].score;
    listView.appendChild(listViewItem);
   }
}
export function render_no_selectedcards(){

  let div = document.getElementById('message_container');
  div.style.display ='block'; 
  div.innerHTML = 'No Cards have been selected';
}
export function render_message(msg){

  let div = document.getElementById('message_container');
  div.style.display ='block'; 
  div.innerHTML = msg;

}
export function renderBacktoSettingsButton(){
  let div = document.getElementById('players_buttons');

  var button = document.createElement("button");
  button.innerHTML = "Back to Settings";
  var br = document.createElement("br");

  div.appendChild(br);
  div.appendChild(button);
  button.addEventListener('click',handleBacktoSettingsClick);
}
export function renderplayerscore(m){
  let div = document.getElementById('players scores');
  div.style.display ='block'; 
  div.innerHTML = m;
}
export function renderShowSet(x,y,z){
  let div = document.getElementById('show_set_div');
  div.style.display ='block'; 
  div.innerHTML = 'There is a SET  Cells '+(x+1)+' , '+(y+1)+' , '+(z+1);
}
export function renderIsSet(){
  let div = document.getElementById('is_set_div');
  div.style.display ='block'; 
  div.innerHTML = 'Yes ! There is a SET in the current Table';
}