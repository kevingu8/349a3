import { SKContainer } from "simplekit/imperative-mode";
import { Observer } from "../observer";
import { Model } from "../model";
import { Middle } from "./middle";
import { StackColLayout } from "../layouts/stackCol";
import { ModeSwitch } from "./modeSwitch";
import { Status } from "./status";
import { agendaView } from "./agenda/agendaview";

export class InnerView extends SKContainer implements Observer {
  update() {
    this.clearChildren();
    if (this.model.getMode() === "Overview") {
      this.addChild(this.modeSwitch);
      this.addChild(this.middle);
      this.addChild(this.status)
    }
    else {
      this.addChild(this.modeSwitch);
      this.addChild(this.agendaView);
      this.addChild(this.status)
    }
    // remove all child observers from model to avoid memory leak
  }

  middle: Middle;
  modeSwitch: ModeSwitch;
  status: Status;
  agendaView: agendaView

  constructor(private model: Model) {
    super();

    this.id = "inner";


    this.middle = new Middle(model);
    this.modeSwitch = new ModeSwitch(model);
    this.status = new Status(model);
    this.agendaView = new agendaView(model, 0);

    // setup the view design
    this.fillWidth = 1;
    this.fillHeight = 1;

    this.layoutMethod = new StackColLayout()

    

    // controllers
    this.modeSwitch.addEventListener("action", () => {
      model.setMode('Agenda');
    });

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
