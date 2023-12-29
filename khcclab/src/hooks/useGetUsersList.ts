import { useEffect, useState } from "react";

export const useGetUsersList = (Api: any, list: string) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMassage, setErrorMassage] = useState<string>();
  const [openErrorMassage, setOpenErrorMassage] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await Api();
      setData(res.data[list]);
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
  return { errorMassage, data, isLoading, openErrorMassage, fetchData };
};
