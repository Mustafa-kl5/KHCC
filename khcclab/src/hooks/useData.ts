import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { SHOW_TOAST_MESSAGE } from "utils/constant";

export const useData = (Api: any, query?: any) => {
  const dispatch = useDispatch();
  const [data, setData] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const res = await Api(query);
      setData(res.data);
    } catch (err: any) {
      dispatch({
        type: SHOW_TOAST_MESSAGE,
        message: {
          message: err?.response.data?.message,
          isOpen: true,
          severity: "error",
        },
      });
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [query]);
  return { data, isLoading, fetchData };
};
