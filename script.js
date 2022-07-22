const adviceCard = document.querySelector('.advice-card');
const adviceId = document.querySelector('.advice_id');
const adviceText= document.querySelector('.advice-text');
const adviceButton = document.querySelector('.advice_button');
const saveButton = document.querySelector('.save_button');
const saveIcon= document.querySelector('.save_icon');
firstAdvice();
adviceButton.addEventListener('click',getAdvice);
if(localStorage.getItem('saved')===null){
let savedlist = []
localStorage.setItem('saved',JSON.stringify(savedlist));
}

function getAdvice(){
    adviceCard.classList.add('shake_it');
    const url = 'https://api.adviceslip.com/advice';
    fetch(url).then(res=>res.json()).then(data=>{
        adviceCard.addEventListener('animationend',()=>{
        if(!JSON.parse(localStorage.getItem("saved")).includes(data.slip.id)){
            saveIcon.classList.add('unsaved');
            saveIcon.classList.remove('saved');
        }
        else {
            saveIcon.classList.add('saved');
            saveIcon.classList.remove('unsaved'); 
        }
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
function saveAdvice(){
    saveIcon.classList.toggle('saved')
    saveIcon.classList.toggle('unsaved') 
    if(saveIcon.classList.contains('saved')){
        console.log("Added to list")
    let arr=JSON.parse(localStorage.getItem('saved'))
    arr.push(Number(adviceId.innerText.split('#')[1]))
    localStorage.setItem('saved',JSON.stringify(arr))
    }
    else {
        let arr=JSON.parse(localStorage.getItem('saved'))
        arr.pop(adviceId.innerText.split('#')[1])
        localStorage.setItem('saved',JSON.stringify(arr))
        console.log('Remove from list')
    }

    
        
}
saveButton.addEventListener('click',saveAdvice)