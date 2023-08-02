export class PaginationOptionsModel {
  skip?: number;
  take?: number;
  sort?: {
    property: string;
    order: 'ASC' | 'DESC';
  }[];
}
