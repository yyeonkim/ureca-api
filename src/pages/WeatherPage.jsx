import { useGetCurrentWeather } from "@/api/weather.js";
import styles from "@/styles/WeatherPage.module.css";

const WeatherPage = () => {
  const { data, isLoading } = useGetCurrentWeather();

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className={styles.weather}>
      <p>{data.name}</p>
      <p>{data.main.temp} &#8451;</p>
      <div>
        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="" />
      </div>
    </div>
  );
};

export default WeatherPage;
