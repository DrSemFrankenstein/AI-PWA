import React from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import { subDays } from "date-fns";
import { useSelector } from "react-redux";
import { Tooltip } from "antd";

const ContributionsChart = () => {
  const today = new Date();

  // Get tasks from Redux store
  const tasksByDate = useSelector((state) => state.dailyGoals.tasksByDate);

  // Map over the tasksByDate to prepare data for the heatmap
  const values = Object.keys(tasksByDate).map((date) => {
    const successTasks = tasksByDate[date]?.Success || [];
    const failureTasks = tasksByDate[date]?.Failure || [];
    const completedTasks =
      successTasks.filter((task) => task.completed).length +
      failureTasks.filter((task) => task.completed).length;

    return {
      date: date,
      count: completedTasks,
    };
  });

  return (
    <div>
      <h2>Contributions</h2>
      <CalendarHeatmap
        startDate={subDays(today, 365)}
        endDate={today}
        values={values}
        classForValue={(value) => {
          if (!value) {
            return "color-empty";
          }
          return `color-github-${value.count}`;
        }}
        transformDayElement={(element, value, index) => (
          <Tooltip
            key={index}
            title={
              value?.date
                ? `${value.date} has ${value.count ?? 0} completed tasks`
                : "No tasks available"
            }
          >
            {element}
          </Tooltip>
        )}
        showWeekdayLabels={true}
      />
    </div>
  );
};

export default ContributionsChart;
