//algum dia eu termino os modos rusticos... esse código é antigo inclusive
import kotlin.random.Random
import kotlin.system.exitProcess as exit

val plays = mapOf(
  "paper" to "rock",
  "scissor" to "paper",
  "rock" to "scissor"
  //lógica: quem ganha to quem perde
)

val playables: List<String> = listOf("rock", "paper", "scissor")


val menuOptions = listOf("1. Modo infinito", "2. Modo 10 rodadas", "3. Modo infinito com pontuação", "4. Modo 10 rodadas com pontuação", "5. Modo personalizado", "6. Hard Mode", "7. RPS modes", "8. +lagarto, spock")

//eu podia só usar variáveis globais, mas usei classes pq sim
data class Scores(var userScore: Int = 0, var botScore: Int = 0, var diff: Int = 0, var pastPlay: String = "rock", var userStreak: Int = 0, var nRound: Int = 0, var nWins: Int = 0, var nDraws: Int = 0, var nLoses: Int = 0)
var scores = Scores()

fun botChoice(userChoice: String, mode: String): String {
    val choiceNum: Int = Random.nextInt(0, 3)
    scores.nRound++
  if (mode != "HardMode" || scores.diff < 2 || scores.nRound <=2) {
  val select = playables[choiceNum]
  return select
  }
  if ((scores.diff >= 2 && scores.diff <= 3) || (scores.userStreak >= 1 && scores.userStreak <= 3) || (scores.nRound >=2 && scores.nRound <= 5)) {
    val doPredict: Int = Random.nextInt(0, 4)
    if (doPredict <= 1) {
      return scores.pastPlay
    }
    return playables[choiceNum]
  } else if ((scores.diff >= 3 && scores.diff <= 5) || (scores.userStreak >= 2 && scores.userStreak <= 4) || (scores.nRound >= 5 && scores.nRound <= 8)) {
    val raN: Int = Random.nextInt(0,5)
    if (raN < 2) {
      return plays[userChoice].toString()
    } else if (raN < 3) {
      return scores.pastPlay
    } else {
      return playables[choiceNum]
    }
  } else if ((scores.diff >= 4 && scores.diff <= 7) || (scores.userStreak > 4) || (scores.nRound >= 8)) {
    val raN = Random.nextInt(0,9) 
    if (raN < 4) {
      return plays[userChoice].toString()
    } 
    else if(raN < 6) {
      return scores.pastPlay
    } else {
      return playables[choiceNum]
    }
  }
  return playables[choiceNum]
}

fun calcWinner(player: String, bot: String, isScore: Boolean) {
    print("\u001b[H\u001b[2J")
    System.out.flush()
    println("Escolha do jogo: $bot")
    println("Sua escolha: $player")
    if (player == bot) {
        println("Empate")
        scores.botScore++
        scores.userScore++
        scores.userStreak = 0
        scores.nDraws++
    } else if (plays[player] === bot) {
        println("Você ganhou")
        scores.userStreak++
        scores.userScore++
        scores.nWins++
    } else {
        println("Você perdeu")
        scores.botScore++
        scores.userStreak = 0
        scores.nLoses++
    }
    scores.diff = scores.botScore - scores.userScore
    scores.pastPlay = player
    if (isScore) {
      println("Sua pontuação: ${scores.userScore}")
      println("Bot pontuação: ${scores.botScore}")
    }
}

val menuOpt: String = ", 4 para sair, 5 para voltar ao menu principal"
val toPrint = mapOf(
  "spock" to { println("Fale sua jogada entre (Rock, Paper, Scissor, spock, lagarto$menuOpt)")}
)

fun getChoice(mode: String, isScore: Boolean) {
  System.out.flush()
  if (mode !== "spock" && mode !== "RPS") {
  println("Fale sua jogada entre (Rock, Paper, Scissor, 4 para sair, 5 Para voltar ao menu principal)")
  }
  toPrint[mode]?.invoke()
    val answer: String = readln()
    if (answer == "4") {
      println("Finalizando...")
      exit(0)
    } else if (answer == "5") {
      print("\u001b[H\u001b[2J")
      System.out.flush()
      scores.userScore = 0
      scores.botScore = 0
      scores.diff = 0
      scores.userStreak = 0
      scores.nRound = 0
      scores.nDraws = 0
      scores.nLoses = 0
      scores.nWins = 0
      println("Voltando...")
      main()
      return
    }
    val bot = botChoice(answer.lowercase(), mode)
    calcWinner(answer.lowercase(), bot, isScore)
}

fun infinityMode() {
  while (true) {
    getChoice("Infinity", false)
  }
}

fun rounds10() {
  var I: Int = 0
  while (I < 10) {
    getChoice("rounds10", false)
    I++
  }
}

fun infinityScore() {
  while (true) {
    getChoice("infinityScore", true)
  }
}

fun rounds10Score() {
  var I: Int = 0
  while (I < 10) {
    getChoice("rounds10Score", true)
    I++
  }
}

fun customMode() {
  var HaveScore: Boolean = false
  println("Quantas rodadas? (-1 para infinito")
  val answerRounds: String = readln()
  var rounds: Int = answerRounds.toInt()
  if (answerRounds == "-1") {
    rounds = 100000
  }
  println("Habilitar pontuação? (1 para sim, 2 para não)")
  val answerScore: String = readln()
  if (answerScore == "1") {
    HaveScore = true
  }
  println("$rounds rounds e score: $HaveScore")

  var I: Int = 0
  while (I < rounds) {
    getChoice("customMode", HaveScore)
    I++
  }
}

fun hardMode() {
  var rounds: Int = 20
  var I: Int = 0
  while (I < rounds) {
    getChoice("HardMode", true)
    I++
  }
  println("Número de vitórias: ${scores.nWins}")
  println("Número de derrotas: ${scores.nLoses}")
  println("Número de empates: ${scores.nDraws}")
}
val rpsChoices = listOf("1. RPS-7", "2. RPS-15", "3. RPS-25", "4. RPS-101")
fun rps() {
  for (opt in rpsChoices) {
    println(opt)
  }
}

fun spock() {
  while (true) {
    getChoice("spock", false)
  }
}

val modes = mapOf(
  1 to ::infinityMode,
  2 to ::rounds10,
  3 to ::infinityScore,
  4 to ::rounds10Score,
  5 to ::customMode,
  6 to ::hardMode,
  7 to ::rps,
  8 to ::spock
)

fun main() {
  for (option in menuOptions) {
    println(option)
  }
  println("Sua escolha: ")
  val answer: String = readln()
  val convert: Int = answer.toInt()
  modes[convert]?.invoke()
}