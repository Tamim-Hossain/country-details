import {
	Box,
	Button,
	Card,
	CardActionArea,
	CardActions,
	CardContent,
	CardMedia,
	Container,
	Grid,
	TextField,
	Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
});

const Main = () => {
	const [data, setData] = useState([]);
	const classes = useStyles();

	useEffect(() => {
		fetch("https://restcountries.eu/rest/v2/all")
			.then((res) => res.json())
			.then((data) => setData(data));
	}, []);

	return (
		<Container>
			<TextField id="outlined-basic" label="Search Country" variant="outlined" placeholder="Enter country name.." />
			<Grid container spacing={7}>
				{data.map((country) => (
					<Grid item md={3} key={country.alpha3Code}>
						<Card className={classes.root}>
							<CardActionArea>
								<CardMedia className={classes.media} image={country.flag} title="Contemplative Reptile" />
								<CardContent className={classes.content}>
									<Typography gutterBottom variant="h6" component="h1" align="center">
										<Box fontWeight="fontWeightBold">{country.name}</Box>
									</Typography>
								</CardContent>
							</CardActionArea>
							<CardActions>
								<Button
									variant="contained"
									color="primary"
									disableElevation
									component={Link}
									to={`/${country.alpha2Code}`}
								>
									View Details
								</Button>
							</CardActions>
						</Card>
					</Grid>
				))}
			</Grid>
		</Container>
	);
};

export default Main;
