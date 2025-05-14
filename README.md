# Amazon Quick Access (Published.Active)

A Chrome extension that allows quick searching of selected text across various regional Amazon websites.

## Overview
This Chrome extension provides a convenient way to search for products on Amazon using either the popup interface or context menu. It supports multiple regional domains and offers a user-friendly interface for quick access to Amazon search functionality.

## Features
- Search a selected text on Amazon through a context menu
- Choose Amazon region (domain) for search
- Support for 20 regional Amazon domains
- Interface localization for all supported regions
- Region selection with automatic domain availability check
- Error handling and user feedback
- Internationalization support

## Installation

1. Download the extension from [Chrome Web Store](https://chromewebstore.google.com/detail/amazon-quick-access/hdjbgcfphpnbbndnnkplclkfjaedmhbe)
2. Or install in developer mode:
   - Unpack the extension archive
   - Open Chrome and go to chrome://extensions/
   - Enable "Developer mode"
   - Click "Load unpacked extension"
   - Select the extension folder

## Usage

### Search via Context Menu
1. Select text on any webpage
2. Right-click
3. Choose "Search on Amazon" in the context menu
4. Search will be performed on the selected regional Amazon domain

### Region Selection
1. Click the extension icon in Chrome's toolbar
2. Select the desired region from the dropdown list
3. The selected region will be used for all later searches

## Supported Regions
- United States (amazon.com)
- Canada (amazon.ca)
- United Kingdom (amazon.co.uk)
- Germany (amazon.de)
- France (amazon.fr)
- Italy (amazon.it)
- Spain (amazon.es)
- Japan (amazon.co.jp)
- India (amazon.in)
- China (amazon.cn)
- Australia (amazon.com.au)
- Brazil (amazon.com.br)
- Mexico (amazon.com.mx)
- Netherlands (amazon.nl)
- Sweden (amazon.se)
- Poland (amazon.pl)
- Turkey (amazon.com.tr)
- Saudi Arabia (amazon.sa)
- UAE (amazon.ae)
- Singapore (amazon.sg)

## Development

### Project Structure
- `manifest.json` - Extension configuration
- `background.js` - Background service worker for context menu and message handling
- `popup.html` and `popup.js` - Region selection interface
- `config.js` - Configuration and utility functions
- `_locales/` - Internationalization files
- `icon.png` - Extension icon

### Technical Details

#### Configuration (config.js)
- Contains Amazon domain mappings for different regions
- Utility functions for domain availability checking
- Search URL building and text validation

#### Popup Interface (popup.js)
- Region selection dropdown
- Search input field
- Error message display
- Event handlers for user interactions

#### Background Service (background.js)
- Context menu creation and management
- Message handling between popup and background
- Search execution through a context menu

### Localization
Localization is automatically generated using the `_locales/generator.js` script. To add a new region:
1. Add the domain to the `amazonDomains` object in `generator.js`
2. Run the generation script
3. Verify the created localization files

### Prerequisites
- Chrome browser
- Basic knowledge of JavaScript and Chrome Extension development

### Setup
1. Clone the repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked" and select the extension directory

### Building
No build process is required. The extension can be loaded directly in Chrome.

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## Support
For support, please open an issue in the repository.

## License
This project is licensed under the MIT License — see the LICENSE file for details. 
