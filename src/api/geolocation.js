/**
 * Get current geolocation coordinates
 * @returns {Promise<{latitude: number, longitude: number}>} Promise that resolves to an object containing latitude and longitude
 * @throws {Error} If geolocation is not supported or permission is denied
 */
export const getCurrentPosition = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation is not supported by your browser"));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      },
      (error) => {
        switch (error.code) {
          case error.PERMISSION_DENIED:
            reject(new Error("User denied the request for Geolocation"));
            break;
          case error.POSITION_UNAVAILABLE:
            reject(new Error("Location information is unavailable"));
            break;
          case error.TIMEOUT:
            reject(new Error("The request to get user location timed out"));
            break;
          default:
            reject(new Error("An unknown error occurred"));
        }
      },
      {
        enableHighAccuracy: true, // 최대한 정확한 위치 정보를 가져옴
        timeout: 5000,
        maximumage: 1000 * 60, // 1분 캐싱
      }
    );
  });
};
