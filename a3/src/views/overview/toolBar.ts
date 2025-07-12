import { SKContainer, Layout } from "simplekit/imperative-mode";
import { SKButton } from "../../widgets/skButton";
import { Observer } from "../../observer";
import { Model } from "../../model";

export class ToolBar extends SKContainer implements Observer {

  allButton = new SKButton({
      text: "All",
      width: 80,
    });
    
  noneButton = new SKButton({
      text: "None",
      width: 80,
    });

  deleteButton = new SKButton({
      text: "Delete",
      width: 80,
    });

  addButton = new SKButton({
      text: "Add",
      width: 80,
    });

  constructor(private model: Model) {
    super();
    this.id = "middle";
    this.fillWidth = 1;
    this.fillHeight = 1;
    this.margin = 8;

    this.layoutMethod = new Layout.FillRowLayout({ gap: 8 });

    this.addChild(this.allButton);
    this.addChild(this.noneButton);
    this.addChild(this.deleteButton);
    this.addChild(this.addButton);

    
    // Controllers
    this.allButton.addEventListener("action", () => {
      this.model.selectAllEvents();
    });

    this.noneButton.addEventListener("action", () => {
      this.model.deselectAllEvents();
    });

    this.deleteButton.addEventListener("action", () => {
      this.model.removeSelectedEvent();
    });

    this.addButton.addEventListener("action", () => {
      this.model.addEvent();
    });

    this.model.addObserver(this);
  }

  update() {
    this.deleteButton.state = this.model.numberSelectedEvents > 0 ? "idle" : "disabled";
    this.allButton.state = this.model.numberSelectedEvents === this.model.numberEvents ? "disabled" : "idle";
    this.noneButton.state = this.model.numberSelectedEvents === 0 ? "disabled" : "idle";
    this.addButton.state = this.model.numberEvents === 10 ? "disabled" : "idle";
  }
}