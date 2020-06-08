import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Button, Grid } from "@material-ui/core";

export default function Blinds() {
  const [blindState, setBlindState] = useState(0);
  const controlBlinds = (value) => {
    axios
      .post(
        `https://api.particle.io/v1/devices/e00fce68b69caa089b4e4287/blinds?access_token=0fe540c86d68f45a04033fb9fda204455d702b64`,
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
  return (
    <Container style={{ paddingTop: "16px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
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
        </Grid>
      </Grid>
    </Container>
  );
}
