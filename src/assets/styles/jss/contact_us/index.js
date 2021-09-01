import { makeStyles } from "@material-ui/core/styles";

export const contactusStyles = makeStyles((theme) => ({
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: theme.palette.primary.main,
  },
}));
