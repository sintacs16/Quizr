import $ from "jquery";

//Disable contextmenu
$(() => $("body").on("contextmenu", e => false));

let timer = 10;
let x = setInterval(() => {
  if (timer != 0) {
    $("#quiz-name").text(timer + " seconds left...");
    timer--;
  } else {
    $("#quiz-name").text("oooops....");
    clearInterval(x);
    alert("Times Up Champ!");
    $("#submit-button").trigger("click");
  }
}, 1000);
