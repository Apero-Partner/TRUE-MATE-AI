export function convertPaginate(result: any, pageRequest: any, totalItems: any) {
  if (result instanceof Array) {
    let totalPage = Math.floor(totalItems / pageRequest.size) + 1;
    if (totalItems == pageRequest.size) {
      totalPage -= 1;
    }
    return {
      data: result,
      page: pageRequest.page,
      pageSize: pageRequest.size,
      totalItem: totalItems,
      totalPage: totalPage,
    };
  } else return result;
}
