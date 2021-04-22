import { makeStyles, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../redux/slice";
import CurrencyCard from "../CurrencyCard";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  cards: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    },
  },
  search: {
    width: "80%",
  },
});
function substr(str: string, searchStr: string) {
  return str.toUpperCase().indexOf(searchStr.toUpperCase()) !== -1;
}
const CurrenciesTab = () => {
  const [searchText, setSearchText] = useState("");
  const classes = useStyles();
  const state = useSelector(storeState);
  const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };
  return (
    <div className={classes.root}>
      <TextField
        className={classes.search}
        label="Поиск валюты"
        type="search"
        onChange={handleChangeSearch}
      />
      <div className={classes.cards}>
        {state.data.valute
          .filter(
            (item) =>
              substr(item.Name, searchText) || substr(item.CharCode, searchText)
          )
          .map((item) => (
            <CurrencyCard key={item.ID} valute={item} />
          ))}
      </div>
    </div>
  );
};
export default CurrenciesTab;
