//Fylki sem heldur utanum fjölda leikja og giska í hverjum leik
var games = [];

/* Byrjar á því að spila leik. svo lengi sem notandi velur að spila annan leik,
 * þá höldumst við í while lykkjunni. Ef notandi vill ekki spila annan leik, þá
 * er strengurinn með niðurstöðum sóttur og birtur.*/
function start() {
  var spila = true;
  while (spila == true) {
    var stopp = play(); // Sér um að stoppa alveg og birta ekki fleiri glugga
    if (stopp == "stopp") { // ef að notandi ýtir á cancel á fyrsta glugga
      return;
    }
    spila = confirm("Viltu spila annan leik?");
  }
  alert(getResults());
}

/**
 * Spilar einn leik.
 */
function play() {
  var txt;
  var random = randomNumber(100); // Nær í tölu á bilinu [0,100]
  console.log(random);
  var correct = false; // Segir til um að við höfum ekki enn giskað rétt
  var gisk = 0;
  var fjoldi = games.length;
  while (correct == false) { // Á meðan við höfum ekki giskað rétt er haldið áfram
    var guess = prompt("Giskaðu á tölu milli 0 og  100", "");
    if (guess == null) { // Ef ýtt er á CANCEL þá er allt stoppað
      return "stopp";
      break
    }
    var str_to_num = parseGuess(guess); // Tekur giskið og breytir í heiltölu
    var mismunur = getResponse(str_to_num, random); // Nær í viðeigandi svar
    alert(mismunur); // Birtir viðeigandi svar
    if (mismunur == "Rétt!"){
      correct = true; // Stoppar WHILE lykkjuna
    }
    gisk = gisk + 1;
    games[fjoldi] = gisk; // Setur fjölda giska í viðeigandi sæti í games fylkinu
  }
}

/**
 * Skoðar fylkið games og skilar í streng fjöld leikja og meðalfjölda giska
 */
function getResults() {
  var skilabod;
  var medaltal = calculateAverage();
  if (games.length == 0) {
    skilabod = "Þú spilaðir engan leik";
    return skilabod;
  } else if (games.length == 1) {
    return skilabod = "Þú spilaðir " + games.length + " leik. \nMeðalfjöldi ágiskana var " + medaltal + ".";
  } else {
    return skilabod = "Þú spilaðir " + games.length + " leiki. \nMeðalfjöldi ágiskana var " + medaltal + ".";
  }
}

/**
 * Reiknar út og skilar meðal ágiskunum í öllum leikjum sem geymdir eru í
 */
function calculateAverage() {
  var summa = 0;
  for (i=0; i<games.length; i++ ){
    summa = games[i] + summa;
  }
  return Math.round((summa/games.length)*100)/100;;
}

/**
 * Tekur inn input sem streng og skilar þeirri tölu sem hægt er að ná þar úr.
 * Ef ekki er hægt að ná tölu úr input er null skilað.
 */
function parseGuess(input) {
  var str_to_num = parseInt(input);
  if (str_to_num == NaN) {
    return null;
  } else {
    return str_to_num;
  }
}

/**
 * Skilar svari sem birta á notanda sem streng
 */
function getResponse(guess, correct) {
  if (guess < 0 || guess > 100 || guess == null) {
    return 'Ekki rétt';
  }
  var mismunur = Math.abs(correct-guess);
    if (mismunur == 0) {
      return "Rétt!";
    } else if (mismunur < 5) {
      return "Mjög nálægt";
    } else if (mismunur < 10) {
      return "Nálægt";
    } else if (mismunur < 20) {
      return "Frekar langt frá";
    } else if (mismunur < 50) {
      return "Langt frá";
    } else {
      return "Mjög langt frá";
    }
}

/**
 * Skilar tölu af handahófi frá [0, n]
 */
function randomNumber(n) {
  return Math.floor(Math.random() * (n + 1));
}

// Byrjar leik
start();
