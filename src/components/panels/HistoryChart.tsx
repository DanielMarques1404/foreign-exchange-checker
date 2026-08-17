import { extent, max, min } from "d3-array";
import { scaleLinear, scaleTime } from "d3-scale";
import { area, curveMonotoneX, line } from "d3-shape";

import { HistoricalPoint } from "../../domain/entities";

type ChartPoint = {
  date: Date;
  rate: number;
};

type HistoryChartProps = {
  points: HistoricalPoint[];
  base: string;
  quote: string;
};

const width = 920;
const height = 360;
const margin = {
  top: 68,
  right: 28,
  bottom: 42,
  left: 68,
};

const formatDateLabel = (date: Date) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "2-digit",
  }).format(date);
};

export const HistoryChart = ({ points, base, quote }: HistoryChartProps) => {
  const chartPoints: ChartPoint[] = points.map((point) => ({
    date: new Date(`${point.date}T00:00:00`),
    rate: point.rate,
  }));
  const xDomain = extent(chartPoints, (point) => point.date);
  const minRate = min(chartPoints, (point) => point.rate);
  const maxRate = max(chartPoints, (point) => point.rate);
  const hasEnoughData =
    chartPoints.length > 1 &&
    xDomain[0] !== undefined &&
    xDomain[1] !== undefined &&
    minRate !== undefined &&
    maxRate !== undefined;

  if (!hasEnoughData) {
    return (
      <div className="flex h-94.25 w-full items-center justify-center rounded-md border border-Neutral-500 bg-Neutral-600 text-sm text-Neutral-200">
        Dados insuficientes para desenhar o grafico.
      </div>
    );
  }

  const yPadding = Math.max((maxRate - minRate) * 0.12, maxRate * 0.001);
  const yDomain: [number, number] = [minRate - yPadding, maxRate + yPadding];
  const xScale = scaleTime()
    .domain([xDomain[0], xDomain[1]])
    .range([margin.left, width - margin.right]);
  const yScale = scaleLinear()
    .domain(yDomain)
    .range([height - margin.bottom, margin.top]);
  const linePath = line<ChartPoint>()
    .x((point) => xScale(point.date))
    .y((point) => yScale(point.rate))
    .curve(curveMonotoneX)(chartPoints);
  const areaPath = area<ChartPoint>()
    .x((point) => xScale(point.date))
    .y0(height - margin.bottom)
    .y1((point) => yScale(point.rate))
    .curve(curveMonotoneX)(chartPoints);
  const yTicks = yScale.ticks(3);
  const xTicks = xScale.ticks(4);
  const latestPoint = chartPoints.at(-1);

  return (
    <figure className="w-full overflow-hidden rounded-md border border-Neutral-500 bg-Neutral-700">
      <svg
        role="img"
        aria-label={`Historico ${base}/${quote}`}
        className="h-94.25 w-full"
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="history-chart-fill" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="var(--color-Lime-500)" stopOpacity="0.75" />
            <stop offset="70%" stopColor="var(--color-Lime-500)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--color-Lime-500)" stopOpacity="0" />
          </linearGradient>
        </defs>

        <text
          x="28"
          y="46"
          fill="var(--color-Neutral-50)"
          fontSize="20"
          fontWeight="700"
          letterSpacing="2"
        >
          {base}/{quote}
        </text>
        {latestPoint && (
          <text
            x={width - 28}
            y="46"
            textAnchor="end"
            fill="var(--color-Neutral-200)"
            fontSize="14"
            letterSpacing="1.5"
          >
            {latestPoint.rate.toFixed(4)} • {formatDateLabel(latestPoint.date)}
          </text>
        )}

        {yTicks.map((tick) => (
          <g key={tick}>
            <line
              x1={margin.left}
              x2={width - margin.right}
              y1={yScale(tick)}
              y2={yScale(tick)}
              stroke="var(--color-Neutral-500)"
              strokeDasharray="4 8"
              strokeOpacity="0.6"
            />
            <text
              x="28"
              y={yScale(tick) + 5}
              fill="var(--color-Neutral-200)"
              fontSize="13"
            >
              {tick.toFixed(4)}
            </text>
          </g>
        ))}

        {areaPath && <path d={areaPath} fill="url(#history-chart-fill)" />}
        {linePath && (
          <path
            d={linePath}
            fill="none"
            stroke="var(--color-Lime-500)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="3"
          />
        )}

        {xTicks.map((tick) => (
          <text
            key={tick.toISOString()}
            x={xScale(tick)}
            y={height - 14}
            textAnchor="middle"
            fill="var(--color-Neutral-200)"
            fontSize="13"
          >
            {formatDateLabel(tick)}
          </text>
        ))}
      </svg>
    </figure>
  );
};
