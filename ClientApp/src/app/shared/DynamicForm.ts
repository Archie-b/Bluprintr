export class DynamicForm<T> {
  private model: T;
  private html : string;

  constructor(model: T) {
    this.model = model;
    this.html = this.generateHTML();
  }

  getHTML() : string {
    return this.html;
  }

  private generateHTML(): string {
    var switchData = { "string": "generateTextBox", };
    var html = "";
    for (var key in this.model) {
      if (this.model.hasOwnProperty(key)) {
       html += this[switchData[typeof this.model[key]]](this.model[key]);
      }
    }
    return html;
  }

  private generateTextBox(keyName: any): string {
    return `${keyName} : <input type=\"text\">`
  }

  private generateCheckBox(): string {
    return ""
  }

  private generateRadioButtons(): string {
    return ""
  }
}
