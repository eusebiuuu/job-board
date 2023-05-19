const DEFAULT_PAGE_VALUE = 1;
const DEFAULT_LIMIT_VALUE = 0;

const getPagination = (query) => {
  const page = Math.abs(query.page) || DEFAULT_PAGE_VALUE;
  const limit = Math.abs(query.limit) || DEFAULT_LIMIT_VALUE;
  const skip = (page - 1) * limit;
  return { skip, limit };
}

module.exports = {
  getPagination,
}