import { SKContainer } from "simplekit/imperative-mode";
import { Observer } from "../observer";
import { Model } from "../model";
import { FrontToBackLayout } from "../layouts/frontToBackLayout";
import { InnerView } from "./innerView";
import { ModifyView } from "./modifyView";

export class MainView extends SKContainer implements Observer {
  update() {
   this.clearChildren();
    if (this.model.edit) {
      this.addChild(new InnerView(this.model));
      this.addChild(new ModifyView(this.model));
    }
    else {
      this.addChild(new InnerView(this.model));
    }
  }


  constructor(private model: Model) {
    super();

    this.id = "main";


    // setup the view design
    this.fillWidth = 1;
    this.fillHeight = 1;

    this.layoutMethod = new FrontToBackLayout(),

    this.addChild(new InnerView(model));

    // controllers

    // register with the model when we're ready
    this.model.addObserver(this);
  }
}
