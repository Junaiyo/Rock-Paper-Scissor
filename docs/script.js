const Plays = ["Rock", "Paper", "Scissor"]

function setcounter() {
  let ct;
  ct = {
   Rock: "Paper",
   Paper: "Scissor",
   Scissor: "Rock"
 };
if (reversed) {
 ct = {
  Rock: "Scissor",
  Paper: "Rock",
  Scissor: "Paper"
   };
 }
 return ct;
}

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
let Predict2;
let GameChoice;
let GameChoice2;
let OverTime = false;
let seconds = 1250;
let Answer;
let Answer2;
const button = document.getElementById("EnvEntrance");
let reversed;
let reversedi;

if (Maximum >= 10000 && Maximum != Infinity) {
    Maximum = Math.floor(Math.random() * 5000);
    alert(`Max rounds excessed, the rounds now is ${Maximum}`)
  }

const css = document.querySelector("link");
const title = document.querySelector("h1");
const provocation = document.querySelector("option");
if (isHard) {
  Score = "true";
  Maximum = 25;
  css.href="./hardmode.css";
  title.innerText = "HARD MODE";
  provocation.innerText = "Just Try"
}

let Played = false;
let TimeToPlay = document.createElement("h2");
let SecondHand = document.createElement("select");
SecondHand.id = "Bolsonaro2"
SecondHand.innerHTML = `
<option selected disabled>Are you sure?</option>
<option value="Rock">Rock</option>
<option value="Paper">Paper</option>
<option value="Scissor">Scissor</option>
`
let current;

function appendAgain() {
  Time_();
  if (CMax < 30) {
  current=11;
  } else if (CMax < 35) {
    current=7;
  } else {
    current = 5;
  }
}

function Overtime() {
  OverTime = true;
  document.querySelectorAll("body > p").forEach(p => p.remove());
  Score = "true"
  Maximum+=15;
  seconds = 500;
  css.href="./extreme.css";
  title.innerText = "EXTREME";
  provocation.innerText = "Good Luck"
  document.body.appendChild(SecondHand);
  document.body.appendChild(TimeToPlay);
  appendAgain();
}

function Time_() {
  let Stop = setInterval(() => {
    TimeToPlay.innerText= `TIME TO PLAY: ${current-1}`;
    current-=1;
    if (Played) {
      Played = false;
      clearInterval(Stop);
    }
    if (current<=0) {
      clearInterval(Stop);
      userStreak = 0;
      let Msgs2 = retuMsgs(1, true);
      let RandomEffectMeasages2 = retuMsgs(2, true);
      Display(Msgs2, RandomEffectMeasages2);
    }
  }, 1000);
}

function wantsOverTime() {
  let entry = prompt("Do you want overtime? (Y/N)");
   if (entry.toLowerCase() === "y") {
     Overtime();
   } else {
     return true;
   }
}

