import React, {useEffect, useState} from 'react';
import {Button, Header, Segment} from "semantic-ui-react";
import {useStore} from "../../../app/stores/store";
import {observer} from "mobx-react-lite";
import {Link, useHistory, useParams} from "react-router-dom";
import LoadingComponent from "../../../app/layout/LoadingComponent";
import {v4 as uuid} from 'uuid';
import {Formik, Form} from 'formik';
import * as Yup from 'yup';
import CustomTextInput from "../../../app/common/form/CustomTextInput";
import CustomTextAreaInput from "../../../app/common/form/CustomTextAreaInput";
import CustomSelectInput from "../../../app/common/form/CustomSelectInput";
import {CategoryOptions} from "../../../app/common/options/categoryOptions";
import CustomDateInput from "../../../app/common/form/CustomDateInput";
import {Activity} from "../../../app/modules/activity";

export default observer(function ActivityForm() {
    const history = useHistory();
    const {activityStore} = useStore();
    const {createActivity, updateActivity, loading, loadActivity, loadingInitial} = activityStore;
    const {id} = useParams<{ id: string }>();

    const [activity, setActivity] = useState<Activity>({
        id: '',
        title: '',
        category: '',
        description: '',
        date: null,
        city: '',
        venue: ''
    });

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required('The activity category is required'),
        date: Yup.string().required('The activity date is required').nullable(),
        venue: Yup.string().required('The activity venue is required'),
        city: Yup.string().required('The activity city is required'),
    })

    useEffect(() => {
        if (id) loadActivity(id).then(activity => setActivity(activity!));
    }, [id, loadActivity]);

    function handleFormSubmit(activity: Activity) {
        if (activity.id.length === 0) {
            let newActivity = {
                ...activity,
                id: uuid()
            };
            createActivity(newActivity).then(() => history.push(`/activities/${newActivity.id}`));
        } else {
            updateActivity(activity).then(() => history.push(`/activities/${activity.id}`));
        }
    }

    if (loadingInitial) return <LoadingComponent content="Loading activity..."/>

    return (
        <Segment clearing>
            <Header content="Activity Details" sub color="teal"/>
            <Formik
                validationSchema={validationSchema}
                enableReinitialize
                initialValues={activity}
                onSubmit={values => handleFormSubmit(values)}>
                {({handleSubmit, isValid, isSubmitting, dirty}) => (
                    <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
                        <CustomTextInput placeholder="Title" name="title"/>
                        <CustomTextAreaInput placeholder="Description" name="description" rows={3}/>
                        <CustomSelectInput placeholder="Category" name="category" options={CategoryOptions}/>
                        <CustomDateInput
                            placeholderText="Date"
                            name="date"
                            showTimeSelect
                            timeCaption="time"
                            dateFormat="MMMM d, yyyy h:mm aa"
                        />

                        <Header content="Location Details" sub color="teal"/>
                        <CustomTextInput placeholder="City" name="city"/>
                        <CustomTextInput placeholder="Venue" name="venue"/>


                        <Button
                            style={{width: '20%'}}
                            disabled={isSubmitting || !dirty || !isValid}
                            loading={loading} floated="right" positive type="submit" content="Submit"/>

                        <Button style={{width: '20%'}} as={Link} to="/activities" floated="right" type="button"
                                content="Cancel"/>

                    </Form>
                )}
            </Formik>
        </Segment>
    )
})