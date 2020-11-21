
import {handleCardClick,evaluate} from "./index.js";
import {render_message} from "./render.js";
export class Player{

    constructor(name) {
        this.score = 0;
        this.turn = false;
        this.name = name;
        this.table = document.querySelector('#deck');

    }
    get_name (){
        return this.name;
    }
    make_action(){
        this.turn = true;
    }
    play (index){

        const table_cards = document.querySelectorAll('#unselected');
        for(let i = 0 ;i<table_cards.length;i++){

            table_cards[i].addEventListener('click',handleCardClick);
        }
        this.turn = true;
        let playerbutton = document.getElementById(index);
        var timeleft = 10;
        playerbutton.disabled = true;
        var downloadTimer = setInterval(function(){
        const table_cards = document.querySelectorAll('#unselected');
        const selectedcards = document.querySelectorAll('#selected');

        if(timeleft === 0 || selectedcards.length === 3){
            if(timeleft === 0 ){
                this.turn = false;
                clearInterval(downloadTimer);
                playerbutton.disabled = false;
                for(let i=0;i<table_cards.length;i++){
                    table_cards[i].removeEventListener('click',handleCardClick);
            }
                render_message('Time is Up!');

            }
            else{
                this.turn = false;
                clearInterval(downloadTimer);
                evaluate(index);
                playerbutton.disabled = false;
            }
        }
        document.getElementById("counter").innerText = '10 Seconds Counter : ' + (10 - timeleft);
        timeleft -= 1;

        }, 1000);
   
    }
    singleplay(){

        const table_cards = document.querySelectorAll('#unselected');
        for(let i = 0 ;i<table_cards.length;i++){

            table_cards[i].addEventListener('click',handleCardClick);
        }
        this.turn = true;
        let playerbutton = document.getElementById(0);

        function waitFor(condition, callback) {
            if(!condition()) {
                console.log('waiting');
                window.setTimeout(waitFor.bind(null, condition, callback), 100);
            } else {
                console.log('done');
                callback();
            }
        }
        waitFor(() => document.querySelectorAll('#selected').length === 3, () =>  evaluate(0))

    }
}