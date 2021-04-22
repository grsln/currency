import { Box, CircularProgress, makeStyles } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";
import { storeState } from "../../redux/slice";
import { ITabPanelProps } from "../../types";
import ErrorTab from "../ErrorTab";
const useStyles = makeStyles({
  tab: {
    paddingTop: "50px",
  },
});
const TabPanel: React.FC<ITabPanelProps> = (props) => {
  const { children, value, index } = props;
  const state = useSelector(storeState);
  const classes = useStyles();
  return (
    <div role="tabpanel" hidden={value !== index} className={classes.tab}>
      {state.isLoading && <CircularProgress />}
      {state.isError && <ErrorTab />}
      {value === index && !state.isLoading && !state.isError && (
        <Box p={3}>{children}</Box>
      )}
    </div>
  );
};

export default TabPanel;
