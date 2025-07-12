import { Layout, SKContainer, SKLabel } from "simplekit/imperative-mode";
import { Observer } from "../../observer";
import { Model } from "../../model";
import { StackColLayout } from "../../layouts/stackCol";
import { SKCheckBox } from "../../widgets/checkBox";
import { Event } from "../../model";

export class EventLabel extends SKContainer implements Observer {
  checkBox = new SKCheckBox({
    selected: false,
    width: 16,
    height: 16,
    margin: 4,
  });


  constructor(private model: Model, private event: Event) {
    super();
    this.fillWidth = 1;
    this.height = 24 * (event.end - event.start);
    this.border = "1px solid black";
    this.fill = "lightblue";
    this.margin = 4;

    this.layoutMethod = new Layout.FillRowLayout({gap: 4});

    this.checkBox.selected = this.event.selected;
    this.addChild(this.checkBox);

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

    this.addEventListener("dblclick", () => {
      this.model.editEvent(this.event);
    });

    this.model.addObserver(this);
  }

  update() {}
}
