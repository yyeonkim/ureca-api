import defaultAxios from "axios";

const weatherAxios = defaultAxios.create({
  baseURL: "https://api.openweathermap.org/data/2.5/weather",
  params: {
    appid: import.meta.env.VITE_WEATHER_API_KEY,
    lang: "kr",
  },
});

const campingAxios = defaultAxios.create({
  baseURL: "https://apis.data.go.kr/B551011/GoCamping",
  params: {
    serviceKey: import.meta.env.VITE_CAMPING_API_KEY,
    MobileOS: "WIN",
    MobileApp: "UrecaAPI",
    _type: "json",
  },
});

// Alter defaults after instance has been created
defaultAxios.defaults.headers.common["Content-Type"] = "application/json";

export { campingAxios, weatherAxios };
