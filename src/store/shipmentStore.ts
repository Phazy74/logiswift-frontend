import { create } from 'zustand';
import { Shipment } from '../types/shipment';

interface ShipmentState {
  shipments: Shipment[];
  addShipment: (shipment: Shipment) => void;
}

export const useShipmentStore = create<ShipmentState>((set) => ({
  // ADD THIS MOCK DATA HERE:
  shipments: [
    {
      id: "1",
      trackingCode: "LSW-9928374",
      status: "In Transit",
      origin: { address: "Shanghai, CN", lat: 31.23, lng: 121.47 },
      destination: { address: "Los Angeles, US", lat: 34.05, lng: -118.24 },
      currentLocation: { name: "Pacific Ocean", lat: 30, lng: -140 },
      senderName: "Global Tech",
      receiverName: "John Doe",
      estimatedDelivery: "2024-06-20",
      history: [],
      createdAt: new Date().toISOString()
    },
    {
      id: "2",
      trackingCode: "LSW-1122334",
      status: "Delivered",
      origin: { address: "London, UK", lat: 51.5, lng: -0.12 },
      destination: { address: "Dubai, UAE", lat: 25.2, lng: 55.2 },
      currentLocation: { name: "Dubai Hub", lat: 25.2, lng: 55.2 },
      senderName: "EuroLogistics",
      receiverName: "Sarah Smith",
      estimatedDelivery: "2024-05-15",
      history: [],
      createdAt: new Date().toISOString()
    }
  ],
  addShipment: (shipment) => set((state) => ({ 
    shipments: [shipment, ...state.shipments] 
  })),
}));