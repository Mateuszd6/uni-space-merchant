import {Builder, Capabilities, WebElement} from 'selenium-webdriver';
import {expect} from 'chai';
import {driver} from 'mocha-webdriver';
import { CashManager } from "../src/cashManager"
import {TimeManager} from '../src/timeManager'
import {initialDataJSONString} from '../src/initial_data'
import { before } from 'mocha';

describe('timeManagerValue', function () {
    it('should say something', async function() {
        await driver.get('file:///home/mateusz/work/wwwapps/space_merchant/game.html');

        let content = await driver.find("#info-time").getText();
        expect(content).to.be.equal("0sec");
     });
});


describe('Every planet', function () {
    it('all planets are displayed', async function() {
        await driver.get('file:///home/mateusz/work/wwwapps/space_merchant/game.html');

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
        await driver.get('file:///home/mateusz/work/wwwapps/space_merchant/game.html');

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
3
            expect(shipFound).to.be.equal(true);
        }
     });
});

describe('Check popups', function () {
    it('popups should be disabled', async function() {
        await driver.get('file:///home/mateusz/work/wwwapps/space_merchant/game.html');

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

describe("Cash Manager", () => {
    it("should create cash manager instance", async function() {
        await driver.get('file:///home/mateusz/work/wwwapps/space_merchant/game.html');
        let cash = JSON.parse(initialDataJSONString).initial_credits;
        let textContent = await driver.find("#info-credits").getText();
        expect(textContent).to.be.equal(cash.toString() + "cr");
    });
});

describe("Click on planet", () => {
    before(async function() {
        await driver.get('file:///home/mateusz/work/wwwapps/space_merchant/game.html');
        let initialPlanets = JSON.parse(initialDataJSONString).planets;
        let content = await driver.findAll("#planets-list .planet-record");

        // Make sure every planet is drawn
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
    })

    it("make sure popup is displayed", async function() {
        let style = await driver.find("#planet-details-popup").getCssValue("visibility");
        expect(style).to.be.equal("visible");
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
