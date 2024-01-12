class APIFilters {
    readonly model: any;
    readonly queryParams: Record<string, any> = {};

    constructor(model: any, queryParams: Record<string, string | number>) {
        this.model = model;
        this.queryParams = queryParams;
    }

    search(): Promise<Array<any>> {
        return this.model.find({ ...this.queryParams })
    }

    pagination(page: number, resultsPerPage: number): Promise<Array<any>> {
        const skipPage = resultsPerPage * (page - 1)

        return this.model.find({ ...this.queryParams }).limit(resultsPerPage).skip(skipPage)
    }
}

export default APIFilters