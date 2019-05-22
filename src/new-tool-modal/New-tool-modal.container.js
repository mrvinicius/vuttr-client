import React, { Component } from 'react';

import toolApi from '../server-api';
import NewToolModal from './New-tool-modal';
import { getTagsFromText, setHttp, validateTool } from '../utils';


class NewToolModalContainer extends Component {
    state = {
        errors: {},
        isSubmitDisabled: false
    }

    close = event => {
        this.setState({ errors: {} });
        this.props.close();
        event.currentTarget
            .querySelector('form').reset();
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isSubmitDisabled: true });

        const form = event.target;
        const tool = {
            title: form.title.value,
            link: setHttp(form.link.value),
            description: form.description.value,
            tags: getTagsFromText(form.tags.value)
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

export default NewToolModalContainer;