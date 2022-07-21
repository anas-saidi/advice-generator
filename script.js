const adviceCard = document.querySelector('.advice-card');
const adviceId = document.querySelector('.advice_id');
const adviceText= document.querySelector('.advice-text');
const adviceButton = document.querySelector('.advice_button');
firstAdvice();
adviceButton.addEventListener('click',getAdvice);
function getAdvice(){
    adviceCard.classList.add('shake_it');
    const url = 'https://api.adviceslip.com/advice';
    fetch(url).then(res=>res.json()).then(data=>{
        adviceCard.addEventListener('animationend',()=>{
        adviceId.innerText = `ADVICE #${data.slip.id}`;
        adviceText.innerText = data.slip.advice;
        adviceCard.classList.remove('shake_it');
        })
        

    }).catch(err=>{ console.log(err); });
}
function firstAdvice(){
    const url = 'https://api.adviceslip.com/advice';
    fetch(url).then(res=>res.json()).then(data=>{
        adviceId.innerText = `ADVICE #${data.slip.id}`;
        adviceText.innerText = data.slip.advice;
    }).catch(err=>{ console.log(err); });
}