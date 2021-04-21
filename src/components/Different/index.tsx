import { Icon, makeStyles, Typography } from "@material-ui/core";
import { IDifferent } from "../../types";
import { ReactComponent as UpArrowSVG } from "./assets/arrow-up.svg";
import { ReactComponent as DownArrowSVG } from "./assets/arrow-down.svg";
const useStyles = makeStyles({
  main: {
    display: "flex",
    alignItems: "center",
  },
  arrowUp: {
    fontSize: "2rem",
    fill: "green",
    verticalAlign: "middle",
  },
  arrowDown: {
    fontSize: "2rem",
    fill: "red",
    verticalAlign: "middle",
  },
  up: {
    color: "green",
  },
  down: {
    color: "red",
  },
  equal: {
    color: "inherit",
  },
});

function absDiff(val1: number, val2: number) {
  return Math.abs(val1 - val2).toFixed(4);
}
const Different = ({ currentValue, previousValue }: IDifferent) => {
  const classes = useStyles();
  const valueStyle =
    currentValue > previousValue
      ? classes.up
      : currentValue < previousValue
      ? classes.down
      : classes.equal;
  return (
    <div className={`${classes.main} ${valueStyle}`}>
      {currentValue > previousValue && (
        <Icon component={UpArrowSVG} className={classes.arrowUp} />
      )}
      {currentValue < previousValue && (
        <Icon component={DownArrowSVG} className={classes.arrowDown} />
      )}
      <Typography
        className={valueStyle}
        color="textSecondary"
        variant="h5"
        component="h2"
      >
        {absDiff(currentValue, previousValue)}
      </Typography>
    </div>
  );
};
export default Different;
