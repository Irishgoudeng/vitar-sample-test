export interface CustomerEquipment {
  equipmentID: string;
  equipmentName: string;
  typeOfScope: string;
  description: string;
  tagID: string;
  model: string;
  serialNumber: string;
  type: string;
  range: string;
  traceability: string;
}
export interface CustomerSite {
  id: string;
  customerID: string;
  customerName: string;
  siteID: string;
  siteName: string;
  siteStreet1: string;
  siteStreet2: string;
  siteStreet3: string;
  siteState: string;
  siteCity: string;
  sitePostCode: string;
  siteCountry: string;
}

export interface Customer {
  customerID: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  BRN: string;
  TIN: string;
  industry: string;
  status: string;
  contactFirstName: string;
  contactLastName: string;
  contactPhone: string;
  contactEmail: string;
  sites?: CustomerSite[];
  equipment?: CustomerEquipment[];
}
