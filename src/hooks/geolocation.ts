import { useEffect, useState } from "react";

export default function useGeolocation() {
  const [location, setLocation] = useState({
    loaded: false,
    coords: { lat: -1, lon: -1 },
  });

  useEffect(() => {
    init();
  }, []);

  async function init() {
    if (navigator.permissions) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setLocation({
            loaded: true,
            coords: { lat: coords.latitude, lon: coords.longitude },
          });
        },
        (error) => {
          console.error(error);
          setLocation({
            loaded: false,
            coords: { lat: -1, lon: -1 },
          });
        }
      );
    }
  }

  return location;
}
