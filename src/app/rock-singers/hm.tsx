"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

function Singer() {
  const users = {
    names: ["First", "Second", "Third", "Fourth"],
    color: ["blue", "red", "green", "amber"],
  };

  // const users = (location.state?.singers || {names : ['First', 'Second', 'Third', 'Fourth'], color : ['blue', 'red', 'green', 'amber']});
  // ['Me', 'Myself', 'I']
  // const [ lyrics, setLyrics ]  = useState(location.state?.lyrics || []);

  // const sample = ['Me', 'Myself', 'I'];
  // const text = ["Ambot"];

  const [lyrics, setLyrics] = useState([]);
  const [bg, setBg] = useState([]);
  const [lyricsLength, setLyricsLength] = useState(lyrics.length);
  const [flag, setFlag] = useState();
  const [value, setValue] = useState("");

  console.log(lyricsLength, bg.length, bg, lyrics, lyrics.length, typeof lyrics);

  const handleOnClick = (user: any) => {
    console.log("ooooo");
    setFlag(user);
  };

  useEffect(() => {
    setValue("");
    setLyricsLength(lyricsLength + 1);
    // navigate(flag, { state: { singers: users, length: flag } });
  }, [flag, setLyricsLength]);

  return (
    <div className="flex content-center h-screen ">
      <div className="flex flex-col justify-center items-center w-1/2 mx-auto h-auto">
        <h1>Home!</h1>
        <div className="flex  gap-1">
          {users.names.map((user, index) => (
            <Button
              key={index}
              color={users.color[index]}
              className="capitalize"
              onClick={() => {
                handleOnClick(user);
              }}
            >
              {user}
            </Button>
          ))}
        </div>

        {/* <Outlet
          context={[bg, setBg, value, setValue, lyricsLength, setLyricsLength, lyrics, setLyrics]}
        /> */}

        <div className="p-2 pr-2 mt-2 w-3/6 rounded border-solid border-2 min-h-[500px] h-auto">
          {/* {lyrics.map((line, index) => (
                <div key={index} className={` align-top  h-auto w-50 m-2 flex-wrap`}>
                  {line}
                </div>
            ))} */}
          {lyrics.slice(2).map((line, index) => (
            <Button
              key={index}
              className="capitalize flex flex-wrap whitespace-pre-wrap align-top w-full h-auto my-2"
            >
              {line}
            </Button>
          ))}

          {/* {lyrics.slice(2).map((line, index) => (
                <div key={index} className='flex flex-wrap'>

                  {line}
                </div>
            ))} */}
        </div>
      </div>
    </div>
  );
}

export default Singer;
