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
                        <Route path="/survey/builder">
                            <Routes.SurveyBuilder />
                        </Route>
                        <Route path="/survey/:surveyId">
                            <Routes.SurveyViewer />
                        </Route>
                    </Switch>

                    <Link to="/survey/builder">Survey Builder</Link>
                    <Link to="/survey/98a745fb-cbb6-4e2f-ba92-7589c9436ae7">Demo Survey</Link>
                </Context.Provider>
            </ScrollToTop>
        </Router>
    );
}

export default App;