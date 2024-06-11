"use client";

import RockFour from "@/components/rocks/rock-four";
import RockOne from "@/components/rocks/rock-one";
import RockThree from "@/components/rocks/rock-three";
import RockTwo from "@/components/rocks/rock-two";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Send } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

interface Messages {
  one: string[];
  two: string[];
  three: string[];
  four: string[];
}

type MessagesKey = "one" | "two" | "three" | "four";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname();
  const currentNumber = parseInt(pathname[pathname.length - 1], 10);
  const [inputText, setInputText] = useState("");
  const inputTextRef = useRef<HTMLInputElement>(null);
  const [isSubmit, setIsSubmit] = useState(false);
  const [messages, setMessages] = useState<Messages>({
    one: [],
    two: [],
    three: [],
    four: [],
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (inputText.trim().length !== 0) {
      let key: MessagesKey;
      switch (currentNumber) {
        case 1:
          key = "one";
          break;
        case 2:
          key = "two";
          break;
        case 3:
          key = "three";
          break;
        case 4:
          key = "four";
          break;
      }
      setMessages((prevMessages) => ({
        ...prevMessages,
        [key]:
          prevMessages[key].length > 2
            ? [[...prevMessages[key]].pop(), inputText]
            : [...prevMessages[key], inputText],
      }));
      setIsSubmit(true);
    }
    setInputText("");
  };

  useEffect(() => {
    if (isSubmit) {
      let random;
      do {
        random = Math.ceil(Math.random() * 4);
      } while (random === currentNumber);

      localStorage.setItem("messages", JSON.stringify(messages));
      console.log(messages);
      router.push(`/rock-singers/${random}`);
    }
  }, [isSubmit, messages]);

  useEffect(() => {
    const messages = localStorage.getItem("messages");
    if (messages) setMessages(JSON.parse(messages));
    if (inputTextRef.current) inputTextRef.current.focus();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setMessages((prevMessages) => ({
        ...prevMessages,
        one: prevMessages.one.length > 0 ? prevMessages.one.slice(1) : [],
        two: prevMessages.two.length > 0 ? prevMessages.two.slice(1) : [],
        three: prevMessages.three.length > 0 ? prevMessages.three.slice(1) : [],
        four: prevMessages.four.length > 0 ? prevMessages.four.slice(1) : [],
      }));
      localStorage.setItem("messages", JSON.stringify(messages));
    }, 1000);

    if (Object.values(messages).some((arr) => arr.length > 0)) console.log(messages);
    return () => {
      clearInterval(timer);
    };
  });

  return (
    <>
      <LyricsCard
        lyrics={messages.one}
        classname="fixed left-56 flex items-end justify-end"
        pColor="bg-[#2563eb]"
      />
      <LyricsCard
        lyrics={messages.two}
        classname="fixed top-[7rem] left-[20rem] flex items-end justify-end"
        pColor="bg-[#dc2626]"
      />
      <LyricsCard
        lyrics={messages.three}
        classname="fixed top-[7rem] flex items-end right-[20rem]"
        pColor="bg-[#eab308]"
      />
      <LyricsCard
        lyrics={messages.four}
        classname="fixed right-56 flex items-end"
        pColor="bg-[#c026d3]"
      />
      <div className="relative bottom-10 flex flex-col w-full items-center">
        <div className="relative top-[10%] flex items-center justify-between w-[25%] z-10">
          <Link href={"/rock-singers/2"}>
            <RockTwo
              className={`h-36 ${
                currentNumber == 2 && `drop-shadow-[0px_0px_25px_rgb(220,38,38,1)]`
              }`}
            />
          </Link>
          <Link href={"/rock-singers/3"}>
            <RockThree
              className={`h-36  ${
                currentNumber == 3 && `drop-shadow-[0px_0px_25px_rgb(234,179,8,1)]`
              }`}
            />
          </Link>
        </div>
        <div className=" flex justify-between w-[35%]  z-10 ">
          <Link href={"/rock-singers/1"}>
            <RockOne
              className={`h-56 ${
                currentNumber == 1 && `drop-shadow-[0px_0px_25px_rgb(37,99,235,1)]`
              }`}
            />
          </Link>
          <Link href={"/rock-singers/4"}>
            <RockFour
              className={`h-56 ${
                currentNumber == 4 && `drop-shadow-[0px_0px_25px_rgb(192,38,211,1)]`
              }`}
            />
          </Link>
        </div>
        <Rockbg className="fixed   h-[20rem]" />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex fixed bottom-20  w-full max-w-xl items-center space-x-2"
      >
        <Input
          type="text"
          ref={inputTextRef}
          placeholder="Enter lyrics..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="rounded-full p-5 opacity-70 pr-14"
        />
        <Send type="submit" className="absolute right-5 cursor-pointer"></Send>
      </form>
    </>
  );
}

interface LyricsProps {
  lyrics: string[];
  classname?: string;
  pColor?: string;
}
function LyricsCard({ lyrics, classname, pColor }: LyricsProps) {
  return (
    <div
      className={cn(
        "z-10 w-56 h-40 overflow-hidden whitespace-normal bg-transparent scroll-p-0 ",
        classname
      )}
    >
      <div className="flex flex-col gap-4">
        {lyrics.map((lyric, index) => (
          <div key={index} className={`flex items-center text-center justify-center`}>
            <p
              className={`text-sm ${pColor} text-white break-all p-2 px-4  rounded flex-grow-1 min-w-0`}
            >
              <i>{lyric}</i>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Rockbg(props: React.SVGProps<SVGSVGElement>) {
  return (
    <>
      <svg {...props} viewBox="0 0 1131 555" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M158 27H534V305H158V27Z" fill="#708D81" />
        <path d="M698 0H974V317H698V0Z" fill="#C8E0CC" />
        <path d="M699 361H1131V555H699V361Z" fill="#81B29A" />
        <path d="M0 361H432V555H0V361Z" fill="#ACC6C3" />
      </svg>
    </>
  );
}
