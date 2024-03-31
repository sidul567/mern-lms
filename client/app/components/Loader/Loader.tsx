import React from "react";
import { Puff } from "react-loader-spinner";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="fixed top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 z-10 dark:bg-slate-900 w-full h-full flex justify-center items-center">
      <Puff
        visible={true}
        height="80"
        width="80"
        color="rgb(249,115,22)"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
