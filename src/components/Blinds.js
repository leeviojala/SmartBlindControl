import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Button,
  Grid,
  Slider,
  AppBar,
  Toolbar,
  Typography,
} from "@material-ui/core";

const marks = [
  {
    value: 0,
    label: "Closed convex in",
  },
  {
    value: 1,
    label: "open a bit",
  },
  {
    value: 2,
    label: "fully open",
  },
  {
    value: 3,
    label: "open a bit",
  },
  {
    value: 4,
    label: "Closed convex out",
  },
];
export default function Blinds() {
  const [value, setValue] = React.useState(1);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [blindState, setBlindState] = useState(9999);
  const controlBlinds = (value) => {
    axios
      .post(
        `https://api.particle.io/v1/devices/e00fce68b69caa089b4e4287/blinds?access_token=35c09bef4da6e6e45647d5275bcee5b4c56918bb`,
        { value: value }
      )
      .then((res) => {
        console.log(res);
        getState();
      });
  };
  const getState = () => {
    axios
      .get(
        `https://api.particle.io/v1/devices/e00fce68b69caa089b4e4287/state?access_token=0fe540c86d68f45a04033fb9fda204455d702b64`
      )
      .then((res) => {
        setBlindState(res.data.result);
        console.log(blindState);
      });
  };
  useEffect(() => {
    getState();
  });
  useEffect(() => {
    setValue(blindState);
  }, [blindState]);
  useEffect(() => {
    console.log(blindState - value);
    switch (blindState - value) {
      case -2:
        console.log("avaa");
        controlBlinds("open");
        break;
      case -1:
        console.log("avaa enemmän");
        controlBlinds("openMore");
        break;
      case 1:
        console.log("sulje enemmän");
        controlBlinds("closeMore");
        break;
      case 2:
        console.log("sulje");
        controlBlinds("close");
        break;
      default:
        console.log("yeet");
    }
  }, [value]);
  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Control Blinds</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ paddingTop: "86px" }}>
        <Grid container spacing={2}>
          {/* <Grid item xs={12} sm={6}>
          {console.log(parseInt(blindState))}
          <Button
            disabled={blindState >= 3}
            color="primary"
            fullWidth
            variant="contained"
            onClick={() => controlBlinds("open")}
          >
            Avaa
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            disabled={blindState >= 4}
            fullWidth
            variant="contained"
            onClick={() => controlBlinds("openMore")}
          >
            Avaa Enemmän
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            disabled={blindState <= 1}
            color="primary"
            fullWidth
            variant="contained"
            onClick={() => controlBlinds("close")}
          >
            Sulje
          </Button>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            disabled={blindState <= 0}
            fullWidth
            variant="contained"
            onClick={() => controlBlinds("closeMore")}
          >
            Sulje Enemmän
          </Button>
        </Grid> */}
          <Grid item xs={12}></Grid>
          <Grid item xs={12}>
            <Slider
              defaultValue={blindState}
              value={value}
              aria-labelledby="discrete-slider"
              valueLabelDisplay="on"
              onChange={handleChange}
              step={1}
              marks
              min={0}
              max={4}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
