const sanitizeInput = (input) => {
    // Remove leading and trailing whitespace
    const trimmedInput = input.trim();

    // Remove or escape special characters
    const sanitizedInput = trimmedInput.replace(/[<>&'"]/g, "");

    return sanitizedInput;
}

module.exports = sanitizeInput;