import { amazonDomains, checkDomainAvailability, isValidSearchText, buildSearchUrl } from './config.js';

// Add context menu
chrome.runtime.onInstalled.addListener(async () => {
    try {
        chrome.storage.sync.get("region", async (data) => {
            const region = data.region || "US";
            const domain = amazonDomains[region];

            // Check domain availability
            const isAvailable = await checkDomainAvailability(domain);
            if (!isAvailable) {
                // Use default domain (amazon.com)
                const defaultDomain = amazonDomains.US;
                chrome.storage.sync.set({ region: "US" });
                createContextMenu(defaultDomain);
                return;
            }

            createContextMenu(domain);
        });
    } catch (error) {
        // console.log('Error initializing extension:', error);
    }
});

// Create context menu item
function createContextMenu(domain) {
    chrome.contextMenus.create({
        id: "searchAmazon",
        title: `${chrome.i18n.getMessage("extension_go_to", [domain])}`,
        contexts: ["selection"]
    });
}

// Use selected region for search
chrome.contextMenus.onClicked.addListener(async (info) => {
    if (info.menuItemId === "searchAmazon" && info.selectionText) {
        try {
            // Validate selected text
            if (!isValidSearchText(info.selectionText)) {
                return;
            }

            chrome.storage.sync.get("region", async (data) => {
                const region = data.region || "US";
                const domain = amazonDomains[region];

                // Check domain availability
                const isAvailable = await checkDomainAvailability(domain);
                if (!isAvailable) {
                    // Use default domain
                    const defaultDomain = amazonDomains.US;
                    const searchUrl = buildSearchUrl(defaultDomain, info.selectionText);
                    chrome.tabs.create({ url: searchUrl });
                    return;
                }

                // Build search URL
                const searchUrl = buildSearchUrl(domain, info.selectionText);
                chrome.tabs.create({ url: searchUrl });
            });
        } catch (error) {
            //
        }
    }
});

// Handle messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "searchAmazon") {
        try {
            const query = message.query;
            if (!isValidSearchText(query)) {
                throw new Error('Invalid search query');
            }

            chrome.storage.sync.get("region", async (data) => {
                const region = data.region || "US";
                const domain = amazonDomains[region];

                // Check domain availability
                const isAvailable = await checkDomainAvailability(domain);
                if (!isAvailable) {
                    throw new Error(`Domain ${domain} is not available`);
                }

                const searchUrl = buildSearchUrl(domain, query);
                chrome.tabs.create({ url: searchUrl });
                sendResponse({ success: true });
            });
        } catch (error) {
            sendResponse({ error: error.message });
        }
        return true;
    }
});
