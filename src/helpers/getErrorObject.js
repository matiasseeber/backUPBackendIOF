export function getErrorObject(error){
    return {
        errorName: error.name,
        error: error.message
    };
}