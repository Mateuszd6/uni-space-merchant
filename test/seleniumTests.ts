import {Builder, Capabilities, WebElement} from 'selenium-webdriver';
import {expect} from 'chai';
import {driver} from 'mocha-webdriver';
import { CashManager } from "../src/cashManager"
import { TimeManager, formatTime} from '../src/timeManager'
import {initialDataJSONString} from '../src/initial_data'
import { before } from 'mocha';

// Load the uris from the prepared file.
import * as url from './uri'

describe('Every planet', function () {
    it('all planets are displayed', async function() {
        await driver.get(url.game_url);

        let initialPlanets = JSON.parse(initialDataJSONString).planets;
        let content = await driver.findAll("#planets-list .planet-record");

        // Make sure every planet is drawn
        for (let i in initialPlanets) {
            let planetFound: boolean  = false;
            for (let j in content) {
                let text = await content[j].getText();
                if (text.startsWith(i))
                {
                    planetFound = true;
                    break;
                }
            }

            expect(planetFound).to.be.equal(true);
        }
     });
});

describe('Every ship', function () {
    it('all ships are displayed', async function() {
        await driver.get(url.game_url);

        let initialShips = JSON.parse(initialDataJSONString).ships;
        let content = await driver.findAll("#ships-list .ship-record");

        // Make sure every planet is drawn
        for (let i in initialShips) {
            let shipFound: boolean  = false;
            for (let j in content) {
                let text = await content[j].getText();
                if (text.startsWith(i))
                {
                    shipFound = true;
                    break;
                }
            }

            expect(shipFound).to.be.equal(true);
        }
     });
});

describe('Check popups', function () {
    it('popups should be disabled', async function() {
        await driver.get(url.game_url);

        let popupIds = [
            "#flyingspacecraft-popup", "#landedspacecraft-popup",
            "#lunch-popup", "#trade-popup", "#planet-details-popup"
        ];

        for (let i in popupIds) {
            let style = await driver.find(popupIds[i]).getCssValue("visibility");
            expect(style).not.to.be.equal("visible");
        }
     });
});

describe("Cash Manager", function () {
    it("should create cash manager instance", async function() {
        await driver.get(url.game_url);
        let cash = JSON.parse(initialDataJSONString).initial_credits;
        let textContent = await driver.find("#info-credits").getText();
        expect(textContent).to.be.equal(cash.toString() + "cr");
    });
});

describe("Click on planet", function () {
    before(async function() {
        await driver.get(url.game_url);
        let initialPlanets = JSON.parse(initialDataJSONString).planets;
        let content = await driver.findAll("#planets-list .planet-record");

        let elem;
        for (let j in content) {
            let text = await content[j].getText();
            if (text.startsWith("Alderaan"))
            {
                elem = j;
                break;
            }
        }

        await content[elem].click();
    });

    it("popup is displayed", async function() {
        let style = await driver.find("#planet-details-popup").getCssValue("visibility");
        expect(style).to.be.equal("visible");
    });

    it("ship popup is NOT displayed", async function() {
        let style = await driver.find("#landedspacecraft-popup").getCssValue("visibility");
        expect(style).not.to.be.equal("visible");
    });

    it("make sure minerals are displayed", async function() {
        let minerals = await driver.findAll("#planet-detials-mineral-list #planet-details-mineral");

        let itemsList = JSON.parse(initialDataJSONString)
            .planets["Alderaan"]
            .available_items;

        for (let j in minerals)
        {
            let text = await minerals[j].getText();
            expect(itemsList).contains(x => text.startsWith(x));
        }
    });

    it("one ship should be available", async function() {
        let ships = await driver.findAll("#planet-detials-ship-list #planet-details-stationed-spaceship");

        // One for the record proto.
        expect(ships.length).to.be.equal(2);
    });
});

describe('TimeManager', function () {
    it('timer is 0-initialized', async function() {
        await driver.get(url.game_url);
        let content = await driver.find("#info-time").getText();
        expect(content).to.be.equal("0sec");
    });

    it('time changes', async function() {
        await driver.get(url.game_url);
        let _ = await this.timeout(200000);
        let content = await driver.find("#info-time");
        expect(await content.getText()).not.to.be.equal(formatTime(JSON.parse(initialDataJSONString).game_duration));
    });
});

describe('Click on ship', function () {
    before(async function() {
        await driver.get(url.game_url);
        let initialPlanets = JSON.parse(initialDataJSONString).planets;
        let content = await driver.findAll("#ships-list .ship-record");

        let elem;
        for (let j in content) {
            let text = await content[j].getText();
            if (text.startsWith("Axiom"))
            {
                elem = j;
                break;
            }
        }

        await content[elem].click();
    });

    it("planet popup is NOT displayed", async function() {
        let style = await driver.find("#planet-details-popup").getCssValue("visibility");
        expect(style).not.to.be.equal("visible");
    });

    it("ship popup is displayed", async function() {
        let style = await driver.find("#landedspacecraft-popup").getCssValue("visibility");
        expect(style).to.be.equal("visible");
    });

    it("make sure ship popup is displayed", async function() {
        let content = await driver.find("#landedspacecraft-dest").getText();
        expect(content).to.be.equal("Tatooine");
    });
});

