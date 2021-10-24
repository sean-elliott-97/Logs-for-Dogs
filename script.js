//website currently only displays content on refresh

//var randomDog = "https://dog.ceo/api/breeds/image/random";
var dogBreedURL = "https://dog.ceo/api/breed/";
//var randomDogBreedURL = "https://dog.ceo/api/breed/";


//doberman is in dog api as 'doberman' but in dictionary api as 'dobermann'; if you want to see dobermans, you must type 'doberman' in the search box
//breeds that can be searched 
var acceptableSearch = [
  "beagle",
  "borzoi",
  "bouvier",
  "chihuahua",
  "coonhound",
  "corgi",
  "dachshund",
  "dalmatian",
  "deerhound",
  "doberman",
  "elkhound",
  "greyhound",
  "keeshond",
  "komondor",
  "labradoodle",
  "labrador",
  "leonberg",
  "malamute",
  "mastiff",
  "newfoundland",
  "papillon",
  "pekinese",
  "pitbull",
  "pomeranian",
  "poodle",
  "pug",
  "redbone",
  "rottweiler",
  "saluki",
  "schipperke",
  "schnauzer",
  "setter",
  "sheepdog",
  "weimaraner",
  "whippet",
  "wolfhound",
];
window.onload = function () {
  var existingWords = JSON.parse(localStorage.getItem("allWords"));
  if (existingWords == null) existingWords = [];
  var existingDogs = JSON.parse(localStorage.getItem("allDogs"));
  if (existingDogs == null) existingDogs = [];
  for (var i = 0; i < existingWords.length; i++) {
    var wordFQuiz = existingWords[i].word;
    var dForQuiz = existingWords[i].definition;
    var dogPic = existingDogs[i].dog;
    var wAndDogCard =
      "<div class='card'>" +
      "<br>" +
      "<h1>" +
      wordFQuiz +
      " </h1>" +
      "<br>" +
      "<img src ='" +
      dogPic +
      "'/>" +
      "<h4>" +
      dForQuiz +
      "</h4>" +
      "<br>" +
      "</div>";

    $(".cardsList").append(wAndDogCard);
  }
};

//function for displaying words and their definitions; stores words and defs in local storage to get displayed
$("#search").click(function () {
  var cWord = $("#word").val();
  if(!acceptableSearch.includes(cWord)){
  $("#word").val("");
  cWord=$("#word").val();
  $("#errorMessage").css("visibility","visible");
  }
  //$("#errorMessage").css("visibility","hidden");
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
    }
  );

  $.get(dogBreedURL + cWord + "/images", function (data) {
    console.log(data.message[0]);

    var existingDogs = JSON.parse(localStorage.getItem("allDogs"));
    if (existingDogs == null) existingDogs = [];
    var currentDog = data.message[0];
    var dogList = {
      dog: currentDog
    };
    localStorage.setItem("enteredDog", JSON.stringify(dogList));
    existingDogs.push(dogList);
    localStorage.setItem("allDogs", JSON.stringify(existingDogs));

    location.reload();
  });
});
