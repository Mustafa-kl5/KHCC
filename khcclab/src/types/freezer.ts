export interface iFreezer {
  _id: string;
  freezerName: string;
  freezerModel: string;
  freezerLocation: string;
  freezerType: string;
  NumberOfShelves: number;
  BoxesPerShelf: number;
  createAt: string;
}
export interface iFreezerlist {
  freezers: iFreezer[];
}
