export class AdapterControllerException extends Error {
    constructor(message: string) {
        super(message);
        this.name = "AdapterControllerException";
    }
}