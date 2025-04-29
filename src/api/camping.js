import { campingAxios } from "@/utils/axios.js";
import { useQuery } from "@tanstack/react-query";

async function getCampingBasedList(params) {
  try {
    const res = await campingAxios.get("/basedList", {
      params,
    });
    return res.data.response.body;
  } catch (error) {
    console.error(error);
  }
}

export async function getCampingImageList(params) {
  try {
    const res = await campingAxios.get("/imageList", {
      params,
    });
    return res.data.response.body;
  } catch (error) {
    console.error(error);
  }
}

export function useGetCampingBasedList(params) {
  return useQuery({
    queryKey: ["getCampingBasedList", params.pageNo],
    queryFn: () => getCampingBasedList(params),
    refetchOnWindowFocus: false,
  });
}

export function useGetCampingImageList(contentId) {
  return useQuery({
    queryKey: ["getCampingImageList", contentId],
    queryFn: () => getCampingImageList(contentId),
    refetchOnWindowFocus: false,
    enabled: !!contentId,
  });
}
