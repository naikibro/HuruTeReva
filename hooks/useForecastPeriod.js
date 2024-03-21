import { useState, useEffect } from "react";

const useForecastPeriod = () => {
  const [forecastPeriod, setForecastPeriod] = useState([]);

  useEffect(() => {
    setForecastPeriod(null);
    const dates = Array.from({ length: 7 }, (_, i) => {
      const futureDate = new Date();
      futureDate.setDate(futureDate.getDate() + i);
      const formattedDate = futureDate
        .toISOString()
        .slice(0, 10)
        .replace(/-/g, "/");
      return formattedDate;
    });

    setForecastPeriod(dates);
  }, []);

  return { forecastPeriod, setForecastPeriod };
};

export default useForecastPeriod;
