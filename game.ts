let jsonString: string =`
{
    "game_duration":300,
    "initial_credits":1984,
    "items":[
        "Dwimeryt",
        "Cynamon",
        "Nuka-Cola",
        "Z\u0142oto",
        "Unobtainium",
        "Protea\u0144skie dyski",
        "Ziemniaki",
        "Lyrium",
        "Murkwie",
        "Woda"
    ],
    "planets":{
        "Alderaan":{
            "available_items":{
                "Cynamon":{
                    "available":74,
                    "buy_price":6,
                    "sell_price":6
                },
                "Dwimeryt":{
                    "available":42,
                    "buy_price":12,
                    "sell_price":11
                },
                "Nuka-Cola":{
                    "available":34,
                    "buy_price":13,
                    "sell_price":12
                },
                "Protea\u0144skie dyski":{
                    "available":5,
                    "buy_price":76,
                    "sell_price":69
                },
                "Unobtainium":{
                    "available":23,
                    "buy_price":33,
                    "sell_price":31
                },
                "Woda":{
                    "available":22,
                    "buy_price":19,
                    "sell_price":18
                },
                "Ziemniaki":{
                    "available":10,
                    "buy_price":92,
                    "sell_price":86
                },
                "Z\u0142oto":{
                    "available":12,
                    "buy_price":19,
                    "sell_price":17
                }
            },
            "x":15,
            "y":32
        },
        "Argoland":{
            "available_items":{
                "Dwimeryt":{
                    "available":23,
                    "buy_price":10,
                    "sell_price":10
                },
                "Lyrium":{
                    "available":39,
                    "buy_price":9,
                    "sell_price":8
                },
                "Murkwie":{
                    "available":5,
                    "buy_price":73,
                    "sell_price":64
                },
                "Nuka-Cola":{
                    "available":25,
                    "buy_price":22,
                    "sell_price":19
                },
                "Protea\u0144skie dyski":{
                    "available":10,
                    "buy_price":75,
                    "sell_price":65
                },
                "Ziemniaki":{
                    "available":6,
                    "buy_price":69,
                    "sell_price":61
                },
                "Z\u0142oto":{
                    "available":12,
                    "buy_price":34,
                    "sell_price":30
                }
            },
            "x":59,
            "y":44
        },
        "Arrakis":{
            "available_items":{
                "Cynamon":{
                    "available":59,
                    "buy_price":8,
                    "sell_price":7
                },
                "Lyrium":{
                    "available":53,
                    "buy_price":10,
                    "sell_price":8
                },
                "Murkwie":{
                    "available":6,
                    "buy_price":89,
                    "sell_price":76
                },
                "Nuka-Cola":{
                    "available":25,
                    "buy_price":16,
                    "sell_price":15
                },
                "Protea\u0144skie dyski":{
                    "available":7,
                    "buy_price":64,
                    "sell_price":57
                },
                "Unobtainium":{
                    "available":12,
                    "buy_price":36,
                    "sell_price":33
                },
                "Woda":{
                    "available":12,
                    "buy_price":25,
                    "sell_price":21
                },
                "Ziemniaki":{
                    "available":9,
                    "buy_price":120,
                    "sell_price":107
                },
                "Z\u0142oto":{
                    "available":16,
                    "buy_price":23,
                    "sell_price":21
                }
            },
            "x":81,
            "y":34
        },
        "Corellia":{
            "available_items":{
                "Dwimeryt":{
                    "available":38,
                    "buy_price":8,
                    "sell_price":8
                },
                "Lyrium":{
                    "available":63,
                    "buy_price":8,
                    "sell_price":7
                },
                "Murkwie":{
                    "available":6,
                    "buy_price":91,
                    "sell_price":84
                },
                "Protea\u0144skie dyski":{
                    "available":10,
                    "buy_price":74,
                    "sell_price":66
                },
                "Unobtainium":{
                    "available":11,
                    "buy_price":30,
                    "sell_price":26
                },
                "Ziemniaki":{
                    "available":12,
                    "buy_price":71,
                    "sell_price":66
                },
                "Z\u0142oto":{
                    "available":19,
                    "buy_price":37,
                    "sell_price":33
                }
            },
            "x":43,
            "y":69
        },
        "Encja":{
            "available_items":{
                "Cynamon":{
                    "available":59,
                    "buy_price":6,
                    "sell_price":5
                },
                "Dwimeryt":{
                    "available":56,
                    "buy_price":10,
                    "sell_price":10
                },
                "Lyrium":{
                    "available":51,
                    "buy_price":9,
                    "sell_price":8
                },
                "Murkwie":{
                    "available":6,
                    "buy_price":88,
                    "sell_price":76
                },
                "Nuka-Cola":{
                    "available":35,
                    "buy_price":17,
                    "sell_price":16
                },
                "Protea\u0144skie dyski":{
                    "available":9,
                    "buy_price":103,
                    "sell_price":90
                },
                "Unobtainium":{
                    "available":13,
                    "buy_price":39,
                    "sell_price":37
                },
                "Woda":{
                    "available":12,
                    "buy_price":32,
                    "sell_price":32
                },
                "Ziemniaki":{
                    "available":6,
                    "buy_price":60,
                    "sell_price":57
                },
                "Z\u0142oto":{
                    "available":26,
                    "buy_price":40,
                    "sell_price":35
                }
            },
            "x":91,
            "y":32
        },
        "Gaia":{
            "available_items":{
                "Cynamon":{
                    "available":80,
                    "buy_price":6,
                    "sell_price":6
                },
                "Dwimeryt":{
                    "available":85,
                    "buy_price":8,
                    "sell_price":7
                },
                "Lyrium":{
                    "available":41,
                    "buy_price":10,
                    "sell_price":9
                },
                "Protea\u0144skie dyski":{
                    "available":9,
                    "buy_price":102,
                    "sell_price":94
                },
                "Woda":{
                    "available":25,
                    "buy_price":43,
                    "sell_price":39
                },
                "Ziemniaki":{
                    "available":8,
                    "buy_price":92,
                    "sell_price":82
                },
                "Z\u0142oto":{
                    "available":16,
                    "buy_price":35,
                    "sell_price":31
                }
            },
            "x":75,
            "y":76
        },
        "Ksi":{
            "available_items":{
                "Cynamon":{
                    "available":33,
                    "buy_price":11,
                    "sell_price":10
                },
                "Dwimeryt":{
                    "available":80,
                    "buy_price":6,
                    "sell_price":6
                },
                "Lyrium":{
                    "available":64,
                    "buy_price":8,
                    "sell_price":7
                },
                "Murkwie":{
                    "available":4,
                    "buy_price":73,
                    "sell_price":67
                },
                "Nuka-Cola":{
                    "available":30,
                    "buy_price":17,
                    "sell_price":14
                },
                "Protea\u0144skie dyski":{
                    "available":8,
                    "buy_price":39,
                    "sell_price":37
                },
                "Unobtainium":{
                    "available":12,
                    "buy_price":41,
                    "sell_price":39
                },
                "Woda":{
                    "available":15,
                    "buy_price":30,
                    "sell_price":28
                },
                "Ziemniaki":{
                    "available":6,
                    "buy_price":74,
                    "sell_price":64
                },
                "Z\u0142oto":{
                    "available":16,
                    "buy_price":20,
                    "sell_price":18
                }
            },
            "x":91,
            "y":71
        },
        "Leonida":{
            "available_items":{
                "Cynamon":{
                    "available":36,
                    "buy_price":12,
                    "sell_price":11
                },
                "Dwimeryt":{
                    "available":50,
                    "buy_price":8,
                    "sell_price":7
                },
                "Lyrium":{
                    "available":60,
                    "buy_price":9,
                    "sell_price":9
                },
                "Murkwie":{
                    "available":6,
                    "buy_price":89,
                    "sell_price":85
                },
                "Nuka-Cola":{
                    "available":39,
                    "buy_price":18,
                    "sell_price":16
                },
                "Protea\u0144skie dyski":{
                    "available":7,
                    "buy_price":65,
                    "sell_price":57
                },
                "Unobtainium":{
                    "available":9,
                    "buy_price":38,
                    "sell_price":33
                },
                "Ziemniaki":{
                    "available":5,
                    "buy_price":121,
                    "sell_price":112
                },
                "Z\u0142oto":{
                    "available":11,
                    "buy_price":45,
                    "sell_price":41
                }
            },
            "x":32,
            "y":5
        },
        "NowWhat":{
            "available_items":{
                "Cynamon":{
                    "available":62,
                    "buy_price":8,
                    "sell_price":7
                },
                "Dwimeryt":{
                    "available":22,
                    "buy_price":9,
                    "sell_price":9
                },
                "Murkwie":{
                    "available":9,
                    "buy_price":67,
                    "sell_price":66
                },
                "Nuka-Cola":{
                    "available":27,
                    "buy_price":18,
                    "sell_price":16
                },
                "Protea\u0144skie dyski":{
                    "available":9,
                    "buy_price":82,
                    "sell_price":71
                },
                "Ziemniaki":{
                    "available":4,
                    "buy_price":74,
                    "sell_price":63
                },
                "Z\u0142oto":{
                    "available":17,
                    "buy_price":28,
                    "sell_price":24
                }
            },
            "x":35,
            "y":41
        },
        "Sur'Kesh":{
            "available_items":{
                "Cynamon":{
                    "available":55,
                    "buy_price":9,
                    "sell_price":8
                },
                "Lyrium":{
                    "available":34,
                    "buy_price":9,
                    "sell_price":8
                },
                "Murkwie":{
                    "available":10,
                    "buy_price":73,
                    "sell_price":66
                },
                "Nuka-Cola":{
                    "available":30,
                    "buy_price":19,
                    "sell_price":17
                },
                "Protea\u0144skie dyski":{
                    "available":5,
                    "buy_price":85,
                    "sell_price":79
                },
                "Unobtainium":{
                    "available":19,
                    "buy_price":34,
                    "sell_price":31
                },
                "Woda":{
                    "available":21,
                    "buy_price":23,
                    "sell_price":20
                },
                "Ziemniaki":{
                    "available":8,
                    "buy_price":99,
                    "sell_price":95
                }
            },
            "x":39,
            "y":31
        },
        "Tairia":{
            "available_items":{
                "Cynamon":{
                    "available":70,
                    "buy_price":10,
                    "sell_price":10
                },
                "Lyrium":{
                    "available":43,
                    "buy_price":6,
                    "sell_price":5
                },
                "Murkwie":{
                    "available":8,
                    "buy_price":97,
                    "sell_price":84
                },
                "Nuka-Cola":{
                    "available":32,
                    "buy_price":20,
                    "sell_price":19
                },
                "Unobtainium":{
                    "available":19,
                    "buy_price":44,
                    "sell_price":41
                },
                "Woda":{
                    "available":12,
                    "buy_price":29,
                    "sell_price":25
                },
                "Ziemniaki":{
                    "available":6,
                    "buy_price":123,
                    "sell_price":103
                },
                "Z\u0142oto":{
                    "available":14,
                    "buy_price":37,
                    "sell_price":34
                }
            },
            "x":36,
            "y":84
        },
        "Tatooine":{
            "available_items":{
                "Cynamon":{
                    "available":60,
                    "buy_price":11,
                    "sell_price":10
                },
                "Dwimeryt":{
                    "available":64,
                    "buy_price":10,
                    "sell_price":9
                },
                "Lyrium":{
                    "available":45,
                    "buy_price":8,
                    "sell_price":7
                },
                "Murkwie":{
                    "available":6,
                    "buy_price":81,
                    "sell_price":71
                },
                "Nuka-Cola":{
                    "available":39,
                    "buy_price":15,
                    "sell_price":13
                },
                "Protea\u0144skie dyski":{
                    "available":7,
                    "buy_price":89,
                    "sell_price":84
                },
                "Unobtainium":{
                    "available":13,
                    "buy_price":37,
                    "sell_price":32
                },
                "Woda":{
                    "available":10,
                    "buy_price":23,
                    "sell_price":21
                },
                "Ziemniaki":{
                    "available":7,
                    "buy_price":95,
                    "sell_price":87
                },
                "Z\u0142oto":{
                    "available":19,
                    "buy_price":35,
                    "sell_price":32
                }
            },
            "x":47,
            "y":68
        },
        "Tuchanka":{
            "available_items":{
                "Cynamon":{
                    "available":59,
                    "buy_price":10,
                    "sell_price":9
                },
                "Dwimeryt":{
                    "available":51,
                    "buy_price":7,
                    "sell_price":6
                },
                "Lyrium":{
                    "available":65,
                    "buy_price":11,
                    "sell_price":10
                },
                "Murkwie":{
                    "available":9,
                    "buy_price":90,
                    "sell_price":82
                },
                "Nuka-Cola":{
                    "available":46,
                    "buy_price":18,
                    "sell_price":16
                },
                "Protea\u0144skie dyski":{
                    "available":10,
                    "buy_price":71,
                    "sell_price":65
                },
                "Unobtainium":{
                    "available":8,
                    "buy_price":39,
                    "sell_price":37
                },
                "Woda":{
                    "available":15,
                    "buy_price":28,
                    "sell_price":24
                },
                "Ziemniaki":{
                    "available":10,
                    "buy_price":61,
                    "sell_price":57
                },
                "Z\u0142oto":{
                    "available":12,
                    "buy_price":46,
                    "sell_price":40
                }
            },
            "x":27,
            "y":76
        },
        "Ziemia":{
            "available_items":{
                "Cynamon":{
                    "available":58,
                    "buy_price":8,
                    "sell_price":7
                },
                "Dwimeryt":{
                    "available":106,
                    "buy_price":8,
                    "sell_price":7
                },
                "Lyrium":{
                    "available":31,
                    "buy_price":9,
                    "sell_price":8
                },
                "Murkwie":{
                    "available":7,
                    "buy_price":82,
                    "sell_price":75
                },
                "Nuka-Cola":{
                    "available":30,
                    "buy_price":18,
                    "sell_price":17
                },
                "Unobtainium":{
                    "available":21,
                    "buy_price":37,
                    "sell_price":36
                },
                "Ziemniaki":{
                    "available":6,
                    "buy_price":77,
                    "sell_price":69
                },
                "Z\u0142oto":{
                    "available":13,
                    "buy_price":38,
                    "sell_price":32
                }
            },
            "x":94,
            "y":24
        }
    },
    "starships":{
        "Axiom":{
            "cargo_hold_size":27,
            "position":"Tatooine"
        },
        "Enterprise":{
            "cargo_hold_size":46,
            "position":"Corellia"
        },
        "Goliath":{
            "cargo_hold_size":33,
            "position":"Sur'Kesh"
        },
        "Hermes":{
            "cargo_hold_size":26,
            "position":"NowWhat"
        },
        "Millenium Falcon":{
            "cargo_hold_size":35,
            "position":"Tatooine"
        },
        "Niezwyci\u0119\u017cony":{
            "cargo_hold_size":60,
            "position":"Argoland"
        },
        "Normandy SR-2":{
            "cargo_hold_size":40,
            "position":"Gaia"
        },
        "Nostromo":{
            "cargo_hold_size":25,
            "position":"Arrakis"
        },
        "Rocinante":{
            "cargo_hold_size":30,
            "position":"Alderaan"
        },
        "\u041a\u043e\u0441\u043c\u043e\u043d\u0430\u0432\u0442 \u0410\u043b\u0435\u043a\u0441\u0435\u0301\u0439 \u041b\u0435\u043e\u0301\u043d\u043e\u0432":{
            "cargo_hold_size":35,
            "position":"Arrakis"
        }
    }
}
`;

