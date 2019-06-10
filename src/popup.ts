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
        this.content.style.visibility = "visible";
        this.content.style.opacity = "1";

        if (this.refreshPeriodically)
            this.counter = window.setInterval(() => this.refresh(), 500);
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

export {Popup};
