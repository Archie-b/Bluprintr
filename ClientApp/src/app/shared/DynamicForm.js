"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var DynamicForm = /** @class */ (function () {
    function DynamicForm(model) {
        this.model = model;
        this.html = this.generateHTML();
    }
    DynamicForm.prototype.getHTML = function () {
        return this.html;
    };
    DynamicForm.prototype.generateHTML = function () {
        var switchData = { "string": "generateTextBox", };
        var html = "";
        for (var key in this.model) {
            if (this.model.hasOwnProperty(key)) {
                html += this[switchData[typeof this.model[key]]](this.model[key]);
            }
        }
        return html;
    };
    DynamicForm.prototype.generateTextBox = function (keyName) {
        return keyName + " : <input type=\"text\">";
    };
    DynamicForm.prototype.generateCheckBox = function () {
        return "";
    };
    DynamicForm.prototype.generateRadioButtons = function () {
        return "";
    };
    return DynamicForm;
}());
exports.DynamicForm = DynamicForm;
//# sourceMappingURL=DynamicForm.js.map