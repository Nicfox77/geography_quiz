document.querySelector("button").addEventListener("click", gradeQuiz);
let score = 0;
const SCORE_INCREMENT = 20;

function isFormValid(){
    let isValid = true;
    const validationFdbk = document.querySelector("#validationFdbk");
    validationFdbk.innerHTML = "";
    if (document.querySelector("#q1").value == ""){
        isValid = false;
        validationFdbk.innerHTML = "Question 1 was not answered";
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
    const q1Response = document.querySelector("#q1").value.toLocaleLowerCase();
    const q2Response = document.querySelector("#q2").value;
    const q3Response = document.querySelector("#q3").value;
    const q4Response = document.querySelector("#q4").value;
    const q5Response = document.querySelector("#q5").value;
    const q6Response = document.querySelector("#q6").value;
    const q7Response = document.querySelector("#q7").value;
    const q8Response = document.querySelector("#q8").value;
    const q9Response = document.querySelector("#q9").value;
    const q10Response = document.querySelector("#q10").value;
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
    score += SCORE_INCREMENT;
}

function wrongAnswer(index){
    document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
    document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
    document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
}