const wrapper=document.getElementById('wrapper')
const newQ=document.getElementById('newQ')
const ansRatio=document.getElementById('ansRatio')
let qAnswered=false
let correct=0
let numbCorrect=0
let numbTotal=0

//attempted to randomize how possible answers would be printed, unable to do that due to native JS not supporting true randomness
//In short, no it is not intentional that all the answers are on the right side, that just happens when the same roll happens every time.

const catalog=[
    {Question:"What Year did Game of Thrones premiere on HBO?",Correct:"2011",Incorrect:["2010","2012"]},
    {Question:"How many baseball players take the field in a baseball game (both teams included)?",Correct:"18",Incorrect:["16","20"]},
    {Question:"How many seasons has Sidney Crosby played as the captain of the Pittsburgh Penguins?",Correct:"20",Incorrect:["21","19"]},
    {Question:"What model of car does Ferris Bueler drive?",Correct:"Ferrari California",Incorrect:["Ferrari Daytona","Ford Thunderbird"]},
    {Question:"What year Voltswagen is Herby the Lovebug?",Correct:"1963",Incorrect:["1969","1965"]},
    {Question:"What is the name of Speed Racer's Car in the original anime?",Correct:"Mach 5",Incorrect:["Mach 4","Mach 6"]},
    {Question:"Finish the quote: 'Strange things are afoot at the-'",Correct:"CircleK",Incorrect:["WaWa","7Eleven","Speedway","GetGo"]},
    {Question:"Which of these is not one of Snoopy's siblings",Correct:"JoJo",Incorrect:["Spike","Belle","Marble","Olaf","Andy"]}
]

function getRandomInt(max) {return Math.floor(Math.random() * max)}

function generateButtons(question,correctAdded,inc){
    const newButton=document.createElement('button')
    if(!correctAdded && (getRandomInt(2)==1 | inc.length==0)){
        newButton.innerHTML=question.Correct
        newButton.value="true"
        correctAdded=true
        correct=newButton}
    else{
        const incVal=inc[getRandomInt(inc.length)]
        inc.splice(inc.indexOf(incVal),1)
        newButton.innerHTML=incVal
        newButton.value="false"}
    newButton.addEventListener('click',function(){
        ansRatio.innerHTML=""
        if(qAnswered==false){
            if(newButton.value=="true"){numbCorrect+=1;newButton.style.backgroundColor="Green"}
            else{newButton.style.backgroundColor="Red";correct.style.backgroundColor="Green"}
            numbTotal+=1
            const ansR=document.createElement('p')
            ansR.innerHTML=numbCorrect+" correct out of "+numbTotal
            ansRatio.appendChild(ansR)
            qAnswered=true
        }
    })
    wrapper.appendChild(newButton)
    if(inc.length==0 && correctAdded){return}
    generateButtons(question,correctAdded,inc)
}

function renderQuestion(question){
    qAnswered=false
    wrapper.innerHTML=""
    ansRatio.innerHTML=""
    const q=document.createElement('p')
    q.innerHTML=question.Question
    wrapper.appendChild(q)
    const buttonLabel=document.createElement('button')
    const inc=[...question.Incorrect] //... allows for copying of the list without needing to do any actual operations on the list
    const correctAdded=false
    generateButtons(question,correctAdded,inc)
    const ansR=document.createElement('p')
    ansR.innerHTML=numbCorrect+" correct out of "+numbTotal
    if (numbTotal!=0){ansRatio.appendChild(ansR)}}

newQ.addEventListener('click',function(){renderQuestion(catalog[getRandomInt(catalog.length)])})