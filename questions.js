import { fetchQuestions } from "./request/api.js";
const questions_form = document.querySelector("#form_qest");
const getUserQuestions = JSON.parse(localStorage.getItem("userQuestions"));
const main_form = document.getElementById("main_form");

const userAnswers = [];

const storeUserAnswers = (userAnswers) => {
  localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
};

getUserQuestions.map((each, index) => {
  const isTypeBoolean = each.type === "boolean";

  let options;

  if (isTypeBoolean) {
    options = [each.answers, each.correctAnswer];
    // const sortOptions.sort(() => Math.random() - 0.5)
  } else {
    console.log(each);
    const sortOptions = [...each.answers, each.correctAnswer];
    options = sortOptions.sort(() => Math.random() - 0.5);
  }

  questions_form.innerHTML += `
        <div class="question">
          <div class="question_head">
            <p class="question_title">${each.question}
              <span class="required_hash">*</span>
            </p>
            <p class="points">${each.points} point</p>
          </div>
          <div class="question_options">
            <input type="radio" value="${
              options[0]
            }" name="question${index}" class="radio_btn" required>
            <label for="q1">${options[0]}</label>
          </div>
          <div class="question_options">
            <input type="radio" name="question${index}" value="${
    options[1]
  }" class="radio_btn" required>
            <label for="q2">${options[1]}</label>
          </div>

          ${
            !isTypeBoolean
              ? `
            <div class="question_options">
            <input type="radio" name="question${index}" value="${options[2]}" class="radio_btn" required>
            <label for="q3">${options[2]}</label>
          </div>
          <div class="question_options">
            <input type="radio" value="${options[3]}" name="question${index}" class="radio_btn" required>
            <label for="q4">${options[3]}</label>
          </div>
        </div>`
              : ""
          }
  `;
});

main_form.addEventListener("submit", async (e) => {
  const data = await fetchQuestions();
  e.preventDefault();
  data.forEach((question, index) => {
    const radio_btns = main_form.querySelector(
      `.radio_btn[name="question${index}"]:checked`
    );
    if (radio_btns) {
      const selectedValue = radio_btns.value;
      userAnswers.push(selectedValue);
    }
  });
  storeUserAnswers(userAnswers);
  window.location.href = "score.html";
});
