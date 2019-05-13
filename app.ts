function myFunction() {
    var playerNameInput = (<HTMLInputElement>document.getElementById("fname")).value;
    sessionStorage.setItem("var_playerName", playerNameInput);
}