class ErrorHandler extends Error{
    statusCode:number;
    constructor(message: any, statuscode: number){
        super(message)
        this.statusCode = statuscode;

        Error.captureStackTrace(this, this.constructor);
    }
}

export default ErrorHandler;