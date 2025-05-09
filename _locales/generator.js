const fs = require("fs");
const path = require("path");

const amazonDomains = {
    US: "amazon.com",
    CA: "amazon.ca",
    GB: "amazon.co.uk",
    DE: "amazon.de",
    FR: "amazon.fr",
    IT: "amazon.it",
    ES: "amazon.es",
    JP: "amazon.co.jp",
    IN: "amazon.in",
    CN: "amazon.cn",
    AU: "amazon.com.au",
    BR: "amazon.com.br",
    MX: "amazon.com.mx",
    NL: "amazon.nl",
    SE: "amazon.se",
    PL: "amazon.pl",
    TR: "amazon.com.tr",
    SA: "amazon.sa",
    AE: "amazon.ae",
    SG: "amazon.sg",
};

const template = {
    extension_name: {
        message: "Amazon Quick Access",
    }, extension_description: {
        message: "Quickly access Amazon and search selected text."
    }, button_open_amazon: {
        message: "Go to Amazon $1",
    }, select_region_label: {
        message: "Region",
    }, extension_go_to: {
        message: "Find \"%s\" on $1"
    },
};

const outputDir = path.join(__dirname);

// Проверяем, существует ли директория, если нет - создаем
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

for (const [region, domain] of Object.entries(amazonDomains)) {
    // Создаем локализованный JSON на основе шаблона
    const localizedJson = JSON.stringify(JSON.parse(JSON.stringify(template)), null, 2);

    // Имя файла
    const folderName = region.toLowerCase();
    const folderPath = path.join(outputDir, folderName);

    const fileName = `./${folderName}/messages.json`;
    const filePath = path.join(outputDir, fileName);

    fs.mkdirSync(folderPath);

    // Сохраняем файл
    fs.writeFileSync(filePath, localizedJson, "utf8");
    console.log(`Файл создан: ${filePath}`);
}

console.log("Все файлы успешно созданы!");