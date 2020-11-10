"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable max-classes-per-file */
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
class Skill {
}
__decorate([
    class_validator_1.MinLength(2)
], Skill.prototype, "title", void 0);
__decorate([
    class_validator_1.IsInt()
], Skill.prototype, "votes", void 0);
class CreateWilderModel {
    constructor(name, city, skills) {
        this.name = name;
        this.city = city;
        this.skills = skills;
    }
}
__decorate([
    class_validator_1.MinLength(5)
], CreateWilderModel.prototype, "name", void 0);
__decorate([
    class_validator_1.IsString()
], CreateWilderModel.prototype, "city", void 0);
__decorate([
    class_transformer_1.Type(() => Skill),
    class_validator_1.ValidateNested({ each: true })
], CreateWilderModel.prototype, "skills", void 0);
exports.default = CreateWilderModel;
