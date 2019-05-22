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

function validateTool(tool) {
    const errors = {};

    if (!tool.title || !tool.title.length)
        errors["title"] = 'Por favor, insira o nome da ferramenta';

    if (!tool.link || !tool.link.length) {
        errors["link"] = 'Insira a URL';
    } else {
        const regex = /(?=(([0-9a-fA-F]{4}):([0-9a-fA-F]{4}):([0-9a-fA-F]{4})::([0-9a-fA-F]{4}))|(^\s*(((https?(?![0-9][a-zA-Z]):)?(\/\/)((w{3}?).)?)?)([\w-]+\.)+[\w-]+([\w- ;,./_?!%&<>\\[\]=]*)))/;
        const isValidUrl = regex.test(tool.link);

        if (!isValidUrl)
            errors["link"] = 'URL inválida';
    }

    return errors;
}

export { getTagsFromText, setHttp, validateTool };