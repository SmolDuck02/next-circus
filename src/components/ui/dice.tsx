"use client";
import { libreBaskerville } from "@/styles/fonts";
import { Eye, EyeOff, Pause, Play, RotateCcw } from "lucide-react";
import Link from "next/link";
// import { darken, lighten } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
function Dice() {
  const colorMap = useMemo(
    () => [
      "bg-[#dc2626]",
      "bg-[#f97316]",
      "bg-[#eab308]",
      "bg-[#22c55e]",
      "bg-[#14b8a6]",
      "bg-[#2563eb]",
      "bg-[#4f46e5]",
      "bg-[#9333ea]",
      "bg-[#c026d3]",
    ],
    []
  );

  const shadowMap = useMemo(
    () => [
      "shadow-[#dc2626]",
      "shadow-[#f97316]",
      "shadow-[#eab308]",
      "shadow-[#22c55e]",
      "shadow-[#14b8a6]",
      "shadow-[#2563eb]",
      "shadow-[#4f46e5]",
      "shadow-[#9333ea]",
      "shadow-[#c026d3]",
    ],
    []
  );

  const items = [
    { icon: "🎊", href: "/balloon-inflation" },
    { icon: "😚" },
    { icon: "👀" },
    { icon: "🚀" },
    { icon: "🍨" },
    { icon: "😶‍🌫️", href: "/freedom-wall" },
    { icon: "😼" },
    { icon: "🪇", href: "/rock-singers/1" },
    { icon: "😳" },
  ];

  const [colorValues, setColorValues] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [colors, setColors] = useState(colorMap);
  const [isRolling, setIsRolling] = useState(false);
  const [isShown, setIsShown] = useState(false);
  const [speed, setSpeed] = useState(10);
  const [factor, setFactor] = useState(1.0);
  const [number, setNumber] = useState(0);

  const onRoll = () => {
    setIsRolling(!isRolling);
    setSpeed(10);
  };

  useEffect(() => {
    setNumber(Math.floor(Math.random() * 500));
  }, [colorValues]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (speed > 210) {
        setIsRolling(false);
        clearInterval(timer);
      }
      if (isRolling) {
        let index = Math.floor(Math.random() * 9);

        setColorValues(() => {
          const newValues = Array.from({ length: 9 }, () => 0);
          newValues[index] = 1;
          return newValues;
        });
        setFactor(factor < 11 ? factor + 0.5 : factor);
        setSpeed(speed + factor);
      }
    }, speed);

    return () => {
      clearInterval(timer);
    };
  }, [isRolling, colorMap, colors.length, speed, factor]);

  const onShowAll = () => {
    setIsShown(!isShown);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-2">
      <div className={`fixed left-0  top-0 m-8 text-xl ${libreBaskerville.className}`}>
        {number}
      </div>
      <div className="flex gap-3 fixed top-40 ">
        {isRolling ? (
          <Pause size={15} className=" cursor-pointer" onClick={onRoll} />
        ) : (
          <Play size={15} className=" cursor-pointer" onClick={onRoll} />
        )}{" "}
        {isShown ? (
          <Eye size={15} className=" cursor-pointer" onClick={onShowAll} />
        ) : (
          <EyeOff size={15} className=" cursor-pointer" onClick={onShowAll} />
        )}
        <RotateCcw
          size={15}
          className="cursor-pointer"
          onClick={() => {
            setColorValues([0]);
          }}
        />
      </div>
      {/* bg-[#142650] */}
      {/* shadow-[0_0_2px_0.6px] shadow-[#4287f5] */}
      <div className="fixed top-1/2 transform -translate-y-1/2 h-1/2 grid grid-cols-3 grid-rows-3 gap-3">
        {items.map((item, index) => (
          <div
            key={index}
            className={`aspect-square  group rounded-lg  bg-[#0b152c] flex justify-center items-center `}
          >
            <div className="w-7 h-7 fixed  bg-sky-500  blur-2xl"></div>
            <div
              className={`${colorMap[index]} z-10 shadow-[0_0_90px] rounded ${
                isRolling ? "group-hover:hidden" : "group-hover:flex"
              }  ${shadowMap[index]}   ${
                isShown || colorValues[index] ? "flex" : "hidden"
              }  justify-center items-center w-full h-full`}
            >
              <div
                className={`w-[85%] h-[85%]  rounded flex  text-5xl [text-shadow:0px_0px_40px_rgb(66_135_245_/_90%)]   bg-[#0e1641]  justify-center items-center`}
              >
                {item.href ? <Link href={item.href}> {item.icon}</Link> : item.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dice;
