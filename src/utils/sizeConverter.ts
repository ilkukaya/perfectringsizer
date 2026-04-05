import ringSizeData from "../data/ring-sizes.json";

export interface RingSize {
  us: string;
  uk: string;
  eu: string;
  jp: string;
  diameter_mm: number;
  circumference_mm: number;
}

const sizes: RingSize[] = ringSizeData.sizes;

export function findByUS(size: string): RingSize | undefined {
  return sizes.find((entry) => entry.us === size);
}

export function findByUK(size: string): RingSize | undefined {
  return sizes.find((entry) => entry.uk === size);
}

export function findByEU(size: string): RingSize | undefined {
  return sizes.find((entry) => entry.eu === size);
}

export function findByDiameter(mm: number): RingSize | undefined {
  if (sizes.length === 0) return undefined;
  return sizes.reduce((closest, entry) =>
    Math.abs(entry.diameter_mm - mm) < Math.abs(closest.diameter_mm - mm)
      ? entry
      : closest
  );
}

export function findByCircumference(mm: number): RingSize | undefined {
  if (sizes.length === 0) return undefined;
  return sizes.reduce((closest, entry) =>
    Math.abs(entry.circumference_mm - mm) < Math.abs(closest.circumference_mm - mm)
      ? entry
      : closest
  );
}

export function convertSize(
  value: string | number,
  fromSystem: string
): RingSize | undefined {
  switch (fromSystem.toLowerCase()) {
    case "us":
      return findByUS(String(value));
    case "uk":
      return findByUK(String(value));
    case "eu":
      return findByEU(String(value));
    case "jp":
      return sizes.find((entry) => entry.jp === String(value));
    case "diameter":
    case "diameter_mm":
      return findByDiameter(Number(value));
    case "circumference":
    case "circumference_mm":
      return findByCircumference(Number(value));
    default:
      return undefined;
  }
}

export function usToMM(usSize: string): number | undefined {
  const entry = findByUS(usSize);
  return entry?.diameter_mm;
}

export function circumferenceToUS(circ: number): string | undefined {
  const entry = findByCircumference(circ);
  return entry?.us;
}

export function getAllSizes(): RingSize[] {
  return sizes;
}
