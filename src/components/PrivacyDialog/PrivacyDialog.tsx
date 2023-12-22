import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";

import "./styles.scss";
const bc: string = "privacy-tile";
interface ComponentProps {
  open: boolean;
  handleClose: any;
}
const PrivacyDialog = ({ handleClose, open }: ComponentProps) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      // fullScreen={fullScreen}
      open={open}
      // onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">
        {"Terms and Conditions"}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          <p>
            I confirm that I have read, consent and agree to this site's{" "}
            <a className={`${bc}__link`} href="/privacy-policy" target="_blank">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a className={`${bc}__link`} href="/terms-of-use" target="_blank">
              Terms of Use
            </a>
          </p>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary" autoFocus>
          Agree
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PrivacyDialog;
