import { useCallback, useEffect, useRef, useState } from "react";
import Modal from "./Modal";

const MainPage = () => {
  const [count, setCount] = useState(0);
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
    const handleKeyPress = (event) => {
      event.preventDefault();
      if (event.code === "Space") {
        plus();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [count, plus]);

  useEffect(() => {
    const handleKeyPress = (event) => {
      switch (event.code) {
        case "ArrowUp":
          event.preventDefault();
          plus();
          break;
        case "ArrowDown":
          event.preventDefault();
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

  return (
    <>
      <div className=" w-[300px] md:w-[500px] lg:w-[1000px] bg-[#343a40] flex justify-center items-center mx-auto">
        <div className=" flex justify-center w-full flex-col gap-10">
          <div className=" flex justify-center gap-5  items-center h-20 w-full">
            <input
              type="number"
              placeholder="Enter Goal"
              value={goal}
              onChange={(e) => setGoal(e.target.value)}
              className=" border-[1px] p-2 lg:text-xl text-[#2f9e44] rounded-md border-[#2f9e44] placeholder:text-[#2f9e44] w-32"
            />
            <button
              onClick={handleEditClick}
              className=" lg:text-2xl bg-[#087f5b]  px-[20px] py-1 rounded-md text-[white] hover:bg-green-800  duration-300 border-none"
            >
              Edit
            </button>
            <button
              onClick={reset}
              className="  lg:text-2xl bg-[#087f5b]  px-[20px] py-1 rounded-md text-[white] hover:bg-green-800  duration-300 border-none"
            >
              Reset
            </button>
          </div>
          <div className=" w-full justify-center items-center flex flex-col gap-8">
            <div className=" w-[300px] h-[300px] bg-[#087f5b] rounded-full flex items-center justify-center">
              <input
                type="text"
                className={`flex justify-center  text-white font-bold bg-transparent w-[150px] h-20 text-7xl outline-none ${
                  count > 9 ? "pl-[35px]" : "pl-[55px]"
                }`}
                value={count}
                onChange={(e) => setCount(parseInt(e.target.value))}
                ref={countInputRef}
              />
            </div>
            <div className=" border-[1px] border-[#51cf66] w-[300px] flex justify-between items-center h-20 px-5 rounded-md">
              <button
                onClick={plus}
                className=" text-2xl bg-[#087f5b] px-5 py-2 rounded-xl text-white hover:bg-green-800"
              >
                Up
              </button>
              <button
                onClick={minus}
                className=" text-2xl bg-[#087f5b] px-5 py-2 rounded-xl text-white hover:bg-green-800"
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
