import { Box } from "@material-ui/core";
import React from "react";
import { ITabPanelProps } from "../../types";

const TabPanel: React.FC<ITabPanelProps> = (props) => {
  const { children, value, index } = props;

  return (
    <div role="tabpanel" hidden={value !== index}>
      {value === index && <Box p={3}>{children}</Box>}
    </div>
  );
};

export default TabPanel;
