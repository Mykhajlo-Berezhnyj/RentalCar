export function normalizeCarData(car) {
  const partsAddress = car.address?.split(",") || [];
  const city = partsAddress[1]?.trim() || "";
  const country = partsAddress[2]?.trim() || "";
  const formattedKm = new Intl.NumberFormat("uk-UA").format(car.mileage || 0);

  return {
    city,
    country,
    formattedKm,
  };
}
