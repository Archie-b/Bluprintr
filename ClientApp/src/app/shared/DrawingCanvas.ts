import { SubComponent } from "./Blueprint";

export class DrawingCanvas {
  private canvas: HTMLCanvasElement;
  private drawOrigin: [number, number];
  private currentlyDrawing: boolean = false;
  public component: SubComponent;
  constructor(id: string, width: number, height: number) {
    this.canvas = document.createElement('canvas');
    this.canvas.getContext('2d').imageSmoothingEnabled = true;
    this.canvas.setAttribute('style', 'float:left;position:absolute;');
    this.canvas.addEventListener('mousedown', this.startDraw.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.endDraw.bind(this));
    this.canvas.addEventListener('mouseout', this.endDraw.bind(this));
    this.getContext().lineWidth = 5;
    this.canvas.id = id;
    this.canvas.width = width;
    this.canvas.height = height;
    this.component = new SubComponent();
  }
  getContext(): CanvasRenderingContext2D {
    return this.canvas.getContext('2d');
  }
  getID(): string {
    return this.canvas.id;
  }
  getCanvas() {
    return this.canvas;
  }
  startDraw(e: MouseEvent): void {
    this.component.Map = "";
    let x : number = e.clientX - this.canvas.getBoundingClientRect().left;
    let y : number = e.clientY - this.canvas.getBoundingClientRect().top;
    this.getContext().clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawOrigin = [x, y];
    this.currentlyDrawing = true;
    this.getContext().moveTo(this.drawOrigin[0], this.drawOrigin[1]);
    this.getContext().beginPath();
    this.component.Map += ((x / this.canvas.width) + "," + (y / this.canvas.height))
  }
  draw(e: MouseEvent): void {
    if (this.currentlyDrawing) {
      let x: number = e.clientX - this.canvas.getBoundingClientRect().left;
      let y: number = e.clientY - this.canvas.getBoundingClientRect().top;
      this.getContext().lineTo(x, y);
      this.getContext().stroke();
      this.component.Map += ("," + (x / this.canvas.width) + "," + (y / this.canvas.height))
    }
  }
  endDraw(): void {
    if (this.currentlyDrawing) {
      this.currentlyDrawing = false;
      this.getContext().lineTo(this.drawOrigin[0], this.drawOrigin[1]);
      this.getContext().stroke();
    }
  }
  setColour(hexCode: string): void {
    this.component.Colour = hexCode;
    this.getContext().strokeStyle = hexCode;
  }

  getColour(): string {
    return this.component.Colour;
  }
}
