import React, { useEffect, useState } from "react";
import ApiService from "./service/apiservice";
import "./App.css";
import { IState, PageEnum } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { endLoading, errorLoading, setData, startLoading } from "./redux/slice";
import { AppBar, makeStyles, Tab, Tabs } from "@material-ui/core";
import TabPanel from "./components/TabPanel";
import CurrenciesTab from "./components/CurrenciesTab";
import ConverterTab from "./components/ConverterTab";

const useStyles = makeStyles({
  indicator: {
    backgroundColor: "white",
  },
});

function App() {
  const [page, setPage] = useState<PageEnum>(PageEnum.currencies);
  const state = useSelector<IState, IState["toolkit"]>(
    (state) => state.toolkit
  );

  const dispatch = useDispatch();
  const loadData = () => {
    dispatch(startLoading());
    ApiService.request()
      .then((data) => {
        dispatch(endLoading());
        dispatch(setData(data));
      })
      .catch(() => dispatch(errorLoading()));
  };
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    if (!state.isLoading) {
      loadData();
    }
  }, [state.repeatLoading]);
  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setPage(value);
  };
  const classes = useStyles();
  return (
    <div className="App">
      <AppBar position="fixed">
        <Tabs
          value={page}
          onChange={handleChange}
          classes={{ indicator: classes.indicator }}
        >
          <Tab label="Список валют" />
          <Tab label="Конвертер" />
        </Tabs>
      </AppBar>
      <TabPanel value={page} index={PageEnum.currencies}>
        <CurrenciesTab />
      </TabPanel>
      <TabPanel value={page} index={PageEnum.converter}>
        <ConverterTab />
      </TabPanel>
    </div>
  );
}

export default App;
