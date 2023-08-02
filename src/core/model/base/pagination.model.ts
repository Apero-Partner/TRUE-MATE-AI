import { BadRequestException } from '@nestjs/common';
export class PageRequest {
  page = 1;
  size = 20;
  sort: any[] = [];
  skip: number;
  take: number;

  constructor(page: any, size: any, sort: any) {
    if (page && page <= 0) {
      throw new BadRequestException('PAGE phải là số dương');
    }
    this.page = Number(page) || this.page;
    this.size = +size || this.size;
    this.sort = sort ? this.ConvertParamsSort(sort) : this.sort;
    this.skip = page > 1 ? (page - 1) * size : 0;
    this.take = this.size;
  }

  ConvertParamsSort(params: string) {
    const sortParams = params?.split(';');
    const result = sortParams.map((param) => {
      const [property, order] = param.split(',');
      return { property, order };
    });
    return result;
  }
}
