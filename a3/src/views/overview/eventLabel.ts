import { Observer } from "../../observer";
import { Model } from "../../model";
import { Event } from "../../model";
import "./eventLabel.css"

export class EventLabel  implements Observer {
  // checkBox = new SKCheckBox({
  //   selected: false,
  //   width: 16,
  //   height: 16,
  //   margin: 4,
  // });

  // checkBox = document.createElement("input").type = "checkbox";


  checkbox = document.createElement('input') as HTMLInputElement;
  


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
    this.checkbox.type    = 'checkbox';          // make it a checkbox
    this.checkbox.id      = 'accept-terms';      // give it an ID
    this.checkbox.name    = 'accept';            // form name (if inside a <form>)
    this.checkbox.value   = 'yes';               // submitted value when checked
    this.checkbox.checked = this.event.selected;               // default state

    this.root.appendChild(this.checkbox);

    const la = document.createElement("label");
    la.innerText = this.event.description;

    this.container.appendChild(
      la
    );


    this.checkbox.addEventListener("click", () => {
      this.model.selectEvent(this.event);
      console.log("Event selected:", this.event);
      this.checkbox.checked = this.event.selected;
    });

    this.container.addEventListener("dblclick", () => {
      this.model.editEvent(this.event);
    });

    this.model.addObserver(this);
  }

  update() {}
}
