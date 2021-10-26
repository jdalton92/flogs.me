import apollo from "apollo-server-express";
const { UserInputError } = apollo;

/**
 * Minimal pagination for mongoose
 *
 * Must be standard function (not arrow function)
 */
export function paginate(query, populate, options) {
  return new Promise((resolve, reject) => {
    if (options.limit && options.limit <= 0) {
      throw new UserInputError("Limit must be greater than 0");
    }
    if (options.page && options.page < 0) {
      throw new UserInputError("Page must be greater than 0");
    }

    query = query || {};
    const limit = parseInt(options.limit) || 10;
    const page = parseInt(options.page) || 1;
    const sort = options.sort || "";
    const exclude = options.exclude || "";

    const skip = (page - 1) * (limit - 1);
    let resultsCount;
    let pagesCount;
    this.countDocuments(query, (error, result) => {
      if (error) {
        resultsCount = 0;
        pagesCount = 0;
      } else {
        resultsCount = result;
        pagesCount = Math.ceil(resultsCount / limit);
      }

      if (page > pagesCount || page < 0) {
        resolve({
          resultsCount,
          pagesCount,
          nextPage: null,
          previousPage: pagesCount,
          results: [],
        });
      }

      this.find(query)
        .select(exclude)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate(populate)
        .exec(function (error, results) {
          if (error) {
            reject(new UserInputError("Error paginating results"));
          } else {
            resolve({
              pagesCount,
              currentPage: page,
              nextPage: page < pagesCount ? page + 1 : null,
              previousPage: page - 1 > 0 ? page - 1 : null,
              resultsCount,
              results,
            });
          }
        });
    });
  });
}
