export type ShipmentStatus = 'Pending' | 'In Transit' | 'Out for Delivery' | 'Delivered' | 'Delayed';

export interface LocationUpdate {
  id: string;
  location: string;
  status: ShipmentStatus;
  timestamp: string;
  lat: number;
  lng: number;
  description?: string;
}

export interface Shipment {
  id: string;
  trackingCode: string;
  senderName: string;
  receiverName: string;
  origin: {
    address: string;
    lat: number;
    lng: number;
  };
  destination: {
    address: string;
    lat: number;
    lng: number;
  };
  currentLocation: {
    lat: number;
    lng: number;
    name: string;
  };
  status: ShipmentStatus;
  estimatedDelivery: string;
  history: LocationUpdate[];
  createdAt: string;
}