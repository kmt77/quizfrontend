const userQuestions = JSON.parse(localStorage.getItem("userQuestions"));
const getUserAnswers = () => {
  const savedUserAnswers = JSON.parse(localStorage.getItem("userAnswers"));
  return savedUserAnswers;
};
import { library, icon } from "@fortawesome/fontawesome-svg-core";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faCheck);
const facheck = icon({ prefix: "fas", iconName: "check" }).html;
// const qL = userQuestions.length;
// console.log(qL);

const renderResult = () => {
  let countt = 0;
  let total = 0;
  try {
    const results = document.getElementById("user_results");
    const answers = getUserAnswers();
    total = userQuestions.reduce((acc, each) => (acc += +each.points), 0);
    userQuestions.map((result, index) => {
      const sortOptions = [...result.answers, result.correctAnswer];
      const options = sortOptions.sort(() => Math.random() - 0.5);
      const isCorrect = answers[index] === result.correctAnswer;
      const symbol = isCorrect
        ? `<span>${facheck}</span>`
        : `<span class="fa_xmark">&#x2715;</span>`;

      const questionDiv = document.createElement("div");
      questionDiv.className = "question";

      // child of question
      const questionHead = document.createElement("div");
      questionHead.className = "question_head";
      questionHead.innerHTML = `
              ${symbol}
                <p class="question_title">${result.question}
                  <span class="required_hash">*</span>
                </p>
                <p class="points">${result.points} point</p>
      `;
      questionDiv.appendChild(questionHead);

      // check here please
      // console.log(answers);
      options.forEach((answer) => {
        const questionOptions = document.createElement("div");
        questionOptions.className = "question_options";
        const input = document.createElement("input");
        input.type = "radio";
        input.disabled = true;
        input.name = `question${index + 1}`;
        input.value = result.answers;
        input.className = "radio_btn";
        const label = document.createElement("label");
        label.textContent = answer;

        // conditional rendering of bg
        const bgColor = isCorrect ? "bg_check" : "bg_xmark";
        // if user answers is correct add correct symbol
        if (answers[index] === answer) {
          if (isCorrect) {
            countt += +result.points;
          }
          questionOptions.classList.add("score_check");
          questionOptions.classList.add(bgColor);
          input.checked = true;
          const symbolElement = document.createElement("span");
          symbolElement.innerHTML = symbol;
          label.appendChild(symbolElement);
        }

        if (result.correctAnswer === answer && !isCorrect) {
          questionOptions.classList.add("score_check");
          questionOptions.classList.add("bg_check");
          const symbolElement = document.createElement("span");
          symbolElement.innerHTML = `<i class="fa-solid fa-check"></i>`;
          label.appendChild(symbolElement);
        }

        questionOptions.appendChild(input);
        questionOptions.appendChild(label);
        questionDiv.appendChild(questionOptions);
      });
      results.appendChild(questionDiv);
    });
  } catch (error) {
    console.error("Error fetching questions:", error);
  }

  const formSection = document.querySelector(".form_section");
  const scoreContainer = document.createElement("div");
  scoreContainer.className = "score_container";
  // scoreContainer.textContent = `${countt}/${total}`;
  formSection.insertAdjacentElement("afterbegin", scoreContainer);
  scoreContainer.innerHTML += `
    <h2>
    <span class="thanks">Thank You</span>
     for taking the 
     <em>Quiz</em>
     </h2>
    <p>Score: <span class="mark">${countt}</span>/<span class="total">${total}</span></p>
  `;

  console.log(`${countt}/${total}`);
};

document.addEventListener("DOMContentLoaded", renderResult);
