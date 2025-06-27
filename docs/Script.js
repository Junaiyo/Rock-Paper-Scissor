const Plays = ["Rock", "Paper", "Scissor"]
const Counters = {
  Rock: "Paper",
  Paper: "Scissor",
  Scissor: "Rock"
};

let Score = localStorage.getItem("Score");
let Winner;
let YourScore = 0;
let GameScore = 0;
let CurrentMsg = 0;
let TotalMsgs = 4;
let Maximum = Number(localStorage.getItem("Rounds"));
let CMax = 0;

if (Score === "true") {
  TotalMsgs+=2;
}

const button = document.getElementById("EnvEntrance")
button.addEventListener("click", () => {
  Answer = document.getElementById("Bolsonaro").value;
  let GameChoice = Plays[Math.floor(Math.random() * 3)];
  if (Answer === GameChoice) {
    Winner = "Tie";
  } else if (Answer === Counters[GameChoice]) {
    Winner = "You Win";
  } else {
    Winner = "Game Win";
  }
  
  let Msgs = ["The game is thinking", `Game Choice: ${GameChoice}`, `Your Choice: ${Answer}`, `${Winner}`];
  
  if (Score === "true") {
    if (Winner === "You Win") {
      YourScore+=1;
    } else if (Winner === "Game Win") {
      GameScore+=1;
    } else {
      YourScore += 1;
      GameScore += 1;
    }
    Msgs.push(`Your Score: ${YourScore}`);
    Msgs.push(`Game Score: ${GameScore}`);
  }
  
  document.querySelectorAll("body > p").forEach(p => p.remove());
  
  let interval = setInterval(() => {
    Current = Msgs[CurrentMsg];
    let p = document.createElement("p");
    p.innerHTML = Current;
    document.body.appendChild(p);
    CurrentMsg+=1;
    if (CurrentMsg === TotalMsgs) {
    clearInterval(interval);
    CurrentMsg = 0;
    CMax++;
    if (CMax === Maximum) {
      document.querySelectorAll("body > main > button").forEach(b => b.remove());
      localStorage.clear();
    }
  }
  }, 1250);
});

//Made by Junaiyo