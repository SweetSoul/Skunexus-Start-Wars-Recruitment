import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Header from '../components/Header/header';
import NewPlanetModal from '../components/Modal/newPlanet';
import NotificationToast from '../components/Notification/notification';
import App from '../pages/App';
import Intro from '../pages/Intro/Intro';

const NotFoundPage = React.lazy(() => import('../pages/NotFoundPage'));
const Planet = React.lazy(() => import('../pages/Planet/planet'));
const Residents = React.lazy(() => import('../pages/Residents/residents'));
const Films = React.lazy(() => import('../pages/Films/films'));

const Router = () => {
    return (
        <>
            <BrowserRouter>
                <Header />
                <Switch>
                    <Route exact path='/' component={App} />
                    <Suspense fallback={<div>Loading...</div>}>
                        <Route exact path='/intro' component={Intro} />
                        <Route path="/planet" component={Planet} />
                        <Route path="/residents" component={Residents} />
                        <Route path="/films" component={Films} />
                    </Suspense>
                    <Route component={NotFoundPage} />
                </Switch>
                <NewPlanetModal />
                <NotificationToast />
            </BrowserRouter>
            <div className="stars" />
            <div className="twinkling" />
            <div className='fadeSection' />
        </>
    );
};

export default Router;
