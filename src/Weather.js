import weatherData from "./mock_weather_data.json";
import Chart from "./Chart";

import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import { getWeather } from "./api";
const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function BasicCard() {
  console.log(process.env);
  const [weather, setWeather] = React.useState(null);
  const [city, setCity] = React.useState("Cluj");
  const [shouldSearch, setShouldSearch] = React.useState(true);

  React.useEffect(() => {
    if (!shouldSearch) return;
    getWeather(city).then((asJson) => {
      // console.log("asJson", asJson);
      // if (asJson.error) {
      //   // setWeather(null);
      //   console.log(asJson.error);
      // } else {
      // console.log("is boom ", asJson.error);
      setWeather(asJson);
      setShouldSearch(false);
      // }
    });
    // .catch(() => {
    //   console.log("Is boom?");
    // });
  }, [shouldSearch]);

  if (!weather) return <>Loading!</>;

  return (
    <>
      <TextField
        onChange={(ev) => setCity(ev.target.value)}
        value={city}
        id="outlined-basic"
        label="City"
        variant="outlined"
        fullWidth
        onKeyUp={(e) => {
          if (e.key === "Enter") setShouldSearch(true);
        }}
        sx={{ mb: 2 }}
      />
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Grid container spacing={1}>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
              }}
            >
              <img src={weather.current.condition.icon} />

              <Typography
                variant="h2"
                sx={{
                  lineHeight: 1,
                }}
              >
                {weather?.current.temp_c}
              </Typography>
              <Typography>°C</Typography>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "flex-end",
              }}
            >
              <Typography variant="h5" component="div">
                {weather?.location?.name}, {weather?.location.country}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(weather.current.last_updated).toLocaleDateString(
                  "en-US",
                  {
                    weekday: "long",
                  }
                )}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {weather?.current.condition.text}
                {/* well meaning and kindly.
          <br />
          {'"a benevolent smile"'} */}
              </Typography>
            </Grid>
            {/* <Grid item xs={6} md={4}>
              <Item>xs=6 md=4</Item>
            </Grid>
            <Grid item xs={6} md={4}>
              <Item>xs=6 md=4</Item>
            </Grid>
            <Grid item xs={6} md={8}>
              <Item>xs=6 md=8</Item>
            </Grid> */}
          </Grid>

          <Box mt={1}>
            <Chart
              data={weather.forecast.forecastday[0].hour.map((hr) => ({
                ...hr,
                time: new Date(hr.time).getHours(),
                temp_c: hr.temp_c.toPrecision(2),
              }))}
            />
          </Box>
        </CardContent>
        {/* <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions> */}
      </Card>
    </>
  );
}
