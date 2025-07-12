import { SKElementProps, SKMouseEvent, Style } from "simplekit/imperative-mode";
import { SKElement } from "simplekit/imperative-mode";
import { insideHitTestRectangle } from "simplekit/utility";

type SKCheckBoxProps = SKElementProps & { selected?: boolean; height?: number; width?: number };

export class SKCheckBox extends SKElement {

  w: number;
  h: number;
  constructor({
    selected = false,
    width = 16,
    height = 16,
    ...otherElementProps
  }: SKCheckBoxProps = {}) {
    super({ ...otherElementProps });
    this.selected = selected;
    this.w = width
    this.h = height
    this.width = width 
    this.height = height
  }

  selected: boolean = false;
  state: "idle" | "hover" | "down" = "idle";

  hitTest(mx: number, my: number): boolean {
    const sx = this.x + this.margin
    const sy = this.y + this.margin
    return insideHitTestRectangle(mx, my, sx, sy, this.w, this.h);
  }

  handleMouseEvent(me: SKMouseEvent): boolean {
    const { x, y } = me as SKMouseEvent;
    const mouseIsOver = this.hitTest(x, y);
    switch (me.type) {
      case "mousemove":
        if (this.state !== "down") {
          if (mouseIsOver) {
            this.state = "hover";
          } else {
            this.state = "idle";
          }
        }
        break;

      case "mousedown":
        if (mouseIsOver) {
          this.state = "down";
        }
        break;

      case "mouseup":
        if (this.state === "down") {
          console.log("button click action");

          if (mouseIsOver) {
            this.state = "hover";
          } else {
            this.state = "idle";
          }

          return true;
        }
        break;
    }

    if (super.handleMouseEvent(me)) return true;

    return false;
  }

  draw(gc: CanvasRenderingContext2D) {
    gc.save();

    const sx = this.x + this.margin
    const sy = this.y + this.margin

    // thick highlight rect
    if (this.state == "hover" || this.state == "down") {
      gc.beginPath();
      gc.rect(sx, sy, this.w, this.h);
      gc.strokeStyle = Style.highlightColour;
      gc.lineWidth = 8;
      gc.stroke();
    }

    // normal background
    gc.beginPath();
    gc.rect(sx, sy, this.w, this.h);
    gc.fillStyle = "white";
    gc.strokeStyle = "black";
    // change fill to show down state
    gc.lineWidth = this.state == "down" ? 4 : 2;
    gc.fill();
    gc.stroke();

    // selected
    if (this.selected) {
      gc.beginPath();
      gc.rect(sx, sy, this.w, this.h);
      gc.fillStyle = "black";
      gc.textAlign = "center";
      gc.textBaseline = "middle";
      gc.font = "bold 16px Arial";
      gc.fillText("X", sx + this.w/2, sy + this.h/2);
      gc.stroke();
    }

    gc.restore();
  }
}
