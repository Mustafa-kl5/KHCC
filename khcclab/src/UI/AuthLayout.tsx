import { Header } from "Components/Header/Header";

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full  min-h-full">
      <Header />
      <div className=" w-full justify-between h-full ">
        <div className="w-full h-full flex justify-center items-center">
          {children}
        </div>
      </div>
    </div>
  );
};
