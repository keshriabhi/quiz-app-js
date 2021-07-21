console.clear();
let quizResponseFromBackend = [];
function createQuizItem(obj){
    // <div class="quiz-item-wrapper">
    //             <h3>Q1. What is your name?</h3>
    //             <label class="input-wrapper">
    //                 <input class="option" type="radio" name="q1" value=""/> Option1
    //             </label>
    //             <label class="input-wrapper">
    //                 <input class="option" type="radio" name="q1" value=""/> Option2
    //             </label>
    //             <label class="input-wrapper">
    //                 <input class="option" type="radio" name="q1" value=""/> Option3
    //             </label>
    //             <label class="input-wrapper">
    //                 <input class="option" type="radio" name="q1" value=""/> Option4
    //             </label>
    // </div>
    let mainDiv = document.createElement('div');
    mainDiv.className = 'quiz-item-wrapper';

    let question = document.createElement('h3');
    question.innerHTML = 'Q'+obj.id+'. '+obj.question;
    mainDiv.appendChild(question);

    for(let i=0;i<obj.options.length;i++){
        let label = document.createElement('label');
        label.className = 'input-wrapper';

        let inputText = document.createElement('input');
        inputText.className = 'option';
        inputText.type = 'radio';
        inputText.name = 'question'+obj.id;
        inputText.value = 'option'+(i+1);
        label.appendChild(inputText);

        let text = document.createTextNode(obj.options[i]);
        label.appendChild(text);
        label.addEventListener('click',(e)=>{
            if(e.target.name !== undefined){ //event bubbling
                //console.log(inputText.name + ' ' + inputText.value);
                // let qId = inputText.name.slice(8);
                // qId = parseInt(qId);
                
                // let optionId = inputText.value.slice(6);
                // optionId = parseInt(optionId);
                // console.log(qId);
                // console.log(optionId);
                // for(let j=0;j<quizResponseFromBackend.length; j++){
                //     if(quizResponseFromBackend[j].id === qId){
                //         quizResponseFromBackend[j]['selectedAnswer']=optionId;
                //     }
                // }
                // console.log(quizResponseFromBackend);
            }
        })

        mainDiv.appendChild(label);
    }

    return mainDiv;
}
let quizForm = document.getElementById('quiz-form');

let xhttp = new XMLHttpRequest();
xhttp.open('GET','http://5d76bf96515d1a0014085cf9.mockapi.io/quiz',true);
xhttp.onreadystatechange = function() {
    if(this.readyState === 4){
        quizResponseFromBackend = JSON.parse(this.responseText);
        //console.log(quizResponseFromBackend);
        totalMarks.innerHTML = quizResponseFromBackend.length;
        for(let i=0; i<quizResponseFromBackend.length; i++){
            quizForm.insertBefore(createQuizItem(quizResponseFromBackend[i]), quizForm.lastElementChild);
        }
    }
}
xhttp.send();

let body = document.getElementById('body');
let mainElement = document.getElementById('main-element');
let resultDiv = document.getElementById('result-div');
let scoredMarks = document.getElementById('scoredMarks');
let totalMarks = document.getElementById('totalMarks');

quizForm.addEventListener('submit', function(e){
    e.preventDefault();
    var inputlements = this.querySelectorAll('input[type=radio]');
    let selectedInputElements = []; 
    for(let i=0; i<inputlements.length; i++){
        if(inputlements[i].checked){
            selectedInputElements.push(inputlements[i]);
        }
    }
    //console.log(selectedInputElements);
    for(let i=0;i<selectedInputElements.length;i++){
        let qId = selectedInputElements[i].name.slice(8);
        qId = parseInt(qId);
        
        let optionId = selectedInputElements[i].value.slice(6);
        optionId = parseInt(optionId);
        // console.log(qId);
        // console.log(optionId);
        for(let j=0;j<quizResponseFromBackend.length; j++){
            if(quizResponseFromBackend[j].id === qId){
                quizResponseFromBackend[j]['selectedAnswer']=optionId;
            }
        }
    }
    //console.log(quizResponseFromBackend);

    let marks = 0;
    for(let i=0; i<quizResponseFromBackend.length; i++){
        if(quizResponseFromBackend[i].answer === quizResponseFromBackend[i].selectedAnswer){
            marks++;
        }
    }
    //console.log('Marks ->> '+marks);
    scoredMarks.innerHTML = marks;

    resultDiv.style.display = 'flex';
    mainElement.style.display = 'none';
    body.style.height = '100vh';
}); 



