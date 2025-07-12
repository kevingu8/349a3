import { Layout, SKContainer } from "simplekit/imperative-mode";
import { SKButton } from "../widgets/skButton";
import { Observer } from "../observer";
import { Model } from "../model";

export class ModeSwitch extends SKContainer implements Observer {

  private agendaButton = new SKButton({
    text: "Agenda",
    width: 80,
    margin: 8,
  });

  private filler = new SKContainer({
    fillWidth: 1,
  });

  private overviewButton = new SKButton({
    text: "Overview",
    width: 80,
    margin: 8,
  });

  constructor(private model: Model) {
    super();

    this.id = "mode-switch";

    // setup the view design
    this.fillWidth = 1;
    this.fillHeight = 1;
  
    this.layoutMethod = new Layout.FillRowLayout();

    // controllers

    this.agendaButton.addEventListener("action", () => {
      if (this.model.numberSelectedEvents > 0) {
        model.curEvent = this.model.selectedEvents[0];
        model.curEventIdx = 1;
        model.setMode('Agenda');
      }
    });

    this.overviewButton.addEventListener("action", () => {
      model.setMode('Overview');
    });

    // register with the model when we're ready
    this.model.addObserver(this);
  }

  update() {
    this.clearChildren();
    this.agendaButton.state =  this.model.selectedEvents.length === 0 ? "disabled" : "idle";

    if (this.model.getMode() === "Overview") {
      this.addChild(this.filler)
      this.addChild(this.agendaButton);
      this.fill = "lightgray"
    } else {
      this.addChild(this.filler)
      this.addChild(this.overviewButton);
      this.fill = "lightblue"
    }
  }
}
