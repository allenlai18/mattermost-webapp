// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import PropTypes from 'prop-types';
import React from 'react';
import {Modal} from 'react-bootstrap';
import {FormattedMessage} from 'react-intl';

import Constants from 'utils/constants';
import FormattedMarkdownMessage from 'components/formatted_markdown_message';

export default class UndeleteChannelModal extends React.PureComponent {
    static propTypes = {

        /**
        * Function called when modal is dismissed
        */
        onHide: PropTypes.func.isRequired,

        /**
         * channel data
         */
        channel: PropTypes.object.isRequired,

        canViewArchivedChannels: PropTypes.bool,

        actions: PropTypes.shape({

            /**
            * Function called for deleting channel,
            */

            undeleteChannel: PropTypes.func.isRequired,
        }),
    }

    constructor(props) {
        super(props);

        this.state = {show: true};
    }

    handleUndelete = () => {
        if (this.props.channel.id.length !== Constants.CHANNEL_ID_LENGTH) {
            return;
        }
        this.props.actions.undeleteChannel(this.props.channel.id);
        this.onHide();
    }

    onHide = () => {
        this.setState({show: false});
    }

    render() {
        const {canViewArchivedChannels} = this.props;
        return (
            <Modal
                dialogClassName='a11y__modal'
                show={this.state.show}
                onHide={this.onHide}
                onExited={this.props.onHide}
                role='dialog'
                aria-labelledby='undeleteChannelModalLabel'
                id='undeleteChannelModal'
            >
                <Modal.Header closeButton={true}>
                    <Modal.Title
                        componentClass='h1'
                        id='undeleteChannelModalLabel'
                    >
                        <FormattedMessage
                            id='undelete_channel.confirm'
                            defaultMessage='Confirm UNARCHIVE Channel'
                        />
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='alert alert-danger'>
                        {!canViewArchivedChannels &&
                            <FormattedMarkdownMessage
                                id='undelete_channel.question'
                                defaultMessage='This will unarchive the channel from the team and make its contents accessible for all users. \n \nAre you sure you wish to unarchive the **{display_name}** channel?'
                                values={{
                                    display_name: this.props.channel.display_name,
                                }}
                            />}
                        {canViewArchivedChannels &&
                            <FormattedMarkdownMessage
                                id='undelete_channel.viewArchived.question'
                                defaultMessage={'This will unarchive the channel from the team.\n \nAre you sure you wish to unarchive the **{display_name}** channel?'}
                                values={{
                                    display_name: this.props.channel.display_name,
                                }}
                            />}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type='button'
                        className='btn btn-link'
                        onClick={this.onHide}
                    >
                        <FormattedMessage
                            id='undelete_channel.cancel'
                            defaultMessage='Cancel'
                        />
                    </button>
                    <button
                        type='button'
                        className='btn btn-danger'
                        data-dismiss='modal'
                        onClick={this.handleUndelete}
                        autoFocus={true}
                        id='undeleteChannelModalDeleteButton'
                    >
                        <FormattedMessage
                            id='undelete_channel.del'
                            defaultMessage='Unarchive'
                        />
                    </button>
                </Modal.Footer>
            </Modal>
        );
    }
}
