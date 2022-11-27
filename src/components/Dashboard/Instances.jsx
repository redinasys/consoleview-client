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
import { LinearProgress } from "@mui/material";

function preventDefault(event) {
  event.preventDefault();
}

export default function Instances() {
  const [instances, setInstances] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    try {
      const getAwsAccounts = async () => {
        const response = await FetchAwsAccounts();
        const accountNames = response.map((account) => account.account_name);
        const roleArns = response.map((account) => account.role_arn);
        const instances = await FetchInstances(roleArns, accountNames);
        setIsLoading(false);
        setInstances(instances);
        // console.log(instances);
      };
      getAwsAccounts();
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <React.Fragment>
      <Title>EC2 Instances</Title>
      {isLoading ? (
        <LinearProgress />
      ) : (
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell style={{ fontWeight: "bold" }}>ID</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Type</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>State</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Launch Time</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Platform</TableCell>
              {/* <TableCell style={{ fontWeight: "bold" }}>Region</TableCell> */}
              <TableCell style={{ fontWeight: "bold" }}>Account Name</TableCell>
              <TableCell style={{ fontWeight: "bold" }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {instances.map((row, i) => (
              <>
                <h3>
                  {row.region}:- {row.numberofInstances}
                </h3>
                {row.instances.map((instance, j) => (
                  <TableRow key={j}>
                    <TableCell></TableCell>
                    <TableCell>{instance.Instances[0].InstanceId}</TableCell>
                    <TableCell>{instance.Instances[0].InstanceType}</TableCell>
                    <TableCell>{instance.Instances[0].State.Name}</TableCell>
                    <TableCell>{instance.Instances[0].LaunchTime}</TableCell>
                    <TableCell>
                      {instance.Instances[0].PlatformDetails}
                    </TableCell>
                    {/* <TableCell>Hey!!</TableCell> */}
                    <TableCell>{row.account_name}</TableCell>
                    <TableCell>
                      <FullJson fullJson={JSON.stringify(instance)} />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ))}
          </TableBody>
        </Table>
      )}
      {/* <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
        See more instances
      </Link> */}
    </React.Fragment>
  );
}
