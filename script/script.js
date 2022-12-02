var gamediv=document.querySelector("#game")
var start=document.querySelector('#startbtn')
const fruits= ['🥔', '🍒', '🥑', '🌽', '🥕', '🍇', '🍉', '🍌', '🥭', '🍍']
const rows=4
const cols=5
var time=0
const shuffle=(array)=>{
    currentIndex=array.length
    while(currentIndex!==0){
        randomIndex=Math.floor(Math.random()*currentIndex)
        currentIndex--
        randomValue=array[randomIndex]
        array[randomIndex]=array[currentIndex]
        array[currentIndex]=randomValue
    }
    return array
}
const generateboard=(array,rows,cols)=>{
    gamediv.style.cssText=`display:grid;
    grid-gap:10px 10px;
    grid-template-rows:repeat(${rows},1fr);
    grid-template-columns:repeat(${cols},1fr);
    width:${cols*100+10*cols}px;height:${rows*100+10*rows}px;`
    fullcards=shuffle([...array,...array])
    var dimention=fullcards.length-1
    for(let j=0;j<rows;j++){
        for(let i=0;i<cols;i++){
            let card=document.createElement('div')
            let front=document.createElement('div')
            let back=document.createElement('div')
            front.innerHTML=fullcards[dimention--]
            card.appendChild(front)
            card.appendChild(back)
            gamediv.appendChild(card)
            setstyle(card,front,back,j,i)
        }
    }
}
const setstyle=(container,front,back,row,col)=>{
    container.style.cssText=`grid-row:${row+1}/${row+2};grid-column:${col+1}/${col+2}`
    front.setAttribute('class','frontcard')
    back.setAttribute('class','backcard')
}
const startgame=()=>{
    let timer=setInterval(() => {
        console.log(document.getElementsByClassName('toggle').length)
        if(document.getElementsByClassName('toggle').length==0){
            clearInterval(timer)
        }
        time++
        document.getElementById('timer').innerHTML=time
    }, 1000);
    document.addEventListener('click', (event) => {
        const eventTarget = event.target
        length=document.getElementsByClassName('toggle').length
        cards=document.getElementsByClassName('toggle')
        if(length!=2){
            if(eventTarget.className.includes('backcard')&&!eventTarget.className.includes('toggle')){
                eventTarget.classList.add("toggle")
                if(length==1){
                    if(cards[0].parentElement.children[0].innerHTML===cards[1].parentElement.children[0].innerHTML){
                        let timer = setTimeout(() => {
                            cards[0].parentElement.children[1].removeAttribute('class')
                            cards[0].parentElement.children[1].removeAttribute('class')
                            clearTimeout(timer)
                        }, 800);
    
                    }
                    else{
                       let timer=setTimeout(() => {
                            cards[0].parentElement.children[1].classList.remove('toggle')
                            cards[0].parentElement.children[1].classList.remove('toggle')
                            clearTimeout(timer)
                        }, 800);
                    }
                }
            }
        }
    })
}
shuffle(fruits)
generateboard(fruits,rows,cols)
start.addEventListener('click',()=>{
    startgame()
    start.style.cssText="display:none"
})