// Single mineral iface.
export interface IItem {
    [name: string]: {
        available: number;
        buy_price: number;
        sell_price: number;
    }
}

// Planet iface.
export interface IPlanet {
    [name: string]: {
        available_items?: IItem;
        x: number;
        y: number;
    }
}

// Ship iface.
export interface IShip {
    [name: string]: {
        cargo_hold_size: number,
        position: string,
        cargo: number, // Currently holded cargo.
        moving: boolean, // Is the spacecraft moving?
        destTime : number, // Time point in which dest is reach (only if moving)
        available_items?: IItem
    }
}

// Simple score interface - user name + score.
export interface IScore {
    name: string
    score: number;
}

// This iface is used by the trade popup and displays all the data related to a
// single trade.
export interface ITradeData {
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
export interface ILunchData {
    planetName : string;
    shipName : string;
}

// Formats the time so thats in can be nicely display to the user.
function formatTime(timeMS: number) {
    if (timeMS < 0)
        return "0sec ";

    let allSeconds: number = Math.floor(timeMS / 1000);
    let minutes: number = Math.floor(allSeconds / 60);
    let seconds: number = allSeconds % 60;

    let minutesStr: string = minutes == 0 ? "" : (minutes.toString() + "min ");
    let secondsStr: string = seconds.toString() + "sec ";

    return minutesStr + secondsStr;
}

// This will finish the game, save to highscores if result qualifies and go back
// to greet screen.
function finishGame() {
    let score = cashManager.credits;
    let highscoresJSON = localStorage.getItem("var_highscoresJSON");
    let highscores = JSON.parse(highscoresJSON) as IScore[];
    if (highscores == null)
        highscores = [];

    highscores.push({
        "name": playerName,
        "score": score
    });

    highscores.sort((x, y) => y.score - x.score);
    let wasHighscore = (highscores.length < 10 || highscores[9].score < score);
    localStorage.setItem("var_highscoresJSON", JSON.stringify(highscores.slice(0, 10)));
    localStorage.setItem("var_highscoreReached", wasHighscore ? "TRUE" : "");
    localStorage.setItem("var_gameHasEndedSafetly", "TRUE");
    localStorage.setItem("var_scoreReached", score.toString());
    window.location.href = "index.html";
}

class TimeManager {
    element: HTMLElement;
    startTimePoint: Date;
    timerToken: number;
    timeLimit : number;

