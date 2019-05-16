// The .js is with some reason required and cannot be changed.
import * as constants from './constants.js'

import {initialDataJSONString, IItem, IPlanet, IShip} from './initial_data.js'
import {TimeManager, formatTime} from './timeManager.js'
import {CashManager} from './cashManager.js'
import {IScore, HighscoreManager} from './highscoreManager.js'
import {Popup} from './popup.js'

// This iface is used by the trade popup and displays all the data related to a
// single trade.
interface ITradeData {
    sell : boolean;
    mineralName: string;
    planetName : string;
    shipName : string;
    iHave : number;
    theyHave : number;
    price : number;
    inputValue : number;
}

// Used by lunch popup to select next planet.
interface ILunchData {
    planetName : string;
    shipName : string;
}

// This will finish the game, save to highscores if result qualifies and go back
// to greet screen.
function finishGame() {
    let score = cashManager.credits;
    let hm = new HighscoreManager(localStorage.getItem(constants.highscoresLocalVar));
    let wasHighscore = hm.tryAddToHighscores(playerName, score);

    // Use local storage to pass this info to the menu and change the page.
    console.log("Saving: " + hm.getAsJson());
    localStorage.setItem(constants.highscoresLocalVar, hm.getAsJson());
    localStorage.setItem(constants.highscoreLocalVar, wasHighscore ? "TRUE" : "");
    localStorage.setItem(constants.gameHasEndedLocalVar, "TRUE");
    localStorage.setItem(constants.scoreReachedLocalVar, score.toString());
    window.location.href = "index.html";
}

