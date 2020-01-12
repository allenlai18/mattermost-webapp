// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {FormattedMessage} from 'react-intl';

import {Group} from 'mattermost-redux/types/groups';
import {Channel} from 'mattermost-redux/types/channels';

import {t} from 'utils/i18n';

import AdminPanel from 'components/widgets/admin_console/admin_panel';
import ToggleModalButton from 'components/toggle_modal_button';
import AddGroupsToChannelModal from 'components/add_groups_to_channel_modal';
import GroupList from '../../group';

interface ChannelGroupsProps {
    synced: boolean;
    channel: Partial<Channel>;
    onAddCallback: (groupIDs: string[]) => void;
    totalGroups: number;
    groups: Partial<Group>[];
    removedGroups: object[];
    onGroupRemoved: (gid: string) => void;
}

export const ChannelGroups: React.SFC<ChannelGroupsProps> = (props: ChannelGroupsProps): JSX.Element => {
    const {onGroupRemoved, onAddCallback, totalGroups, groups, removedGroups, channel, synced} = props;
    return (
        <AdminPanel
            id='channel_groups'
            titleId={synced ? t('admin.channel_settings.channel_detail.syncedGroupsTitle') : t('admin.channel_settings.channel_detail.groupsTitle')}
            titleDefault={synced ? 'Synced Groups' : 'Groups'}
            subtitleId={synced ? t('admin.channel_settings.channel_detail.syncedGroupsDescription') : t('admin.channel_settings.channel_detail.groupsDescription')}
            subtitleDefault={synced ? 'Add and remove team members based on their group membership on the next scheduled sync.' : 'Group members will be added to the channel based on your sync schedule.'}
            className='channel_groups'
            button={
                <ToggleModalButton
                    className='btn btn-primary'
                    dialogType={AddGroupsToChannelModal}
                    dialogProps={{
                        channel,
                        onAddCallback,
                        skipCommit: true,
                        includeGroups: removedGroups,
                        excludeGroups: groups,
                    }}
                >
                    <FormattedMessage
                        id='admin.channel_settings.channel_details.add_group'
                        defaultMessage='Add Group'
                    />
                </ToggleModalButton>}
        >
            {channel.id && (
                <GroupList
                    channel={channel}
                    groups={groups}
                    totalGroups={totalGroups}
                    onGroupRemoved={onGroupRemoved}
                    isModeSync={synced}
                />
            )}
        </AdminPanel>
    );
};