    constructor(element: HTMLElement, timeLimit : number) {
        this.element = element;
        this.startTimePoint = new Date();
        this.timeLimit = timeLimit;
        this.element.textContent = formatTime(this.timeLimit);
    }

    start() {
        this.element.textContent = formatTime(0);
        this.timerToken = setInterval(
            () => {
                let timeLeft = this.timeLimit * 1000 -
                    (new Date().getTime()-this.startTimePoint.getTime());
                if (timeLeft < 0)
                {
                    console.log("The game will now finish");
                    finishGame();
                }

                this.element.textContent = formatTime(timeLeft);
                updateMainScrShipList();
            },
            500
        );
    }

    stop() {
        clearTimeout(this.timerToken);
    }
}

class CashManager {
    content : HTMLElement;
    credits : number;

    constructor(element: HTMLElement, initialCr : number) {
        this.content = element;
        this.credits = initialCr;
        this.updateCash();
    }

    updateCash() {
        this.content.textContent = this.credits.toString() + "cr";
    }

    tryPay(price : number) {
        if (this.credits >= price) {
            this.credits -= price;
            this.updateCash();
            return true;
        }
        else
            return false;
    }

    give(price : number) {
        this.credits += price;
        this.updateCash();
    }
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

        // TODO: Find the scrollarea and reset the scrollbar.
        // this.content.scrollTop = 0;
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

function calculatePlanetTravelTime(p1Name : string, p2Name : string) {
    let p1 = planets[p1Name];
    let p2 = planets[p2Name];
    let distSquare = (p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y);
    let dist = Math.round(Math.sqrt(distSquare));

    return dist;
}

console.log(jsonString);
let dataStructure = JSON.parse(jsonString);
console.log(dataStructure.planets);

const planets = dataStructure.planets as IPlanet;
const ships = dataStructure.starships as IShip;
let items: string[] = dataStructure.items;

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
    timeManager = new TimeManager(document.getElementById("info-time"), dataStructure.game_duration);
    cashManager = new CashManager(document.getElementById("info-credits"), dataStructure.initial_credits);
    timeManager.start();
    playerName = sessionStorage.getItem("var_playerName");
    if (playerName == null || playerName == "")
        playerName = "Anonymus";

    // Check if game was started through the menu screen. If it was not
    // (e.g. page was reloaded), var_gameStarted variable won't be empty and we
    // will redirect the user to the index.html page.
    let gameStarted = sessionStorage.getItem("var_gameStarted");
    if (gameStarted !== "session_OK")
    {
        console.error("It appears that the session was not entered from the menu. Redirecting...");
        window.location.href = "index.html";
    }
    sessionStorage.setItem("var_gameStarted", "");

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

    // Some global initialization:
    initPopups();
    initPlanetsList();
    initShipsList();

    document.getElementById("info-player_name").textContent = playerName;

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
