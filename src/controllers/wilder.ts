import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { InputError } from '../errors/InputError';
import WilderModel from '../models/Wilder';
import CreateWilderModel from './CreateWilderModel';

export default {
  create: async (req: Request, res: Response): Promise<void> => {
    const inputWilder = plainToClass(CreateWilderModel, req.body);
    const errors = await validate(inputWilder);
    if (errors.length > 0) {
      throw new InputError(errors);
    }
    await WilderModel.init();
    const wilder = new WilderModel(req.body);
    const result = await wilder.save();
    res.status(201).json({ success: true, result });
  },
  read: async (req: Request, res: Response): Promise<void> => {
    const wilders = await WilderModel.find();
    const totalWilders = wilders.length;
    res.status(200).json({ totalWilders, success: true, result: wilders });
  },
  update: async (req: Request, res: Response): Promise<void> => {
    const updatedWilder = await WilderModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updatedWilder) {
      throw new Error('Wilder not found');
    }
    res.status(200).json({ success: true, result: updatedWilder });
    // const result = await WilderModel.updateOne({ _id: req.body._id }, req.body);
    // res.json({ success: true, result });
  },
  delete: async (req: Request, res: Response): Promise<void> => {
    const deletedWilder = await WilderModel.findByIdAndDelete(req.params.id);
    if (!deletedWilder) {
      throw new Error('Wilder not found');
    }
    res.status(200).json({ success: true, result: {} });
    // const result = await WilderModel.deleteOne({ _id: req.body._id });
    // res.json({ success: true, result });
  },
};
