import * as constants from './constants.js';
import { HighscoreManager } from './highscoreManager.js';
class Popup {
    constructor(id, refreshPeriodically, onOpen) {
        let popup = (document.querySelector(id));
        let closeBtn = (popup.querySelector(".close"));
        closeBtn.onclick = () => this.close();
        this.content = popup;
        this.onOpen = onOpen;
        this.refreshPeriodically = refreshPeriodically;
    }
    display(val) {
        this.val = val;
        this.onOpen(this.content, this.val);
        this.content.style.visibility = "visible";
        this.content.style.opacity = "1";
        if (this.refreshPeriodically)
            this.counter = setInterval(() => this.refresh(), 500);
    }
    refresh() {
        this.onOpen(this.content, this.val);
    }
    close() {
        this.content.style.visibility = "hidden";
        this.content.style.opacity = "0";
        if (this.refreshPeriodically)
            clearTimeout(this.counter);
    }
}
let namePopup;
let howToPlayPopup;
let endgamePopup;
// Starts the game.
function startGame() {
    let playerNameInput = document.getElementById("fname").value;
    sessionStorage.setItem(constants.playerNameSessionVar, playerNameInput);
    sessionStorage.setItem(constants.gameStartedSessionVar, "session_OK");
    window.location.href = "game.html";
}
window.onload = () => {
    let hm = new HighscoreManager(localStorage.getItem(constants.highscoresLocalVar));
    namePopup = new Popup("#popup", false, () => { });
    howToPlayPopup = new Popup("#popup-howtoplay", false, () => { });
    endgamePopup = new Popup("#popup-highscores", false, () => {
        document.querySelector("#popup-highscores #startgame-button").onclick =
            () => endgamePopup.close();
    });
    document.querySelector("#menu-startnew").onclick =
        () => namePopup.display(0);
    document.querySelector("#menu-howtoplay").onclick =
        () => howToPlayPopup.display(0);
    localStorage.setItem(constants.highscoresLocalVar, hm.getAsJson());
    console.log(localStorage.getItem(constants.highscoresLocalVar));
    let list = document.getElementById("highscore-list");
    let recordProto = list.querySelector("#highscore-record");
    list.querySelectorAll("#highscore-record")
        .forEach(x => { if (x != recordProto)
        x.remove(); });
    recordProto.hidden = false;
    hm.highscores.forEach((x) => {
        let newRecord = recordProto.cloneNode(true);
        newRecord.querySelector(".uname").textContent = x.name;
        newRecord.querySelector(".score").textContent = x.score.toString();
        list.append(newRecord);
    });
    recordProto.hidden = true;
    // If we came here after the game (use local storage to determine if we
    // did), show the summary screen to the user.
    let endedWell = localStorage.getItem(constants.gameHasEndedLocalVar);
    let score = localStorage.getItem(constants.scoreReachedLocalVar);
    let wasHighscore = localStorage.getItem(constants.highscoreLocalVar);
    localStorage.setItem(constants.gameHasEndedLocalVar, null);
    localStorage.setItem(constants.scoreReachedLocalVar, null);
    localStorage.setItem(constants.highscoreLocalVar, null);
    if (endedWell === "TRUE") {
        let scoreTxt = score;
        if (wasHighscore)
            score += " (HIGHSCORE)!";
        document.querySelector("#popup-highscores-score").textContent = score;
        endgamePopup.display(0);
    }
    // Setup the startgame button onclick:
    document.querySelector("#startgame-button").onclick =
        () => startGame();
};
