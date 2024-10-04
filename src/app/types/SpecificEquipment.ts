export interface SpecificEquipment {
  equipmentID: string;
  equipmentName: string;
  description: string; // For "Description"
  typeOfScope: string; // For "Scope"
  tagID: string; // For "Tag Id"
  make: string; // For "Make"
  model: string; // For "Model"
  serialNumber: string; // For "Serial Number"
  certificateNo: string; // For "Certificate No."
  traceability: string; // For "Traceability"
  rangeType: string; // For "Range"
  rangeMinTemp: string;
  rangeMaxTemp: string;
  rangeMinPercent: string;
  rangeMaxPercent: string;
}
