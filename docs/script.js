const Plays = ["Rock", "Paper", "Scissor"]
const Counters = {
  Rock: "Paper",
  Paper: "Scissor",
  Scissor: "Rock"
};

const Colors = ["red", "purple", "green", "blue", "black", "yellow", "aqua", "lime", "orange", "teal", "fuchsia", "maroon"];
let Max = Colors.length;

function Rainbow (Elemt) {
  let X = setInterval(() => {
    let slct = Math.floor(Math.random() * Max);
    Elemt.style.color = Colors[slct];
  }, 950)
}

let Score = localStorage.getItem("Score"); // eu sei que o certo seria transformar isso em boolean tbm, mas quando eu faço isso acontece um bug e eu não faço a miníma ideia do porq
let Winner;
let YourScore = 0;
let GameScore = 0;
let CurrentMsg = 0;
let TotalMsgs = 4;
let Maximum = Number(localStorage.getItem("Rounds"));
let isHard = Boolean(localStorage.getItem("ishard"));
let CMax = 0;
let userStreak = 0;
let Predict;
let GameChoice;

if (isHard) {
  Score = "true";
  Maximum = 25;
  const css = document.querySelector("link");
  css.href="./hardmode.css";
  const title = document.querySelector("h1");
  title.innerText = "HARD MODE";
  const provocation = document.querySelector("option");
  provocation.innerText = "Just Try"
}

if (Score === "true") {
  TotalMsgs+=2;
}

const button = document.getElementById("EnvEntrance")
button.addEventListener("click", () => {
  Answer = document.getElementById("Bolsonaro").value;
  if (Answer === "Chose a option" || Answer === "Just Try") {
    Answer = Plays[Math.floor(Math.random() * 3)];
  }
  
  let dife = YourScore - GameScore;
  // Teste de lógica 1
  if (!isHard || CMax <=2 && userStreak<=1) {
    //Phase 0 (Very-Easy)
  GameChoice = Plays[Math.floor(Math.random() * 3)];
  } else if (CMax >= 3 && CMax <= 7 && userStreak>=2 && userStreak<=3 || dife >= 1 && dife <= 2) { 
    //Phase 1 (Easy)
    GameChoice = Counters[Predict];
  } else if (CMax >= 8 && CMax <= 12 && userStreak>=4 && userStreak<=6 || dife >= 3 && dife <= 4) { 
    //Phase 2 (Medium)
      let selected = Math.random();
      if (selected <= 0.3) {
        GameChoice = Counters[Predict]
      } else if (selected < 0.4) {
        GameChoice = Plays[Math.floor(Math.random() * 3)];
      } else if (selected < 0.9) {
        GameChoice = Counters[Answer];
      } else {
        GameChoice = Predict;
      }
      
  } else if (CMax >= 13 && CMax <= 17  && userStreak>=7 && userStreak<=9 || dife >= 5 && dife <= 7) {
    //Phase 3 (Hard)
    let selected = Math.random();
    if (selected < 0.9) {
      GameChoice = Counters[Answer]
    } else {
      GameChoice = Plays[Math.floor(Math.random() * 3)];
    }
  } else if (CMax >= 18 && (userStreak >= 1 || dife <= 2 || dife >= 3)) {
    //Phase 4 (Very hard)
    let selected = Math.random();
    if (selected <= 0.7) {
      GameChoice = Counters[Answer];
    } else if (selected <= 0.9) {
      GameChoice = Counters[Predict];
    } else {
      GameChoice = Plays[Math.floor(Math.random() * 3)];
    }
  }
  
  if (Answer === GameChoice) {
    Winner = "Tie";
  } else if (Answer === Counters[GameChoice]) {
    Winner = "You Win";
    if (isHard) {
      userStreak+=1;
      Predict = Answer;
    }
  } else {
    Winner = "Game Win";
    if (isHard) {
      userStreak = 0;
    }
  }
  
  let Msgs = ["The game is thinking", `Game Choice: ${GameChoice}`, `Your Choice: ${Answer}`, `${Winner}`];
  
 const RandomEffectMeasages = {
      machineWinning: ["You're a loser", "You're wasting my time", "I'm better than you"],
      machineLossing: ["I'll Supass you", "My victory will be soon", "I'm coming"],
      machineTie: ["You're Weak and patetic", "Is that all of do you have?", "So boring"]
    }
  
  if (Score === "true") {
    if (Winner === "You Win") {
      TotalMsgs=6;
      YourScore+=1;
    } else if (Winner === "Game Win") {
      GameScore+=1;
      if (isHard) {
        TotalMsgs=7;
        let Finished = false;
        let RandomIndex = Math.floor(Math.random() * 2);
        if (YourScore < GameScore) {
          Msgs.push(`GAME: ${RandomEffectMeasages.machineWinning[RandomIndex]}`);
        } else if (YourScore === GameScore) {
          Msgs.push(`GAME: ${RandomEffectMeasages.machineTie[RandomIndex]}`);
        } else {
          Msgs.push(`GAME: ${RandomEffectMeasages.machineLossing[RandomIndex]}`);
        }
      }
    } else {
      TotalMsgs=6;
      YourScore += 1;
      GameScore += 1;
    }
    Msgs.push(`Your Score: ${YourScore}`);
    Msgs.push(`Game Score: ${GameScore}`);
  }
  
  document.querySelectorAll("body > p").forEach(p => p.remove());
  
  let idd = 0;
  
  let interval = setInterval(() => {
    idd+=1;
    Current = Msgs[CurrentMsg];
    let p = document.createElement("p");
    p.id = `${idd}`;
    p.innerHTML = Current;
    document.body.appendChild(p);
    if (TotalMsgs === 7 && idd === 5) {
      let mmsg = document.getElementById(`5`);
      Rainbow(mmsg);
    }
    CurrentMsg+=1;
    if (CurrentMsg === TotalMsgs) {
    clearInterval(interval);
    CurrentMsg = 0;
    CMax++;
    if (CMax === Maximum) {
      document.querySelectorAll("body > main > button").forEach(b => b.remove());
      if (isHard) {
        if (GameScore > YourScore) {
        let Surprise = document.createElement("h2");
        let SurpriseTwo = document.createElement("h2");
        Surprise.innerHTML = "GAME: EZ";
        SurpriseTwo.innerHTML = "FINAL WINNER: GAME";
        document.body.appendChild(SurpriseTwo);
        document.body.appendChild(Surprise);
        Rainbow(SurpriseTwo);
        Rainbow(Surprise);
        } else if (GameScore < YourScore) {
          let NotThatBoring = document.createElement("h2");
          NotThatBoring.innerHTML = "FINAL WINNER: USER";
          document.body.appendChild(NotThatBoring);
        Rainbow(NotThatBoring);
        } else {
          let Borring = document.createElement("h2");
          Borring.innerHTML = "FINAL WINNER: TIE";
          document.body.appendChild(Borring);
          Rainbow(Borring);
        }
      }
      localStorage.clear();
    }
  }
  }, 1250);
});

//quem ver isso pode achar uma bagunça. Eu também acho.