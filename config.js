/**
 * Amazon domain configuration by region
 */
const amazonDomains = {
    AE: "amazon.ae",
    AU: "amazon.com.au",
    BR: "amazon.com.br",
    CA: "amazon.ca",
    CN: "amazon.cn",
    DE: "amazon.de",
    ES: "amazon.es",
    FR: "amazon.fr",
    GB: "amazon.co.uk",
    IN: "amazon.in",
    IT: "amazon.it",
    JP: "amazon.co.jp",
    MX: "amazon.com.mx",
    NL: "amazon.nl",
    PL: "amazon.pl",
    SA: "amazon.sa",
    SE: "amazon.se",
    SG: "amazon.sg",
    TR: "amazon.com.tr",
    US: "amazon.com"
};

/**
 * Checks Amazon domain availability
 * @param {string} domain - domain to check
 * @returns {Promise<boolean>} - check result
 */
async function checkDomainAvailability(domain) {
    try {
        const response = await fetch(`https://www.${domain}`, {method: 'GET'});
        return response.ok;
    } catch (error) {
        return false;
    }
}

/**
 * Validates selected text
 * @param {string} text - text to validate
 * @returns {boolean} - validation result
 */
function isValidSearchText(text) {
    // Remove extra spaces
    const trimmedText = text.trim();
    // Check maximum length (Amazon limit)
    return trimmedText.length <= 200;
}

/**
 * Builds Amazon search URL
 * @param {string} domain - Amazon domain
 * @param {string} searchText - search text
 * @returns {string} - search URL
 */
function buildSearchUrl(domain, searchText) {
    if (!isValidSearchText(searchText)) {
        throw new Error('Invalid search query');
    }
    return `https://www.${domain}/s?k=${encodeURIComponent(searchText.trim())}`;
}

// Export functions and constants
export {
    amazonDomains, checkDomainAvailability, isValidSearchText, buildSearchUrl
}; 