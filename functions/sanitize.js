// Input sanitization function
const validator = require("validator");
const sanitizeHtml = require("sanitize-html");

const sanitizeInput = (input) => {
    // Remove leading and trailing whitespace
    const trimmedInput = input.trim();

    // Remove or escape special characters
    const sanitizedInput = trimmedInput.replace(/[<>&'"]/g, "");

    return sanitizedInput;
}

module.exports = sanitizeInput;