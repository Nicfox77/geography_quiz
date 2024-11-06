document.addEventListener("DOMContentLoaded", function() {

    document.querySelector("#btn-primary").addEventListener("click", gradeQuiz);
    let score = 0;
    let attempts = localStorage.getItem("totalAttempts") || 0;
    let q10SelectedAnswer = "";
    const SCORE_INCREMENT = 10; // Updated for 10 questions

    displayq4Choices(); // Ensure the choices are displayed on page load

    const q10Buttons = document.querySelectorAll("#q10Buttons button");
    q10Buttons.forEach(button => {
        button.addEventListener("click", function () {
            // Remove 'active' class from all buttons
            q10Buttons.forEach(btn => btn.classList.remove("active"));
            // Add 'active' class to the clicked button
            this.classList.add("active");
            // Update the selected answer
            q10SelectedAnswer = this.textContent;
        });
    });

    function displayq4Choices() {
        let q4Choices = ["Maine", "Rhode Island", "Maryland", "Delaware"];
        q4Choices = _.shuffle(q4Choices);
        for (let i = 0; i < q4Choices.length; i++) {
            document.querySelector("#q4Choices").innerHTML +=
                `<input type="radio" name="q4" id="q4${q4Choices[i]}" value="${q4Choices[i]}">
        <label for="q4${q4Choices[i]}">${q4Choices[i]}</label><br>`;
        }
    }

    function isFormValid() {
        let isValid = true;
        const validationFdbk = document.querySelector("#validationFdbk");
        validationFdbk.innerHTML = "";

        // Check if all questions are answered
        if (document.querySelector("#q1").value == "") {
            isValid = false;
            validationFdbk.innerHTML += "Question 1 was not answered<br>";
        }
        if (document.querySelector("#q2").value == "") {
            isValid = false;
            validationFdbk.innerHTML += "Question 2 was not answered<br>";
        }
        if (!document.querySelector("#Jefferson").checked &&
            !document.querySelector("#Roosevelt").checked &&
            !document.querySelector("#Jackson").checked &&
            !document.querySelector("#Franklin").checked) {
            isValid = false;
            validationFdbk.innerHTML += "Question 3 was not answered<br>";
        }
        if (!document.querySelector("input[name=q4]:checked")) {
            isValid = false;
            validationFdbk.innerHTML += "Question 4 was not answered<br>";
        }
        if (document.querySelector("#q5").value == "") {
            isValid = false;
            validationFdbk.innerHTML += "Question 5 was not answered<br>";
        }
        if (!document.querySelector("#California").checked &&
            !document.querySelector("#Arizona").checked &&
            !document.querySelector("#NewMexico").checked &&
            !document.querySelector("#Texas").checked &&
            !document.querySelector("#Nevada").checked) {
            isValid = false;
            validationFdbk.innerHTML += "Question 6 was not answered<br>";
        }
        if (document.querySelector("#q7").value == "") {
            isValid = false;
            validationFdbk.innerHTML += "Question 7 was not answered<br>";
        }
        if (document.querySelector("#q8").value == "") {
            isValid = false;
            validationFdbk.innerHTML += "Question 8 was not answered<br>";
        }
        if (document.querySelector("#q9").value == "") {
            isValid = false;
            validationFdbk.innerHTML += "Question 9 was not answered<br>";
        }
        if (q10SelectedAnswer === "") {
            isValid = false;
            validationFdbk.innerHTML += "Question 10 was not answered<br>";
        }
        return isValid;
    }

    function gradeQuiz() {
        console.log("Grading quiz…");
        document.querySelector("#validationFdbk").innerHTML = "";
        if (!isFormValid()) {
            return;
        }
        score = 0;
        const q1Response = document.querySelector("#q1").value.toLowerCase();
        const q2Response = document.querySelector("#q2").value;
        const q4Response = document.querySelector("input[name=q4]:checked").value;
        const q5Response = document.querySelector("#q5").value;
        const q7Response = document.querySelector("#q7").value;
        const q8Response = document.querySelector("#q8").value;
        const q9Response = document.querySelector("#q9").value.toLowerCase();
        const q10Response = document.querySelector("#q10").files[0];

        // Grading question 1
        if (q1Response === "sacramento") {
            rightAnswer(1);
        } else {
            wrongAnswer(1);
        }

        // Grading question 2
        if (q2Response === "mo") {
            rightAnswer(2);
        } else {
            wrongAnswer(2);
        }

        // Grading question 3
        if (document.querySelector("#Jefferson").checked && document.querySelector("#Roosevelt").checked &&
            !document.querySelector("#Jackson").checked && !document.querySelector("#Franklin").checked) {
            rightAnswer(3);
        } else {
            wrongAnswer(3);
        }

        // Grading question 4
        if (q4Response === "Rhode Island") {
            rightAnswer(4);
        } else {
            wrongAnswer(4);
        }

        // Grading question 5
        if (q5Response == "50") {
            rightAnswer(5);
        } else {
            wrongAnswer(5);
        }

        // Grading question 6
        let q6Responses = [];
        if (document.querySelector("#California").checked) q6Responses.push("California");
        if (document.querySelector("#Arizona").checked) q6Responses.push("Arizona");
        if (document.querySelector("#NewMexico").checked) q6Responses.push("New Mexico");
        if (document.querySelector("#Texas").checked) q6Responses.push("Texas");
        if (document.querySelector("#Nevada").checked) q6Responses.push("Nevada");

        const q6CorrectAnswers = ["California", "Arizona", "New Mexico", "Texas"];
        if (arraysEqual(q6Responses.sort(), q6CorrectAnswers.sort())) {
            rightAnswer(6);
        } else {
            wrongAnswer(6);
        }

        // Grading question 7
        if (q7Response === "1776-07-04") {
            rightAnswer(7);
        } else {
            wrongAnswer(7);
        }

        // Grading question 8
        if (q8Response === "Albany") {
            rightAnswer(8);
        } else {
            wrongAnswer(8);
        }

        // Grading question 9
        if (q9Response === "austin") {
            rightAnswer(9);
        } else {
            wrongAnswer(9);
        }

        // Grading question 10
        if (q10SelectedAnswer === "Florida") {
            rightAnswer(10);
        } else {
            wrongAnswer(10);
        }

        document.querySelector("#totalScore").innerHTML = `Total Score: ${score}`;
        document.querySelector("#totalAttempts").innerHTML = `Total Attempts: ${++attempts}`;
        localStorage.setItem("totalAttempts", attempts);

        // Congratulatory message
        if (score > 80) {
            document.querySelector("#congratsMessage").innerHTML = "Congratulations! You scored above 80!";
        } else {
            document.querySelector("#congratsMessage").innerHTML = "";
        }
    }

    function rightAnswer(index) {
        document.querySelector(`#q${index}Feedback`).innerHTML = "Correct!";
        document.querySelector(`#q${index}Feedback`).className = "bg-success text-white";
        document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/checkmark.png' alt='checkmark'>";
        score += SCORE_INCREMENT;
    }

    function wrongAnswer(index) {
        document.querySelector(`#q${index}Feedback`).innerHTML = "Incorrect!";
        document.querySelector(`#q${index}Feedback`).className = "bg-warning text-white";
        document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/xmark.png' alt='xmark'>";
    }

    function arraysEqual(arr1, arr2) {
        if (arr1.length !== arr2.length) return false;
        arr1.sort();
        arr2.sort();
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) return false;
        }
        return true;
    }

});