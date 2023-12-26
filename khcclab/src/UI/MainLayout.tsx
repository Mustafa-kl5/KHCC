import { Header } from "Components/Header/Header";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRoutes, nursingRoutes } from "routes/routes";
import { isLoggedIn } from "services/authService";
import { iRoute } from "types/route";
import { USER_ROLE } from "utils/constant";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const [privateRoutes, setPrivateRoutes] = useState<
        iRoute[] | string | undefined
    >([]);
    useEffect(() => {
        if (isLoggedIn()) {
            setPrivateRoutes(getRoutes(localStorage.getItem(USER_ROLE) || "pending"));
        }
    }, []);
    return (
        <div className="h-full flex flex-col w-full gap-3 bg-hussein-100 p-4">
            <Header />
            <div className="bg-hussein-200 w-full flex justify-between rounded-xl h-full">
                <div className="w-1/5  rounded-xl rounded-e-none bg-hussein-300 h-full p-10 flex flex-col gap-2 item ">
                    {(privateRoutes as iRoute[]).map((item: iRoute) => {
                        if (!item.notShown) {
                            return (
                                <Link key={item.path} to={item.path} className="flex gap-2">
                                    {item.icon}
                                    <span className={`text-xl underline`}>{item.pageName}</span>
                                </Link>
                            );
                        }
                    })}
                </div>
                <div className="w-4/5 h-full">{children}</div>
            </div>
        </div>
    );
};
