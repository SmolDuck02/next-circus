import clsx from "clsx";
import { ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./button";

interface Item {
  number: number;
  color: string;
  rotation: number;
}
function Balloon() {
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  // const [taskList, setTaskList] = useState<number[]>([]);
  const [oneList, setoneList] = useState<Item[]>([]);
  const [twoList, settwoList] = useState<Item[]>([]);
  const [threeList, setthreeList] = useState<Item[]>([]);
  const [fourList, setfourList] = useState<Item[]>([]);

  // const [taskList, setTaskList] = useState<JSX.Element[]>([]);
  // const [oneList, setoneList] = useState<JSX.Element[]>([]);
  // const [twoList, settwoList] = useState<JSX.Element[]>([]);
  // const [threeList, setthreeList] = useState<JSX.Element[]>([]);
  // const [fourList, setfourList] = useState<JSX.Element[]>([]);

  //admit task button function
  const onInflateBalloon = () => {
    let random_value = Math.ceil(Math.random() * 50);

    let twoListSum = twoList.reduce((sum, value) => sum + value.number, 0);
    let threeListSum = threeList.reduce((sum, value) => sum + value.number, 0);
    let fourListSum = fourList.reduce((sum, value) => sum + value.number, 0);

    if (Math.random() < 0.2)
      setoneList((prevTask) => [
        ...prevTask,
        {
          number: random_value,
          color: balloonColors[random_value % balloonColors.length],
          rotation: rotation[random_value % rotation.length],
        },
      ]);
    else {
      const min = Math.min(twoListSum, threeListSum, fourListSum);
      switch (min) {
        case twoListSum:
          settwoList((prevTask) => [
            ...prevTask,
            {
              number: random_value,
              color: balloonColors[random_value % balloonColors.length],
              rotation: rotation[random_value % rotation.length],
            },
          ]);
          break;
        case threeListSum:
          setthreeList((prevTask) => [
            ...prevTask,
            {
              number: random_value,
              color: balloonColors[random_value % balloonColors.length],
              rotation: rotation[random_value % rotation.length],
            },
          ]);
          break;
        case fourListSum:
          setfourList((prevTask) => [
            ...prevTask,
            {
              number: random_value,
              color: balloonColors[random_value % balloonColors.length],
              rotation: rotation[random_value % rotation.length],
            },
          ]);
          break;
      }
    }
  };

  const onOpenTasks = () => {
    setIsTasksOpen(!isTasksOpen);
  };

  const [isInflatingArray, setIsInflatingArray] = useState(Array(oneList.length).fill(false));

  const balloonColors = ["#D62828", "#0077B6", "#2A9D8F", "#F77F00", "#FCBF49"];
  const rotation = [345, 330, 315, 300, 285, 0, 15, 30, 45, 60, 75];
  const [isInflating, setIsInflating] = useState(false);

  useEffect(() => {
    setIsInflatingArray((prevArray) => {
      const newArray = [...prevArray];
      newArray[prevArray.length - 1] = true; // Assuming 'index' is the position you want to update
      return newArray;
    });
  }, [fourList]);
  return (
    <div className=" h-screen w-screen flex justify-center items-center">
      {/* red button */}
      <div
        className="z-50 fixed drop-shadow-lg  cursor-pointer bottom-[15vh] rounded-full h-10 w-10 bg-red-500 right-1/2 transform translate-x-1/2"
        onClick={onInflateBalloon}
        // onClick={() => setIsInflating(true)}
      />

      {/* tasks */}
      <div
        className={clsx(
          "fixed cursor-pointer  duration-200 ease-out transition-all bottom-1/2 transform translate-y-1/2",
          isTasksOpen ? "right-64" : "right-8"
        )}
        onClick={() => {
          setIsTasksOpen(!isTasksOpen);
        }}
      >
        <Button variant="outline" className="rounded-full" size="icon">
          {isTasksOpen ? (
            <ChevronRight size={18} onClick={onOpenTasks} />
          ) : (
            <ChevronLeft size={18} />
          )}{" "}
        </Button>
      </div>
      <div
        className={clsx(
          "z-10 fixed rounded-lg bottom-1/2 overflow-auto scrollbar duration-200 translate-all ease-out transform translate-y-1/2 right-0 flex flex-col p-5 gap-2 bg-background border h-[25rem] w-[15%]",
          isTasksOpen ? "translate-x-[-1rem]" : "translate-x-full"
        )}
      >
        {" "}
        <span className="text-xl text-primary ">Tasks</span>
        <QueueGrid heading="High Priority Queue" tasklist={oneList} setTaskList={setoneList} />
        <QueueGrid heading="Regular Queue 1" tasklist={twoList} setTaskList={settwoList} />
        <QueueGrid heading="Regular Queue 2" tasklist={threeList} setTaskList={setthreeList} />
        <QueueGrid heading="Regular Queue 3" tasklist={fourList} setTaskList={setfourList} />
      </div>

      <div className="">
        <QueueGrid
          type="balloon"
          heading="High Priority Queue"
          tasklist={oneList}
          setTaskList={setoneList}
        />
        <QueueGrid
          type="balloon"
          heading="Regular Queue 1"
          tasklist={twoList}
          setTaskList={settwoList}
        />
        <QueueGrid
          type="balloon"
          heading="Regular Queue 2"
          tasklist={threeList}
          setTaskList={setthreeList}
        />
        <QueueGrid
          type="balloon"
          heading="Regular Queue 3"
          tasklist={fourList}
          setTaskList={setfourList}
        />
      </div>
    </div>
  );
}

interface QueueGridProps {
  heading: string;
  tasklist: Item[];
  setTaskList: (value: Item[]) => void;
  type?: "balloon" | "queue";
}

function QueueGrid(props: QueueGridProps) {
  const { heading, setTaskList, tasklist, type = "queue" } = props;

  const [progress, setProgress] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  const [number, setNumber] = useState(7);
  const [random, setRandom] = useState(0);

  useEffect(() => {
    if (tasklist.length > 0) {
      if (currentValue !== tasklist[0].number) {
        setCurrentValue(tasklist[0].number);
        setProgress(tasklist[0].number);
      }
    }
  }, [tasklist, currentValue]);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 0) {
          setTimeout(() => {
            setTaskList(tasklist.slice(1));
            setCurrentValue(0);
          });
          return 0;
        }

        const diff = oldProgress - 1;
        return diff;
      });
    }, 200);

    return () => {
      clearInterval(timer);
    };
  }, [progress, setTaskList, tasklist]);

  return (
    <>
      {type == "queue" ? (
        <div className="text-muted ">
          <h3 className=" text-xs">{heading}</h3>
          {/* <p className="text-xs">Queue:</p> */}
          <div className="subtask my-2  flex flex-wrap gap-3">
            {tasklist.map((task, index) => {
              return (
                <Button
                  disabled
                  variant={"outline"}
                  className={`h-5 w-5 shadow text-center p-3  rounded-full ${
                    index === 0 &&
                    (heading.toLowerCase().startsWith("high")
                      ? "text-red-500 border-red-500"
                      : "text-blue-500 border-blue-500")
                  }`}
                  key={index}
                >
                  {index == 0 ? progress : task.number}
                </Button>
              );
            })}
          </div>
        </div>
      ) : (
        <div>
          {tasklist.map((task, index) => {
            console.log(task.number - progress);
            return (
              <div
                key={index}
                className={`z-[2rem] rounded fixed top-[53%] left-1/2 flex drop-shadow    justify-center items-center`}
                style={{
                  transform: `scale(${task.number - Math.min(progress, task.number)})  rotate(${
                    task.rotation
                  }deg)`,
                  transformOrigin: "bottom",
                  translate: `-${50}% ${50}%`,
                }} // Adjust the scale factor to your needs
              >
                <MapPin fill={task.color} stroke="0" />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}

export default Balloon;
