button = document.getElementById("SubmitPersonalized");
button.addEventListener("click", () => {
  localStorage.clear();
   let Rounds = document.getElementById("Nums").value;
  let IsScore = document.querySelector('input[name="OP1"]:checked')?.value;
  localStorage.setItem("Rounds", Rounds);
  localStorage.setItem("Score", IsScore);
  if (
    Number(Rounds) > 0 && IsScore === "true" || IsScore === "false"
    ) {
  window.location.href="./infinity.html";
    }
});

//Made by Junaiyo