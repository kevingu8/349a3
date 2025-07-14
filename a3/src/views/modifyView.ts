
import { Observer } from "../observer";
import { Model } from "../model";
import { QuantityWidget } from "../widgets/quantity";
import "./modifyView.css"

export class ModifyView implements Observer {
  // private filler = new SKContainer({
  //   fillWidth: 1,
  // });
  private filler = document.createElement("div");

  private container = document.createElement("div");

   get root(): HTMLDivElement {
    return this.container
  }

  update() {
    this.container.replaceChildren();
    this.container.className = "modify-view"

    // const description = new SKContainer({
    //   id: "modify-description",
    //   fillWidth: 1,
    //   layoutMethod: new Layout.FillRowLayout(),
    // });
    const description = document.createElement("div")
    description.id = "modify-description"

    // const dayOfWeek = new SKContainer({
    //   id: "day-of-week",
    //   fillWidth: 1,
    //   layoutMethod: new Layout.FillRowLayout(),
    //   margin: 8,
    // });
    const dayOfWeek = document.createElement("div");
    dayOfWeek.id = "day-of-week";

    // const startTime = new SKContainer({
    //   id: "start-time",
    //   fillWidth: 1,
    //   layoutMethod: new Layout.FillRowLayout(),
    //   margin: 8,
    // });
    const startTime = document.createElement("div");
    startTime.id = "start-time";

    // const endTime = new SKContainer({
    //   id: "end-time",
    //   fillWidth: 1,
    //   layoutMethod: new Layout.FillRowLayout(),
    //   margin: 8,
    // });
    const endTime = document.createElement("div");
    endTime.id = "end-time";

    // const Buttons = new SKContainer({
    //   fillWidth: 1,
    //   layoutMethod: new Layout.FillRowLayout(),
    //   margin: 8,
    // });
    const Buttons = document.createElement("div");

    // this.descriptionField = new SKTextfield({
    //   id: "description-field",
    //   text: this.model.editingEvent.description,
    //   width: 200,
    //   margin: 8,
    // });
    this.descriptionField = document.createElement("input");
    this.descriptionField.id = "description-field";

    this.dayOfWeekWidget.counter = this.model.editingEvent.day;
    this.startTimeWidget.counter = this.model.editingEvent.start;
    this.endTimeWidget.counter = this.model.editingEvent.end;

    description.appendChild(this.filler);

    const descriptionText = document.createElement("span");
    descriptionText.innerText = "Description";
    descriptionText.className = "modifyView-texts"
    description.appendChild(descriptionText);
    description.appendChild(this.descriptionField);
    description.appendChild(this.filler);

    this.root.appendChild(description);


    const dayOfWeekText = document.createElement("span");
    dayOfWeekText.innerText = "Day of Week";
    dayOfWeekText.className = "modifyView-texts";
    dayOfWeek.appendChild(this.filler);
    dayOfWeek.appendChild(dayOfWeekText);
    dayOfWeek.appendChild(this.dayOfWeekWidget.root);
    dayOfWeek.appendChild(this.filler);

    this.root.appendChild(dayOfWeek);


    const startTimeText = document.createElement("span");
    startTimeText.innerText = "Start Time";
    startTimeText.className = "modifyView-texts";
    startTime.appendChild(this.filler);
    startTime.appendChild(startTimeText);
    startTime.appendChild(this.startTimeWidget.root);
    startTime.appendChild(this.filler);
    this.root.appendChild(startTime);


    const endTimeText = document.createElement("span")
    endTimeText.innerText = "End Time";
    endTimeText.className = "modifyView-texts";
    endTime.appendChild(this.filler);
    endTime.appendChild(endTimeText);
    endTime.appendChild(this.endTimeWidget.root);
    endTime.appendChild(this.filler);
    this.root.appendChild(endTime);

    Buttons.appendChild(this.filler);
    Buttons.appendChild(this.saveButton);
    Buttons.appendChild(this.cancelButton);
    this.root.appendChild(Buttons);
  }

  // descriptionField: SKTextfield = new SKTextfield();
  descriptionField: HTMLInputElement = document.createElement("input");
  dayOfWeekWidget: QuantityWidget = new QuantityWidget();
  startTimeWidget: QuantityWidget = new QuantityWidget();
  endTimeWidget: QuantityWidget = new QuantityWidget();

  // saveButton = new SKButton({
  //   text: "Save",
  //   width: 80,
  //   margin: 8,
  // });
  // cancelButton = new SKButton({
  //   text: "Cancel",
  //   width: 80,
  //   margin: 8,
  // });

  saveButton = document.createElement("button");
  cancelButton = document.createElement("button");

  constructor(private model: Model) {
    // this.id = "main";
    // this.fillWidth = 0.5;
    // this.fillHeight = 0.5;
    // this.border = "1px solid black";
    // this.width = 300;
    // this.height = 500;
    // this.fill = "whitesmoke";
    // this.margin = 80;
    // this.padding = 40;
    // this.layoutMethod = new StackColLayout();

    this.filler.id = "filler"
    // setup the view design
    this.dayOfWeekWidget = new QuantityWidget({
      counter: this.model.editingEvent.day,
      min_value: 0,
      max_value: 6,
      default_count: 0,
      default_text: this.model.day_of_week_sim[this.model.editingEvent.day],
      mapping: (value: number) => {
        return this.model.day_of_week_sim[value];
      },
    });

    this.saveButton.innerText = "Save";
    this.cancelButton.innerText = "Cancel";

    this.startTimeWidget = new QuantityWidget({
      counter: this.model.editingEvent.start,
      min_value: 0,
      max_value: 23,
      default_count: 0,
      mapping: (value: number) => {
        return value.toString();
      },
    });

    this.endTimeWidget = new QuantityWidget({
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
          this.endTimeWidget.resetButton.innerText = this.endTimeWidget.mapping(
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
          this.startTimeWidget.resetButton.innerText = this.startTimeWidget.mapping(
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
    this.saveButton.addEventListener("click", () => {
      this.model.modifyEvent(
        this.model.editingEvent,
        this.descriptionField.innerText,
        this.dayOfWeekWidget.counter,
        this.startTimeWidget.counter,
        this.endTimeWidget.counter
      );
    });

    this.cancelButton.addEventListener("click", () => {
      this.model.cancelModifyEvent();
    });

    // register with the model when we're ready
    model.addObserver(this);
  }
}
