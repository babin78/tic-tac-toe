import { useEffect, useLayoutEffect, useState } from "react";
import "./style.scss";
import ReturnDiv from "./ReturnDiv";
import { FaRegCircle } from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { getRemainingScore, getWinner } from "./helper";
import confetti from "canvas-confetti";

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

  const [pointer, setPointer] = useState({
    currentuser: 1 /* current user can be either 1 or 2*/,
    counter1: 0,
    counter2: 0,
  });

  const [winUser, setWinner] = useState(null);

  const handleClick = (e) => {
    // console.log(`calling handleclick`);
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

    //console.log(
    //  `exit handleclick counters: ${pointer.counter1}, ${pointer.counter2}`
    //);
  };

  useEffect(() => {
    //console.log(`useeffect counters: ${pointer.counter1}, ${pointer.counter2}`);

    if (!winUser) {
      if (pointer.counter2 >= 3 || pointer.counter1 >= 3) {
        //console.log(`before calling getWinner`);

        let tempwinUser = getWinner(arraypointer);
        //console.log(`after calling getWinner winner is ${winUser}`);

        if (tempwinUser) {
          let disablearray = arraypointer.map((e) => {
            if (e == null) return 3;
            else return e;
          });

          if (tempwinUser !== "x") {
            confetti({ particleCount: 1000, spread: 70 });
          }
          setArray(disablearray);
          setWinner(tempwinUser);
        }
      }
    }
  }, [arraypointer, pointer]);

  //console.log(...arraypointer);

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
        {!winUser && (
          <div className="details">
            <h3>
              Next move:
              <span>
                {pointer.currentuser == 1 ? <FaRegCircle /> : <IoMdClose />}
              </span>
            </h3>

            <h3>
              current user:
              <span>{pointer.currentuser}</span>
            </h3>
          </div>
        )}

        {(winUser == "user1" || winUser == "user2") && (
          <div className="winner">
            <h3>
              Congrats!!...
              <span>{winUser}</span> wins
            </h3>
          </div>
        )}

        {winUser == "X" && (
          <div className="draw">
            <h3>Sorry it's a draw try again..</h3>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
