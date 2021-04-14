import React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import Auth from '../../routes/Auth';
import Header from '../Header';
import Home from '../../routes/Home';

const AppRouter = ({ isLoggedIn }) => {
    return (
        <Router>
            {isLoggedIn ? (
                <div style={{width: '100vw', height: '7vh'}}>
                    <Header />
                </div>
             )  : null}
            <Switch>
                <>
                    {isLoggedIn ? ( 
                        <div style={{ display: 'flex', justifyContent: 'center', height: '91vh', width: '100vw', marginTop: '1vh', marginBottom: '1vh'}}>
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
        </Router>
    )
};

export default AppRouter;