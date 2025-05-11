const Plays = ["Rock", "Paper", "Scissor"];
const Modes = ["1. Infinity Mode", "2. Infinity Mode with score", "3. 10 Rounds without score", "4. 10 rounds with score", "5. Personalized mode"];
const Counters = {
  Rock: "Paper",
  Paper: "Scissor",
  Scissor: "Rock"
};

let Winner;
let Total = 4;
let current = 0;
let UserScore = 0;
let GameScore = 0;
let NRound = 0;

function Finish() {
  console.log("Game Finished");
}

function SelectMode() {
let Mode = prompt(`Escolha um modo, entre "${Modes}", type E to exit te game`);

if (Mode === "1") {
  InfinityMode(false, 1000000000000, false, 0)
} else if (Mode === "2") {
  InfinityMode(true, 1000000000000, false, 0)
} else if (Mode === "3") {
  InfinityMode(false, 1, false, 0)
} else if (Mode === "4") {
  InfinityMode(true, 1, false, 0)
} else if (Mode === "5") {
  Nums = Number(prompt("Quantos rounds vc quer?, type -1 for inf"));
  if (Nums === -1) {
    Nums = 1000000000000;
  }

  Scr = prompt("Quer score? (s/n)?");
  if (Scr.toLowerCase() === "s") {
    mds = prompt("deseja encerrar o jogo quando tiver pontuação específica? (s/n)");
    if (mds.toLowerCase() === "s") {
      TotP = Number(prompt("Qual é a pontuaçáo?"));
      InfinityMode(true, Nums, true, TotP)
    } else {
      InfinityMode(true, Nums, false, 0)
    } 
  } else {
    InfinityMode(false, Nums, false, 0)
  }
} else if(Mode === "E") {
  Finish()
} else {
  alert("Invalid Choice");
  SelectMode()
  return;
}
}


function InfinityMode(Score, HowR, Spef, QSpef) {
  
  let UserChoice = prompt(`Sua jogada, entre ${Plays}, type R to return back`);
  let GameChoice = Plays[Math.floor(Math.random() * 3)];
  
  if (UserChoice === Counters[GameChoice]) {
    Winner = "You Win";
    UserScore++;
  } else if (UserChoice === GameChoice) {
    Winner = "Tie";
    UserScore++;
    GameScore++;
  } else if(UserChoice.toUpperCase() === "R") {
    UserScore = 0;
    GameScore = 0;
    NRound = 0;
    SelectMode()
  } else {
    Winner = "Game win";
    GameScore++;
  }
  
  let Messages = ["The game is thinking...", `Game Choice: ${GameChoice}`, `Your choice: ${UserChoice}`, `${Winner}`];
  
  if (Score) {
    if (Score < 6) {
    Total = 6;
    }
    Messages.push(`Your Score: ${UserScore}`);
    Messages.push(`Game Score: ${GameScore}`);
  }
  
  let X = setInterval(() => {
    console.log(Messages[current]);
    current++;
    if (current === Total) {
      NRound++;
      current = 0;
      clearInterval(X);
      if (NRound === HowR) {
      Finish()
      return;
    }
    if (Spef === true && UserScore === QSpef || GameScore === QSpef) {
      Finish()
      return;
    }
      let Y = setInterval(() => {
        Choice = prompt("Another Round? 1.Yes 2.No")
        if (Choice !== undefined) {
          clearInterval(Y);
        }
      if (Choice === "1") {
        InfinityMode(Score, HowR, Spef, QSpef)
      } else if (Choice === "2") {
        SelectMode()
      }
      }, 1500);
    }
  }, 1250);
}

SelectMode()