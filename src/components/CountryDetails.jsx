import {
	Container,
	Grid,
	makeStyles,
	Paper,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import Loader from "react-loader-spinner";
import { useParams } from "react-router";

const useStyles = makeStyles({
	tableData: {
		fontWeight: "bold",
		fontSize: "1rem",
	},
	details: {
		padding: "35px 50px",
	},
	loading: {
		marginTop: "30vh",
	},
	flag: {
		height: "33px",
		marginRight: "20px",
	},
});

const CountryDetails = () => {
	const classes = useStyles();

	const [country, setCountry] = useState({});
	const [loading, setLoading] = useState(true);
	const { code } = useParams();

	useEffect(() => {
		fetch(`https://restcountries.eu/rest/v2/alpha/${code}`)
			.then((res) => res.json())
			.then((data) => {
				setCountry(data);
				setLoading(false);
			});
	}, [code]);

	return (
		<Container>
			<Grid container justify="center">
				{loading && <Loader type="Grid" color="green" height={130} width={130} className={classes.loading} />}
			</Grid>

			{!loading && (
				<Grid container className={classes.details}>
					<Grid container justify="center">
						<Typography variant="h3" component="h1" gutterBottom>
							<img src={country.flag} alt="flag" className={classes.flag} />
							{country.name}
						</Typography>
					</Grid>
					<Grid container>
						<TableContainer component={Paper}>
							<Table>
								<TableBody>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Capital
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.capital}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Government
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.altSpellings[2]}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											ISO Code
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.alpha2Code}, {country.alpha3Code}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Region
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.region}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Subregion
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.subregion}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Domain
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.topLevelDomain}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Dial Code
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.callingCodes}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Timezone
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.timezones[0]}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Population
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.population}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Nationality
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.demonym}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Total Area
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.area}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Language
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.languages[0].name}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Native Language Spelling
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.languages[0].nativeName}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Currency
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.currencies[0].name}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Currency Code
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.currencies[0].code}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Currency Symbol
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.currencies[0].symbol}
										</TableCell>
									</TableRow>
									<TableRow>
										<TableCell align="center" className={classes.tableData}>
											Regional Blocs
										</TableCell>
										<TableCell align="center" className={classes.tableData}>
											{country.regionalBlocs[0].acronym}
											{country.regionalBlocs[0].name}
										</TableCell>
									</TableRow>
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>
				</Grid>
			)}
		</Container>
	);
};

export default CountryDetails;
