import { expect } from "chai";
import { formatTime, TimeManager} from '../src/timeManager'
import { IScore, HighscoreManager} from '../src/highscoreManager'
import "mocha";

describe('FormatTime', function () {
    it('should format correctly', async function() {
        expect(formatTime(0)).to.be.equal("0sec ");
    });

    it('should format correctly', async function() {
        expect(formatTime(60 * 1000)).to.be.equal("1min ");
    });

    it('should format correctly', async function() {
        expect(formatTime(119 * 1000)).to.be.equal("1min 59sec ");
    });

});

describe('FormatTimeInvalidInput', function () {
    it('should default', async function() {
        expect(formatTime(-1)).to.be.equal("0sec ");
    });

    it('should default', async function() {
        expect(formatTime(-60 * 1000)).to.be.equal("0sec ");
    });

    it('should default', async function() {
        expect(formatTime(Number("foo"))).to.be.equal("0sec ");
    });
});

describe('HighscoreManager', function () {
    it('generates some records if given none', async function() {
        let hm = new HighscoreManager("[]");
        expect(hm.highscores).not.to.be.equal([]);
        expect(hm.getAsJson()).not.to.be.equal("[]");
    });

    it('check the default number of records.', async function() {
        let len = new HighscoreManager(null).highscores.length;
        expect(len).to.be.equal(5);
    });

    it('default is sorted', async function() {
        let hm = new HighscoreManager(null);
        for (let i = 0; i < 4; ++i)
            hm.highscores[i].score >= hm.highscores[i + 1].score;
    });

    it("adding new record won\'t mess up the sorting", async function() {
        let hm = new HighscoreManager(null);
        let wasHighscore = hm.tryAddToHighscores("TEST", 2100);

        expect(wasHighscore).to.be.equal(true);
        for (let i = 0; i < hm.highscores.length - 1; ++i)
            expect(hm.highscores[i].score).not.to.be.lessThan(hm.highscores[i + 1].score);
    });
});
