import {
  startSimpleKit,
  setSKRoot,
  SKContainer,
  Layout,
} from "simplekit/imperative-mode";

import { Model } from "./model";
import { MainView } from "./views/mainView";
import { ModifyView } from "./views/modifyView";
import { FrontToBackLayout } from "./layouts/frontToBackLayout";

const model = new Model();

const root = new SKContainer({
  id: "root",
  fillWidth: 1,
  fillHeight: 1,
  layoutMethod: new Layout.FillRowLayout(),
});

root.addChild(new MainView(model));


setSKRoot(root);

startSimpleKit();
