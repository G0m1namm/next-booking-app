class APIFilters {
    readonly model: any;
    readonly queryParams: Record<string, any> = {};

    constructor(model: any, queryParams: Record<string, string | number>) {
        this.model = model;
        this.queryParams = queryParams;
    }

    search(): Promise<Array<any>> {
        if (this.queryParams?.location) {
            this.queryParams.address = {
                $regex: this.queryParams.location,
                $options: 'i' // Case-sensitive
            }
            delete this.queryParams.location
        }

        return this.model.find({ ...this.queryParams })
    }
}

export default APIFilters