import { Button, Typography } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { loadingData } from "../../redux/slice";

const ErrorTab = () => {
  const dispatch = useDispatch();
  const handleClickButton = () => {
    dispatch(loadingData());
  };
  return (
    <>
      <Typography>Ошибка загрузки данных</Typography>
      <Button variant="contained" color="secondary" onClick={handleClickButton}>
        Повторить
      </Button>
    </>
  );
};
export default ErrorTab;
