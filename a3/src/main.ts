
import { Model } from "./model";
import { MainView } from "./views/mainView";

const model = new Model();

const root = document.querySelector("div#app") as HTMLDivElement

root.append(new MainView(model).root);

