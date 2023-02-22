class ApiFeatures {
  constructor(mongooseQuery, queryString) {
    this.mongooseQuery = mongooseQuery;
    this.queryString = queryString;
  }
  pagination() {
    let page = this.queryString.page * 1 || 1;
    if (page < 0) page = 1;
    let limit = 5;
    let skip = (page - 1) * limit;
    this.mongooseQuery.skip(skip).limit(limit);
    this.page = page;
    return this;
  }
  filter() {
    let queryString = { ...this.queryString };
    let excludQuery = ["page", "sort", "keyword", "fields"];
    excludQuery.forEach((ele) => {
      delete queryString[ele];
    });
    queryString = JSON.stringify(queryString);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (matech) => `$${matech}`
    );
    queryString = JSON.parse(queryString);
    this.mongooseQuery.find(queryString);
    return this;
  }
  sort() {
    if (this.queryString.sort) {
      let SortedBy = this.queryString.sort.split(",").join(" ");
      this.mongooseQuery.sort(SortedBy);
    }
    return this;
  }
  fields() {
    if (this.queryString.fields) {
      let fields = this.queryString.fields.split(",").join(" ");
      this.mongooseQuery.select(fields);
    }
    return this;
  }
  search() {
    if (this.queryString.keyword) {
      let keyWord = this.queryString.keyword;
      this.mongooseQuery.find({
        $or: [
          { name: { $regex: keyWord, $options: "i" } },
          { description: { $regex: keyWord, $options: "i" } },
        ],
      });
    }
    return this;
  }
}


module.exports = ApiFeatures