function calculatePlanetTravelTime(p1Name : string, p2Name : string) {
    let p1 = planets[p1Name];
    let p2 = planets[p2Name];
    let distSquare = (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
    let dist = Math.round(Math.sqrt(distSquare));

    return dist;
}

let gameInitialState = JSON.parse(initialDataJSONString);
const planets = gameInitialState.planets as IPlanet;
const ships = gameInitialState.starships as IShip;
let items: string[] = gameInitialState.items;

let tradePopup : Popup;
let planetPopup : Popup;
let flyingSpacecraftPopup : Popup;
let landedSpacecraftPopup : Popup;
let lunchPopup : Popup;

let timeManager : TimeManager;
let cashManager : CashManager;
let playerName : string;

// This is an abstraction about populating lists with records. This will take a
// fucntion taking element, newly created record and will set up its fields and
// add it to the list.
function populateList(list : HTMLElement,
                      recordSelector : string,
                      objList : object,
                      addFunc : Function) {
    let recordProto = list.querySelector(recordSelector) as HTMLElement;
    recordProto.hidden = false;

    // Remove all other records, as we don't need them.
    list.querySelectorAll(recordSelector)
        .forEach(x => { if (x != recordProto) x.remove(); });

    // Now make record for each member of the object.
    for (let key in objList) {
        addFunc(key, (recordProto.cloneNode(true) as HTMLElement), list);
    }

    // Make the proto invisible.
    recordProto.hidden = true;
}

function updateMainScrShipList() {
    for (let shipName in ships)
    {
        if (ships[shipName].moving
            && ships[shipName].destTime - new Date().getTime() < 0)
        {
            ships[shipName].moving = false;
        }
    }

    populateList(
        document.getElementById("ships-list"), ".ship-record", ships,
        (key, newRecord : HTMLElement, list : HTMLElement) => {
            let value = ships[key];
            let shipName = newRecord.querySelector("#ship-name") as HTMLElement;
            let shipPos = newRecord.querySelector("#ship-pos") as HTMLElement;
            let shipIcon = newRecord.querySelector("#ship-icon") as HTMLImageElement;
            shipName.textContent = key;
            shipIcon.src = "./art/" + key + ".png";

            if (!value.moving) {
                shipPos.classList.add("highlighted-info");
                shipPos.textContent = value.position;
                newRecord.onclick = () => landedSpacecraftPopup.display(key);
            }
            else {
                shipPos.textContent = "Moving...";
                newRecord.onclick = () => flyingSpacecraftPopup.display(key);
            }

            list.append(newRecord);
        });
}

function initPopups() {
    tradePopup = new Popup(
        "#trade-popup", false,
        function(obj : HTMLDivElement, val : any) {
            let tradeData : ITradeData = val;
            tradeData.inputValue = 0;

            console.log("Trading material " + tradeData.mineralName +
                        " for price: " + tradeData.price)

            obj.querySelector("#trade-error-msg").textContent = "";
            obj.querySelectorAll("#trade-mat-name")
                .forEach(x => x.textContent = tradeData.mineralName);
            obj.querySelectorAll("#trade-mat-price")
                .forEach(x => x.textContent = tradeData.price + "cr");
            (obj.querySelector("#trade-mat-img") as HTMLImageElement)
                .src = "./art/" + tradeData.mineralName + ".png";

            let actionTxt = obj.querySelector("#trade-action");
            if (tradeData.sell === true)
                actionTxt.textContent = "Sell";
            else
                actionTxt.textContent = "Buy";
            obj.querySelector("#trade-mat-amount-we").textContent =
                tradeData.iHave.toString();
            obj.querySelector("#trade-mat-amount-they").textContent =
                tradeData.theyHave.toString();
            obj.querySelector("#trade-mat-free-cargo").textContent =
                (ships[tradeData.shipName].cargo_hold_size -
                 ships[tradeData.shipName].cargo).toString();

            obj.querySelector("#trade-mat-input-numb").textContent =
                tradeData.inputValue.toString();

            obj.querySelector("#trade-mat-sum").textContent =
                (tradeData.inputValue * tradeData.price).toString();

            let btn = obj.querySelector("#tradebtn") as HTMLButtonElement;
            let inputFiled = obj.querySelector("#trade-mat-input") as HTMLInputElement;
            inputFiled.value = "0";
            inputFiled.oninput = function() {
                let x : string = inputFiled.value;
                if (Number.isInteger(Number(x)))
                {
                    tradeData.inputValue = Number(x);

                    // Make sure the value is clamped.
                    let clampTop = tradeData.sell ? tradeData.iHave : tradeData.theyHave;
                    if (Number(x) > clampTop)
                    {
                        tradeData.inputValue = clampTop;
                        inputFiled.value = tradeData.inputValue.toString();
                    }
                    else if (Number(x) < 0)
                    {
                        tradeData.inputValue = 0;
                        inputFiled.value = (0).toString();
                    }

                    inputFiled.style.color = "White";
                    obj.querySelector("#trade-mat-input-numb").textContent =
                        tradeData.inputValue.toString();
                    obj.querySelector("#trade-mat-sum").textContent =
                        (tradeData.inputValue * tradeData.price).toString() + "cr";

                    btn.removeAttribute("disabled");
                    btn.setAttribute("href", "javascript:void(0);");
                }
                else
                {
                    inputFiled.style.color = "Red";

                    btn.setAttribute("disabled", "");
                    btn.removeAttribute('href');
                }
            };

            if (tradeData.sell)
            {
                btn.onclick =
                    function() {
                        let input = obj.querySelector("#trade-mat-input") as HTMLInputElement;
                        if (Number.isInteger(Number(input.value)))
                        {
                            let inputNum : number = Number(input.value);
                            console.log("Submitting selling of " + inputNum +
                                        " elements of " + tradeData.mineralName);

                            planets[tradeData.planetName]
                                .available_items[tradeData.mineralName]
                                .available += tradeData.inputValue;

                            ships[tradeData.shipName]
                                .available_items[tradeData.mineralName]
                                .available -= tradeData.inputValue;

                            ships[tradeData.shipName].cargo -= tradeData.inputValue;
                            if (ships[tradeData.shipName].cargo < 0)
                                ships[tradeData.shipName].cargo = 0;

                            cashManager.give(tradeData.inputValue * tradeData.price);
                            console.log("Transiaction completed.");

                            // Refresh the landedSpacecraftpopup state and close this one.
                            landedSpacecraftPopup.refresh();
                            tradePopup.close();
                        }
                    }
            }
            else {
                btn.onclick =
                    function() {
                        let input = obj.querySelector("#trade-mat-input") as HTMLInputElement;
                        if (Number.isInteger(Number(input.value)))
                        {
                            let inputNum : number = Number(input.value);
                            console.log("Submitting trading of: " + inputNum +
                                        " elements of " + tradeData.mineralName);

                            if ((ships[tradeData.shipName].cargo_hold_size
                                 - ships[tradeData.shipName].cargo) >= tradeData.inputValue)
                            {
                                if (cashManager.tryPay(tradeData.inputValue * tradeData.price))
                                {
                                    console.log("Ship name: " + tradeData.shipName);
                                    console.log("Planet name: " + tradeData.planetName);

                                    planets[tradeData.planetName]
                                        .available_items[tradeData.mineralName]
                                        .available -= tradeData.inputValue;

                                    ships[tradeData.shipName]
                                        .available_items[tradeData.mineralName]
                                        .available += tradeData.inputValue;

                                    ships[tradeData.shipName].cargo += tradeData.inputValue;

                                    console.log("Transiaction completed.");

                                    // Refresh the landedSpacecraftpopup state and close this one.
                                    landedSpacecraftPopup.refresh();
                                    tradePopup.close();
                                }
                                else
                                {
                                    obj.querySelector("#trade-error-msg").textContent =
                                        "Not enough credits!";
                                }
                            }
                            else
                            {
                                obj.querySelector("#trade-error-msg").textContent =
                                    "Not enough cargo space!";
                            }
                        }
                    };
            }
        });

    planetPopup = new Popup(
        "#planet-details-popup", true,
        function(obj : HTMLDivElement, val : any) {
            let planetName : string = val;
            obj.querySelector("#planet-details-name").textContent = planetName;

            populateList(
                obj.querySelector("#planet-detials-ship-list"),
                "#planet-details-stationed-spaceship",
                ships,
                (key, newRecord : HTMLElement, list : HTMLElement) => {
                    if (ships[key].position !== planetName || ships[key].moving !== false) {
                        newRecord.remove();
                        return;
                    }

                    (newRecord.querySelector("#planet-details-ship-img") as HTMLImageElement)
                        .src = "./art/" + key + ".png";
                    (newRecord.querySelector("#planet-details-ship-name") as HTMLImageElement)
                        .textContent = key;
                    newRecord.onclick = () => {
                        planetPopup.close();
                        landedSpacecraftPopup.display(key);
                    }

                    list.append(newRecord);
                });

            populateList(
                obj.querySelector("#planet-detials-mineral-list"),
                "#planet-details-mineral",
                planets[planetName].available_items,
                (key, newRecord : HTMLElement, list : HTMLElement) => {
                    let item = planets[planetName].available_items[key];
                    if (item.available <= 0) {
                        newRecord.remove();
                        return;
                    }

                    (newRecord.querySelector("#planet-details-mineral-img") as HTMLImageElement)
                        .src = "./art/" + key + ".png";
                    newRecord.querySelector("#planet-details-mineral-name").textContent = key;
                    newRecord.querySelector("#planet-details-mineral-price").textContent =
                        item.buy_price.toString() + " / " + item.sell_price.toString();
                    newRecord.querySelector("#planet-details-mineral-amount").textContent =
                        item.available.toString();
                    list.append(newRecord);
                });
        });

    flyingSpacecraftPopup = new Popup(
        "#flyingspacecraft-popup", true,
        function(obj : HTMLDivElement, val : any) {
            let shipName : string = val;

            // If ship is no longer moving switch back to landed screen.
            if (!ships[shipName].moving)
            {
                flyingSpacecraftPopup.close();
                landedSpacecraftPopup.display(shipName);
                return;
            }

            obj.querySelector("#flyingspacecraft-name").textContent = shipName;
            obj.querySelector("#flyingspacecraft-dest").textContent = ships[shipName].position;
            obj.querySelector("#flyingspacecraft-load").textContent =
                ships[shipName].cargo + " / " + ships[shipName].cargo_hold_size;

            obj.querySelector("#flyingspacecraft-arrival").textContent =
                formatTime(ships[shipName].destTime - new Date().getTime());
            (obj.querySelector("#flyingspacecraft-ship") as HTMLImageElement).src =
                "./art/" + shipName + ".png";

            let planetLnk = <HTMLElement>(obj.querySelector("#flyingspacecraft-dest"));
            planetLnk.onclick = function() {
                flyingSpacecraftPopup.close();
                planetPopup.display(ships[shipName].position);
            };
        });

    landedSpacecraftPopup = new Popup(
        "#landedspacecraft-popup", false,
        function(obj : HTMLDivElement, val : any) {
            let shipName : string = <string>(val);
            console.log("Landed spacecraft popup displ. Ship name: " + shipName);

            obj.querySelector("#landedspacecraft-name").textContent = shipName;
            obj.querySelector("#landedspacecraft-dest").textContent = ships[shipName].position;
            obj.querySelector("#landedspacecraft-load").textContent =
                ships[shipName].cargo + " / " + ships[shipName].cargo_hold_size;

            // We'll use this fucntion to disable some buttons.
            let disableLink = function(elem: HTMLLinkElement) {
                // First we make the link disabled to make css handle
                // it properly, then remove the href completly so that
                // its not possible to click it.
                elem.setAttribute("disabled", "");
                elem.removeAttribute('href');
            };

            // This hack allows us to use populate fucntion which work with
            // objects instead of arrays.
            let itemNames = {};
            items.sort().forEach(x => itemNames[x] = x);

            populateList(
                obj.querySelector("#trade-list"),
                "#trade-record",
                itemNames,
                (key, newRecord : HTMLElement, list : HTMLElement) => {
                    let curPlanetName = ships[shipName].position;
                    let sellBtnLink = newRecord.querySelector("#trade-sell-btn") as HTMLLinkElement;
                    let buyBtnLink = newRecord.querySelector("#trade-buy-btn") as HTMLLinkElement;
                    let canBuy : boolean = false;
                    let canSell : boolean = false;

                    if (planets[curPlanetName].available_items[key].available > 0)
                        canBuy = true;

                    if (ships[shipName].available_items[key].available > 0)
                        canSell = true;

                    if (!canSell && !canBuy)
                    {
                        newRecord.remove();
                        return;
                    }

                    (newRecord.querySelector("#trade-img") as HTMLImageElement).src =
                        "./art/" + key + ".png";
                    newRecord.querySelector("#trade-name").textContent = key;

                    if (canSell) {
                        sellBtnLink.onclick = () => {
                            tradePopup.display({
                                "sell": true,
                                "mineralName": key,
                                "shipName": shipName,
                                "planetName": curPlanetName,
                                "iHave" : (canSell ? ships[shipName].available_items[key].available : 0),
                                "theyHave": planets[curPlanetName].available_items[key].available,
                                "price": planets[curPlanetName].available_items[key].sell_price
                            });
                        };
                    }
                    else
                        disableLink(sellBtnLink);

                    if (canBuy) {
                        buyBtnLink.onclick = () => {
                            tradePopup.display({
                                "sell": false,
                                "mineralName": key,
                                "shipName": shipName,
                                "planetName": curPlanetName,
                                "iHave" : (canSell ? ships[shipName].available_items[key].available : 0),
                                "theyHave": planets[curPlanetName].available_items[key].available,
                                "price": planets[curPlanetName].available_items[key].buy_price
                            });
                        }
                    }
                    else
                        disableLink(buyBtnLink);

                    list.append(newRecord);
                }
            );

            let planetLnk = <HTMLElement>(obj.querySelector("#landedspacecraft-dest"));
            planetLnk.onclick = function() {
                landedSpacecraftPopup.close();
                planetPopup.display(ships[shipName].position);
            };

            let leavePlanetBtn = obj.querySelector("#leaveplanet") as HTMLButtonElement;
            leavePlanetBtn.onclick =
                function() {
                    lunchPopup.display({
                        "shipName": shipName,
                        "planetName": ships[shipName].position
                    });
                };
        });

    lunchPopup = new Popup(
        "#lunch-popup", false,
        function(obj : HTMLDivElement, val : any) {
            let lunchData : ILunchData = val;
            let curPlanetName = lunchData.planetName;
            let curShipName = lunchData.shipName;

            populateList(
                obj.querySelector("#lunch-planet-list"),
                ".planet-record",
                planets,
                (key, newRecord : HTMLElement, list : HTMLElement) => {
                    if (key === curPlanetName)
                    {
                        newRecord.remove();
                        return;
                    }

                    let travelTimeMS = calculatePlanetTravelTime(curPlanetName, key) * 1000;
                    (newRecord.querySelector("#planet-icon") as HTMLImageElement)
                        .src = "./art/" + key + ".png";
                    newRecord.querySelector("#planet-name").textContent = key;
                    newRecord.querySelector("#planet-coord").textContent = formatTime(travelTimeMS);

                    (newRecord.querySelector("#lunch-btn") as HTMLElement).onclick =
                        function() {
                            console.log(curShipName + " starts a travel to: " + key);
                            ships[curShipName].moving = true;
                            ships[curShipName].position = key;
                            ships[curShipName].destTime = new Date().getTime() + travelTimeMS;

                            // Update main screen hide old popups and display one
                            // for flying spaceship.
                            updateMainScrShipList();
                            lunchPopup.close();
                            landedSpacecraftPopup.close();
                            flyingSpacecraftPopup.display(curShipName);
                        };

                    list.append(newRecord);
                });
        });
}

function initPlanetsList() {
    // Make sure every ship and every planet has all available items.
    for (let planetName in planets) {
        items.forEach(function(x) {
            if (planets[planetName].available_items == null)
                planets[planetName].available_items = { };

            if (planets[planetName].available_items[x] == null) {
                planets[planetName].available_items[x] = {
                    "available": 0,
                    "buy_price": 0,
                    "sell_price": 0
                };
            }
        });
    }
}

function initShipsList() {
    for (let shipName in ships) {
        ships[shipName].moving = false;
        ships[shipName].destTime = new Date().getTime() + 10000;
        ships[shipName].cargo = 0;
        items.forEach(function(x) {
            if (ships[shipName].available_items == null)
                ships[shipName].available_items = { };

            if (ships[shipName].available_items[x] == null) {
                ships[shipName].available_items[x] = {
                    "available": 0,
                    "buy_price": 0,
                    "sell_price": 0
                };
            }
        });
    }
}

window.onload = () =>  {
    playerName = sessionStorage.getItem(constants.playerNameSessionVar);
    if (playerName == null || playerName == "")
        playerName = "Anonymus";

    // Check if game was started through the menu screen. If it was not
    // (e.g. page was reloaded), var_gameStarted variable won't be empty and we
    // will redirect the user to the index.html page.
    // NOTE: This feature is disabled so that its easier to validate my
    //       project. This can be enabled back by switching the constant in
    //       constants.ts and rebuilding the project.
    let gameStarted = sessionStorage.getItem(constants.gameStartedSessionVar);
    if (constants.backToMenuOnRefresh && gameStarted !== "session_OK")
    {
        console.error("It appears user has now entered from the menu. Redirecting...");
        window.location.href = "index.html";
    }
    sessionStorage.setItem(constants.gameStartedSessionVar, "");

    // This super dirty hack will disable return inside of forms so that the
    // page is not refreshed.
    window.addEventListener(
        'keydown',
        function(e : any) {
            if(e.keyIdentifier == 'U+000A'
               || e.keyIdentifier == 'Enter'
               || e.keyCode==13)
            {
                if (e.target.nodeName=='INPUT' && e.target.type == 'text') {
                    e.preventDefault();
                    return false;
                }
            }
        },
        true);

    document.getElementById("info-player_name").textContent = playerName;
    timeManager = new TimeManager(document.getElementById("info-time"),
                                  gameInitialState.game_duration,
                                  () => updateMainScrShipList(),
                                  () => finishGame());
    cashManager = new CashManager(document.getElementById("info-credits"),
                                  gameInitialState.initial_credits);
    timeManager.start();

    // Some global initialization:
    initPopups();
    initPlanetsList();
    initShipsList();

    populateList(
        document.getElementById("planets-list"),
        ".planet-record",
        planets,
        (key, newRecord : HTMLElement, list : HTMLElement) => {
            let value = planets[key];
            let planetName = newRecord.querySelector("#planet-name") as HTMLElement;
            let planetCoords = newRecord.querySelector("#planet-coord") as HTMLElement;
            let planetIcon = newRecord.querySelector("#planet-icon") as HTMLImageElement;
            planetName.textContent = key;
            planetCoords.textContent = "(" + value.x + ", " + value.y + ")";
            planetIcon.src = "./art/" + key + ".png";
            newRecord.onclick = function() { planetPopup.display(key); };
            list.append(newRecord);
        });

    updateMainScrShipList();
}
