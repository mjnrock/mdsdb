
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
} from "react-router-dom";
import { Segment } from "semantic-ui-react";

import "./assets/css/main.css";

import ScrollToTop from "./components/ScrollToTop";
import Routes from "./routes/package";
import SurveyNetwork from "./state/SurveyNetwork"

export const Context = React.createContext(SurveyNetwork);

function App() {
    return (
        <Router>
            <ScrollToTop>
                <Context.Provider value={{ network: SurveyNetwork }}>
                    <Switch>
                        <Route path="/survey/builder">
                            <Routes.SurveyBuilder />
                        </Route>
                        <Route path="/survey/:surveyId">
                            <Routes.SurveyViewer />
                        </Route>
                        <Route path="/form/builder">
                            <Routes.FormBuilder />
                        </Route>
                        <Route path="/form/:formId">
                            <Routes.FormEntry />
                        </Route>
                    </Switch>

					<Segment>
						<Link to="/form/builder">Form Builder</Link>
						<Link to="/form/d97caca4-6a64-4d68-83f0-cde06134587a">Demo Form</Link>
						<Link to="/survey/builder">Survey Builder</Link>
						<Link to="/survey/98a745fb-cbb6-4e2f-ba92-7589c9436ae7">Demo Survey</Link>
					</Segment>
                </Context.Provider>
            </ScrollToTop>
        </Router>
    );
}

export default App;