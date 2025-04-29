import { weatherAxios } from "@/utils/axios.js";
import { useQuery } from "@tanstack/react-query";
import { getCurrentPosition } from "./geolocation.js";

async function getCurrentWeather() {
  const { latitude, longitude } = await getCurrentPosition();
  try {
    const res = await weatherAxios.get("", {
      params: {
        lat: latitude,
        lon: longitude,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
  }
}

export function useGetCurrentWeather() {
  return useQuery({
    queryKey: ["getCurrentWeather"],
    queryFn: () => getCurrentWeather(),
    refetchOnWindowFocus: false,
  });
}
