import React, { Component } from 'react';

import toolApi from '../server-api';
import NewToolModal from './New-tool-modal';


class NewToolModalContainer extends Component {
    state = {
        errors: {}
    }

    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.close = this.close.bind(this);
    }

    close() {
        const openedModal =
            window.document.querySelector('.modal-overlay.open');
        this.setState({ errors: {} });
        this.props.close();
        resetFormsWithin(openedModal);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const form = event.target;
        const tool = {
            title: form.title.value,
            link: setHttp(form.link.value),
            description: form.description.value,
            tags: form.tags.value.trim().split(' ')
        };
        const errors = validateTool(tool);

        if (Object.keys(errors).length) {
            this.setState({ errors });
            return;
        }

        try {
            const addedTool = await toolApi.add(tool);
            this.props.handleAddedTool(addedTool);
            this.props.close();
            this.setState({ errors: {} });
            form.reset();
        } catch (error) {
            this.setState({ errors: { formMessage: error.message } });
        }
    }

    render() {
        return (
            <NewToolModal {...this.props}
                close={this.close}
                handleSubmit={this.handleSubmit}
                errors={this.state.errors} />
        );
    }
}

function resetFormsWithin(parentElement) {
    parentElement.querySelectorAll('form').forEach(form => form.reset());
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