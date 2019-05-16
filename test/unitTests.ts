import { expect } from "chai";
import { formatTime, TimeManager} from '../src/timeManager'
import { IScore, HighscoreManager} from '../src/highscoreManager'
import {initialDataJSONString} from '../src/initial_data'
import * as game from '../src/misc'

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

// These are some hand-calculated values for the distances.
describe('Planet time traveltimems', function () {
    it('calc distance between Alderaan nad Argoland', async function() {
        let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
        let planetArgoland = JSON.parse(initialDataJSONString).planets['Argoland'];
        game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetArgoland.x, planetArgoland.y) == 2080;
    });
    it('calc distance between Alderaan nad Arrakis', async function() {
        let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
        let planetArrakis = JSON.parse(initialDataJSONString).planets['Arrakis'];
        game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetArrakis.x, planetArrakis.y) == 4360;
    });
    it('calc distance between Alderaan nad Corellia', async function() {
        let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
        let planetCorellia = JSON.parse(initialDataJSONString).planets['Corellia'];
        game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetCorellia.x, planetCorellia.y) == 2153;
    });
    it('calc distance between Alderaan nad Encja', async function() {
        let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
        let planetEncja = JSON.parse(initialDataJSONString).planets['Encja'];
        game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetEncja.x, planetEncja.y) == 5776;
    });
    it('calc distance between Alderaan nad Gaia', async function() {
        let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
        let planetGaia = JSON.parse(initialDataJSONString).planets['Gaia'];
        game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetGaia.x, planetGaia.y) == 5536;
    });
    it('calc distance between Alderaan nad Ksi', async function() {
        let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
        let planetKsi = JSON.parse(initialDataJSONString).planets['Ksi'];
        game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetKsi.x, planetKsi.y) == 7297;
    });
    it('calc distance between Alderaan nad Leonida', async function() {
        let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
        let planetLeonida = JSON.parse(initialDataJSONString).planets['Leonida'];
        game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetLeonida.x, planetLeonida.y) == 1018;
    });
    it('calc distance between Alderaan nad NowWhat', async function() {
        let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
        let planetNowWhat = JSON.parse(initialDataJSONString).planets['NowWhat'];
        game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetNowWhat.x, planetNowWhat.y) == 481;
    });
    it('calc distance between Alderaan nad Sur\'Kesh', async function() {
        let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
        let planetSurKesh = JSON.parse(initialDataJSONString).planets['Sur\'Kesh'];
       game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetSurKesh.x, planetSurKesh.y) == 577;
      });
         it('calc distance between Alderaan nad Tairia', async function() {
             let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
             let planetTairia = JSON.parse(initialDataJSONString).planets['Tairia'];
             game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetTairia.x, planetTairia.y) == 3145;
         });
         it('calc distance between Alderaan nad Tatooine', async function() {
             let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
             let planetTatooine = JSON.parse(initialDataJSONString).planets['Tatooine'];
             game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetTatooine.x, planetTatooine.y) == 2320;
         });
         it('calc distance between Alderaan nad Tuchanka', async function() {
             let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
             let planetTuchanka = JSON.parse(initialDataJSONString).planets['Tuchanka'];
             game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetTuchanka.x, planetTuchanka.y) == 2080;
         });
         it('calc distance between Alderaan nad Ziemia', async function() {
             let planetAlderaan = JSON.parse(initialDataJSONString).planets['Alderaan'];
             let planetZiemia = JSON.parse(initialDataJSONString).planets['Ziemia'];
             game.calculatePlanetTravelTime(planetAlderaan.x, planetAlderaan.y, planetZiemia.x, planetZiemia.y) == 6305;
         });
         it('calc distance between Argoland nad Arrakis', async function() {
             let planetArgoland = JSON.parse(initialDataJSONString).planets['Argoland'];
             let planetArrakis = JSON.parse(initialDataJSONString).planets['Arrakis'];
             game.calculatePlanetTravelTime(planetArgoland.x, planetArgoland.y, planetArrakis.x, planetArrakis.y) == 584;
         });
         it('calc distance between Argoland nad Corellia', async function() {
             let planetArgoland = JSON.parse(initialDataJSONString).planets['Argoland'];
             let planetCorellia = JSON.parse(initialDataJSONString).planets['Corellia'];
             game.calculatePlanetTravelTime(planetArgoland.x, planetArgoland.y, planetCorellia.x, planetCorellia.y) == 881;
         });
         it('calc distance between Argoland nad Encja', async function() {
             let planetArgoland = JSON.parse(initialDataJSONString).planets['Argoland'];
             let planetEncja = JSON.parse(initialDataJSONString).planets['Encja'];
             game.calculatePlanetTravelTime(planetArgoland.x, planetArgoland.y, planetEncja.x, planetEncja.y) == 1168;
         });
         it('calc distance between Argoland nad Gaia', async function() {
             let planetArgoland = JSON.parse(initialDataJSONString).planets['Argoland'];
             let planetGaia = JSON.parse(initialDataJSONString).planets['Gaia'];
             game.calculatePlanetTravelTime(planetArgoland.x, planetArgoland.y, planetGaia.x, planetGaia.y) == 1280;
         });
         it('calc distance between Argoland nad Ksi', async function() {
             let planetArgoland = JSON.parse(initialDataJSONString).planets['Argoland'];
             let planetKsi = JSON.parse(initialDataJSONString).planets['Ksi'];
             game.calculatePlanetTravelTime(planetArgoland.x, planetArgoland.y, planetKsi.x, planetKsi.y) == 1753;
         });
         it('calc distance between Argoland nad Leonida', async function() {
             let planetArgoland = JSON.parse(initialDataJSONString).planets['Argoland'];
             let planetLeonida = JSON.parse(initialDataJSONString).planets['Leonida'];
             game.calculatePlanetTravelTime(planetArgoland.x, planetArgoland.y, planetLeonida.x, planetLeonida.y) == 2250;
         });
         it('calc distance between Argoland nad NowWhat', async function() {
             let planetArgoland = JSON.parse(initialDataJSONString).planets['Argoland'];
             let planetNowWhat = JSON.parse(initialDataJSONString).planets['NowWhat'];
             game.calculatePlanetTravelTime(planetArgoland.x, planetArgoland.y, planetNowWhat.x, planetNowWhat.y) == 585;
         });
         it('calc distance between Tairia nad Tatooine', async function() {
             let planetTairia = JSON.parse(initialDataJSONString).planets['Tairia'];
             let planetTatooine = JSON.parse(initialDataJSONString).planets['Tatooine'];
             game.calculatePlanetTravelTime(planetTairia.x, planetTairia.y, planetTatooine.x, planetTatooine.y) == 377;
         });
         it('calc distance between Tairia nad Tuchanka', async function() {
             let planetTairia = JSON.parse(initialDataJSONString).planets['Tairia'];
             let planetTuchanka = JSON.parse(initialDataJSONString).planets['Tuchanka'];
             game.calculatePlanetTravelTime(planetTairia.x, planetTairia.y, planetTuchanka.x, planetTuchanka.y) == 145;
         });
         it('calc distance between Tairia nad Ziemia', async function() {
             let planetTairia = JSON.parse(initialDataJSONString).planets['Tairia'];
             let planetZiemia = JSON.parse(initialDataJSONString).planets['Ziemia'];
             game.calculatePlanetTravelTime(planetTairia.x, planetTairia.y, planetZiemia.x, planetZiemia.y) == 6964;
         });
         it('calc distance between Tatooine nad Tuchanka', async function() {
             let planetTatooine = JSON.parse(initialDataJSONString).planets['Tatooine'];
             let planetTuchanka = JSON.parse(initialDataJSONString).planets['Tuchanka'];
             game.calculatePlanetTravelTime(planetTatooine.x, planetTatooine.y, planetTuchanka.x, planetTuchanka.y) == 464;
         });
         it('calc distance between Tatooine nad Ziemia', async function() {
             let planetTatooine = JSON.parse(initialDataJSONString).planets['Tatooine'];
             let planetZiemia = JSON.parse(initialDataJSONString).planets['Ziemia'];
             game.calculatePlanetTravelTime(planetTatooine.x, planetTatooine.y, planetZiemia.x, planetZiemia.y) == 4145;
         });
         it('calc distance between Tuchanka nad Ziemia', async function() {
             let planetTuchanka = JSON.parse(initialDataJSONString).planets['Tuchanka'];
             let planetZiemia = JSON.parse(initialDataJSONString).planets['Ziemia'];
             game.calculatePlanetTravelTime(planetTuchanka.x, planetTuchanka.y, planetZiemia.x, planetZiemia.y) == 7193;
         });
        });
