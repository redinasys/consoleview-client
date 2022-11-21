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
import { AxiosInstance } from "../../utils/AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function Instances() {
  const [awsAccounts, setAwsAccounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const getAwsAccounts = async () => {
        const response = await FetchAwsAccounts();
        setAwsAccounts(response);
        // console.log(response);
      };
      getAwsAccounts();
    } catch (error) {
      console.log(error);
    }
  }, []);

  let handleDelete = async (id) => {
    try {
      const confirm = window.confirm(
        "Are you sure you want to delete this account?"
      );
      if (confirm) {
        console.log(id);
        console.log(localStorage.getItem("access-token"));
        const response = await AxiosInstance.post(
          `/account/delete/${id}`,
          {},
          {
            headers: {
              "access-token": `${localStorage.getItem("access-token")}`,
            },
          }
        );
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <Title>Manage Accounts</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell style={{ fontWeight: "bold" }}>Name</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Description</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Role ARN</TableCell>
            <TableCell style={{ fontWeight: "bold" }}>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {awsAccounts.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{row.account_name}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{row.role_arn}</TableCell>
              <TableCell>
                <Link
                  color="primary"
                  onClick={() => navigate(`/aws-accounts/${row._id}`)}
                  style={{ cursor: "pointer" }}
                >
                  Edit
                </Link>
                <Link
                  onClick={() => handleDelete(row._id)}
                  color="primary"
                  style={{ marginLeft: 10, cursor: "pointer" }}
                >
                  Delete
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
