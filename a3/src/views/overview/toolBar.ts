import { Observer } from "../../observer";
import { Model } from "../../model";
import "./toolBar.css"

export class ToolBar  implements Observer {

  // allButton = new SKButton({
  //     text: "All",
  //     width: 80,
  //   });

  allButton = document.createElement("button")
  noneButton = document.createElement("button")
  deleteButton = document.createElement("button")
  addButton = document.createElement("button")
    
  // noneButton = new SKButton({
  //     text: "None",
  //     width: 80,
  //   });

  // deleteButton = new SKButton({
  //     text: "Delete",
  //     width: 80,
  //   });

  // addButton = new SKButton({
  //     text: "Add",
  //     width: 80,
  //   });

  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model) {
    // super();
    // this.id = "middle";
    // this.fillWidth = 1;
    // this.fillHeight = 1;
    // this.margin = 8;

    this.container = document.createElement("div");
    this.container.className = "middle";

    this.allButton.innerText = "All";
    this.noneButton.innerText = "None";
    this.deleteButton.innerText = "Delete";
    this.addButton.innerText = "Add";

    this.root.appendChild(this.allButton);
    this.root.appendChild(this.noneButton);
    this.root.appendChild(this.deleteButton);
    this.root.appendChild(this.addButton);

    
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
    // this.deleteButton.state = this.model.numberSelectedEvents > 0 ? "idle" : "disabled";
    // this.allButton.state = this.model.numberSelectedEvents === this.model.numberEvents ? "disabled" : "idle";
    // this.noneButton.state = this.model.numberSelectedEvents === 0 ? "disabled" : "idle";
    // this.addButton.state = this.model.numberEvents === 10 ? "disabled" : "idle";
  }
}