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
            this.counter = window.setInterval(() => this.refresh(), 500);
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
let logInPopup;
let selectMapPopup;
let howToPlayPopup;
let endgamePopup;
// Starts the game.
function startGame() {
    fetch(constants.serverAddress + "gameScenerio/default")
        .then(function (response) { return response.json(); })
        .then(function (myJson) {
        // Fetch the game scenario, and start it:
        console.log("Game: " + JSON.stringify(myJson));
        let playerNameInput = document.getElementById("fname").value;
        sessionStorage.setItem(constants.playerNameSessionVar, playerNameInput);
        sessionStorage.setItem(constants.gameStartedSessionVar, "session_OK");
        sessionStorage.setItem("scenario", myJson);
        sessionStorage.setItem("scenario_name", "default");
        window.location.href = "game.html";
    });
}
;
window.onload = () => {
    let hm = new HighscoreManager(localStorage.getItem(constants.highscoresLocalVar));
    namePopup = new Popup("#popup", false, () => { });
    logInPopup = new Popup("#popup-login", false, () => { });
    selectMapPopup = new Popup("#popup-select-map", false, () => { });
    howToPlayPopup = new Popup("#popup-howtoplay", false, () => {
        document.querySelector("#upload-map-button").onclick =
            async () => {
                let name = document.getElementById('upload-file-name').value;
                let description = document.getElementById('upload-file-description').value;
                let file = document.getElementById('file-upload').files[0];
                console.log("File contents: " + file + "\nName: " + name + "\nDescrption:" + description);
                function readFileIntoMemory(file, callback) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        callback(new String(this.result));
                    };
                    reader.readAsText(file);
                }
                readFileIntoMemory(file, function (fileData) {
                    let minified = "{}";
                    // This allows us to minify the quests content of the send json.
                    try {
                        minified = JSON.stringify(JSON.parse(fileData));
                    }
                    catch (_a) {
                        // JSON file is invalid.
                        // TODO.
                    }
                    let data = {
                        "name": name,
                        "description": description,
                        "fileData": minified
                    };
                    console.log(JSON.stringify(data));
                    fetch(constants.serverAddress + "uploadScenario", {
                        method: 'POST',
                        mode: 'cors',
                        cache: 'no-cache',
                        credentials: 'same-origin',
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        redirect: 'follow',
                        referrer: 'no-referrer',
                        body: JSON.stringify(data)
                    });
                });
                // fetch('http://www.example.net', { // Your POST endpoint
                //     method: 'POST',
                //     headers: {
                //         // Content-Type may need to be completely **omitted**
                //         // or you may need something
                //         "Content-Type": "You will perhaps need to define a content-type here"
                //     },
                //     body: file // This is your file object
                // }).then(
                //     response => response.json() // if the response is a JSON object
                // ).then(
                //     success => console.log(success) // Handle the success response object
                // ).catch(
                //     error => console.log(error) // Handle the error response object
                // );
                console.log("Uploaded");
            };
    });
    endgamePopup = new Popup("#popup-highscores", false, () => {
        document.querySelector("#popup-highscores #startgame-button").onclick = () => endgamePopup.close();
    });
    document.querySelector("#menu-startnew").onclick =
        () => namePopup.display(0);
    document.querySelector("#menu-howtoplay").onclick =
        () => howToPlayPopup.display(0);
    document.querySelector("#menu-log").onclick =
        () => logInPopup.display(0);
    document.querySelector("#menu-select").onclick =
        () => selectMapPopup.display(0);
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
