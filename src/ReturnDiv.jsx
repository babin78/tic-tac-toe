import { FaRegCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ReturnDiv = ({ id, userindicator, userProp, handleclick }) => {
  let disableflag = !userindicator
    ? false
    : userindicator == 1
    ? true
    : userindicator == 2
    ? true
    : userindicator == 3
    ? true
    : false;
  //console.log(`userindicator:${userindicator} , disbaleflag : ${disableflag}`);

  return (
    <button
      className="block block1"
      id={id}
      key={id}
      onClick={handleclick}
      disabled={disableflag}
    >
      {!userindicator ? (
        ""
      ) : userindicator == 1 ? (
        <FaRegCircle />
      ) : userindicator == 2 ? (
        <IoMdClose />
      ) : (
        ""
      )}
    </button>
  );
};
export default ReturnDiv;
