import {
    SKElement,
    LayoutMethod,
    Size,
} from "simplekit/imperative-mode";
  
// places elements in a vertical stack
export class StackColLayout implements LayoutMethod {
    measure(elements: SKElement[]) {
      // measure all children first
      elements.forEach((el) => {
        el.measure();
      });
  
      // width is width of widest element
      const totalWidth = elements.reduce(
        (acc, el) => Math.max(acc, el.intrinsicWidth),
        0
      );
  
      // height is sum of al element heights
      const totalHeight = elements.reduce(
        (acc, el) => acc + el.intrinsicHeight,
        0
      );
  
      // return minimum layout size
      return {
        width: totalWidth,
        height: totalHeight,
      };
    }
  
    layout(width: number, _: number, elements: SKElement[]) {
      const newBounds: Size = { width: 0, height: 0 };
  
      let y = 0;
  
      elements.forEach((el) => {
        // set the element position
        el.x = 0;
        el.y = y;
  
        // optional fill width
        const w = el.fillWidth ? width : el.intrinsicWidth;
  
        el.layout(w);
  
        // next row
        y += el.layoutHeight;
  
        // update bounds that were actually used
        newBounds.width = Math.max(newBounds.width, el.layoutWidth);
        newBounds.height = Math.max(
          newBounds.height,
          y + el.layoutHeight
        );
      });
  
      return newBounds;
    }
}
  