import { useReducer } from "react";
import "./App.css";

function reducer(state, { type, payload }) {
  switch (type) {
    case "AC":
      return { prev: "", current: "", operator: "", value: "" };
    case "DEL":
      if (state.current === "") return state;
      return { ...state, current: payload.slice(0, -1) };
    case "OP":
      if (state.current === "") return state;
      if (state.prev !== "") return state;
      return {
        ...state,
        operator: payload,
        prev: state.current,
        current: "",
      };
    case "DIG":
      if (state.current[0] === "0" && payload === "0") return state;
      if (
        (state.current === "" && payload === ".") ||
        (state.current.includes(".") && payload === ".")
      )
        return state;
      if (state.write === false)
        return {
          ...state,
          current: "" + payload,
          write: true,
        };
      return { ...state, current: state.current + payload };
    case "EQ":
      if (state.prev === "") return state;
      return {
        ...state,
        prev: "",
        current: `${operation(state.current, state.prev, state.operator)}`,
        write: false,
      };
    default:
      return;
  }
}
function operation(curr, prev, op) {
  const currV = parseFloat(curr);
  const prevV = parseFloat(prev);

  switch (op) {
    case "+":
      return currV + prevV;
    case "-":
      return prevV - currV;
    case "%":
      return prevV / currV;
    case "*":
      return currV * prevV;
    default:
      return;
  }
}

function App() {
  const [{ prev, write, current, operator }, dispatch] = useReducer(reducer, {
    prev: "",
    current: "",
    operator: "",
    value: "",
    write: true,
  });

  return (
    <div className="calculator-grid">
      <div className="output">
        <div className="previos-operand">
          {prev === ""
            ? ""
            : `${new Intl.NumberFormat("en-IN").format(+prev)}${operator}`}
        </div>
        <div className="current-operand">
          {current === ""
            ? ""
            : `${new Intl.NumberFormat("en").format(+current)}`}
        </div>
      </div>
      <button className="span-two" onClick={() => dispatch({ type: "AC" })}>
        AC
      </button>
      <button onClick={() => dispatch({ type: "DEL", payload: current })}>
        DEL
      </button>
      <button onClick={() => dispatch({ type: "OP", payload: `%` })}>%</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `1` })}>1</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `2` })}>2</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `3` })}>3</button>
      <button onClick={() => dispatch({ type: "OP", payload: `*` })}>*</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `4` })}>4</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `5` })}>5</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `6` })}>6</button>
      <button onClick={() => dispatch({ type: "OP", payload: `+` })}>+</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `7` })}>7</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `8` })}>8</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `9` })}>9</button>
      <button onClick={() => dispatch({ type: "OP", payload: `-` })}>-</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `.` })}>.</button>
      <button onClick={() => dispatch({ type: "DIG", payload: `0` })}>0</button>
      <button className="span-two" onClick={() => dispatch({ type: "EQ" })}>
        =
      </button>
    </div>
  );
}

export default App;
