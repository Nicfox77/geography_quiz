document.querySelector("button").addEventListener("click", gradeQuiz);
var score = 0;
function isFormValid(){
    let isValid = true;
    if (document.querySelector("#q1").value == ""){
        isValid = false;
        document.querySelector("#validationFdbk").innerHTML = "Question 1 was not answered";
    }
    return isValid;
}

function gradeQuiz(){
    console.log("Grading quiz…");
    document.querySelector("#validationFdbk").innerHTML = "";
    if (!isFormValid()){
        return;
    }
    score = 0;
    let q1Response = document.querySelector("#q1").value.toLocaleLowerCase();
    let q2Response = document.querySelector("#q2").value;
    let q3Response = document.querySelector("#q3").value;
    let q4Response = document.querySelector("#q4").value;
    let q5Response = document.querySelector("#q5").value;
    let q6Response = document.querySelector("#q6").value;
    let q7Response = document.querySelector("#q7").value;
    let q8Response = document.querySelector("#q8").value;
    let q9Response = document.querySelector("#q9").value;
    let q10Response = document.querySelector("#q10").value;
    console.log(q1Response);

    //grading question 1
    if (q1Response === "sacramento"){
        rightAnswer(1);
    }
    else {
        wrongAnswer(1);
    }
    document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
}

function rightAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
    document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='checkmark'>";
    score += 20;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}