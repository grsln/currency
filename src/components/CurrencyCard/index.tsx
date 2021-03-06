import {
  Card,
  CardContent,
  Icon,
  makeStyles,
  Typography,
} from "@material-ui/core";
import { useState } from "react";
import { IValute } from "../../types";
import { ReactComponent as DoubleArrowsSVG } from "./assets/double-arrow.svg";
import Different from "../Different";
const useStyles = makeStyles({
  root: {
    minWidth: 200,
    width: 520,
    margin: "1rem",
    borderRadius: 7,
    paddingLeft: "1rem",
    paddingRight: "1rem",
    boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
    "@media (max-width: 600px)": {
      width: "75vw",
    },
  },
  title: {
    fontSize: 14,
    textAlign: "left",
    paddingTop: "1rem",
  },
  text: {
    textAlign: "left",
  },
  arrows: {
    verticalAlign: "middle",
    width: "5rem",
    fontSize: "3rem",
    padding: "0 1rem",
    cursor: "pointer",
    "@media (max-width: 600px)": {
      transform: "rotate(90deg)",
      fontSize: "2rem",
    },
  },
  lineWrap: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  },
  courseWrap: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  },
  mainValute: {
    display: "flex",
    alignItems: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "flex-start",
    },
  },
});
function perRuble(val: number, nominal: number) {
  const convertToRuble = nominal / val;
  const rubleNominal = calcNominal(convertToRuble);
  return [(convertToRuble * rubleNominal).toFixed(4), rubleNominal];
}
function calcNominal(val: number) {
  let nominal = 0;
  while (val * Math.pow(10, nominal) < 0.1) nominal += 1;
  return Math.pow(10, nominal);
}

const CurrencyCard = ({ valute }: { valute: IValute }) => {
  const classes = useStyles();
  const [rubMain, setRubMain] = useState(false);
  const handleClickArrows = () => setRubMain((prev) => !prev);
  const [ruble, nominal] = perRuble(valute.Value, valute.Nominal);
  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary">
          {valute.Name}
        </Typography>
        <div className={classes.lineWrap}>
          <div className={classes.courseWrap}>
            <div className={classes.mainValute}>
              <Typography className={classes.text} variant="h5" component="h2">
                {!rubMain
                  ? `${valute.Nominal} ${valute.CharCode}`
                  : `${nominal} RUB`}
              </Typography>
              <Icon
                component={DoubleArrowsSVG}
                className={classes.arrows}
                onClick={handleClickArrows}
              />
            </div>
            <Typography className={classes.text} variant="h5" component="h2">
              {!rubMain ? `${valute.Value} RUB` : `${ruble} ${valute.CharCode}`}
            </Typography>
          </div>
          <Different
            currentValue={valute.Value}
            previousValue={valute.Previous}
          />
        </div>
      </CardContent>
    </Card>
  );
};
export default CurrencyCard;
