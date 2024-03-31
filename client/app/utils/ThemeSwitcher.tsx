'use client'

import { useTheme } from "next-themes";
import React, { FC, useEffect, useState } from "react";
import { BiMoon, BiSun } from "react-icons/bi";

type Props = {};

const ThemeSwitcher: FC<Props> = (props: Props) => {
  const {theme, setTheme} = useTheme();
    
  return (
    <div className="flex items-center justify-center">
      {theme && theme === "light" ? (
        <BiMoon
          fill="black"
          size={25}
          className="cursor-pointer"
          onClick={() => setTheme("dark")}
        />
      ) : (
        <BiSun
          fill="white"
          size={25}
          className="cursor-pointer"
          onClick={() => setTheme("light")}
        />
      )}
    </div>
  );
};

export default ThemeSwitcher;
