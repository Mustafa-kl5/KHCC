import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { getPendingUsers } from "services/superAdmin";
import { iUser } from "types/user";

export const usePendingUsers = () => {
  const [users, setUsers] = useState<iUser[]>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMassage, setErrorMassage] = useState<string>();
  const [openErrorMassage, setOpenErrorMassage] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await getPendingUsers();
      setUsers(res.data.users);
    } catch (err: any) {
      setOpenErrorMassage(true);
      setErrorMassage(err?.response.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return { errorMassage, users, isLoading, openErrorMassage };
};
