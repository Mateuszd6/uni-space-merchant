function myFunction() {
    var playerNameInput = (<HTMLInputElement>document.getElementById("fname")).value;
    sessionStorage.setItem("var_playerName", playerNameInput);
    sessionStorage.setItem("var_gameStarted", "session_OK");
}
