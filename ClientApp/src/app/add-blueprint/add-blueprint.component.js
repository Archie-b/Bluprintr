"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var AddBlueprint = /** @class */ (function () {
    function AddBlueprint() {
        this.styles = {
            "formGroup": "form-group w-75 mx-auto",
        };
    }
    AddBlueprint = __decorate([
        core_1.Component({
            templateUrl: 'add-blueprint.component.html',
            styleUrls: ['add-blueprint.component.css'],
        })
    ], AddBlueprint);
    return AddBlueprint;
}());
exports.AddBlueprint = AddBlueprint;
var SubComponent = /** @class */ (function () {
    function SubComponent() {
    }
    return SubComponent;
}());
//# sourceMappingURL=add-blueprint.component.js.map