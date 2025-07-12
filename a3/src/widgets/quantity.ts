import { SKButton, SKContainer, Layout } from "simplekit/imperative-mode";
type SKQuantityWidgetProps = {
  counter?: number;
  min_value?: number;
  max_value?: number;
  default_count?: number;
  default_text?: string;
  mapping?: (value: number) => string;
  addEffect?: (value: number) => boolean;
  minusEffect?: (value: number) => boolean;
};

export class SKQuantityWidget extends SKContainer {
  counter = 1;
  default_count = 1;
  default_text = "0";
  mapping: (value: number) => string = (value: number) => value.toString();
  addEffect: (value: number) => boolean = () => { return true; };
  minusEffect: (value: number) => boolean = () => { return true; };

  incrementButton = new SKButton({ text: "+", width: 30 });
  resetButton = new SKButton({ text: "?", width: 30 });
  decrementButton = new SKButton({ text: "-", width: 30 });

  constructor({
    counter = 1,
    min_value = 1,
    max_value = 99,
    default_count = 0,
    default_text = "0",
    mapping = (value: number) => value.toString(),
    addEffect = () => { return true; }, 
    minusEffect = () => { return true; }
  }: SKQuantityWidgetProps = {}) {
    super();
    this.counter = counter;
    this.default_count = default_count;
    this.resetButton.text = default_text !== "0" ? default_text : this.mapping(this.counter);
    this.mapping = mapping;
    this.addEffect = addEffect;
    this.minusEffect = minusEffect;
    
    this.layoutMethod = new Layout.FillRowLayout({ gap: 0 });
    

    this.addChild(this.decrementButton);
    this.addChild(this.resetButton);
    this.addChild(this.incrementButton);

    // controller
    this.incrementButton.addEventListener("action", () => {
      if (this.counter < max_value) {
        if (this.addEffect(this.counter)) {
          this.counter++;
          this.resetButton.text = this.mapping(this.counter);
        }
      }
    });

    this.decrementButton.addEventListener("action", () => {
      if (this.counter > min_value) {
        if (this.minusEffect(this.counter)) {
          this.counter--;
          this.resetButton.text = this.mapping(this.counter);
        }
      }
    });

    this.resetButton.addEventListener("action", () => {
      this.counter = this.default_count;
      this.resetButton.text = this.mapping(this.counter);
      this.addEffect(this.counter);
    });
  }
}
