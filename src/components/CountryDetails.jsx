import { Container } from "@material-ui/core";
import { useEffect, useState } from "react";
import { useParams } from "react-router";

const CountryDetails = () => {
	const [country, setCountry] = useState({});
	const { code } = useParams();

	useEffect(() => {
		fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
			.then((res) => res.json())
			.then((data) => setCountry(data));
	}, [code]);

	return (
		<Container>
			<p>{country.capital}</p>
		</Container>
	);
};

export default CountryDetails;
