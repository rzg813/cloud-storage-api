// 分页返回数据对象
export class PageResult<T> {
  pageIndex: number;
  pageSize: number;
  total: number;
  data: T[];
}
