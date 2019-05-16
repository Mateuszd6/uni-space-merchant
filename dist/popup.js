class Popup {
    constructor(id, refreshPeriodically, onOpen) {
        let popup = (document.querySelector(id));
        let closeBtn = (popup.querySelector(".close"));
        closeBtn.onclick = () => this.close();
        this.content = popup;
        this.onOpen = onOpen;
        this.refreshPeriodically = refreshPeriodically;
    }
    display(val) {
        this.val = val;
        this.onOpen(this.content, this.val);
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
export { Popup };
