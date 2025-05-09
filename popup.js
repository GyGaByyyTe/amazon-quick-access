import {amazonDomains, buildSearchUrl, checkDomainAvailability, isValidSearchText} from './config.js';

// UI Elements
const extensionTitle = document.getElementsByTagName("title");
const extensionHeader = document.getElementById("extensionName");
// const openAmazonButton = document.getElementById("openAmazon");
const regionSelect = document.getElementById("regionSelect");
const regionSelectLabel = document.getElementById("selectRegionLabel");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const errorMessage = document.getElementById("errorMessage");

// Initialize UI
function initializeUI() {
    // Dynamically populate dropdown list
    Object.entries(amazonDomains).forEach(([code, domain]) => {
        const option = document.createElement("option");
        option.value = code;
        option.textContent = `${code} (${domain})`;
        regionSelect.appendChild(option);
    });

    // Load saved region
    chrome.storage.sync.get("region", (data) => {
        regionSelect.value = data.region || "US";
        // openAmazonButton.textContent = chrome.i18n.getMessage("button_open_amazon", [amazonDomains[data.region || "US"]]);
    });

    extensionTitle.textContent = chrome.i18n.getMessage("extension_name");
    extensionHeader.textContent = chrome.i18n.getMessage("extension_name");
    regionSelectLabel.textContent = chrome.i18n.getMessage("select_region_label");
}

// Show error message
function showError(message) {
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';
    setTimeout(() => {
        errorMessage.style.display = 'none';
    }, 3000);
}

// Region change handler
async function handleRegionChange() {
    try {
        const selectedRegion = regionSelect.value;
        const domain = amazonDomains[selectedRegion];

        // Check domain availability
        const isAvailable = await checkDomainAvailability(domain);
        if (!isAvailable) {
            showError(`Domain ${domain} is not available. Using default domain.`);
            regionSelect.value = "US";
            chrome.storage.sync.set({region: "US"});
            return;
        }

        chrome.storage.sync.set({region: selectedRegion});
        chrome.contextMenus.update("searchAmazon", {
            title: `${chrome.i18n.getMessage("extension_go_to", [domain])}`, contexts: ["selection"]
        });
        // openAmazonButton.textContent = chrome.i18n.getMessage("button_open_amazon", [domain]);
    } catch (error) {
        // console.error('Error changing region:', error);
        showError('Error changing region');
    }
}

// Search handler
async function handleSearch() {
    try {
        const searchText = searchInput.value;

        if (!isValidSearchText(searchText)) {
            showError('Invalid search query');
            return;
        }

        chrome.storage.sync.get("region", async (data) => {
            const region = data.region || "US";
            const domain = amazonDomains[region];

            // Check domain availability
            const isAvailable = await checkDomainAvailability(domain);
            if (!isAvailable) {
                showError(`Domain ${domain} is not available. Using default domain.`);
                const defaultDomain = amazonDomains.US;
                const searchUrl = buildSearchUrl(defaultDomain, searchText);
                chrome.tabs.create({url: searchUrl});
                return;
            }

            const searchUrl = buildSearchUrl(domain, searchText);
            chrome.tabs.create({url: searchUrl});
        });
    } catch (error) {
        // console.error('Error performing search:', error);
        showError('Error performing search');
    }
}

// Open Amazon handler
async function handleOpenAmazon() {
    try {
        chrome.storage.sync.get("region", async (data) => {
            const region = data.region || "US";
            const domain = amazonDomains[region];

            // Check domain availability
            const isAvailable = await checkDomainAvailability(domain);
            if (!isAvailable) {
                showError(`Domain ${domain} is not available. Using default domain.`);
                chrome.tabs.create({url: `https://www.${amazonDomains.US}`});
                return;
            }

            chrome.tabs.create({url: `https://www.${domain}`});
        });
    } catch (error) {
        // console.error('Error opening Amazon:', error);
        showError('Error opening Amazon');
    }
}

// Initialize event listeners
function initializeEventListeners() {
    regionSelect.addEventListener("change", handleRegionChange);
    searchButton.addEventListener("click", handleSearch);
    // openAmazonButton.addEventListener("click", handleOpenAmazon);

    // Search on Enter key
    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            handleSearch();
        }
    });
}

// Initialize on load
document.addEventListener("DOMContentLoaded", () => {
    initializeUI();
    initializeEventListeners();
});