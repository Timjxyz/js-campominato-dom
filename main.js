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
        this.removeEventListener('click', handleCellClick);
        
        const cell=parseInt( this.innerText);
        
        if(bombe.includes(cell)){
            terminaGioco(tentativi, 'Hai perso!! Sei riuscito a sminare ' + tentativi.length + ' celle');
            
            
        }else{
            this.classList.add('clicked');
            tentativi.push(cell);
     
        }

        if(tentativi.length>= (numeroCelle - NUMERO_BOMBE)){
            terminaGioco(tentativi,'Hai vinto!!')
        }
        
    }

    function terminaGioco(arrayDiTentativi , messaggio){
        const quadrati= document.getElementsByClassName('quadrato');
        for(let i = 0; i<quadrati.length; i++){
            if(bombe.includes(parseInt(quadrati[i].innerText))){
                quadrati[i].classList.add('bomb');
               
               
            }
            //rimuovo l'ascoltatore di eventi sui quadrati
            quadrati[i].removeEventListener('click',handleCellClick);
        }
        //stampo i tentativi
        alert(messaggio);
        
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
