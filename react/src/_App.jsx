/* eslint-disable */
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";

import "./assets/css/main.css";

import ScrollToTop from "./components/ScrollToTop";
import Routes from "./routes/package";
import StateNode from "./state/SurveyState";

export const Context = React.createContext(StateNode);

function App() {
    return (
        <Router>
            <ScrollToTop>
                <Context.Provider value={ { node: StateNode } }>
                    <Switch>
                        <Route path="/dictionary">
                            <Routes.Dictionary />
                        </Route>
                        <Route path="/form/builder">
                            <Routes.FormBuilder />
                        </Route>
                        <Route path="/form/:formId">
                            <Routes.FormEntry />
                        </Route>
                        <Route path="/survey/builder">
                            <Routes.SurveyBuilder />
                        </Route>
                        <Route path="/survey/:surveyId">
                            <Routes.SurveyViewer />
                        </Route>
                    </Switch>

                    <Link to="/dictionary">Dictionary</Link>
                    <Link to="/form/builder">Form Builder</Link>
                    <Link to="/form/d97caca4-6a64-4d68-83f0-cde06134587a">Demo Form</Link>
                    <Link to="/survey/builder">Survey Builder</Link>
                    <Link to="/survey/98a745fb-cbb6-4e2f-ba92-7589c9436ae7">Demo Survey</Link>
                </Context.Provider>
            </ScrollToTop>
        </Router>
    );
}

export default App;