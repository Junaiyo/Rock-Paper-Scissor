const Selector = document.getElementById("EnvMode");
let Score = false;
let Qnt = Infinity;

function Prompts() {
  let p1 = prompt("How many rounds?");
    let p2 = prompt("Do you want score system (true or false)?");
    if (Number(p1) > 0 && p2.toUpperCase() === "TRUE" || p2.toUpperCase() === "FALSE") {
      localStorage.setItem("Rounds", p1);
    localStorage.setItem("Score", p2.toLowerCase());
    window.location.href="./infinity.html";
    } else {
      if (!Number(p1) > 0) {
      alert("Invalid number entrance, say again");
      } else {
        alert("Invalid true or false entrance, say again");
      }
      Prompts();
    }
}

Selector.addEventListener("click", () => {
  const Choice = document.getElementById("Lula").value;
  
  localStorage.clear();
  
  if (Choice === "ScoredInf") {
    Score = true;
  } else if (Choice === "10RoundNW") {
    Qnt = 10;
  } else if (Choice === "10RoundWW") {
    Qnt = 10;
    Score = true;
  } else if (Choice === "HardMode") {
    localStorage.setItem("ishard", true);
    window.location.href="./infinity.html";
    return;
  } else if (Choice === "Customized") {
    if (Math.floor(Math.random() * 2) >= 1) {
    Prompts();
    return;
    } else {
      window.location.href="./personalized.html";
      return;
    }
  }
  localStorage.setItem("Score", Score);
  localStorage.setItem("Rounds", Qnt);
  window.location.href="./infinity.html";
});
