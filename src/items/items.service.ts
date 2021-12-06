import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import fs = require('fs');
const { Parser } = require('json2csv');
const fields = ['createdAt', 'customerId', 'invoiceId'];


@Injectable()
export class ItemsService {

  constructor(@InjectModel('items') private readonly itemModel: Model<Item>) { }

  async findAll(startDate: number, endDate: number): Promise<Item[]> {
    let items: Item[] = await this.itemModel.find({ $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] });
    this.saveToFile(items);
    return items
  }

  private saveToFile(items: Item[]): void {
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(items);
    fs.writeFileSync('data.csv', csv);
  }
}
