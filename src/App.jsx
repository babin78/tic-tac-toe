import { useState } from "react";
import "./style.scss";
import "boxicons";
import { FaRegCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";

const ReturnDiv = ({ id, userindicator, userProp, handleclick }) => {
  return (
    <button
      className="block block1"
      id={id}
      key={id}
      onClick={handleclick}
      disabled={!userindicator ? false : true}
    >
      {!userindicator ? (
        ""
      ) : userindicator == 1 ? (
        <FaRegCircle />
      ) : (
        <IoMdClose />
      )}
    </button>
  );
};

const App = () => {
  /*
    user1 symbol x
    user2 symbol 0
  */

  const [arraypointer, setArray] = useState([
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ]);

  const getRemainingScore = (nums) => {
    let notNullnums = nums.filter((e) => e !== null);

    let remaining = nums.length - notNullnums.length;

    return remaining;
  };

  const winingStack = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const getWinner = (winingStack, arraypointer, UsrProp) => {
    let remainingBlock = getRemainingScore(arraypointer);
    if (remainingBlock == 9) {
      return "NONE";
    } else {
      if (UsrProp.counter1 >= 3 || UsrProp.counter2 >= 3) {
        let usr1pos = arraypointer.map((e, index) => e == 1);
        let usr2pos = arraypointer.filter((e) => e == 2);
      }
    }

    return "NONE";
  };

  const [pointer, setPointer] = useState({
    currentuser: 1 /* current user can be either 1 or 2*/,
    counter1: 0,
    counter2: 0,
  });

  const handleClick = (e) => {
    const newArray = arraypointer.map((item, index) => {
      if (e.target.id == index) {
        return pointer.currentuser;
      } else {
        return item;
      }
    });

    setArray(newArray);

    if (pointer.currentuser == 1) {
      setPointer({
        ...pointer,
        currentuser: 2,
        counter1: pointer.counter1 + 1,
      });
    } else {
      setPointer({
        ...pointer,
        currentuser: 1,
        counter2: pointer.counter2 + 1,
      });
    }
  };

  console.log(...arraypointer);

  return (
    <div className="container">
      <div className="playzone">
        {arraypointer.map((element, index) => {
          return (
            <ReturnDiv
              id={index}
              userindicator={element}
              userProp={pointer}
              handleclick={handleClick}
              key={index}
            />
          );
        })}
      </div>
      <div className="summary">
        <h3>
          current user:
          <span>{pointer.currentuser}</span>
        </h3>

        <h3>
          user1 attemps:
          <span>{pointer.counter1}</span>
        </h3>

        <h3>
          user2 attemps:
          <span>{pointer.counter2}</span>
        </h3>
        <h3>
          remaining attemps:
          <span>{getRemainingScore(arraypointer)}</span>
        </h3>
        <h3>
          position covered:
          <span>{arraypointer}</span>
        </h3>
      </div>
    </div>
  );
};

export default App;
