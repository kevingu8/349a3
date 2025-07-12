import { Layout, SKContainer, SKLabel } from "simplekit/imperative-mode";
import { Observer } from "../../observer";
import { Model } from "../../model";
import { DayBody } from "./dayBody";
import { StackColLayout } from "../../layouts/stackCol";

export class Grid extends SKContainer implements Observer {

  dayLabels = new SKContainer(
    {
      id: "day-labels",
      fillWidth: 1,
      fillHeight: 1,
      layoutMethod: new Layout.FillRowLayout({ gap: 4 }),
      border: "1px solid black",
    }
  );

  dayBodies = new SKContainer({
    id: "day-bodies",
    fillWidth: 1,
    fillHeight: 1,
    layoutMethod: new Layout.FillRowLayout({ gap: 4 }),
    margin: 4,
  });

  constructor(private model: Model) {
    super();
    this.id = "middle";
    this.fillWidth = 1;
    this.fillHeight = 1;
    this.border = "1px solid black";

    this.layoutMethod = new StackColLayout();

    this.addChild(this.dayLabels);
    this.addChild(this.dayBodies);
    this.model.addObserver(this);
  }

  update() {
    this.dayLabels.clearChildren();
    this.dayBodies.clearChildren();

    this.model.day_of_week.forEach((day, index) => {
      const dayLabel = new SKLabel({
        text: day,
        fillWidth: 1,
      });

      dayLabel.font = "12pt sans-serif";
      
    
      const number_day = index
      const dayBody = new DayBody(this.model, number_day);

      this.dayLabels.addChild(dayLabel);
      this.dayBodies.addChild(dayBody);
    });
  }
}
