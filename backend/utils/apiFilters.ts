class APIFilters {
    readonly model: any;
    readonly queryParams: Record<string, string | number> = {};

    constructor(model: any, queryParams: Record<string, string | number>) {
        this.model = model;
        this.queryParams = queryParams;
    }

    search(): Promise<Array<any>> {
        const location = this.queryParams.location ? {
            address: {
                $regex: this.queryParams.location,
                $options: 'i' // Case-sensitive
            }
        } : {}

        return this.model.find({ ...location })
    }
}

export default APIFilters