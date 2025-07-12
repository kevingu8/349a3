import { SKContainer } from "simplekit/imperative-mode";
import { Observer } from "../observer";
import { ToolBar } from "./overview/toolBar";
import { Grid } from "./overview/grid";
import { Model } from "../model";
import { StackColLayout } from "../layouts/stackCol";

export class Middle extends SKContainer implements Observer {

    toolbar: ToolBar;
    grid: Grid;

  constructor(private model: Model) {
    super();
    this.id = "middle";
    this.fillWidth = 1;
    this.fillHeight = 1;
    this.margin = 8;
    this.border = "1px solid black";

    this.layoutMethod = new StackColLayout();

    this.toolbar = new ToolBar(model);
    this.grid = new Grid(model);

    this.addChild(this.toolbar);
    this.addChild(this.grid);

    this.model.addObserver(this);
  }

  update() {}
}
