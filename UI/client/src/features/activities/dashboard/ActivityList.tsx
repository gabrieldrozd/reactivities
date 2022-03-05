import React, {Fragment} from 'react';
import {Button, Header, Icon} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";

export default observer(function ActivityList() {
    const {activityStore} = useStore();
    const {groupedActivities} = activityStore;

    return (
        <Fragment>
            <Button size="tiny" className="reload-button" onClick={() => activityStore.loadActivities()}>
                <Icon name="sync" size="big"/>
            </Button>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color="teal" style={{fontSize: '16px'}}>
                        {group}
                    </Header>
                    {activities.map(activity => (
                        <ActivityListItem key={activity.id} activity={activity}/>
                    ))}
                </Fragment>
            ))}
        </Fragment>
    )
})