describe('Leave planet', function () {
    before(async function() {
        await driver.get(url.game_url);
        let initialPlanets = JSON.parse(initialDataJSONString).planets;
        let content = await driver.findAll("#ships-list .ship-record");

        let elem;
        for (let j in content) {
            let text = await content[j].getText();
            if (text.startsWith("Axiom"))
            {
                elem = j;
                break;
            }
        }

        await content[elem].click();

        let leavePlanet = driver.find("#leaveplanet");
        await leavePlanet.click();
    });

    it("planet popup is NOT displayed", async function() {
        let style = await driver.find("#planet-details-popup").getCssValue("visibility");
        expect(style).not.to.be.equal("visible");
    });

    it("ship popup is displayed", async function() {
        let style = await driver.find("#landedspacecraft-popup").getCssValue("visibility");
        expect(style).to.be.equal("visible");
    });

    it("ship popup is displayed", async function() {
        let style = await driver.find("#lunch-popup").getCssValue("visibility");
        expect(style).to.be.equal("visible");
    });

    it("ship popup is displayed", async function() {
        let style = await driver.find("#lunch-popup").getCssValue("visibility");
        expect(style).to.be.equal("visible");
    });

    it("click the lunch button", async function() {
        await (await driver.find("#lunch-popup").findAll(".planet-record"))[1].click();
        await driver.sleep(1000);

        // Now flying spacecraft popup should be visible.
        let style = await driver.find("#flyingspacecraft-popup").getCssValue("visibility");
        expect(style).to.be.equal("visible");

        // And the rest should not be.
        style = await driver.find("#landedspacecraft-popup").getCssValue("visibility");
        expect(style).not.to.be.equal("visible");

        // And the rest should not be.
        style = await driver.find("#lunch-popup").getCssValue("visibility");
        expect(style).not.to.be.equal("visible");
    });
});

describe('Main menu highscores', function () {
    before(async function() {
        await driver.get(url.index_url);
    });

    it("highscores are displayed", async function() {
        let highscoreList = await driver.find("#highscore-list");
        expect(highscoreList).not.equal(null);
    });

    it("highscores are displayed", async function() {
        let highscoreList = await driver.find("#highscore-list");
        expect(highscoreList).not.equal(null);
    });
});

describe('How to play popup', function () {
    before(async function() {
        await driver.get(url.index_url);
    });

    it("popup shows", async function() {
        let _ = await driver.find("#menu-howtoplay").click();
        let style = await driver.find("#popup-howtoplay").getCssValue("visibility");
        expect(style).to.be.equal("visible");
    });
});


describe('How to play popup - close', function () {
    before(async function() {
        await driver.get(url.index_url);
    });

    it("popup closes", async function() {
        await driver.find("#menu-howtoplay").click();
        await driver.find("#popup-howtoplay").find(".close").click();
        let style = await driver.find("#popup-howtoplay").getCssValue("visibility");
        expect(style).not.to.be.equal("visible");
    });
});

function waitForUrlToChangeTo(url) {
    var currentUrl;

    return driver.getCurrentUrl().then(
        function storeCurrentUrl(url) {
            currentUrl = url;
        }
    ).then(
        function waitForUrlToChangeTo() {
            return driver.wait(function waitForUrlToChangeTo() {
                return driver.getCurrentUrl().then(
                    function compareCurrentUrl(urlr) {
                        return urlr === url;
                    });
            });
        }
    );
}

describe('Start Game popup', function () {
    before(async function() {
        await driver.get(url.index_url);
    });

    it("popup shows", async function() {
        let _ = await driver.find("#menu-startnew").click();
        let style = await driver.find("#popup").getCssValue("visibility");
        expect(style).to.be.equal("visible");
    });

    it ("input field works", async function() {
        let myTextBox = driver.find("#fname");
        myTextBox.sendKeys("Mateusz");
        let elementContent = await myTextBox.getText();
        let elementValue = await myTextBox.getAttribute("value");

        expect(elementValue).to.be.equal("Mateusz");
    });

    it ("input the name and start the game", async function() {
        let myTextBox = driver.find("#fname");
        myTextBox.sendKeys("Mateusz");
        let elementContent = await myTextBox.getText();
        let elementValue = await myTextBox.getAttribute("value");

        let startgmae = await driver.find("#startgame-button");
        startgmae.click();

        // Assert that we've changed the page.
        await waitForUrlToChangeTo(url.game_url);
        expect(await driver.getCurrentUrl()).to.be.equal(url.game_url);
    });
});


describe('Start Game popup - close', function () {
    before(async function() {
        await driver.get(url.index_url);
    });

    it("popup closes", async function() {
        await driver.find("#menu-startnew").click();
        await driver.find("#popup").find(".close").click();
        let style = await driver.find("#popup").getCssValue("visibility");
        expect(style).not.to.be.equal("visible");
    });
});
