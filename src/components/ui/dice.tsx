"use client";
import { Eye, EyeOff, Heart, Pause, Play } from "lucide-react";
import Link from "next/link";
// import { darken, lighten } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
function Dice() {
  const colorMap = useMemo(
    () => [
      "#64dfdf",
      "#b5179e",
      "#f72585",
      "#ffd766",
      "#9046cf",
      "#ff6700",
      "#4cb944",
      "#ff6685",
      "#5bc0eb",
    ],
    []
  );

  const items = [
    { icon: <Heart size={18} />, href: "/balloon-inflation" },
    { icon: <Heart size={18} /> },
    { icon: <Heart size={18} /> },
    { icon: <Heart size={18} /> },
    { icon: <Heart size={18} /> },
    { icon: <Heart size={18} />, href: "/freedom-wall" },
    { icon: <Heart size={18} /> },
    { icon: <Heart size={18} />, href: "/rock-singers" },
    { icon: <Heart size={18} /> },
  ];

  // const colorMap = [
  //   "red",
  //   "orange-500",
  //   "yellow-500",
  //   "green",
  //   "teal",
  //   "blue",
  //   "indigo",
  //   "purple",
  //   "pink",
  // ];

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
  }, [isRolling, colorMap, colors.length, speed]);

  const onShowAll = () => {
    setIsShown(!isShown);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-2">
      <div className="absolute top-5 left-5 text-xl">{number}</div>
      <div className="flex gap-3 ">
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
      </div>
      <div className=" h-1/2 grid grid-cols-3 grid-rows-3 gap-3">
        {!isShown
          ? colors.map((color, index) => (
              <div
                key={index}
                className={`aspect-square rounded  hover:bg-cyan-600 hover:brightness-100 ${
                  colorValues[index] ? `bg-[#36b3e9] brightness-110` : " bg-cyan-500 brightness-50"
                } `}
              />
            ))
          : items.map((item, index) => (
              <div
                key={index}
                className={`aspect-square flex justify-center items-center rounded bg-slate-600 hover:bg-cyan-600 hover:brightness-100`}
              >
                {item.href ? <Link href={item.href}>{item.icon}</Link> : item.icon}
              </div>
            ))}
      </div>
    </div>
  );
}

export default Dice;
