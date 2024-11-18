export class RequestError {
    status;
    message;
    code;
    constructor(status, message) {
        this.status = status;
        this.message = message;
    }
}