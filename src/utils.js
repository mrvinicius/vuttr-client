function getTagsFromText(text) {
    const trimmedText = text.trim();
    return trimmedText ? trimmedText.split(' ') : []
}

function setHttp(url) {
    let trimmedUrl = url.trim();

    if (trimmedUrl.search(/^http[s]?:\/\//) === -1) {
        trimmedUrl = 'http://' + trimmedUrl;
    }

    return trimmedUrl;
}

function validateUrl(url) {
    const regex = /(?=(([0-9a-fA-F]{4}):([0-9a-fA-F]{4}):([0-9a-fA-F]{4})::([0-9a-fA-F]{4}))|(^\s*(((https?(?![0-9][a-zA-Z]):)?(\/\/)((w{3}?).)?)?)([\w-]+\.)+[\w-]+([\w- ;,./_?!%&<>\\[\]=]*)))/;
    return regex.test(url);
}

function validateTool(tool) {
    const errors = {},
        trimmedTitle = tool.title ? tool.title.trim() : null;


    if (!trimmedTitle || !trimmedTitle.length)
        errors["title"] = 'Por favor, insira o nome da ferramenta';

    if (!tool.link || !tool.link.length) {
        errors["link"] = 'Insira a URL';
    } else {
        const isValidUrl = validateUrl(tool.link)

        if (!isValidUrl)
            errors["link"] = 'URL inválida';
    }

    return errors;
}

export { getTagsFromText, setHttp, validateTool };