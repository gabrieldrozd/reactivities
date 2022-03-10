import React, {Fragment, useEffect} from 'react';
import {Container} from "semantic-ui-react";
import NavBar from "./NavBar";
import ActivityDashboard from "../../features/activities/dashboard/ActivityDashboard";
import {observer} from "mobx-react-lite";
import {Route, Switch, useLocation} from "react-router-dom";
import HomePage from "../../features/home/HomePage";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetails from "../../features/activities/details/ActivityDetails";
import TestError from '../../features/errors/TestError';
import {ToastContainer} from "react-toastify";
import NotFound from "../../features/errors/NotFound";
import ServerError from "../../features/errors/ServerError";
import LoginForm from "../../features/users/LoginForm";
import {useStore} from "../stores/store";
import LoadingComponent from "./LoadingComponent";
import ModalContainer from "../common/modals/ModalContainer";
import ProfilePage from "../../features/profiles/ProfilePage";

function App() {
    const location = useLocation();
    const {commonStore, userStore} = useStore();

    useEffect(() => {
        if (commonStore.token) {
            userStore.getUser().finally(() => commonStore.setAppLoaded());
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore])

    if (!commonStore.appLoaded) return <LoadingComponent content='Loading app...'/>

    return (
        // <Fragment> </Fragment> or <> </> - function must return a single element
        <Fragment>
            <ToastContainer
                theme='colored'
                position='bottom-right'
                hideProgressBar={false}
                autoClose={3000}
                draggable
                newestOnTop
            />
            <ModalContainer/>
            <Route path="/" component={HomePage} exact/>
            <Route
                path={'/(.+)'}
                render={() => (
                    <Fragment>
                        <NavBar/>
                        <Container style={{marginTop: '7em'}}>
                            <Switch>
                                <Route path="/activities" component={ActivityDashboard} exact/>
                                <Route path="/activities/:id" component={ActivityDetails}/>
                                <Route key={location.key} path={['/createActivity', '/manage/:id']}
                                       component={ActivityForm}/>
                                <Route path='/profiles/:userName' component={ProfilePage}/>
                                <Route path='/errors' component={TestError}/>
                                <Route path='/server-error' component={ServerError}/>
                                <Route path='/login' component={LoginForm}/>
                                <Route component={NotFound}/>
                            </Switch>
                        </Container>
                    </Fragment>
                )}
            />
        </Fragment>
    );
}

export default observer(App);
