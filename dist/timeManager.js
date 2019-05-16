// Formats the time so thats in can be nicely display to the user.
function formatTime(timeMS) {
    if (Number.isNaN(timeMS) || timeMS < 1000)
        return "0sec ";
    let allSeconds = Math.floor(timeMS / 1000);
    let minutes = Math.floor(allSeconds / 60);
    let seconds = allSeconds % 60;
    let minutesStr = minutes == 0 ? "" : (minutes.toString() + "min ");
    let secondsStr = seconds == 0 ? "" : (seconds.toString() + "sec ");
    return minutesStr + secondsStr;
}
class TimeManager {
    constructor(element, timeLimit, onUpdate, onFinish) {
        this.element = element;
        this.startTimePoint = new Date();
        this.timeLimit = timeLimit;
        this.element.textContent = formatTime(this.timeLimit);
        this.onUpdate = onUpdate;
        this.onFinish = onFinish;
    }
    start() {
        this.element.textContent = formatTime(0);
        this.timerToken = setInterval(() => {
            let timeLeft = this.timeLimit * 1000 -
                (new Date().getTime() - this.startTimePoint.getTime());
            if (timeLeft < 0) {
                console.log("The game will now finish");
                this.onFinish(); // finishGame();
            }
            this.element.textContent = formatTime(timeLeft);
            this.onUpdate(); // updateMainScrShipList();
        }, 500);
    }
    stop() {
        clearTimeout(this.timerToken);
    }
}
export { formatTime, TimeManager };
