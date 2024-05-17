import clsx from "clsx";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";

function Balloon() {
  const [isTasksOpen, setIsTasksOpen] = useState(false);
  const [taskList, setTaskList] = useState<JSX.Element[]>([]);
  const [oneList, setoneList] = useState<JSX.Element[]>([]);
  const [twoList, settwoList] = useState<JSX.Element[]>([]);
  const [threeList, setthreeList] = useState<JSX.Element[]>([]);
  const [fourList, setfourList] = useState<JSX.Element[]>([]);

  //add random task button function
  const onAddRandomTask = () => {
    let rvalue = Math.floor(Math.random() * 100) + 1;
    let newTask = (
      <div className={Math.random() < 0.05 ? "redtaskvalue" : "taskvalue"}>{rvalue}</div>
    );
    setTaskList((prevTask) => [...prevTask, newTask]);
  };

  //admit task button function
  const onAdmitTask = () => {
    let twoListSum = twoList.reduce((sum, value) => sum + value.props.children, 0);
    let threeListSum = threeList.reduce((sum, value) => sum + value.props.children, 0);
    let fourListSum = fourList.reduce((sum, value) => sum + value.props.children, 0);

    if (taskList.length > 0) {
      setTaskList((prevTaskList) => prevTaskList.slice(1));

      if (taskList[0].props.className === "redtaskvalue") {
        setoneList((prevOneList) => [...prevOneList, taskList[0]]);
      } else {
        if (fourListSum <= threeListSum && fourListSum <= twoListSum) {
          setfourList((prevFourList) => [...prevFourList, taskList[0]]);
        } else if (threeListSum <= twoListSum) {
          setthreeList((prevThreeList) => [...prevThreeList, taskList[0]]);
        } else {
          settwoList((prevTwoList) => [...prevTwoList, taskList[0]]);
        }
      }
    }
  };

  const onInflateBalloon = () => {
    onAddRandomTask();
    onAdmitTask();
  };

  const onOpenTasks = () => {
    setIsTasksOpen(!isTasksOpen);
  };
  return (
    <div>
      {/* part 2 */}
      <div
        className="fixed cursor-pointer bottom-[15vh] rounded-full h-10 w-10 bg-red right-1/2 transform translate-x-1/2"
        onClick={onInflateBalloon}
      />

      {/* part 1 */}

      <div
        className={clsx(
          "fixed cursor-pointer duration-200 ease-out transition-all bottom-1/2 transform translate-y-1/2",
          isTasksOpen ? "right-64" : "right-8"
        )}
        onClick={() => {
          setIsTasksOpen(!isTasksOpen);
        }}
      >
        {isTasksOpen ? <ChevronRight size={18} onClick={onOpenTasks} /> : <ChevronLeft size={18} />}
      </div>
      <div
        className={clsx(
          "absolute rounded bottom-1/2 duration-200 translate-all ease-out transform translate-y-1/2 right-0 flex flex-col p-3 gap-2 bg-slate-500 h-84 w-[15%]",
          isTasksOpen ? "translate-x-[-1rem]" : "translate-x-full"
        )}
      >
        <div>
          <QueueGrid heading="High Priority Queue 1" tasklist={oneList} setTaskList={setoneList} />
        </div>
        <div>
          <QueueGrid heading="Regular Queue 2" tasklist={twoList} setTaskList={settwoList} />
        </div>
        <div>
          <QueueGrid heading="Regular Queue 3" tasklist={threeList} setTaskList={setthreeList} />
        </div>
        <div>
          <QueueGrid heading="Regular Queue 4" tasklist={fourList} setTaskList={setfourList} />
        </div>
      </div>
    </div>
  );
}

interface QueueGridProps {
  heading: string;
  tasklist: JSX.Element[];
  setTaskList: (value: JSX.Element[]) => void;
}

function QueueGrid(props: QueueGridProps) {
  const { heading, setTaskList, tasklist } = props;
  const normalise = (value: number) => ((value - 0) * 100) / (100 - 0);

  const [progress, setProgress] = useState(0);
  const [currentValue, setCurrentValue] = useState(0);

  useEffect(() => {
    if (tasklist.length > 0) {
      if (currentValue !== tasklist[0].props.children) {
        setCurrentValue(tasklist[0].props.children);
        setProgress(tasklist[0].props.children);
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
    }, 60);

    return () => {
      clearInterval(timer);
    };
  }, [progress, setTaskList, tasklist]);

  return (
    <div>
      <h3>{heading}</h3>
      <p>Queue List:</p>
      <div className="subtask">
        {tasklist.map((task, index) => (
          <div key={index}>{task}</div>
        ))}
      </div>
      <p>Duration</p>
    </div>
  );
}

export default Balloon;
