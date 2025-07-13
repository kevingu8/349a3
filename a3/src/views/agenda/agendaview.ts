import { Observer } from "../../observer";
import { Model } from "../../model";

export class agendaView  implements Observer {
  // prevButton = new SKButton({
  //   text: "Previous",
  //   width: 80,
  // });

  // nextButton = new SKButton({
  //   text: "Next",
  //   width: 80,
    
  // });

  prevButton = document.createElement("button");
  nextButton = document.createElement("button");

  buttonsContainer = document.createElement("div");

  // buttonsContainer = new SKContainer({
  //   fillWidth: 1,
  //   layoutMethod: new Layout.FillRowLayout({ gap: 8 }),
  // });

  filler = document.createElement("div");

  // private filler = new SKContainer({
  //   fillWidth: 1,
  // });

  private container: HTMLDivElement;
  get root(): HTMLDivElement {
    return this.container;
  }

  constructor(private model: Model, private day: number) {
    // super();
    // this.id = "middle";
    // this.fillWidth = 1;
    // this.fillHeight = 1;
    // this.height = 600;
    // this.margin = 8;
    // this.border = "1px solid black";


    this.container = document.createElement("div");
    this.container.className = "middle";

    this.prevButton.innerText = "Previous";
    this.nextButton.innerText = "Next";

    this.model.addObserver(this);
    this.buttonsContainer.appendChild(this.filler);
    this.buttonsContainer.appendChild(this.prevButton);
    this.buttonsContainer.appendChild(this.nextButton);
    this.buttonsContainer.appendChild(this.filler);

    this.prevButton.addEventListener("action", () => {
      this.model.prevTask();
    });

    this.nextButton.addEventListener("action", () => {
      this.model.nextTask();
    });
  }

  desc = document.createElement("div");

  // private desc = new SKContainer({
  //   fillWidth: 1,
  //   layoutMethod: new StackColLayout(),
  //   margin: 230,
  // });

  update() {
    // this.root.replaceChildren();
    // this.desc.replaceChildren();
    // this.desc.appendChild(new SKLabel({
    //   text: `${this.model.curEvent.description}`,
    //   fillWidth: 1,
    //   height: 50,
    //   fillHeight: 1,
    // }))
    // this.desc.appendChild(new SKLabel({
    //   text: `${this.model.day_of_week[this.model.curEvent.day]} ${this.model.curEvent.start}:00 - ${this.model.curEvent.end}:00`,
    //   height: 50,
    //   fillWidth: 1,
    //   fillHeight: 1,
    // }))

    // this.prevButton.state = this.model.curEventIdx > 1 ? "idle" : "disabled";
    // this.nextButton.state = this.model.curEventIdx < this.model.numberSelectedEvents ? "idle" : "disabled";

    // this.root.appendChild(this.desc);
    // this.root.appendChild(this.buttonsContainer);
  }
}
