import { SKLabel, SKContainer } from "simplekit/imperative-mode";
import { Observer } from "../observer";
import { Model } from "../model";

export class Status extends SKContainer implements Observer {
    label = new SKLabel({
        text: "this is the status section"
    })

    constructor(private model: Model) {
        super();
        this.id = "status";
        this.fillWidth = 1;
        this.fillHeight = 1;
        this.fill = "lightgray";

        this.addChild(this.label);

        this.model.addObserver(this);
    }
    
    update() {
        if (this.model.getMode() === "Overview") {
            if (this.model.numberEvents === 0) {
                this.label.text = "";
            } else if (this.model.numberEvents === 1) {
                this.label.text = `${this.model.numberEvents} event (${this.model.numberSelectedEvents} selected)`;
            } else {
                if (this.model.numberSelectedEvents === 0) {
                    this.label.text = `${this.model.numberEvents} events`;
                } else {
                    this.label.text = `${this.model.numberEvents} events (${this.model.numberSelectedEvents} selected)`;
                }
            }
            
        } else {
            this.label.text = `Event ${this.model.curEventIdx} of ${this.model.numberSelectedEvents}`;
        }
        this.label.margin = 8;
        
    }
}