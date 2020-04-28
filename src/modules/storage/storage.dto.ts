import { Page } from '../page.common';
export class StorageDto {
  title: string;
  src: string;
  path: string;
  refTable: string;
  tags: string;
  storageType?: string;
}
export class StorageQuery {
  title?: string;
  tags?: string;
  deleted?: number;
  page?: Page;
}
