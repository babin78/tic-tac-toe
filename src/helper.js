const getRemainingScore = (nums) => {
  let notNullnums = nums.filter((e) => e !== null);

  let remaining = nums.length - notNullnums.length;

  return remaining;
};

const getWinner = (arraypointer) => {
  const winingStack = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  let winner = null;
  let remainingBlock = getRemainingScore(arraypointer);
  if (remainingBlock == 9) {
    {
      return winner;
    }
  } else {
    for (let i = 0; i < winingStack.length; i++) {
      let tmparr = winingStack[i];
      if (
        arraypointer[tmparr[0]] == 1 &&
        (arraypointer[tmparr[1]] == 1) & (arraypointer[tmparr[2]] == 1)
      ) {
        winner = "user1";
        return winner;
      } else if (
        arraypointer[tmparr[0]] == 2 &&
        (arraypointer[tmparr[1]] == 2) & (arraypointer[tmparr[2]] == 2)
      ) {
        winner = "user2";
        return winner;
      }
    }

    if (remainingBlock == 0) {
      return "X";
    } else {
      return winner;
    }
  }
};

export { getRemainingScore, getWinner };
