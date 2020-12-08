type InterpreterState = {
  value: number;
  output: string;
};

type Commands = {
  '.': '.';
  '+': '+';
};

type Command = keyof Commands;

const COMMANDS: Commands = {
  '+': '+',
  '.': '.',
};

export const myFirstInterpreter = (code: string): string => {
  const DEFAULT_STATE: InterpreterState = {
    value: 0,
    output: '',
  };

  const add = (state: InterpreterState): InterpreterState => {
    const value = (state.value + 1) % 256;
    return { ...state, value };
  };

  const print = (state: InterpreterState): InterpreterState => {
    const output = state.output + String.fromCharCode(state.value);
    return { ...state, output };
  };

  const interprete = (char: string, state: InterpreterState) => {
    switch (char as Command) {
      case COMMANDS['+']:
        return add(state);

      case COMMANDS['.']:
        return print(state);

      default:
        return state;
    }
  };

  const result = code.split('').reduce((acc, curr) => {
    return interprete(curr, acc);
  }, DEFAULT_STATE);

  return result.output;
};
