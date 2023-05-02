export class HttpError extends Error {
    public httpStatus: number;
    public data: any;

    constructor(_request: RequestInit, response: Response) {
        super();
        this.httpStatus = response.status;
    }
}
