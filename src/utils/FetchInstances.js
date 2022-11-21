import { AxiosInstance } from "./AxiosInstance";

export const FetchInstances = async (roleArns, accountNames) => {
  let RoleArnAccountArray = [];
    for (let i = 0; i < roleArns.length; i++) {
        RoleArnAccountArray.push({
            "role_arn": roleArns[i],
            "account_name": accountNames[i]
        })
    }
  const response = await AxiosInstance.post(
    `/instances/getAWSInstances`,
    { data: RoleArnAccountArray },
    {
      headers: {
        "access-token": `${localStorage.getItem("access-token")}`,
      },
    }
  );
  const data = await response.data.response.AllInstances;

  return data;
};
