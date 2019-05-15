// This class manages the player cash and updates the credits in the main
// screen.
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

export { CashManager };
