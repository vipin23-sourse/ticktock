import React from 'react'
  const fetchTimesheets = async () => {
      try {
        const response = await fetch('/api/timesheets');
        if (!response.ok) throw new Error("Failed to fetch data");

        const json = await response.json();
        // Assuming your API returns { data: [...] }
        return json.data;
      } catch (err) {
        return ("Could not load timesheets. Please try again.");
      } 
    };
const TimesheetContainer = async() => {
    const timesheets = await fetchTimesheets();
  return (
    <div>{JSON.stringify(timesheets)}</div>
  )
}

export default TimesheetContainer