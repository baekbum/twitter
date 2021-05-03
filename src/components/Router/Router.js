import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../../routes/Auth';
import Header from '../Header/Header';
import Home from '../../routes/Home';
import '../../css/Router/Router.scss';
import Footer from 'components/Footer/Footer';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn ? (
                <div className='header'>
                    <Header />
                </div>
             )  : null}
            <Switch>
                <>
                    {isLoggedIn ? ( 
                        <div className='main-container'>
                            <Route exact path='/'>
                                <Home />
                            </Route>
                        </div>
                        ) : ( <Route exact path='/'>
                                <Auth />
                            </Route> 
                        )
                    }
                </>
            </Switch>
            {isLoggedIn ? (
                <div className='footer'>
                    <Footer />
                </div>
             )  : null}
        </Router>
    )
};

export default AppRouter;