function Display(Msgs, RandomEffectMeasages2) {
  Sscore(Msgs, RandomEffectMeasages2);
  let idd = 0;
  let interval = setInterval(() => {
    idd+=1;
    Current = Msgs[CurrentMsg];
    let p = document.createElement("p");
    p.id = `${idd}`;
    p.innerHTML = Current;
    document.body.appendChild(p);
    if (TotalMsgs === 7 && idd === 5 && !OverTime) {
      let mmsg = document.getElementById(`5`);
      Rainbow(mmsg);
    }
    if (idd === 7 && OverTime && TotalMsgs === 9) {
      let mmsg = document.getElementById("7");
      Rainbow(mmsg);
    }
    CurrentMsg+=1;
    if (CurrentMsg === TotalMsgs) {
    clearInterval(interval);
    CurrentMsg = 0;
    CMax++;
    if (OverTime) {
        appendAgain();
      }
    if (CMax === Maximum) {
      if (OverTime) {Played = true}
      if (isHard || OverTime) {
        let recused1;
        if (GameScore > YourScore) {
          if (!OverTime) {
            recused1 = wantsOverTime();
          }
          if(recused1 || (OverTime && CMax === Maximum)) {
            document.querySelectorAll("body > div > button").forEach(b => b.remove());
        let Surprise = document.createElement("h2");
        let SurpriseTwo = document.createElement("h2");
        Surprise.innerHTML = "GAME: EZ";
        SurpriseTwo.innerHTML = "FINAL WINNER: GAME";
        document.body.appendChild(SurpriseTwo);
        document.body.appendChild(Surprise);
        Rainbow(SurpriseTwo);
        Rainbow(Surprise);
          }
        } else if (GameScore < YourScore) {
          document.querySelectorAll("body > div > button").forEach(b => b.remove());
          let NotThatBoring = document.createElement("h2");
          NotThatBoring.innerHTML = "FINAL WINNER: USER";
          document.body.appendChild(NotThatBoring);
        Rainbow(NotThatBoring);
        } else {
          if (!OverTime) {
            recused1 = wantsOverTime();
          }
          if (recused1 || OverTime && CMax === Maximum) {
            document.querySelectorAll("body > div > button").forEach(b => b.remove());
          let Borring = document.createElement("h2");
          Borring.innerHTML = "FINAL WINNER: TIE";
          document.body.appendChild(Borring);
          Rainbow(Borring);
          }
        }
      }
      localStorage.clear();
    }
  }
  }, seconds);
  document.querySelectorAll("body > p").forEach(p => p.remove());
}
  
  function Sscore(Msgs, RandomEffectMeasages) {
  if (Score === "true") {
    if (Winner === "You Win") {
      TotalMsgs=6;
      if(OverTime) {TotalMsgs=8};
      YourScore+=1;
    } else if (Winner === "Game Win" || current <= 0) {
      GameScore+=1;
      if (isHard || OverTime) {
        TotalMsgs=7;
        if(OverTime) {TotalMsgs=9};
        let Finished = false;
        let RandomIndex;
        if (YourScore < GameScore) {
          RandomIndex = Math.floor(Math.random() * (RandomEffectMeasages.machineWinning).length);
          Msgs.push(`GAME: ${RandomEffectMeasages.machineWinning[RandomIndex]}`);
        } else if (YourScore === GameScore) {
          RandomIndex = Math.floor(Math.random() * (RandomEffectMeasages.machineTie).length);
          Msgs.push(`GAME: ${RandomEffectMeasages.machineTie[RandomIndex]}`);
        } else {
          RandomIndex = Math.floor(Math.random() * (RandomEffectMeasages.machineLossing).length);
          Msgs.push(`GAME: ${RandomEffectMeasages.machineLossing[RandomIndex]}`);
        }
      }
    } else {
      TotalMsgs=6;
      if(OverTime) {TotalMsgs=8};
      YourScore += 1;
      GameScore += 1;
    }
    Msgs.push(`Your Score: ${YourScore}`);
    Msgs.push(`Game Score: ${GameScore}`);
  }
  }
  
  function retuMsgs(param, losed) {
    let Msgs;
    if (param === 1) {
      Msgs = ["The game is thinking", `Game Choice: ${GameChoice}`, `Your Choice: ${Answer}`, `${Winner}`];
      if (OverTime) {
        Msgs = ["The game is thinking", `Game Choice 1: ${GameChoice}`, `Game Choice 2: ${GameChoice2}`, `Your Choice 1: ${Answer}`, `Your Choice 2: ${Answer2}`, `${Winner}`];
      }
      if (losed) {
        Msgs[1] = `Game Choice: You're a loser`;
       Msgs[2] = `Game Choice 2: Lol`;
       Msgs[3] = "Your Choice 1: I'm a loser";
       Msgs[4] = `Your Choice 2: I'm patetic`;
       Msgs[5] = "Game Win";
      }
      return Msgs;
    } else {
      const RandomEffectMeasages = {
      machineWinning: ["You're a loser", "You're wasting my time", "I'm better than you"],
      machineLossing: ["I'll Supass you", "My victory will be soon", "I'm coming"],
      machineTie: ["You're Weak and patetic", "Is that all of do you have?", "So boring"]
    };
    return RandomEffectMeasages;
    }
  }

if (Score === "true") {
  TotalMsgs+=2;
}

