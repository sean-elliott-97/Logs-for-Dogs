// var monsterURL =
//   "https://app.pixelencounter.com/odata/basic/monsterdetails?$top=int&$orderby=string&$skip=int&$count=bool";

//website currently only displays content on refresh
var randomDog = "https://dog.ceo/api/breeds/image/random";
var dogBreedURL = "https://dog.ceo/api/breed/";
window.onload = function () {
  var existingWords = JSON.parse(localStorage.getItem("allWords"));
  if (existingWords == null) existingWords = [];
  var existingDogs = JSON.parse(localStorage.getItem("allDogs"));
  if (existingDogs == null) existingDogs = [];
  for (var i = 0; i < existingWords.length; i++) {
    var wordFQuiz = existingWords[i].word;
    var dForQuiz = existingWords[i].definition;
    var dogPic = existingDogs[i].dog;
    $(".card").append("<div>","<br>", wordFQuiz, ": ", dForQuiz, "<br>","<img src ='" + dogPic + "'/>","</div>");
  }
};

//function for displaying words and their definitions; stores words and defs in local storage to get displayed
$("#search").click(function () {
  var cWord = $("#word").val();
  // var currentWordList;
  $.get(
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + cWord,
    function (data) {
      var existingWords = JSON.parse(localStorage.getItem("allWords"));
      if (existingWords == null) existingWords = [];
      var currentWord = data[0].word;
      var currentDefinition = data[0].meanings[0].definitions[0].definition;
      var wordList = {
        word: currentWord,
        definition: currentDefinition,
      };
      localStorage.setItem("enteredWord", JSON.stringify(wordList));
      existingWords.push(wordList);
      localStorage.setItem("allWords", JSON.stringify(existingWords));
      //$(".words").append("<br>", currentWord, ": ", currentDefinition, "<br>");
    }
  );
});

//adds dog image to local storage after searching for dog breed
//var dogs = $(".dogs");
$(".addImg").click(function () {
  var dogBreed = $("#breed").val();
  $.get(dogBreedURL + dogBreed + "/images", function (data) {
    console.log(data.message[0]);
    
    var existingDogs = JSON.parse(localStorage.getItem("allDogs"));
    if (existingDogs == null) existingDogs = [];
    var currentDog = data.message[0];
    var dogList = {
      dog: currentDog,
    };
    localStorage.setItem("enteredDog",JSON.stringify(dogList));
    existingDogs.push(dogList);
    localStorage.setItem("allDogs",JSON.stringify(existingDogs));
    //$(".words").append("<img src ='" + data.message[0] + "'/>");
  });
});