import React from 'react';
import {Grid} from "semantic-ui-react";
import {Activity} from '../../../app/modules/activity';
import ActivityList from "./ActivityList";
import ActivityDetails from "../details/ActivityDetails";
import ActivityForm from "../form/ActivityForm";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";

interface Props {
    activities: Activity[];
    createOrEdit: (activity: Activity) => void;
    deleteActivity: (id: string) => void;
    submitting: boolean;
}

export default observer(function ActivityDashboard({activities, createOrEdit, deleteActivity, submitting}: Props) {
    const {activityStore} = useStore();

    return (
        <Grid>
            <Grid.Column width="10">
                <ActivityList
                    activities={activities}
                    deleteActivity={deleteActivity}
                    submitting={submitting}
                />
            </Grid.Column>
            <Grid.Column width="6">
                {activityStore.selectedActivity && !activityStore.editMode &&
                    <ActivityDetails/>
                }
                {activityStore.editMode &&
                    <ActivityForm
                        createOrEdit={createOrEdit}
                        submitting={submitting}
                    />
                }
            </Grid.Column>
        </Grid>
    )
})