button.addEventListener("click", () => {
  Answer = document.getElementById("Bolsonaro").value;
  if (OverTime) {
  Answer2 = document.getElementById("Bolsonaro2").value;
  }
  if (Answer.length >= 8 || ((OverTime) && Answer2.length >= 8)) {
    Answer = Plays[Math.floor(Math.random() * 3)];
    Answer2 = Plays[Math.floor(Math.random() * 3)];
  }
  
  if (OverTime) {
    Played = true;
    let percents = Math.random();
    reversed = false;
    reversedi = false;
    if (percents < 0.3) {
      effects()
    }
  }
  
  function effects() {
    let selected;
    let percents = Math.random();
    if (percents < 0.4) {
      reversed = true;
      selected = "Reversed counters";
    } else {
      reversedi = true;
      selected = "Reversed inputs";
    }
    alert(`The effect \"${selected}\" is now active for this round`);
  }
  
  if (reversedi) {
    Answer = Counters[Answer];
    Answer2 = Counters[Answer2];
  }
  
  let dife = YourScore - GameScore;
  Counters = setcounter();
  // Teste de lógica 1.6
  
  //pode até haver ambiguidade aqui pelas condições desprotegidas, mas como isso só deixaria mais difícil vou deixar
  
  //era bug, virou feature
  if (!OverTime) {
    if (!isHard || CMax <=2 && userStreak<=1) {
  // Phase 0 (Very-Easy)
    GameChoice = Plays[Math.floor(Math.random() * 3)];
  } else if (CMax >= 3 && CMax <= 7 && userStreak>=2 && userStreak<=3 || dife >= 1 && dife <= 2) { 
  // Phase 1 (Easy)
    GameChoice = Counters[Predict];
  } else if (CMax >= 8 && CMax <= 12 && userStreak>=4 && userStreak<=5 || dife >= 3 && dife <= 4) { 
  // Phase 2 (Medium)
  let selected = Math.random();
  if (selected <= 0.3) {
    GameChoice = Counters[Predict];
  } else if (selected < 0.4) {
    GameChoice = Plays[Math.floor(Math.random() * 3)];
  } else if (selected < 0.9) {
    GameChoice = Counters[Answer];
  } else {
    GameChoice = Predict;
  }
  } else if (CMax >= 13 && CMax <= 17 && userStreak>=6 && userStreak<=9 || dife >= 5 && dife <= 7) {
  // Phase 3 (Hard)
  let selected = Math.random();
  if (selected < 0.9) {
    GameChoice = Counters[Answer];
  } else {
    GameChoice = Plays[Math.floor(Math.random() * 3)];
  }
  } else if (CMax >= 18 && (userStreak >= 1 || dife <= 2 || dife >= 3)) {
  // Phase 4 (Very hard)
  let selected = Math.random();
  if (selected <= 0.8) {
    GameChoice = Counters[Answer];
  } else if (selected <= 0.9) {
    GameChoice = Counters[Predict];
  } else {
    GameChoice = Plays[Math.floor(Math.random() * 3)];
  }
} else {
  //Phase -1
  let percents = Math.random();
  if (percents <= 0.3) {
    GameChoice = Counters[Answer];
  } else if (percents <= 0.5) {
    GameChoice = Predict;
  } else {
    GameChoice = Plays[Math.floor(Math.random() * 3)];
   }
 }
} else {
  if (CMax < 30) {
    let percents = Math.random();
    if (percents <= 0.2) {
      GameChoice = Counters[Answer];
      GameChoice2 = Counters[Answer2];
    } else if (percents <= 0.4 && (Predict && Predict2)) {
      GameChoice = Counters[Predict];
      GameChoice2 = Counters[Predict2];
    } else {
      GameChoice = Plays[Math.floor(Math.random() * 3)];
      GameChoice2 = Plays[Math.floor(Math.random() * 3)];
    }
  } else if (CMax < 35 && userStreak >=1 && userStreak <= 3 || dife >= 2) {
    let percents = Math.random();
    if (percents <= 0.3) {
      GameChoice = Predict;
      GameChoice2 = Predict2;
    } else if (percents <= 0.4) {
      GameChoice = Counters[Predict];
      GameChoice2 = Counters[Predict2];
    } else if (percents <= 0.8) {
      GameChoice = Counters[Answer];
      GameChoice2 = Counters[Answer2];
    } else {
      GameChoice = Plays[Math.floor(Math.random() * 3)];
      GameChoice2 = Plays[Math.floor(Math.random() * 3)];
    }
  } else if (CMax >= 35) {
    let percents = Math.random();
    if (percents <= 0.6) {
      GameChoice = Counters[Answer];
      GameChoice2 = Counters[Answer2];
    } else if (percents <= 0.7) {
      GameChoice = Predict;
      GameChoice2 = Predict2;
    } else if (percents <= 0.8) {
      GameChoice = Counters[Predict];
      GameChoice2 = Counters[Predict2];
    } else {
      GameChoice = Plays[Math.floor(Math.random() * 3)];
      GameChoice2 = Plays[Math.floor(Math.random() * 3)];
    }
  }
}
if (!OverTime) {
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
} else {
  if (Answer === Counters[GameChoice] && Answer2 === Counters[GameChoice2]) {
    Winner = "You Win";
    userStreak+=1;
    Predict = Answer;
    Predict2 = Answer2;
  } else if (GameChoice === Counters[Answer] && GameChoice2 === Counters[Answer2]) {
    Winner = "Game Win";
    userStreak = 0;
  } else {
    Winner = "Tie";
  }
}
  
  let Msgs = retuMsgs(1, false);
  let RandomEffectMeasages = retuMsgs(2, false);
  Display(Msgs, RandomEffectMeasages);
});

//quem ver isso pode achar uma bagunça. Eu também acho.