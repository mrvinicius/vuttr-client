import React, { Component } from 'react';

import toolApi from '../server-api';
import NewToolModal from './New-tool-modal';


class NewToolModalContainer extends Component {
    state = {
        errors: {},
        isSubmitDisabled: false
    }

    close = _ => {
        const openedModal =
            window.document.querySelector('.modal-overlay.open');
        this.setState({ errors: {} });
        this.props.close();
        resetFormsWithin(openedModal);
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isSubmitDisabled: true });

        const form = event.target;
        const value = form.tags.value.trim();
        const tool = {
            title: form.title.value,
            link: setHttp(form.link.value),
            description: form.description.value,
            tags: value ? value.split(' ') : []
        };
        const errors = validateTool(tool);

        if (Object.keys(errors).length) {
            this.setState({ errors });
            this.setState({ isSubmitDisabled: false });

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
        } finally {
            this.setState({ isSubmitDisabled: false });
        }
    }

    render() {
        return (
            <NewToolModal {...this.props}
                close={this.close}
                handleSubmit={this.handleSubmit}
                errors={this.state.errors}
                isSubmitDisabled={this.state.isSubmitDisabled} />
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
        errors["title"] = 'Nome da ferramenta, por favor!';

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

export default NewToolModalContainer;