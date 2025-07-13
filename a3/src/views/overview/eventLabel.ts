import { Observer } from "../../observer";
import { Model } from "../../model";
import { Event } from "../../model";

export class EventLabel  implements Observer {
  // checkBox = new SKCheckBox({
  //   selected: false,
  //   width: 16,
  //   height: 16,
  //   margin: 4,
  // });

  checkBox = document.createElement("input").type = "checkbox";


  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model, private event: Event) {
    // super();
    // this.fillWidth = 1;
    // this.height = 24 * (event.end - event.start);
    // this.border = "1px solid black";
    // this.fill = "lightblue";
    // this.margin = 4;

    this.container = document.createElement("div");

    this.checkBox.selected = this.event.selected;
    this.root.appendChild(this.checkBox);

    this.addChild(
      new SKLabel({
        text: this.event.description,
      })
    );


    this.checkBox.addEventListener("click", () => {
      this.model.selectEvent(this.event);
      console.log("Event selected:", this.event);
      this.checkBox.selected = this.event.selected;
    });

    this.container.addEventListener("dblclick", () => {
      this.model.editEvent(this.event);
    });

    this.model.addObserver(this);
  }

  update() {}
}
