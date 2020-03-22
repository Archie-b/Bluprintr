

export class ComponentCanvas {
  private drawing: boolean;
  private canvas: HTMLCanvasElement;
  private drawStartX: number = 0.0;
  private drawStartY: number = 0.0;
  public colour : string;
  private context: CanvasRenderingContext2D;

  public title: string;

  constructor() {
    this.canvas = document.createElement('canvas');
    this.canvas.getContext('2d').imageSmoothingEnabled = true;
    this.canvas.setAttribute('style', 'float:left;position:absolute;');
    this.canvas.addEventListener('mousedown', this.startDraw.bind(this));
    this.canvas.addEventListener('mousemove', this.draw.bind(this));
    this.canvas.addEventListener('mouseup', this.endDraw.bind(this));
    this.canvas.addEventListener('mouseout', this.endDraw.bind(this));
    this.canvas.addEventListener('resize', this.resize.bind(this));
    this.context = this.canvas.getContext('2d');
  }

  setID(id: string): void {
    this.canvas.setAttribute('id', id);
  }

  getID(): string {
    return this.canvas.getAttribute('id');
  }

  setDimenstions(width: number, height: number): void {
    this.canvas.width = width;
    this.canvas.height = height;
  }

  getElement(): HTMLCanvasElement {
    return this.canvas;
  }

  startDraw(e: MouseEvent): void {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawStartX = e.clientX - this.canvas.getBoundingClientRect().left;
    this.drawStartY = e.clientY - this.canvas.getBoundingClientRect().top;
    this.drawing = true;
    this.context.lineWidth = 4;
    this.context.moveTo(this.drawStartX, this.drawStartY);
    this.context.beginPath();
  }

  draw(e: MouseEvent): void {
    if (this.drawing) {
      this.context.lineTo(e.clientX - this.canvas.getBoundingClientRect().left, e.clientY - this.canvas.getBoundingClientRect().top);
      this.context.stroke();
    }
  }

  endDraw(): void {
    if (this.drawing) {
      this.drawing = false;
      this.context.lineTo(this.drawStartX, this.drawStartY);
      this.context.stroke();
      this.context.closePath();
    }
  }

  setColour(hexCode : string): void {
    this.context.strokeStyle = hexCode;
  }

  resize(widthModifier: number, heightModifier: number): void {
    var newContext = this.context;
    newContext.scale(widthModifier, heightModifier);
    var image = newContext.getImageData(0, 0, this.canvas.width * widthModifier, this.canvas.height * heightModifier);
    this.canvas.width *= widthModifier;
    this.canvas.height *= heightModifier;
    this.context = this.canvas.getContext('2d');
    this.context.putImageData(image, 0, 0);
  }
}
