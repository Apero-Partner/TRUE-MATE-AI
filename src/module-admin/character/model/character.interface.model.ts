export class PayloadModel {
  deviceId: string;
}

export class ParamsQueryModel {
  name?: string;
  id?: number;
  isActive?: boolean;
  gender?: string;
}

export class JoinsModel {}

export class PaginationOptionsModel {
  skip?: number;
  take?: number;
  sort?: {
    property: string;
    order: 'ASC' | 'DESC';
  }[];
}
