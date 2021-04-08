import React, { useEffect } from "react";
import axios from "axios";
import {
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Switch,
} from "@material-ui/core";

export default function Blinds() {
  const [open, setOpen] = React.useState(false);
  const handleChange = () => {
    !open ? controlBlind("open") : controlBlind("close");
  };

  const getState = () => {
    axios
      .get(
        `https://api.particle.io/v1/devices/e00fce68b69caa089b4e4287/state?access_token=35c09bef4da6e6e45647d5275bcee5b4c56918bb`
      )
      .then((res) => {
        setOpen(res.data.result === 1 ? true : false);
      });
  };
  useEffect(() => {
    getState();
  });

  const controlBlind = async (value) => {
    const controlBlinds = await axios.post(
      `https://api.particle.io/v1/devices/e00fce68b69caa089b4e4287/blinds?access_token=35c09bef4da6e6e45647d5275bcee5b4c56918bb`,
      { value: value }
    );
    console.log(controlBlinds.data.return_value);
    setOpen(controlBlinds.data.return_value === 1 ? true : false);
  };

  return (
    <React.Fragment>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">Control Blinds</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ paddingTop: "86px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Switch
              checked={open}
              onChange={handleChange}
              name="checkedA"
              inputProps={{ "aria-label": "secondary checkbox" }}
            />
          </Grid>
        </Grid>
      </Container>
    </React.Fragment>
  );
}
