import { fetchQuestions } from "./request/api.js";
const generateForm = document.getElementById("generate_form");
const topic = document.getElementById("topic");
const numberSelect = document.getElementById("number_select");
const typeSelect = document.getElementById("type_select");
const difficulty_select = document.getElementById("difficulty_select");

generateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = await fetchQuestions();

  const userInput = {
    topic: topic.value,
    number: numberSelect.value,
    type: typeSelect.value,
    difficulty: difficulty_select.value,
  };
  const filteredStr = topic.value.trim("");
  const resultantStatus = data.filter(
    (topic) => topic.category.toLowerCase() === filteredStr.toLowerCase()
  );
  console.log(resultantStatus);
  if (!filteredStr.length || !resultantStatus.length) {
    const noContent = document.createElement("p");
    noContent.className = "no_content";
    noContent.innerHTML = "No content found";
    generateForm.insertAdjacentElement("afterbegin", noContent);
    return false;
  }
  try {
    const filteredData = data.filter(
      (question) =>
        question.category.includes(userInput.topic.toLowerCase()) &&
        question.type.includes(userInput.type.toLowerCase()) &&
        question.difficulty.includes(userInput.difficulty.toLowerCase())
    );
    localStorage.setItem("userQuestions", JSON.stringify(filteredData));
    window.location.href = "questions.html";
  } catch (error) {
    console.log(error);
  }
});
