import {
  Box,
  FormControl,
  Icon,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../redux/slice";
import { ReactComponent as DoubleArrowsSVG } from "./assets/double-arrow.svg";
const useStyles = makeStyles({
  root: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width: 600px)": {
      flexDirection: "column",
      jusifyContent: "flex-start",
      alignItems: "center",
    },
  },
  title: {
    fontSize: 14,
    textAlign: "left",
    paddingTop: "1rem",
  },
  arrows: {
    verticalAlign: "middle",
    width: "3rem",
    height: "3rem",
    fontSize: "3rem",
    padding: "0 0.5rem",
    margin: "0 1rem",
    cursor: "pointer",
    backgroundColor: "white",
    borderRadius: "50%",
    fill: "#2697ff",
    "&:hover": {
      boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
    },
  },
  lineWrap: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },
  card: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: "white",
    borderRadius: 7,
    width: 250,
    height: 100,
    padding: "0 1.5rem",
    margin: "1rem",
    boxShadow: "0px 10px 10px rgba(0,0,0,0.2)",
  },
  formControl: {
    margin: "1rem 0",
    minWidth: 60,
  },
  inputValue: {
    width: "50%",
    "& .MuiInput-underline:before": {
      borderBottom: "1px solid #2697ff",
    },
    "& .MuiInput-underline:hover:before": {
      borderBottom: "2px solid #2697ff",
    },
    "& .MuiInput-underline.Mui-focused:after": {
      borderBottom: "2px solid #2697ff",
    },
  },
  resultTypo: {
    display: "block",
    maxWidth: 140,
    overflow: "hidden",
  },
});

const ConverterTab = () => {
  const classes = useStyles();
  const state = useSelector(storeState);
  const [firstValute, setFirstValute] = useState(state.data.valute[0]);
  const [secondValute, setSecondValute] = useState(state.data.valute[0]);
  const [inputValue, setInputValue] = useState("1");
  const [valueExch, setValueExch] = useState(1);
  const handleClickArrows = () => {
    const buf = { ...firstValute };
    setFirstValute({ ...secondValute });
    setSecondValute({ ...buf });
    setInputValue(valueExch.toFixed(4));
  };
  const handleChangeFirstSelector = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedValute = state.data.valute.find(
      (item) => item.ID === event.target.value
    );
    selectedValute && setFirstValute({ ...selectedValute });
  };
  const handleChangeSecondSelector = (
    event: React.ChangeEvent<{ value: unknown }>
  ) => {
    const selectedValute = state.data.valute.find(
      (item) => item.ID === event.target.value
    );
    selectedValute && setSecondValute({ ...selectedValute });
  };
  const handleChangeinputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isNumber = +e.target.value;
    !isNaN(isNumber) && setInputValue(e.target.value);
  };
  useEffect(() => {
    setFirstValute(state.data.valute[0]);
    setSecondValute(state.data.valute[0]);
  }, [state.data.valute]);
  useEffect(() => {
    if (firstValute && secondValute) {
      setValueExch(
        (+inputValue * (firstValute.Value * secondValute.Nominal)) /
          (firstValute.Nominal * secondValute.Value)
      );
    } else setValueExch(0);
  }, [inputValue, firstValute, secondValute]);
  return (
    <Box className={classes.root}>
      <Box className={classes.card}>
        <Typography className={classes.title} color="textSecondary">
          {firstValute && firstValute.Name}
        </Typography>
        <div className={classes.lineWrap}>
          <FormControl className={classes.formControl}>
            <Select
              value={firstValute ? firstValute.ID : ""}
              onChange={handleChangeFirstSelector}
              disableUnderline
            >
              {state.data.valute.map((item) => (
                <MenuItem key={item.ID} value={item.ID}>
                  {item.CharCode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            className={classes.inputValue}
            value={inputValue}
            onChange={handleChangeinputValue}
          />
        </div>
      </Box>
      <Icon
        component={DoubleArrowsSVG}
        className={classes.arrows}
        onClick={handleClickArrows}
      />
      <Box className={classes.card}>
        <Typography className={classes.title} color="textSecondary">
          {secondValute && secondValute.Name}
        </Typography>
        <div className={classes.lineWrap}>
          <FormControl className={classes.formControl}>
            <Select
              value={secondValute ? secondValute.ID : ""}
              onChange={handleChangeSecondSelector}
              disableUnderline
            >
              {state.data.valute.map((item) => (
                <MenuItem key={item.ID} value={item.ID}>
                  {item.CharCode}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Typography
            className={classes.resultTypo}
            variant="h5"
            component="h2"
            color="textSecondary"
            align="right"
          >
            {valueExch.toFixed(2)}
          </Typography>
        </div>
      </Box>
    </Box>
  );
};
export default ConverterTab;
