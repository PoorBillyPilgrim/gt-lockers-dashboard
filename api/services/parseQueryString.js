const isValidValue = (query, acceptedValues) => {
  
    if (!acceptedValues.includes(query.toLowerCase())) {
      return false
    }
  
    return true
}
  
module.exports = (query, requiredKey, validValues) => {

    let queryString = {
        queries: query,
        isValid: false
    }
    // if queryString is empty or requiredKey is not present
    if (query === {} || !query.hasOwnProperty(requiredKey)) {
        queryString.errorMsg = `${requiredKey} must be present in query string`
        return queryString
    }


    for (let query in queryString.queries) {
        // ensure that keys found in query are valid
        if (validValues[query] === undefined) {
        queryString.errorMsg = `${query} is not a valid key to use in a query`
        return queryString
        }
        // ensure that keys are only used once in query
        if (Array.isArray(queryString.queries[query])) {
        queryString.errorMsg = `Multiple values for ${query} are not accepted`
        return queryString
        }
        // ensure values in key-value query are valid
        if (!isValidValue(queryString.queries[query], validValues[query])) {
        queryString.errorMsg = `No valid ${query} was provided`
        return queryString
        }
    }

    queryString.isValid = true
    return queryString
}
