const poll = {
  question: "What is your favourite programming language?",
  options: ["0: Javascript", "1: Python", "2: Rust", "3: C++"],
  answers: new Array(4).fill(0),
  registerNewAnswer() {
    // Get answer
    const answer = Number(prompt(`${this.question}\n${this.options.join('\n')}\n(Write option number)`))
    console.log(answer)
    typeof answer === 'number' && answer < this.answers.length && this.answers[answer] ++;

    this.displayResults();
    this.displayResults('string')
  },
  displayResults(type = 'array') {
    if(type === 'array') {
      console.log(this.answers)
    } else if (type === 'string') {
      // Poll results are 13, 2, 4, 1
      console.log(`Poll results are ${this.answers.join(', ')}`)
    }
  }
  // register answer
};
// poll.registerNewAnswer()
document.querySelector('.poll').addEventListener('click', poll.registerNewAnswer.bind(poll))

poll.displayResults.call({ answers: [5, 2, 4]}, 'string');
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] }, "string");
poll.displayResults.call({ answers: [1, 5, 3, 9, 6, 1] });
// [5, 2, 4]
// [5, 2, 4]
// [1, 5, 3, 9, 6, 1]

// CC#2
(function () {
  const header = document.querySelector('h1');
  header.style.color = 'red'
  header.addEventListener("click", function () {
    header.style.color = "blue";
  });
})()
// header.addEventListener("click", function() {
//   header.style.color = 'blue'
// });