import { CircularProgress, makeStyles } from "@material-ui/core";
import { useSelector } from "react-redux";
import { storeState } from "../../redux/slice";
import CurrencyCard from "../CurrencyCard";
import ErrorTab from "../ErrorTab";

const useStyles = makeStyles({
  root: {
    marginTop: "2rem",
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
});

const CurrenciesTab = () => {
  const classes = useStyles();
  const state = useSelector(storeState);
  return (
    <div className={classes.root}>
      {state.isLoading ? (
        <CircularProgress />
      ) : state.isError ? (
        <ErrorTab />
      ) : (
        state.data.valute.map((item) => (
          <CurrencyCard key={item.ID} valute={item} />
        ))
      )}
    </div>
  );
};
export default CurrenciesTab;
