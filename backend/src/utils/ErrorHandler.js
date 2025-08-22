
class ErrorHandler extends Error{
 constructor(message, statusCode){
    super(),

    this.success = false
    this.message = message
    this.statusCode= statusCode
 }
}


export default ErrorHandler