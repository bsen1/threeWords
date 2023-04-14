
let answers = [];
answers = httpGet("answers.txt").split("\n").map((word) => word.replace("\r",""));

let validWords = [];
validWords = httpGet("validWords.txt").split("\n").map((word) => word.replace("\r",""));

let answer = [answers[Math.floor(Math.random()*answers.length)].toUpperCase(), answers[Math.floor(Math.random()*answers.length)].toUpperCase(), answers[Math.floor(Math.random()*answers.length)].toUpperCase()];
if(getParameters("a1") && getParameters("a2") && getParameters("a3")) {
    answer[0] = answers[getParameters("a1")].toUpperCase();
    answer[1] = answers[getParameters("a2")].toUpperCase();
    answer[2] = answers[getParameters("a3")].toUpperCase();
}
console.log(answer);
let shareLink = window.location.href.split("?")[0] + `?a1=${answers.indexOf(answer[0].toLowerCase())}&a2=${answers.indexOf(answer[1].toLowerCase())}&a3=${answers.indexOf(answer[2].toLowerCase())}`;
console.log(shareLink);
let answerLetters = [];
for(let i = 0; i < 3; i++)
    for(let j = 1; j < 4; j++)
        answerLetters.push(answer[i].slice(j, j+1).trim());

let startLetters = shuffle(answerLetters);
document.addEventListener("DOMContentLoaded", () => {

    let modal = document.getElementById("myModal");

    let word1 = document.querySelectorAll(".word1");
    word1[0].innerHTML = answer[0].slice(0, 1);
    word1[4].innerHTML = answer[0].slice(4, 5);

    let word2 = document.querySelectorAll(".word2");
    word2[0].innerHTML = answer[1].slice(0, 1);
    word2[4].innerHTML = answer[1].slice(4, 5);

    let word3 = document.querySelectorAll(".word3");
    word3[0].innerHTML = answer[2].slice(0, 1);
    word3[4].innerHTML = answer[2].slice(4, 5);

    document.querySelector(".letters").innerHTML += `<button class="letter selected">${startLetters[0]}</button>`;
    for(let i = 1; i < startLetters.length; i++) {
        document.querySelector(".letters").innerHTML += `<button class="letter">${startLetters[i]}</button>`;
    }

    let letters = document.querySelectorAll(".letter");
    let wordlets = document.querySelectorAll(".wordlet");

    for (let i = 0; i < letters.length; i++) {
        letters[i].onclick = () => {

            for(let j = 0; j < letters.length; j++)
                letters[j].classList.remove("selected");

            letters[i].classList.add("selected");
        }
    }


    for (let i = 0; i < wordlets.length; i++) {
        wordlets[i].onclick = () => {
            

            //If clicked on non-blank wordlet, put wordlet back into first open letter spot
            if (wordlets[i].innerHTML != "") {
                for (let j = 0; j < letters.length; j++) {
                    if(letters[j].innerHTML === "") {
                        letters[j].innerHTML = wordlets[i].innerHTML;
                        wordlets[i].innerHTML = "";
                    }
                }

            }

            else {
            let temp = document.querySelector(".selected").innerHTML;
            document.querySelector(".selected").innerHTML = wordlets[i].innerHTML;
            wordlets[i].innerHTML = temp;
            }
        }
    }


    let checks = 0;
    document.querySelector("#submit").onclick = () => {
        checks++;
        
        let allWordsValid = false;
        let w1 = "<span class='wrong'>Incorrect</span>", w2 = "<span class='wrong'>Incorrect</span>", w3 = "<span class='wrong'>Incorrect</span>";

        let word1String = "";
        for(let i = 0; i < word1.length; i++) {
            word1String += word1[i].innerHTML;
        }
        

        let word2String = "";
        for(let i = 0; i < word2.length; i++) {
            word2String += word2[i].innerHTML;
        }

        let word3String = "";
        for(let i = 0; i < word3.length; i++) {
            word3String += word3[i].innerHTML;
        }

        console.log(word1String, word2String, word3String)

        if(validWords.includes(word1String.toLowerCase()) && validWords.includes(word2String.toLowerCase()) && validWords.includes(word3String.toLowerCase()))
            allWordsValid = true;

        if (answer.includes(word1String) || anagrams(word1String) || allWordsValid) {
            w1 = "<span class='right'>Correct</span>";
            for(let j = 0; j < word1.length; j++) {
                word1[j].classList.add("correct");
                word1[j].disabled = true;
            }
        }


        else
            for(let j = 0; j < word1.length; j++)
                word1[j].classList.remove("correct");
        

        if (answer.includes(word2String) || anagrams(word2String) || allWordsValid) {
            w2 = "<span class='right'>Correct</span>";
            for(let j = 0; j < word2.length; j++) {
                word2[j].classList.add("correct");
                word2[j].disabled = true;
            }
        }

        else
            for(let j = 0; j < word2.length; j++)
                word2[j].classList.remove("correct");



        if (answer.includes(word3String) || anagrams(word3String) || allWordsValid) {
            w3 = "<span class='right'>Correct</span>";
            for(let j = 0; j < word3.length; j++) {
                word3[j].classList.add("correct");
                word3[j].disabled = true;
            }
        }

        else
            for(let j = 0; j < word3.length; j++)
                word3[j].classList.remove("correct");


        if ((w1 === "<span class='right'>Correct</span>" && w2===w1 && w3===w1) || allWordsValid) {
            if(checks <= 3)
                document.getElementById("modalInfo").innerHTML = `Word 1: ${w1}<br>Word 2: ${w2}<br>Word 3: ${w3}<br>Completed in ${checks} checks<br>Good Job! 👍`;
            else
                document.getElementById("modalInfo").innerHTML = `Word 1: ${w1}<br>Word 2: ${w2}<br>Word 3: ${w3}<br>Completed in ${checks} checks<br>You can do better. 🤷‍♂️`;
            document.getElementById("title1").classList.add("wonGame");
            document.getElementById("title1").innerHTML = `Play Again<svg class="svg-icon" viewBox="0 0 20 20"><path fill="none" d="M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z"></path></svg>`;
            document.querySelector("#submit").disabled = true;
        }
        else
            document.getElementById("modalInfo").innerHTML = `Word 1: ${w1}<br>Word 2: ${w2}<br>Word 3: ${w3}`;
        modal.style.display = "block";
        
    }

    document.querySelector(".share").onclick = () => {
        navigator.clipboard.writeText(shareLink);
        document.getElementById("modalInfo").innerHTML = "Challenge Link Copied to Clipboard ✅";
        modal.style.display = "block";
    }


 
    document.getElementById("close").onclick = () => {
        modal.style.display = "none";
    }
    
    window.onclick = (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }

      document.addEventListener("click", (event) => {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      });

      document.querySelector(".info").onclick = () => {
          document.getElementById("modalInfo").innerHTML = "Fill in the blanks using the given letters to make three words.<br><br><span class='mini'>*Use the share button to challenge your friends!<br><br>Made by Brian Sen (briansen142@gmail.com)</span>"
          modal.style.display = "block";
      }
    
});


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle...
    while (currentIndex != 0) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  function getParameters(parameterName) {
      let parameters = new URLSearchParams(window.location.search);
      return parameters.get(parameterName);
  }

  function anagrams (word) {
    let temp = word;
    word = word.split("").sort().join("");
    for(let i = 0; i < answer.length; i++) {
        let ans = answer[i].split("").sort().join("");
        if(word === ans && validWords.includes(temp.toLowerCase()))
            return true;
    }
    return false;
}

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
  }

function isValid(word) {
    return validWords.includes(word.toLowerCase());
}
