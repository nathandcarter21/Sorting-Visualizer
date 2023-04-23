import { ChangeEvent } from "react";

type ControlProps = {
  rendering: boolean;
  algorithm: string;
  speed: number;
  scrambled: boolean;
  startSort: () => void;
  setRandomArray: () => void;
  handleChangeSpeed: (e: ChangeEvent<HTMLInputElement>) => void;
  setAlgorithm: (algo: string) => void;
  setScrambled: (valid: boolean) => void;
};

const Controls: React.FunctionComponent<ControlProps> = (props) => {
  return (
    <div className="controls">
      <div className="algorithms">
        <div className="slider"></div>
        <button
          className={`algorithm ${
            props.algorithm === "Quick Sort" ? "selected" : ""
          }`}
          onClick={() => {
            if (!props.rendering) {
              props.setAlgorithm("Quick Sort");
            }
          }}>
          Quick
        </button>
        <button
          className={`algorithm ${
            props.algorithm === "Merge Sort" ? "selected" : ""
          }`}
          onClick={() => {
            if (!props.rendering) {
              props.setAlgorithm("Merge Sort");
            }
          }}>
          Merge
        </button>
        <button
          className={`algorithm ${
            props.algorithm === "Insertion Sort" ? "selected" : ""
          }`}
          onClick={() => {
            if (!props.rendering) {
              props.setAlgorithm("Insertion Sort");
            }
          }}>
          Insertion
        </button>
        <button
          className={`algorithm ${
            props.algorithm === "Bubble Sort" ? "selected" : ""
          }`}
          onClick={() => {
            if (!props.rendering) {
              props.setAlgorithm("Bubble Sort");
            }
          }}>
          Bubble
        </button>
      </div>
      <div className="runSort">
        <div className="speedControl">
          <label className="speedLabel" htmlFor="speed">
            Delay(ms){" "}
          </label>
          <input
            className="speed"
            value={props.speed}
            type="text"
            name="speed"
            id="speed"
            onChange={(e) => {
              props.handleChangeSpeed(e);
            }}
          />
        </div>

        {props.scrambled ? (
          <button
            className="start"
            onClick={() => {
              props.startSort();
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 384 512"
              fill="#252525"
              width="20px"
              height="20px">
              <path d="M73 39c-14.8-9.1-33.4-9.4-48.5-.9S0 62.6 0 80V432c0 17.4 9.4 33.4 24.5 41.9s33.7 8.1 48.5-.9L361 297c14.3-8.7 23-24.2 23-41s-8.7-32.2-23-41L73 39z" />
            </svg>
          </button>
        ) : (
          <button
            className="refresh"
            onClick={() => {
              if (!props.rendering) {
                props.setRandomArray();
                props.setScrambled(true);
              }
            }}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              fill="#252525"
              viewBox="0 0 512 512">
              <path d="M105.1 202.6c7.7-21.8 20.2-42.3 37.8-59.8c62.5-62.5 163.8-62.5 226.3 0L386.3 160H336c-17.7 0-32 14.3-32 32s14.3 32 32 32H463.5c0 0 0 0 0 0h.4c17.7 0 32-14.3 32-32V64c0-17.7-14.3-32-32-32s-32 14.3-32 32v51.2L414.4 97.6c-87.5-87.5-229.3-87.5-316.8 0C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5zM39 289.3c-5 1.5-9.8 4.2-13.7 8.2c-4 4-6.7 8.8-8.1 14c-.3 1.2-.6 2.5-.8 3.8c-.3 1.7-.4 3.4-.4 5.1V448c0 17.7 14.3 32 32 32s32-14.3 32-32V396.9l17.6 17.5 0 0c87.5 87.4 229.3 87.4 316.7 0c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.5 62.5-163.8 62.5-226.3 0l-.1-.1L125.6 352H176c17.7 0 32-14.3 32-32s-14.3-32-32-32H48.4c-1.6 0-3.2 .1-4.8 .3s-3.1 .5-4.6 1z" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Controls;
