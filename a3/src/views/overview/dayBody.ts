import { Observer } from "../../observer";
import { Model } from "../../model";
import { EventLabel } from "./eventLabel";

export class DayBody implements Observer {
  constructor(private model: Model, private day: number) {

    // this.fillWidth = 1;
    // this.height = 24 * 24
    this.container = document.createElement("div");
    this.container.className = "middle";

    this.model.addObserver(this);
  }

  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  update() {
    this.root.replaceChildren();
    const todayEvents = this.model.getEventsByDay(this.day);
    todayEvents.sort((a, b) => a.start - b.start);
    todayEvents.forEach((event, index) => {

      if (index === 0) {
        const topPadding = 24 * event.start; // 24px per hour
        const topSeparator = document.createElement("div");
        
        
        // new SKContainer({
        //   height: topPadding,
        //   fill: "lightgray",
        // });
        this.root.appendChild(topSeparator);
      }

      const eventLabel = new EventLabel(this.model, event);
      this.root.appendChild(eventLabel.root);

      if (index < todayEvents.length - 1) {
        const nextEvent = todayEvents[index + 1];
        const separator = document.createElement("div");
        
        // new SKContainer({
        //   height: 24 * (nextEvent.start - event.end),
        //   fill: "lightgray",
        // });
        this.root.appendChild(separator);
      }
    });
  }
}
