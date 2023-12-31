import { useEffect, useState } from "react";

export const useData = (Api: any, query?: any) => {
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMassage, setErrorMassage] = useState<string>();
  const [openErrorMassage, setOpenErrorMassage] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await Api(query);
      setData(res.data);
    } catch (err: any) {
      setOpenErrorMassage(true);
      setErrorMassage(err?.response.data?.message);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [query]);
  return { errorMassage, data, isLoading, openErrorMassage, fetchData };
};
