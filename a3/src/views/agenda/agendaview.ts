import { Layout, SKContainer, SKLabel } from "simplekit/imperative-mode";
import { SKButton } from "../../widgets/skButton";
import { Observer } from "../../observer";
import { Model } from "../../model";
import { StackColLayout } from "../../layouts/stackCol";
import { EventLabel } from "../overview/eventLabel";

export class agendaView extends SKContainer implements Observer {
  prevButton = new SKButton({
    text: "Previous",
    width: 80,
  });

  nextButton = new SKButton({
    text: "Next",
    width: 80,
    
  });

  buttonsContainer = new SKContainer({
    fillWidth: 1,
    layoutMethod: new Layout.FillRowLayout({ gap: 8 }),
  });

  private filler = new SKContainer({
    fillWidth: 1,
  });

  constructor(private model: Model, private day: number) {
    super();
    this.id = "middle";
    this.fillWidth = 1;
    this.fillHeight = 1;
    this.height = 600;
    this.margin = 8;
    this.border = "1px solid black";
    this.layoutMethod = new StackColLayout();

    this.model.addObserver(this);
    this.buttonsContainer.addChild(this.filler);
    this.buttonsContainer.addChild(this.prevButton);
    this.buttonsContainer.addChild(this.nextButton);
    this.buttonsContainer.addChild(this.filler);

    this.prevButton.addEventListener("action", () => {
      this.model.prevTask();
    });

    this.nextButton.addEventListener("action", () => {
      this.model.nextTask();
    });
  }

  private desc = new SKContainer({
    fillWidth: 1,
    layoutMethod: new StackColLayout(),
    margin: 230,
  });

  update() {
    this.clearChildren();
    this.desc.clearChildren();
    this.desc.addChild(new SKLabel({
      text: `${this.model.curEvent.description}`,
      fillWidth: 1,
      height: 50,
      fillHeight: 1,
    }))
    this.desc.addChild(new SKLabel({
      text: `${this.model.day_of_week[this.model.curEvent.day]} ${this.model.curEvent.start}:00 - ${this.model.curEvent.end}:00`,
      height: 50,
      fillWidth: 1,
      fillHeight: 1,
    }))

    this.prevButton.state = this.model.curEventIdx > 1 ? "idle" : "disabled";
    this.nextButton.state = this.model.curEventIdx < this.model.numberSelectedEvents ? "idle" : "disabled";

    this.addChild(this.desc);
    this.addChild(this.buttonsContainer);
  }
}
