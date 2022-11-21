import * as React from "react";
import Link from "@mui/material/Link";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Title from "./Title";
import { useState, useEffect } from "react";
import { FetchAwsAccounts } from "../../utils/FetchAwsAccounts";
import { FetchInstances } from "../../utils/FetchInstances";
import FullJson from "./FullJson";

function preventDefault(event) {
  event.preventDefault();
}

export default function Instances() {
  const [instances, setInstances] = useState([]);
  useEffect(() => {
    try {
      const getAwsAccounts = async () => {
        const response = await FetchAwsAccounts();
        const accountNames = response.map((account) => account.account_name);
        const roleArns = response.map((account) => account.role_arn);
        const instances = await FetchInstances(roleArns, accountNames);
        setInstances(instances);
        console.log(instances);
      };
      getAwsAccounts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <React.Fragment>
      <Title>EC2 Instances</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>State</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Launch Time</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Region</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Account Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {instances.map((row) => (
            <TableRow key={row.InstanceId}>
              <TableCell>{row.InstanceId}</TableCell>
              <TableCell>{row.InstanceType}</TableCell>
              <TableCell>{row.State}</TableCell>
              <TableCell>{row.LaunchTime}</TableCell>
              <TableCell>{row.region}</TableCell>
              <TableCell>{row.account_name}</TableCell>
              <TableCell>
                <FullJson fullJson={JSON.stringify(row.FullJson)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more instances
      </Link>
    </React.Fragment>
  );
}
