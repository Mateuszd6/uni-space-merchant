// This contains some common variable names (session/local storage).

const highscoresLocalVar : string = "var_highscoresJSON";
const gameHasEndedLocalVar : string = "var_gameHasEndedSafetly";
const scoreReachedLocalVar : string = "var_scoreReached";
const highscoreLocalVar : string = "var_highscoreReached";

const playerNameSessionVar : string = "var_playerName";
const gameStartedSessionVar : string = "var_gameStarted";

const backToMenuOnRefresh : boolean = false;

const planetsArtPath : string = "./art/planets/";
const shipsArtPath : string = "./art/ships/";
const mineralsArtPath : string = "./art/minerals/";
const miscArtPath : string = "./art/misc/";

const serverAddress : string = "http://127.0.0.1:8080/";

export {
    highscoresLocalVar, gameHasEndedLocalVar, scoreReachedLocalVar, highscoreLocalVar,
    playerNameSessionVar, gameStartedSessionVar, backToMenuOnRefresh,
    planetsArtPath, shipsArtPath, mineralsArtPath, miscArtPath, serverAddress
};
