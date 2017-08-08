import $ from "jquery";

//Disable contextmenu
$(() => $("body").on("contextmenu", e => false));

let timer = 66;
let x = setInterval(() => {
  if (timer != 0) {
    let minute = Math.floor(timer / 60);
    let seconds = timer - (minute * 60);
    minute = minute < 10 ? `0${minute}` : minute;
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    $("#quiz-name").text(`${minute} Minute ${seconds} Seconds`);
    timer--;
  } else {
    $("#quiz-name").text("oooops....");
    clearInterval(x);
    alert("Times Up Champ!");
    $("#submit-button").trigger("click");
  }
}, 1000);
