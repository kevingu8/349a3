import { SKContainer } from "simplekit/imperative-mode";
import { Observer } from "../../observer";
import { Model } from "../../model";
import { StackColLayout } from "../../layouts/stackCol";
import { EventLabel } from "./eventLabel";

export class DayBody extends SKContainer implements Observer {
  constructor(private model: Model, private day: number) {
    super();
    this.id = "middle";
    this.fillWidth = 1;
    this.height = 24 * 24

    this.layoutMethod = new StackColLayout();

    this.model.addObserver(this);
  }

  update() {
    this.clearChildren();
    const todayEvents = this.model.getEventsByDay(this.day);
    todayEvents.sort((a, b) => a.start - b.start);
    todayEvents.forEach((event, index) => {

      if (index === 0) {
        const topPadding = 24 * event.start; // 24px per hour
        const topSeparator = new SKContainer({
          height: topPadding,
          fill: "lightgray",
        });
        this.addChild(topSeparator);
      }

      const eventLabel = new EventLabel(this.model, event);
      this.addChild(eventLabel);

      if (index < todayEvents.length - 1) {
        const nextEvent = todayEvents[index + 1];
        const separator = new SKContainer({
          height: 24 * (nextEvent.start - event.end),
          fill: "lightgray",
        });
        this.addChild(separator);
      }
    });
  }
}
