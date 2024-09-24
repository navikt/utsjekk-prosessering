declare type SuccessResponse<T> = {
    data: T
    error: null
}

declare type FailureResponse = {
    data: null
    error: {
        message: string
        statusCode: number
    }
}

declare type ApiResponse<T> = SuccessResponse<T> | FailureResponse
