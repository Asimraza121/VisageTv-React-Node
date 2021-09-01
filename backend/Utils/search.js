class Search {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filterByCategory() {
    if (
      [undefined, null, "null", "undefined", ""].includes(
        this.queryString.category
      )
    ) {
      this.query = this.query.find({}).sort([["updatedAt", "descending"]]);
    } else {
      let keyword = {
        categories: {
          $regex: this.queryString.category,
          $options: "i",
        },
      };

      this.query = this.query
        .find({ ...keyword })
        .sort([["updatedAt", "descending"]]);
    }

    return this;
  }
}

module.exports = Search;
