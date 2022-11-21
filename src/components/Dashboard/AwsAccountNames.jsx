import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useState, useEffect } from "react";
import { FetchAwsAccounts } from "../../utils/FetchAwsAccounts";

export default function AwsAccountNames() {
  const [accountNames, setAccountNames] = useState([]);
  const getAccountNames = async () => {
    // const response = await FetchAwsAccounts();
    // // get the account names from the response
    // // const accountNames = response.map((account) => account.account_name);
    // setAccountNames(response);
    // console.log(response);
  };
  useEffect(() => {
    try {
      getAccountNames();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Accounts</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox defaultChecked />}
              label="Redinasys-dev"
              onClick={() => getAccountNames()}
            />
            <FormControlLabel control={<Checkbox />} label="Redinasys-prod" />
            <FormControlLabel control={<Checkbox />} label="Redinasys-test" />
          </FormGroup>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
