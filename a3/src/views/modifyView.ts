import {
  Layout,
  SKButton,
  SKContainer,
  SKLabel,
  SKTextfield,
} from "simplekit/imperative-mode";
import { Observer } from "../observer";
import { Model } from "../model";
import { StackColLayout } from "../layouts/stackCol";
import { SKQuantityWidget } from "../widgets/quantity";

export class ModifyView extends SKContainer implements Observer {
  private filler = new SKContainer({
    fillWidth: 1,
  });

  update() {
    this.clearChildren();
    const description = new SKContainer({
      id: "modify-description",
      fillWidth: 1,
      layoutMethod: new Layout.FillRowLayout(),
    });

    const dayOfWeek = new SKContainer({
      id: "day-of-week",
      fillWidth: 1,
      layoutMethod: new Layout.FillRowLayout(),
      margin: 8,
    });

    const startTime = new SKContainer({
      id: "start-time",
      fillWidth: 1,
      layoutMethod: new Layout.FillRowLayout(),
      margin: 8,
    });

    const endTime = new SKContainer({
      id: "end-time",
      fillWidth: 1,
      layoutMethod: new Layout.FillRowLayout(),
      margin: 8,
    });

    const Buttons = new SKContainer({
      fillWidth: 1,
      layoutMethod: new Layout.FillRowLayout(),
      margin: 8,
    });

    this.descriptionField = new SKTextfield({
      id: "description-field",
      text: this.model.editingEvent.description,
      width: 200,
      margin: 8,
    });

    this.dayOfWeekWidget.counter = this.model.editingEvent.day;
    this.startTimeWidget.counter = this.model.editingEvent.start;
    this.endTimeWidget.counter = this.model.editingEvent.end;

    description.addChild(this.filler);
    description.addChild(
      new SKLabel({
        width: 128,
        text: "Description",
        margin: 4,
      })
    );
    description.addChild(this.descriptionField);
    description.addChild(this.filler);
    this.addChild(description);

    dayOfWeek.addChild(this.filler);
    dayOfWeek.addChild(
      new SKLabel({
        width: 128,
        text: "Day of Week",
        margin: 4,
      })
    );
    dayOfWeek.addChild(this.dayOfWeekWidget);
    dayOfWeek.addChild(this.filler);
    this.addChild(dayOfWeek);

    startTime.addChild(this.filler);
    startTime.addChild(
      new SKLabel({
        width: 128,
        text: "Start Time",
        margin: 4,
      })
    );
    startTime.addChild(this.startTimeWidget);
    startTime.addChild(this.filler);
    this.addChild(startTime);

    endTime.addChild(this.filler);
    endTime.addChild(
      new SKLabel({
        width: 128,
        text: "End Time",
        margin: 4,
      })
    );
    endTime.addChild(this.endTimeWidget);
    endTime.addChild(this.filler);
    this.addChild(endTime);

    Buttons.addChild(this.filler);
    Buttons.addChild(this.saveButton);
    Buttons.addChild(this.cancelButton);
    this.addChild(Buttons);
  }

  descriptionField: SKTextfield = new SKTextfield();
  dayOfWeekWidget: SKQuantityWidget = new SKQuantityWidget();
  startTimeWidget: SKQuantityWidget = new SKQuantityWidget();
  endTimeWidget: SKQuantityWidget = new SKQuantityWidget();

  saveButton = new SKButton({
    text: "Save",
    width: 80,
    margin: 8,
  });
  cancelButton = new SKButton({
    text: "Cancel",
    width: 80,
    margin: 8,
  });

  constructor(private model: Model) {
    super();

    this.id = "main";
    this.fillWidth = 0.5;
    this.fillHeight = 0.5;
    this.border = "1px solid black";
    this.width = 300;
    this.height = 500;
    this.fill = "whitesmoke";
    this.margin = 80;
    this.padding = 40;
    this.layoutMethod = new StackColLayout();

    // setup the view design
    this.dayOfWeekWidget = new SKQuantityWidget({
      counter: this.model.editingEvent.day,
      min_value: 0,
      max_value: 6,
      default_count: 0,
      default_text: this.model.day_of_week_sim[this.model.editingEvent.day],
      mapping: (value: number) => {
        return this.model.day_of_week_sim[value];
      },
    });

    this.startTimeWidget = new SKQuantityWidget({
      counter: this.model.editingEvent.start,
      min_value: 0,
      max_value: 23,
      default_count: 0,
      mapping: (value: number) => {
        return value.toString();
      },
    });

    this.endTimeWidget = new SKQuantityWidget({
      counter: this.model.editingEvent.end,
      min_value: 0,
      max_value: 23,
      default_count: 0,
      mapping: (value: number) => {
        return value.toString();
      },
    });

    this.startTimeWidget.addEffect = (value: number) => {
      const currentEndTime = this.endTimeWidget.counter;
      if (value + 1 === currentEndTime) {
        if (this.endTimeWidget.counter < 23) {
          this.endTimeWidget.counter += 1;
          this.endTimeWidget.resetButton.text = this.endTimeWidget.mapping(
            this.endTimeWidget.counter
          );
        } else {
          return false;
        }
      }
      return true;
    };

    this.endTimeWidget.minusEffect = (value: number) => {
      if (value - 1 === this.startTimeWidget.counter) {
        if (this.startTimeWidget.counter > 0) {
          this.startTimeWidget.counter -= 1;
          this.startTimeWidget.resetButton.text = this.startTimeWidget.mapping(
            this.startTimeWidget.counter
          );
        } else {
          return false;
        }
      }
      return true;
    };

    // layoutMethod = new StackColLayout()

    // controllers
    this.saveButton.addEventListener("action", () => {
      this.model.modifyEvent(
        this.model.editingEvent,
        this.descriptionField.text,
        this.dayOfWeekWidget.counter,
        this.startTimeWidget.counter,
        this.endTimeWidget.counter
      );
    });

    this.cancelButton.addEventListener("action", () => {
      this.model.cancelModifyEvent();
    });

    // register with the model when we're ready
    model.addObserver(this);
  }
}
