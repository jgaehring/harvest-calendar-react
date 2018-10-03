import React from "react";

// SVG Attributes
const 
  margin = 20,
  chartWidth = 875,
  chartHeight = 1000,
  barHeight = 20,
  barFill = "#90ddbb",
  barPadding = 1,
  labelMargin = 175,
  labelPadding = 10,
  fontHeight = barHeight * .75

// For generating the x-axis labels
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

const bgFill = (index) => index % 2 === 0 ? "#ffffe0" : "#fffac9";

const calcDate = (date) => {
  const month = date.split("-")[1]
  const day = date.split("-")[2]
  if (day >= 20) {
    return month;
  } else if (day > 10) {
    return month - 0.5;
  } else if (day <= 10) {
    return month - 1;
  } else {
    throw new Error(`"${date}" is not a properly formatted date.`);
  }
}

const calcBarWidth = (start, end) => {
  if (!start || !end) {
    return 0;
  }
  return (
    (calcDate(end) - calcDate(start))
    * (
      chartWidth 
      - margin
      - labelMargin
    )
    / 12
  )
}

const calcBarStart = (date) => {
  return calcDate(date)
  * (
    chartWidth 
    - margin
    - labelMargin
  )
  / 12
}

function Calendar({ crops }) {
  return (
    <div id="svg-container">
      <svg 
        className="chart" 
        xmlns="http://www.w3.org/2000/svg"
        height={chartHeight + (margin * 2)}
        width={chartWidth + (margin * 2)}
      >
        <g 
          className="chart-body"
          transform={
              `translate(${labelMargin}, ${margin})`
          }
          height={
              crops.length 
            * (barHeight + 2 * barPadding)
          }
        >
          <g className="x-axis">
            <line
              stroke="black"
              x2="680"
            />
            {
              months.map((month, index) => {
                return (
                  <g 
                    key={`month-${index}`} 
                    id={`${month.toLowerCase()}`}
                    transform={
                      `translate(${index
                        * (chartWidth - margin - labelMargin) / 12})`
                    }
                  >
                    <text
                      fontSize={fontHeight * 11 / 16}
                      fontFamily="sans-serif"
                      x="6"
                      y="-3"
                      textAnchor="start"
                    >
                      {month}
                    </text>
                  </g>
                )
              })
            }
          </g>
          {
            crops.slice().sort((a, b) => {
              if (a.name.toUpperCase() < b.name.toUpperCase()) {
                return -1;
              }
              if (a.name.toUpperCase() > b.name.toUpperCase()) {
                return 1;
              }
              return 0;
            }).map((crop, index) => (
              <g
                key={`crop-row-${index}`}
                className="crop"
                transform={
                  `translate(0, ${index 
                  * (barHeight + barPadding * 2)})`
                }
              >
                <rect 
                  className="bg-fill"
                  fill={bgFill(index)}
                  height={
                    barHeight
                    + barPadding * 2
                  }
                  width={680}
                />
                {
                  crop.seasons[0]
                    ? (
                      <rect 
                        className="bar season-one"
                        fill={barFill}
                        height={barHeight}
                        width={
                          calcBarWidth(
                            crop.seasons[0].start,
                            crop.seasons[0].end,
                          )}
                        x={calcBarStart(crop.seasons[0].start)}
                        y={barPadding}
                      />
                    )
                    : null
                }
                { crop.seasons[1]
                  ? (
                    <rect 
                      className="bar season-two"
                      fill={barFill}
                      height={barHeight}
                      width={
                        calcBarWidth(
                          crop.seasons[1].start,
                          crop.seasons[1].end,
                        )}
                      x={calcBarStart(crop.seasons[1].start)}
                      y={barPadding}
                    />
                  )
                  : null
                }
                <text
                  className="crop-label"
                  x={-labelPadding}
                  dy={(barHeight / 2) + (fontHeight / 2)}
                  textAnchor="end"
                  fontFamily="sans-serif"
                  fontSize={fontHeight}
                  fill="black"
                >
                  {crop.name}
                </text>
              </g>
            ))
          }
          <g 
            className="grid"
            fill="none"
            transform={
              `translate(${0}, ${(crops.length) 
                * (barHeight + barPadding * 2)})`
            }
            textAnchor="middle"
          >
            <path stroke="black" d="M0.5,-980V0.5H680.5V-980"/>
            {
              months.map((month, index) => {
                return (
                  <line
                    className="tick"
                    key={`month-${index}-tick`} 
                    transform={
                      `translate(${(index + 1) 
                        * (chartWidth - margin - labelMargin) 
                        / 12 + .5}, 0)`
                    }
                    stroke="black"
                    y2="-980"
                  />
                )
              })
            }
          </g>
        </g>
      </svg>
    </div>
  )
}

export default Calendar;