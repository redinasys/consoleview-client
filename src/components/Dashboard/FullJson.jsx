import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import JsonFormatter from "react-json-formatter";
import { Grid } from "@mui/material";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  height: "80%",
  overflow: "scroll",
};

export default function FullJson(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const jsonStyle = {
    propertyStyle: { color: "#1876D1" },
    stringStyle: { color: "black" },
  };

  return (
    <div>
      <Button onClick={handleOpen}>See Full Json</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                Complete Details
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Button
                onClick={() => navigator.clipboard.writeText(props.fullJson)}
              >
                Copy &nbsp; <ContentCopyIcon />
              </Button>
            </Grid>
          </Grid>

          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <JsonFormatter
              json={props.fullJson}
              tabWith={4}
              jsonStyle={jsonStyle}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
