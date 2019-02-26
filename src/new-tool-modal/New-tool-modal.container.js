import React, { Component } from 'react';

import toolApi from '../server-api';
import NewToolModal from './New-tool-modal';


class NewToolModalContainer extends Component {
    state = {
        tags: [],
        errors: {}
    }

    constructor(props) {
        super(props);
        this.addTag = this.addTag.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    addTag(tag) {
        this.setState(prevState => ({ tags: [...prevState.tags, tag] }));
    }

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const tool = {
            title: form.title.value,
            link: setHttp(form.link.value),
            description: form.description.value,
            tags: this.state.tags
        };
        const errors = validateTool(tool);

        if (Object.keys(errors).length) {
            this.setState({ errors });
            return;
        }
        
        try {
            const addedTool = await toolApi.add(tool);
            this.props.addToolsInState(addedTool);
            form.reset();
            this.props.close();
        } catch (error) {
            this.setState({ errors: { formMessage: error.message } });            
        }
    }

    render() {
        return (
            <NewToolModal {...this.props}
                tags={this.state.tags}
                addTag={this.addTag}
                handleSubmit={this.handleSubmit}
                errors={this.state.errors} />
        );
    }
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
        errors["title"] = { message: 'Nome da ferramenta, por favor!' };

    if (!tool.link || !tool.link.length) {
        errors["link"] = { message: 'Insira a URL' };
    } else {
        const regex = /(?=(([0-9a-fA-F]{4}):([0-9a-fA-F]{4}):([0-9a-fA-F]{4})::([0-9a-fA-F]{4}))|(^\s*(((https?(?![0-9][a-zA-Z]):)?(\/\/)((w{3}?).)?)?)([\w-]+\.)+[\w-]+([\w- ;,./_?!%&<>\\[\]=]*)))/;
        const isValidUrl = regex.test(tool.link);

        if (!isValidUrl)
            errors["link"] = { message: 'URL inválida' };
    }

    return errors;
}

export default NewToolModalContainer;