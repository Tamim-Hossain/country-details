import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	CssBaseline,
	Grid,
	TextField,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const useStyles = makeStyles({
	root: {
		width: 300,
	},
	media: {
		height: 170,
	},
	content: {
		height: 70,
	},
	search: {
		marginBottom: "30px",
	},
	logo: {
		height: "130px",
		width: "150px",
	},
});

const Main = () => {
	const classes = useStyles();

	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");
	const [filteredCountries, setFilteredCountries] = useState([]);

	useEffect(() => {
		fetch("https://restcountries.eu/rest/v2/all")
			.then((res) => res.json())
			.then((data) => setCountries(data));
	}, []);

	useEffect(() => {
		const find = countries.filter((country) => country.name.toLowerCase().includes(search));
		setFilteredCountries(find);
	}, [countries, search]);

	return (
		<Container>
			<CssBaseline />
			<Grid className={classes.search} container justify="space-evenly" alignItems="center">
				<img src={logo} alt="" className={classes.logo} />
				<TextField
					label="Search Country"
					variant="outlined"
					placeholder="Enter country name.."
					defaultValue={search}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
			</Grid>
			<Grid container spacing={7} justify="space-around">
				{filteredCountries.map((country) => (
					<Grid item md={3} key={country.alpha3Code}>
						<Card className={classes.root}>
							<CardActionArea>
								<CardMedia className={classes.media} image={country.flag} title="Contemplative Reptile" />
								<CardContent className={classes.content}>
									<Typography gutterBottom variant="h5" component="h1" align="center">
										<Box fontWeight="fontWeightBold">{country.name}</Box>
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Grid container justify="center">
									<Button
										variant="contained"
										color="primary"
										disableElevation
										component={Link}
										to={`/${country.alpha2Code}`}
									>
										View Details
									</Button>
								</Grid>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Main;
