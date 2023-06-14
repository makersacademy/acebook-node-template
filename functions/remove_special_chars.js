const removeSpecialCharacters = (input) => {
    // Replace special characters with an empty string or escape them as needed
    // Example: Remove <, >, &, ', "
    const sanitizedInput = input.replace(/[<>&'"]/g, "");

    return sanitizedInput;
}

module.exports = removeSpecialCharacters;