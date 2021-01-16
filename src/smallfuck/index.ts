type InterpreterState = {
  code: string[];
  tape: number[];
  cpointer: number; // code pointer
  tpointer: number; // tape pointer
};

const COMMANDS = {
  '>': '>',
  '<': '<',
  '*': '*',
  '[': '[',
  ']': ']',
};

export const interpreter = (code: string, tape: string) => {
  const conditions = (state: InterpreterState) => {
    const notOutOfBounds = (state: InterpreterState) =>
      state.tpointer >= 0 && state.tpointer <= state.tape.length - 1;

    const hasCommandsToExecute = (state: InterpreterState) =>
      state.cpointer < state.code.length;

    return notOutOfBounds(state) && hasCommandsToExecute(state);
  };

  const flip = (state: InterpreterState) => {
    state.tape[state.tpointer] = state.tape[state.tpointer] ? 0 : 1;

    return state;
  };

  const inc = (state: InterpreterState) => {
    const tpointer = state.tpointer + 1;
    return { ...state, tpointer };
  };

  const dec = (state: InterpreterState) => {
    const tpointer = state.tpointer - 1;
    return { ...state, tpointer };
  };

  const forward = (state: InterpreterState) => {
    if (state.tape[state.tpointer]) return state;

    const found = (state: InterpreterState) =>
      state.code[state.cpointer] === COMMANDS[']'];

    while (!found(state)) {
      state.cpointer += 1;
    }

    return state;
  };

  const backward = (state: InterpreterState) => {
    if (state.tape[state.tpointer] === 0) return state;

    let counter = 1;

    while (counter > 0) {
      state.cpointer -= 1;

      switch (state.code[state.cpointer]) {
        case COMMANDS[']']:
          counter += 1;

        case COMMANDS['[']:
          counter -= 1;

        default:
          break;
      }
    }

    return {
      ...state,
      cpointer: state.cpointer - 1,
    };
  };

  const interprete = (state: InterpreterState) => {
    const char = state.code[state.cpointer];

    switch (char) {
      case COMMANDS['>']:
        return inc(state);

      case COMMANDS['<']:
        return dec(state);

      case COMMANDS['*']:
        return flip(state);

      case COMMANDS['[']:
        return forward(state);

      case COMMANDS[']']:
        return backward(state);

      default:
        return state;
    }
  };

  let state: InterpreterState = {
    cpointer: 0,
    tpointer: 0,
    code: code.split(''),
    tape: tape.split('').map(Number),
  };

  while (conditions(state)) {
    state = {
      ...interprete(state),
      cpointer: state.cpointer + 1,
    };
  }

  return state.tape.join('');
};
