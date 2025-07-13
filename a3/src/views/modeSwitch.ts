import { Observer } from "../observer";
import { Model } from "../model";

export class ModeSwitch implements Observer {

  // private agendaButton = new SKButton({
  //   text: "Agenda",
  //   width: 80,
  //   margin: 8,
  // });

  agendaButton = document.createElement("button");
  overviewButton = document.createElement("button");


  // private filler = new SKContainer({
  //   fillWidth: 1,
  // });

  // private overviewButton = new SKButton({
  //   text: "Overview",
  //   width: 80,
  //   margin: 8,
  // });

  private container: HTMLDivElement;
  get root(): HTMLDivElement {
        return this.container;
  }

  constructor(private model: Model) {

    // controllers
    this.container = document.createElement("div");
    this.container.className = "mode-switch";

    this.agendaButton.innerText = "Agenda";
    this.overviewButton.innerText = "Overview";

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
    // this.root.replaceChildren();
    // this.agendaButton.state =  this.model.selectedEvents.length === 0 ? "disabled" : "idle";

    // if (this.model.getMode() === "Overview") {
    //   this.root.appendChild(this.filler)
    //   this.root.appendChild(this.agendaButton);
    //   this.fill = "lightgray"
    // } else {
    //   this.root.appendChild(this.filler)
    //   this.root.appendChild(this.overviewButton);
    //   this.fill = "lightblue"
    // }
  }
}
