import '@fake-db'
import React, { useState } from 'react';
import {FuseAuthorization, FuseLayout, FuseTheme} from '@fuse';
import Provider from 'react-redux/es/components/Provider';
import {Router} from 'react-router-dom';
import jssExtend from 'jss-extend';
import history from '@history';
import {Auth} from './auth';
import store from './store';
import AppContext from './AppContext';
import routes from './fuse-configs/routesConfig';
import {create} from 'jss';
import {StylesProvider, jssPreset, createGenerateClassName} from '@material-ui/styles';


const jss = create({
    ...jssPreset(),
    plugins       : [...jssPreset().plugins, jssExtend()],
    insertionPoint: document.getElementById('jss-insertion-point'),
});

const generateClassName = createGenerateClassName();

const App = () => {
    // localStorage.setItem("myprofile", apiRes);
    const myprofileData = localStorage.getItem("myprofile")
    ? JSON.parse(localStorage.getItem("myprofile"))
    : [];
    const [selectedDepartment, setSelectedDepartment] = useState("");
    const SateID = myprofileData.state? myprofileData.state :12
    console.log(SateID);
    return (
        <AppContext.Provider
            value={{
                routes , selectedDepartment, setSelectedDepartment ,SateID
            }}
        >
            <StylesProvider jss={jss} generateClassName={generateClassName}>
                <Provider store={store}>
                    <Auth>
                        <Router history={history}>
                            <FuseAuthorization>
                                <FuseTheme>
                                    <FuseLayout/>
                                </FuseTheme>
                            </FuseAuthorization>
                        </Router>
                    </Auth>
                </Provider>
            </StylesProvider>
        </AppContext.Provider>
    );
};

export default App;
