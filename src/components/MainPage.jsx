import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";

const MainPage = () => {
  const [count, setCount] = useState(() => {
    const storedCount = localStorage.getItem("count");
    return storedCount ? parseInt(storedCount) : 0;
  });
  const [goal, setGoal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const countInputRef = useRef(null);

  const checkGoalReached = useCallback(() => {
    if (goal !== 0 && count + 1 === parseInt(goal)) {
      setShowModal(true);
    }
  }, [count, goal]);

  const closeModal = () => {
    setShowModal(false);
    setCount(0);
    setGoal(0);
  };

  const plus = useCallback(() => {
    setCount((cur) => cur + 1);
    checkGoalReached();
  }, [checkGoalReached]);

  const minus = useCallback(() => {
    if (count - 1 < 0) return;
    setCount((cur) => cur - 1);
    checkGoalReached();
  }, [count, checkGoalReached]);

  const handleEditClick = () => {
    if (countInputRef.current) {
      countInputRef.current.focus();
    }
  };

  const reset = () => {
    setCount(0);
    setGoal(0);
  };

  useEffect(() => {
    localStorage.setItem("count", count.toString());
  }, [count]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === "Space" || event.key === " ") {
        event.preventDefault();
        plus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [plus]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.code) {
        case "ArrowUp":
          plus();
          break;
        case "ArrowDown":
          minus();
          break;
        case "Space":
          event.preventDefault();
          plus();
          break;
        default:
          break;
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [plus, minus]);

  console.log(count);
  console.log(goal);

  return (
    <>
      <div className=" w-[300px] md:w-[500px] lg:w-[1000px] bg-[#212529] flex justify-center items-center mx-auto">
        <div className=" flex justify-center w-full flex-col gap-10">
          <div className=" flex justify-center gap-5  items-center h-20 w-full">
            <input
              type="number"
              placeholder="Enter Goal"
              value={goal}
              onChange={(e) => setGoal(parseInt(e.target.value))}
              className=" border-[1px] p-2 lg:text-xl text-[#2f9e44] rounded-md border-[#2f9e44] placeholder:text-[#2f9e44] w-32 bg-[#e9ecef]"
            />
            <button
              onClick={handleEditClick}
              className=" lg:text-2xl bg-[#087f5b]  px-[20px] py-1 rounded-xl text-[white] hover:bg-green-800  duration-300 border-none w-[120px] h-[50px]"
            >
              Edit
            </button>
            <button
              onClick={reset}
              className="  lg:text-2xl bg-[#087f5b]  px-[20px] py-1 rounded-xl text-[white] hover:bg-green-800  duration-300 border-none w-[120px] h-[50px] "
            >
              Reset
            </button>
          </div>
          <div className=" w-full justify-center items-center flex flex-col gap-8">
            <div className=" w-[300px] h-[300px] bg-[#087f5b] rounded-full flex items-center justify-center">
              <input
                type="number"
                className={`flex justify-center  text-white font-bold bg-transparent w-[250px] h-20 text-7xl outline-none ${
                  count > 9 && count < 99
                    ? "pl-[85px]"
                    : count > 99
                    ? " pl-[63px]"
                    : "pl-[105px]"
                }`}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                ref={countInputRef}
              />
            </div>
            <div className=" border-[1px] border-[#087f5b] w-[360px] flex justify-between items-center h-[100px] px-5 rounded-md">
              <button
                onClick={plus}
                className="w-[120px] h-[50px] text-2xl bg-[#087f5b] px-5 py-2 rounded-xl text-white hover:bg-green-800"
              >
                Up
              </button>
              <button
                onClick={minus}
                className=" w-[120px] h-[50px] text-2xl bg-[#087f5b] px-5 py-2 rounded-xl text-white hover:bg-green-800"
              >
                Down
              </button>
            </div>
          </div>
        </div>
      </div>
      {showModal && <Modal handleClose={closeModal} count={count} />}
    </>
  );
};

export default MainPage;
