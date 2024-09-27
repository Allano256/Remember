import { useSearchParams } from "react-router-dom";

export function useUrlPosition() {
  // This calls for position from the URL
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
