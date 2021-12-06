import { Controller, Get, Query, StreamableFile  } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './interfaces/item.interface';
import { createReadStream } from 'fs';
import { join } from 'path';


@Controller('items')
export class ItemsController {

  constructor(private readonly itemsService: ItemsService) { }
  
  @Get()
  find(@Query('startDate') startDate: number, @Query('endDate') endDate: number): Promise<Item[]> {
    return this.itemsService.find(startDate, endDate);
  }

  @Get('/file')
  getFile() : StreamableFile {
    const file = createReadStream(join(process.cwd(), 'data.csv'));
    return new StreamableFile(file);
  }
}
