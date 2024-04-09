const Modal = ({ handleClose, count }) => {
  return (
    <div className=" w-[500px] h-[500px] absolute top-[50%] left-[50%] -translate-x-2/4 -translate-y-2/4 bg-[#087f5b] flex justify-center items-center rounded-md">
      <h1 className="text-3xl font-bold text-white">
        You reach the Goal: {count}
      </h1>
      <button
        onClick={handleClose}
        className="absolute top-2 right-3 text-2xl bg-white px-3 flex justify-center items-center pb-1 rounded-full hover:bg-black duration-300 hover:text-white z-50"
      >
        x
      </button>
    </div>
  );
};

export default Modal;
