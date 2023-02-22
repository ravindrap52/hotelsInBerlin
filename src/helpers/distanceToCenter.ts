export const distanceToCenter = ([lat1, lon1]: number[], [lat2, lon2]: number[], convertToMiles: boolean): number => {
  const toRadian = (angle: number) => (Math.PI / 180) * angle;
  const distance = (a: number, b: number) => (Math.PI / 180) * (a - b);
  const RADIUS_OF_EARTH_IN_KM = 6371;

  const distanceLatitude = distance(lat2, lat1);
  const distanceLongitude = distance(lon2, lon1);

  lat1 = toRadian(lat1);
  lat2 = toRadian(lat2);

  // Haversine Formula
  const coLatitudes =
    Math.pow(Math.sin(distanceLatitude / 2), 2) +
    Math.pow(Math.sin(distanceLongitude / 2), 2) * Math.cos(lat1) * Math.cos(lat2);
  const latitudSeperation = 2 * Math.asin(Math.sqrt(coLatitudes));

  let finalDistance = RADIUS_OF_EARTH_IN_KM * latitudSeperation;

  if (convertToMiles) {
    finalDistance /= 1.60934;
  }
  return Number(finalDistance.toFixed());
};
