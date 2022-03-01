let userAns = [];
let questions = [];
let max;
let index = 0;
let actualAns = [];
function fetchdata() {
    fetch('https://opentdb.com/api.php?amount=25')
        .then(response => response.json())
        .then(data => {
            questions = data.results
            //console.log(questions)
            max = questions.length;
            displaydata(index);
        //    console.log(data);
        });
}
fetchdata();



function fetchNext() {
    index++;
    displaydata(index);
}
function fetchPrev() {
    index--;
    displaydata(index);
}
function displaydata(index) {
    if (index >= max || index < 0) { alert("Out of range"); return; }
    document.getElementById('options').innerHTML = "";
    quesDisplay(index);
    optiondisp(index);

}

function quesDisplay(index) {
    let question = questions[index].question;
    var q = document.getElementById('qes')
    q.innerHTML = question +`<span class="badge bg-info text-dark">${questions[index].difficulty}</span>` +`<span class="badge rounded-pill bg-warning text-dark">${questions[index].category}</span>`
        
}
function optiondisp(index) {
    let option =[]
    for(i=0;i<questions[index].incorrect_answers.length;i++)
        option.push(questions[index].incorrect_answers[i]);
    option.push(questions[index].correct_answer);
    //suffle the array
    option = option.sort((a, b) => 0.5 - Math.random());
    for (let i = 0; i < option.length; i++){
    let op = `<label class="options">${option[i]}<input type="radio" name="radio" onchange="saveAns()" value="${option[i]}"><span class="checkmark"></span> </label>`;
    document.getElementById('options').innerHTML += op;
    }
}

function saveAns() {
    var radios = document.getElementsByName("radio")
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            userAns[index] = radios[i].value;
            break;
        }
    }

}


const newLocal = "Reload";
function marksCalculate() {
    for (let index = 0; index < questions.length; index++)
        actualAns.push(questions[index].correct_answer);
    total = 0;
    for (let index = 0; index < userAns.length; index++) {
        total += userAns[index] == actualAns[index] ? 1 : 0;
       // console.log(total)
    }

    let tag = `<div class="card text-white bg-success mb-3" style="max-width: 18rem;">
    <div class="card-header">Score Card</div>
    <div class="card-body">
      <h5 class="card-title">Your Total Marks</h5>
      <h4 class="card-text">${total}</h4>
    </div>`
    document.getElementById('container').innerHTML = tag;
    document.getElementById("next").disabled = true;
    document.getElementById("pre").disabled = true;
    document.getElementById('submit').innerText=newLocal;
    document.getElementById('submit').addEventListener('click', ()=>location.reload())

}
