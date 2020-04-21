'use strict'

//control global variables (intentionally global)
let viewState = "open-view";
let score = 0;
let currentQuestion = 3;
    
//control question data (intentionally global)
const QUESTIONS = [
    {name: "question1", value: "What term best describes the component in the image?",
    img: "images/vertex.png", alt: "a single point in space", 
    a1: "vertex", a2: "point", a3: "joint", a4: "period"},
    {name: "question2", value: "Choose the word that best describes what you see in this image?",
    img: "images/edge.png", alt: "a line with two vertices on each side",
    a1: "edge", a2: "line", a3: "linear curve", a4: "curve"},
    {name: "question3", value: "One term for this is a polygon.  What type of polygon is this?",
    img: "images/triangle.png", alt: "a polygon with three sides", 
    a1: "triangle", a2: "quad", a3: "face", a4: "n-gon"},
    {name: "question4", value: "This is a polygon.  What is the best term to describe this type of polygon?",
    img: "images/quad.png", alt: "a polygon with four sides", 
    a1: "quad", a2: "triangle", a3: "n-gon", a4: "plane"},
    {name: "question5", value: "This kind of polygon should be avoided where possible.  What type of polygon is this?",
    img: "images/ngon.png", alt: "a polygon with more than four sides", 
    a1: "n-gon", a2: "triangle", a3: "plane", a4: "quad"},
];

function renderView() {
    console.log('render view ran');
    handleView(viewState);
}

//handle views
//#region //handle views
function handleView(view) {
    if(view === "open-view") {
        beginView();
    }
    else if(view === "quiz-view") {
        quizView();
    }
    else if(view === "results-view") {
        resultsView();
    }
}

function beginView() {
    console.log('code for begin view');
    document.getElementById("open-view").classList.remove("hide");
    document.getElementById("quiz-view").classList.add("hide");
    document.getElementById("results-view").classList.add("hide");
}

function quizView() {
    console.log('code for quiz view');
    document.getElementById("open-view").classList.add("hide");
    document.getElementById("quiz-view").classList.remove("hide");
    document.getElementById("results-view").classList.add("hide");
    $('.quiz-box').html(showQuestion());
}

function resultsView() {
    console.log('code for results view');
    document.getElementById("open-view").classList.add("hide");
    document.getElementById("quiz-view").classList.add("hide");
    document.getElementById("results-view").classList.remove("hide");
    resolveScore();
    resolveFeedback();
}
//#endregion

function showQuestion() {
    let str = '';
    const i = currentQuestion;
    document.getElementById("questionNumber").innerHTML = `Question: ${currentQuestion}/5`;
    console.log(i);
    str = 
        `<img src="${QUESTIONS[i].img}" alt="${QUESTIONS[i].alt}">
        <form>
            <fieldset>
                <legend class="question-text">${QUESTIONS[i].value}</legend>
                <label for="0">
                    <button type="button" class="button button-correct" id="0" value="${QUESTIONS[i].a1}" name="answer" required>${QUESTIONS[i].a1}</button>    
                </label>
                <label for="1">
                    <button type="button" class="button button-incorrect" id="1" value="${QUESTIONS[i].a2}" name="answer" required>${QUESTIONS[i].a2}</button>    
                </label>
                <label for="2">
                    <button type="button" class="button button-default" id="2" value="${QUESTIONS[i].a3}" name="answer" required>${QUESTIONS[i].a3}</button>    
                </label>
                <label for="3">
                    <button type="button" class="button button-default" id="3" value="${QUESTIONS[i].a4}" name="answer" required>${QUESTIONS[i].a4}</button>    
                </label>
                <button type="submit" class="submit">Continue</button>
            </fieldset>
        </form>`
    return str;
}

function resolveScore() {
    const element = document.getElementById("scoreText");
    element.innerHTML = `SCORE: ${score}/5`;
}

function resolveFeedback() {
    const element = document.getElementById("results-text");
    if(score >= 4) {
        element.innerHTML = "Great job.  You have a firm grasp of the basic terms in 3D Modeling.";
    }
    else {
        element.innerHTML = "Good try.  You should try attempting the quiz again to ensure that you understand the material";
    }
}

function handleQuiz() {
    viewState = "quiz-view";
    renderView();
}

$(handleQuiz);