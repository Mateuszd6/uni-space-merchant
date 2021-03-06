class HighscoreManager {
    constructor(highscoresJSON) {
        this.highscores = JSON.parse(highscoresJSON);
        if (this.highscores == null || this.highscores.length === 0) {
            this.highscores = [
                { "name": "Bill Gates", "score": 2413 },
                { "name": "Steve Jobs", "score": 2108 },
                { "name": "Satya Nadella", "score": 2072 },
                { "name": "Biarne Stroustroup", "score": 1998 },
                { "name": "Steve Ballmer", "score": 1963 }
            ];
        }
    }
    tryAddToHighscores(name, score) {
        let retval = false;
        let scr = {
            "name": name,
            "score": score
        };
        if ((this.highscores.length < 10)) {
            this.highscores.push(scr);
            retval = true;
        }
        else if (this.highscores.length === 10 && this.highscores[9].score <= scr.score) {
            this.highscores[9] = scr;
            retval = true;
        }
        this.highscores = this.highscores
            .sort((x, y) => y.score - x.score)
            .slice(0, 10);
        return retval;
    }
    getAsJson() {
        return JSON.stringify(this.highscores);
    }
}
export { HighscoreManager };
