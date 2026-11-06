// Варіант 6: будівельні матеріали
// Об'єкт замість масиву: так class-validator сам виводить у повідомленні список допустимих значень
export const UnitOfMeasures = { Kg: 'kg', M2: 'm2', M3: 'm3' } as const;
export type UnitOfMeasure = (typeof UnitOfMeasures)[keyof typeof UnitOfMeasures];

export class MaterialEntity {
  id: string;
  title: string;
  slug: string;
  price: number;
  unitOfMeasure: UnitOfMeasure;
  weightPerUnitKg: number;
  isHeavyCargo: boolean;
}
