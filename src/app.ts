import * as constants from './constants.js'

export interface IScore {
    name: string
    score: number;
}

// Starts the game.
function startGame() {
    let playerNameInput = (<HTMLInputElement>document.getElementById("fname")).value;
    sessionStorage.setItem("var_playerName", playerNameInput);
    sessionStorage.setItem("var_gameStarted", "session_OK");
    window.location.href = "game.html";
}

window.onload = () => {
    let highscoresJSON = localStorage.getItem("var_highscoresJSON");
    let highscores = JSON.parse(highscoresJSON) as IScore[];
    if (highscores == null)
    {
        highscores = [
            { "name": "Bill Gates", "score": 2413 },
            { "name": "Steve Jobs", "score": 2108 },
            { "name": "Satya Nadella", "score": 2072 },
            { "name": "Biarne Stroustroup", "score": 1998 },
            { "name": "Steve Ballmer", "score": 1963 }
        ];
    }

    console.log(highscores);
    console.log(highscores.length);
    highscores.sort((x, y) => y.score - x.score);
    console.log(highscores);

    localStorage.setItem("var_highscoresJSON", JSON.stringify(highscores));
    console.log(localStorage.getItem("var_highscoresJSON"));

    let list = document.getElementById("highscore-list");
    let recordProto = list.querySelector("#highscore-record") as HTMLElement;
    list.querySelectorAll("#highscore-record")
        .forEach(x => { if (x != recordProto) x.remove(); });
    recordProto.hidden = false;
    highscores.forEach(function(x) {
        let newRecord = recordProto.cloneNode(true) as HTMLElement;
        newRecord.querySelector(".uname").textContent = x.name;
        newRecord.querySelector(".score").textContent = x.score.toString();

        list.append(newRecord);
    });
    recordProto.hidden = true;

    // If we came here after the game (use local storage to determine if we
    // did), show the summary screen to the user.
    let endedWell = localStorage.getItem("var_gameHasEndedSafetly");
    let score = localStorage.getItem("var_scoreReached");
    let wasHighscore = localStorage.getItem("var_highscoreReached");
    localStorage.setItem("var_gameHasEndedSafetly", null);
    localStorage.setItem("var_scoreReached", null);
    localStorage.setItem("var_highscoreReached", null);

    if (endedWell === "TRUE")
    {
        let scoreTxt = score;
        if (wasHighscore)
            score += " (HIGHSCORE)!";
        document.querySelector("#popup-highscores-score").textContent = score;
        window.location.href = "#popup-highscores";
    }

    // Setup the startgame button onclick:
    (document.querySelector("#startgame-button") as HTMLButtonElement).onclick =
        () => startGame();
}
