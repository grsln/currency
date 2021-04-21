import React, { useEffect, useState } from "react";
import ApiService from "./service/apiservice";
import "./App.css";
import { IState, PageEnum } from "./types";
import { useDispatch, useSelector } from "react-redux";
import { endLoading, errorLoading, setData, startLoading } from "./redux/slice";
import { AppBar, Tab, Tabs } from "@material-ui/core";
import TabPanel from "./components/TabPanel";
import CurrenciesTab from "./components/CurrenciesTab";

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
        console.log("###", data);
      })
      .catch(() => dispatch(errorLoading()));
  };
  useEffect(() => {
    loadData();
  }, []);
  useEffect(() => {
    !state.isLoading && loadData();
  }, [state.repeatLoading]);
  console.log(state);
  const handleChange = (event: React.ChangeEvent<{}>, value: number) => {
    setPage(value);
  };
  return (
    <div className="App">
      <AppBar position="fixed">
        <Tabs value={page} onChange={handleChange}>
          <Tab label="Список валют" />
          <Tab label="Конвертер" />
        </Tabs>
      </AppBar>
      <TabPanel value={page} index={PageEnum.currencies}>
        <CurrenciesTab />
      </TabPanel>
      <TabPanel value={page} index={PageEnum.converter}>
        Item Two
      </TabPanel>
    </div>
  );
}

export default App;
