import { AxiosInstance } from "./AxiosInstance";

export const FetchAwsAccounts = async () => {
  const response = await AxiosInstance.get(`/account/getAll`, {
    headers: {
      "access-token": `${localStorage.getItem("access-token")}`,
    },
  });
  const data = await response.data.data;

  return data;
};