import Columns from "./Columns";

type ChartProps = {
  array: number[];
  algorithm: string;
  realTime: number;
  visualTime: number;
  swaps: number;
  comparisons: number;
};

const Chart: React.FunctionComponent<ChartProps> = (props) => {
  return (
    <section className="chart">
      <h3>{props.algorithm}</h3>
      <Columns array={props.array} />
      <div className="information-section">
        <div className="info">Real time: {`${props.realTime} ms`}</div>
        <div className="info">
          Visual time:{" "}
          {props.visualTime === 0 ? "..." : `${props.visualTime / 1000} s`}
        </div>
        <div className="info">Swaps: {props.swaps}</div>
        <div className="info">Comparisons: {props.comparisons}</div>
      </div>
    </section>
  );
};

export default Chart;
