import { FilterQuery, Query } from 'mongoose';

/* I = Array of object or just object  */
class QueryBuilder<I> {
  public modelQuery: Query<I[], I>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<I[], I>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  /* searching */

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          field =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<I>,
        ),
      });
    }
    return this;
  }

  /* filtering */

  filter() {
    const objQuery = { ...this.query };
    const excludeFields = ['searchTerm', 'limit', 'sort', 'page'];
    excludeFields.forEach(elem => delete objQuery[elem]);
    this.modelQuery = this.modelQuery.find(objQuery as FilterQuery<I>);
    return this;
  }

  /* sorting */

  sort() {
    const sort =
      (this.query.sort as string)?.split(',').join(' ') || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  /* pagination */

  paginate() {
    const page = Number(this?.query?.page) || 1;
    const limit = Number(this?.query?.limit) || 1;
    /* skip =  1-1 * 10  =  no skip  but you have to display 10 (limit)*/
    /* skip =  2-1 * 10  =  first 10 wil be  skipped and you have to display 10 (limit) */
    /* skip =  3-1 * 10  =  first 20 wil be  skipped and you have to display 10 (limit) */
    /* and so on .... */
    const skip = (page - 1) * limit;

    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this;
  }

  /* select fields */

  fields() {
    const fields =
      (this.query.fields as string)?.split(',').join(' ') || '-__v';
    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }


  async countTotal (){
    const filter = this.modelQuery.getFilter();
    const total = await this.modelQuery.model.countDocuments(filter)

    const page = Number(this.query.page) || 1;
    const limit = Number(this.query.limit) || 10
    const totalPage = Math.ceil(page/limit)

    return {
      page,
      limit,
      total,
      totalPage
    }
  }
}

export default QueryBuilder;
