import * as constants from './constants.js'
import {HighscoreManager} from './highscoreManager.js'

export interface IScore {
    name: string
    score: number;
}

class Popup {
    content : HTMLDivElement;
    onOpen : Function;
    counter : number;
    val : any; // This is value that can be interpreted by the fucntions passed in ctor.
    refreshPeriodically : boolean;

    constructor(id : string, refreshPeriodically : boolean, onOpen : Function) {
        let popup = <HTMLDivElement>(document.querySelector(id));
        let closeBtn = <HTMLElement>(popup.querySelector(".close"));

        closeBtn.onclick = () => this.close();
        this.content = popup;
        this.onOpen = onOpen;
        this.refreshPeriodically = refreshPeriodically;
    }

    display(val : any)
    {
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

let namePopup : Popup;
let logInPopup : Popup;
let selectMapPopup : Popup;
let howToPlayPopup : Popup;
let endgamePopup : Popup;

let curMapName = "";
let loggedUsrName = "";

function enableUploading() {
    (document.querySelector("#menu-howtoplay") as HTMLElement)
	.removeAttribute("disabled");    
    (document.querySelector("#menu-howtoplay") as HTMLElement)
	.onclick = () => howToPlayPopup.display(0);

    (document.querySelector("#menu-log") as HTMLElement)
	.textContent = "Log out";

    (document.querySelector("#menu-log") as HTMLElement).onclick =
        () => disableUploading();

    (document.querySelector("#loggedUsrName") as HTMLElement).textContent =
	"Logged as: " + loggedUsrName;
}

function disableUploading() {
    (document.querySelector("#menu-howtoplay") as HTMLElement)
	.setAttribute("disabled", "");    
    (document.querySelector("#menu-howtoplay") as HTMLButtonElement)
	.onclick = () => {};

    (document.querySelector("#menu-log") as HTMLElement)
	.textContent = "Log in";
    
    (document.querySelector("#menu-log") as HTMLElement).onclick =
        () => logInPopup.display(0);

    (document.querySelector("#loggedUsrName") as HTMLElement).textContent = "";
}

// Starts the game.
function startGame() {
    fetch(constants.serverAddress + `gameScenerio/${curMapName}`)
        .then(function(response) { return response.json(); })
        .then(function(myJson) {
            // Fetch the game scenario, and start it:
            console.log("Game: " + JSON.stringify(myJson));
            let playerNameInput = (<HTMLInputElement>document.getElementById("fname")).value;
            sessionStorage.setItem(constants.playerNameSessionVar, playerNameInput);
            sessionStorage.setItem(constants.gameStartedSessionVar, "session_OK");

            sessionStorage.setItem("scenario", myJson);
            sessionStorage.setItem("scenario_name", `${curMapName}`);
	    sessionStorage.setItem("loggedUserName", loggedUsrName);


            window.location.href = "game.html";
        });
};

function getMapsAndSetDefaultHighscores(myJson)
{
    let list = document.getElementById("available-maps-canvas");
    let recordProto = list.querySelector(".available-map-record") as HTMLElement;
    list.querySelectorAll(".available-map-record")
        .forEach(x => { if (x != recordProto) x.remove(); });
    recordProto.hidden = false;
    
    for (let i = 0; i < myJson.length; ++i) {
	let newRecord = recordProto.cloneNode(true) as HTMLElement;
	(newRecord.querySelector("#map-name") as HTMLElement)
	    .textContent = myJson[i].name;

	newRecord.onclick = () => {
            selectMapPopup.close();
	    curMapName = myJson[i].name;
	    getMapsAndSetDefaultHighscores(myJson);
        }

	(newRecord.querySelector("#map-description") as HTMLElement)
	    .textContent = myJson[i].desc;

	(newRecord.querySelector("#map-additional") as HTMLElement)
	    .textContent = myJson[i].additional;

	
	list.append(newRecord);
	if ((curMapName === "" && i == 0) || myJson[i].name === curMapName) {
	    curMapName = myJson[i].name;
	    
	    // Set the current map to the first record.
	    document.querySelector("#hs-title").textContent =
		"Map: " + myJson[i].name;

	    fetch(constants.serverAddress + `getHighscores/${myJson[i].name}`)
		.then(function(response) { return response.json(); })
		.then(function(highscoresJSON) {
		    console.log("Highscores: " + JSON.stringify(highscoresJSON));

		    let highscoreList = document.querySelector("#highscore-list") as HTMLElement;
		    let highscoreProto = document.querySelector("#highscore-record") as HTMLElement;
		    highscoreProto.hidden = false;
		    highscoreList.innerHTML = "";
		    highscoreList.append(highscoreProto);
		    for (let j = 0; j < highscoresJSON.length; ++j) {
			let newRecord = highscoreProto.cloneNode(true) as HTMLElement;
			(newRecord.querySelector(".uname") as HTMLElement).textContent = highscoresJSON[j].name;
			(newRecord.querySelector(".score") as HTMLElement).textContent =  highscoresJSON[j].score;
			newRecord.hidden = false;
			highscoreList.append(newRecord);
		    }
		    highscoreProto.hidden = true;
		});
	}
	
	console.log(myJson[i]);
    }
    recordProto.hidden = true;    
}

window.onload = () => {
    fetch(constants.serverAddress + "getmaps")
        .then(function(response) { return response.json(); })
        .then(function(myJson) {
	    getMapsAndSetDefaultHighscores(myJson);
        });
    
    let hm = new HighscoreManager(localStorage.getItem(constants.highscoresLocalVar));

    namePopup = new Popup("#popup", false, () => {});
    logInPopup = new Popup("#popup-login", false, () => {

	(document.querySelector("#login-button") as HTMLElement)
	    .onclick = () => {
		let usrNamef = document.querySelector("#login-name-input") as HTMLInputElement;
		let usrPassf = document.querySelector("#login-pass-input") as HTMLInputElement;
		let usrName = usrNamef.value;
		let usrPass = usrPassf.value;
		usrNamef.value = "";
		usrPassf.value = "";

		fetch(constants.serverAddress + "login" + "/" +
		      usrName + "/" + usrPass)
		    .then(function(response) { return response.json(); })
		    .then(function(myJson) {
			if (myJson === false) {
			    console.log("Login failure");
			}
			else {
			    loggedUsrName = usrName;
			    enableUploading();
			    console.log("Login success");
			    logInPopup.close();
			}
		    });
	    };
    });
    selectMapPopup = new Popup("#popup-select-map", false, () => {
	//
	fetch(constants.serverAddress + "getmaps")
            .then(function(response) { return response.json(); })
            .then(function(myJson) {
		getMapsAndSetDefaultHighscores(myJson);
            });
	//
    });
    howToPlayPopup = new Popup("#popup-howtoplay", false, () => {
        (document.querySelector("#upload-map-button") as HTMLElement).onclick =
            async () => {
                let name = (document.getElementById('upload-file-name') as HTMLInputElement).value;
                let description = (document.getElementById('upload-file-description') as HTMLInputElement).value;
                let file = (document.getElementById('file-upload') as HTMLInputElement).files[0];
                console.log("File contents: " + file + "\nName: " + name + "\nDescrption:" + description);

                function readFileIntoMemory (file, callback) {
                    var reader = new FileReader();
                    reader.onload = function () {
                        callback(new String(this.result as any));
                    };
                    reader.readAsText(file);
                }

                readFileIntoMemory(file, function(fileData) {
                    let minified = "{}";
                    // This allows us to minify the quests content of the send json.
                    try {
                        minified = JSON.stringify(JSON.parse(fileData));
                    }
                    catch {
			console.error("JSON is invalid.");
			return;
                    }

                    let data = {
                        "name": name,
                        "description": description,
                        "fileData": fileData
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
                    })
		    	.then(function(response) { return response.json(); })
			.then(function(myJson) {
			    if (myJson == true) {
				console.log("Uploading succeeded");
				howToPlayPopup.close();
			    }
			    else {
				console.log("Uploading failed");
			    }
			});
                });
            };
    });

    endgamePopup = new Popup(
        "#popup-highscores", false,
        () => {
            (document.querySelector("#popup-highscores #startgame-button") as HTMLElement).onclick = () => endgamePopup.close();
        });

    (document.querySelector("#menu-startnew") as HTMLElement).onclick =
        () => namePopup.display(0);

    (document.querySelector("#menu-howtoplay") as HTMLElement).onclick =
        () => howToPlayPopup.display(0);

    (document.querySelector("#menu-select") as HTMLElement).onclick =
        () => selectMapPopup.display(0);

    // Disable how to play unless user logs in.
    disableUploading();

    localStorage.setItem(constants.highscoresLocalVar, hm.getAsJson());
    console.log(localStorage.getItem(constants.highscoresLocalVar));

    // If we came here after the game (use local storage to determine if we
    // did), show the summary screen to the user.
    let endedWell = localStorage.getItem(constants.gameHasEndedLocalVar);
    let score = localStorage.getItem(constants.scoreReachedLocalVar);
    let wasHighscore = localStorage.getItem(constants.highscoreLocalVar);
    let mapName = sessionStorage.getItem("scenario_name");
    let plName = sessionStorage.getItem(constants.playerNameSessionVar);
    let loggedUserName = sessionStorage.getItem("loggedUserName");

    localStorage.setItem(constants.gameHasEndedLocalVar, null);
    localStorage.setItem(constants.scoreReachedLocalVar, null);
    localStorage.setItem(constants.highscoreLocalVar, null);
    localStorage.setItem("scenario_name", null);

    sessionStorage.setItem("loggedUserName", null);


    // The session has eneded.
    if (endedWell === "TRUE")
    {
        let scoreTxt = score;
        document.querySelector("#popup-highscores-score").textContent = score;
        endgamePopup.display(0);
	
	fetch(constants.serverAddress + `uploadHighscore/${mapName}/${plName}/${score}`)
            .then(function(response) { return response.json(); })
            .then(function(myJson) {
		console.log("Upload highscore response: " + myJson);
            });

	fetch(constants.serverAddress + "getmaps")
            .then(function(response) { return response.json(); })
            .then(function(myJson) {
		curMapName = mapName;
		getMapsAndSetDefaultHighscores(myJson);
            });

	if (loggedUserName != null)
	{
	    loggedUsrName = loggedUserName;
	    enableUploading()
	}
    }

    // Setup the startgame button onclick:
    (document.querySelector("#startgame-button") as HTMLButtonElement).onclick =
        () => startGame();
}
