"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const InputError_1 = require("../errors/InputError");
const Wilder_1 = __importDefault(require("../models/Wilder"));
const CreateWilderModel_1 = __importDefault(require("./CreateWilderModel"));
exports.default = {
    create: async (req, res) => {
        const inputWilder = class_transformer_1.plainToClass(CreateWilderModel_1.default, req.body);
        const errors = await class_validator_1.validate(inputWilder);
        if (errors.length > 0) {
            throw new InputError_1.InputError(errors);
        }
        await Wilder_1.default.init();
        const wilder = new Wilder_1.default(req.body);
        const result = await wilder.save();
        res.json({ success: true, result });
    },
    read: async (req, res) => {
        const result = await Wilder_1.default.find();
        res.json({ success: true, result });
    },
    update: async (req, res) => {
        // eslint-disable-next-line no-underscore-dangle
        const result = await Wilder_1.default.updateOne({ _id: req.body._id }, req.body);
        res.json({ success: true, result });
    },
    delete: async (req, res) => {
        // eslint-disable-next-line no-underscore-dangle
        const result = await Wilder_1.default.deleteOne({ _id: req.body._id });
        res.json({ success: true, result });
    },
};
