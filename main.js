document.getElementById('start-play').addEventListener('click', play);

//Funzione che gestisce il gioco
function play(){

    const NUMERO_BOMBE = 16;
    console.log('Avvio del gioco');
    const gioco=document.getElementById('gioco');
    
    //Resetto il campo di gioco
    gioco.innerHTML="";

    const difficolta= document.getElementById('difficolta').value;

    let numeroCelle;
    let cellePerRiga;
    const tentativi=[];
    switch(difficolta){
        case"facile":
        default:
            numeroCelle=100; 
            break

        case"normale":
            numeroCelle=81;
            break

        case"difficile":
            numeroCelle=49;
            break
            
    }

    generaCampoGioco(numeroCelle);

    const bombe = generaBombe(NUMERO_BOMBE, numeroCelle);
    console.log('Le bombe sono presenti nelle seguenti cell  '+ bombe)
    
    function generaCampoGioco(numeroCelle){

        cellePerRiga=Math.sqrt(numeroCelle);
        
        for( let i =1 ; i<=numeroCelle; i++){
            const nodo= document.createElement('div');
            nodo.classList.add('quadrato');
            
            const dimensione = `calc(100% / ${cellePerRiga})`;
            nodo.style.width = dimensione;
            nodo.style.height = dimensione;
            
            nodo.innerText= i;
            
            nodo.addEventListener('click', handleCellClick);          
            gioco.appendChild(nodo);
        }
        return true;
    }
    function handleCellClick(){
        this.classList.add('clicked');
        this.removeEventListener('click', handleCellClick);

        const cell=parseInt( this.innerText);

        if(bombe.includes(cell)){
            terminaGioco();
            
            
            
        }else{
            tentativi.push(cell);
            console.log('al momento hai cliccato su'+ tentativi);
            document.getElementById("risultato").innerHTML = "Hai selezionato i numeri "+ tentativi;
        }
        
    }

    function terminaGioco(){

        const quadrati= document.getElementsByClassName('quadrato');
        for(let i = 0; i<quadrati.length; i++){
            if(bombe.includes(parseInt(quadrati[i].innerText))){
                quadrati[i].classList.add('bomb');
               
            }

        }
    }
    
    function generaBombe(numeroBombe, numeroCelle){
        const bombeGenerate=[];
        console.log(bombeGenerate)
        while(bombeGenerate.length < numeroBombe){
            const bomba=getRandomNumber(1, numeroCelle);

            if(!bombeGenerate.includes(bomba)){
                
                bombeGenerate.push(bomba);
            }
        }
        return bombeGenerate;
    }
    
}

function getRandomNumber(min, max){
    return Math.floor(Math.random() * (max - min +1)) + min;
}
