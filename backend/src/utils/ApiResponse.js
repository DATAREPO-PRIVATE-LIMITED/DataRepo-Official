
class ApiResponse {
    constructor(message, data, statusCode) {

        this.success = true
        this.message = message,
            this.data = data,
            this.statusCode = statusCode
    }
}


export default ApiResponse 