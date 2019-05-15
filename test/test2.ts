import {Builder, Capabilities} from 'selenium-webdriver';
import {expect} from 'chai';
import {driver} from 'mocha-webdriver';
import {TimeManager} from '../src/timeManager'

describe('seleniumTestTest', function () {
    it('should say something', async function() {
        await driver.get('file:///home/mateusz/work/wwwapps/space_merchant/game.html');
        // śmierć głupim frameworkom.
    });
})
