import { Injectable } from '@nestjs/common';
import { Item } from './interfaces/item.interface';
import { Model } from 'mongoose';
import fs = require('fs');
import { InjectModel } from '@nestjs/mongoose';
const { Parser } = require('json2csv');
const fields = ['createdAt', 'customerId', 'invoiceId'];


@Injectable()
export class ItemsService {

  constructor(@InjectModel('items') private readonly itemModel: Model<Item>) { }

  /**
   * @param  {number} startDate - The start of the date to filter.
   * @param  {number} endDate - The end of the date to filter.
   * @returns Promise
   */
  async find(startDate: number, endDate: number): Promise<Item[]> {
    let items: Item[] = await this.itemModel.find({ $and: [{ createdAt: { $gte: startDate } }, { createdAt: { $lte: endDate } }] });
    this.saveToFile(items);
    return items
  }
  /**
   * @param  {Item[]} items - The items which needs to be saved to the file.
   * @returns void
   */
  private saveToFile(items: Item[]): void {
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(items);
    fs.writeFileSync('data.csv', csv);
  }
}
