import { BrowserRouter, Route, Switch } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import Main from "./components/Main";

const App = () => {
	return (
		<BrowserRouter>
			<Switch>
				<Route exact path="/" component={Main} />
				<Route exact path="/:code" component={CountryDetails} />
			</Switch>
		</BrowserRouter>
	);
};

export default App;
