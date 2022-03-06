import {ErrorMessage, Form, Formik} from 'formik';
import React from 'react';
import CustomTextInput from "../../app/common/form/CustomTextInput";
import {Button, Header} from "semantic-ui-react";
import {useStore} from "../../app/stores/store";
import {observer} from "mobx-react-lite";
import * as Yup from 'yup';
import ValidationErrors from "../errors/ValidationErrors";

export default observer(function RegisterForm() {
    const {userStore} = useStore();

    return (
        <Formik
            initialValues={{displayName: '', userName: '', email: '', password: '', error: null}}
            onSubmit={(values, {setErrors}) => userStore.register(values).catch(error =>
                setErrors({error}))}
            validationSchema={Yup.object({
                displayName: Yup.string().required(),
                userName: Yup.string().required(),
                email: Yup.string().required().email(),
                password: Yup.string().required(),
            })}
        >
            {({handleSubmit, isSubmitting, errors, isValid, dirty}) => (
                <Form className="ui form error" onSubmit={handleSubmit} autoComplete="off">
                    <Header as="h3" content="Sign up to Reactivities" color="teal" textAlign="center"/>
                    <CustomTextInput placeholder="Display Name" name="displayName"/>
                    <CustomTextInput placeholder="User Name" name="userName"/>
                    <CustomTextInput placeholder="Email Address" name="email"/>
                    <CustomTextInput placeholder="Password" name="password" type="password"/>

                    <ErrorMessage name="error" render={() =>
                        <ValidationErrors errors={errors.error}/>}
                    />
                    <Button disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting} positive content="Register" type="submit" fluid/>
                </Form>
            )}
        </Formik>
    )
})