import {
	Box,
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	CssBaseline,
	Grid,
	InputAdornment,
	TextField,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { DoubleArrow, SearchOutlined } from "@material-ui/icons";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Loader from "react-loader-spinner";
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
	btn: {
		fontWeight: "bold",
	},
	searchIcon: {
		color: "green",
	},
	cardHover: {
		"&:hover": {
			boxShadow: "0 0 10px gray",
		},
	},
	loading: {
		marginTop: "100px",
	},
	notFound: {
		marginTop: "100px",
		fontWeight: "bold",
		color: "red",
	},
	input: {
		"& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
			borderColor: "green",
		},
		"&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
			borderColor: "black",
		},
		"& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
			borderColor: "green",
		},
		"& .MuiInputLabel-outlined.Mui-focused": {
			color: "green",
		},
	},
});

const Main = () => {
	const classes = useStyles();

	const [countries, setCountries] = useState([]);
	const [search, setSearch] = useState("");
	const [filteredCountries, setFilteredCountries] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetch("https://restcountries.eu/rest/v2/all")
			.then((res) => res.json())
			.then((data) => {
				setCountries(data);
				setLoading(false);
			});
	}, []);

	useEffect(() => {
		const find = countries.filter((country) => country.name.toLowerCase().includes(search));
		setFilteredCountries(find);
	}, [countries, search]);

	return (
		<Container>
			<Helmet>
				<title>Country Details</title>
			</Helmet>
			<CssBaseline />
			<Grid className={classes.search} container justify="space-evenly" alignItems="center">
				<img src={logo} alt="" className={classes.logo} />
				<TextField
					autoComplete="off"
					label="Search Country"
					variant="outlined"
					placeholder="Enter country name.."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className={classes.input}
					InputProps={{
						endAdornment: (
							<InputAdornment position="end">
								<SearchOutlined className={classes.searchIcon} />
							</InputAdornment>
						),
					}}
				/>
			</Grid>

			<Grid container spacing={5} justify="space-around">
				{loading && (
					<Grid>
						<Loader type="Circles" color="green" height={130} width={130} className={classes.loading} />
					</Grid>
				)}

				{search.length === 0 ||
					(filteredCountries.length === 0 && (
						<Typography variant="h4" component="p" className={classes.notFound}>
							Not Found!
						</Typography>
					))}

				{filteredCountries.map((country) => (
					<Grid item lg={3} md={4} sm={6} xs={12} key={country.alpha3Code} container justify="center">
						<Card className={`${classes.root} ${classes.cardHover}`}>
							<CardMedia className={classes.media} image={country.flag} title="Contemplative Reptile" />
							<CardContent className={classes.content}>
								<Typography gutterBottom variant="h5" component="h1" align="center">
									<Box fontWeight="fontWeightBold">{country.name}</Box>
								</Typography>
							</CardContent>
							<CardActions>
								<Grid container justify="center">
									<Button
										className={classes.btn}
										variant="contained"
										disableElevation
										endIcon={<DoubleArrow />}
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
