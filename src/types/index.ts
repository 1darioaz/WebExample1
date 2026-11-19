export type ActiveTab = 
  | 'login'
  | 'inicio'
  | 'perfil'
  | 'servicios'
  | 'detalle_internet'
  | 'novedades'
  | 'facturacion'
  | 'gestiones'
  | 'tickets'
  | 'soporte';

export interface UserAccount {
  cgp: string;
  companyName: string;
  cuit: string;
  billingAddress: string;
  taxCondition: string;
  balanceStatus: 'al_dia' | 'pendiente';
  balanceAmount?: number;
  autoDebitCard: string;
  autoDebitType: string;
  primaryContact: {
    name: string;
    email: string;
    phone: string;
  };
  dedicatedExecutive: {
    name: string;
    email: string;
    phone: string;
    role: string;
  };
}

export interface ServiceCategory {
  id: string;
  title: string;
  count: number;
  badge: {
    label: string;
    type: 'upgrade' | 'optimizar' | 'descubrir' | 'cloud' | 'ia';
    color: string;
  };
  iconName: string;
  active: boolean;
  tagline: string;
  description: string;
  modalOffer: {
    title: string;
    subtitle: string;
    benefits: string[];
    currentCost?: string;
    discountedCost?: string;
    actionText: string;
  };
}

export interface InternetLink {
  id: string;
  name: string;
  address: string;
  currentSpeed: number; // in Mbps
  sla: string;
  ipRange: string;
  status: 'online' | 'warning' | 'offline';
  ping: number;
  utilizationPeak: number; // percentage
  serviceType: 'Fibra Óptica Dedicada Punto a Punto' | 'IPLAN Liv' | 'Enlace de Respaldo';
}

export interface HardwareItem {
  id: string;
  name: string;
  brand: string;
  model: string;
  description: string;
  pricePerMonth: number;
  priceOneTime: number;
  image: string;
  category: 'phone' | 'headset' | 'softphone';
  features: string[];
}

export interface NotificationItem {
  id: string;
  title: string;
  tag: string;
  tagType: 'new' | 'promo' | 'maint' | 'update';
  date: string;
  description: string;
  read: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'patricia' | 'user';
  text: string;
  timestamp: string;
  quickActions?: { label: string; action: string }[];
}

export interface CollaborationState {
  provider: 'google' | 'microsoft';
  plan: string;
  starterQty: number;
  standardQty: number;
  plusQty: number;
  hasGeminiCopilotAi: boolean;
  aiLicenseQty: number;
  selectedSchedule: string;
  transferToken: string;
  tokenValidated: boolean;
}

export interface CentralVirtualState {
  extensions: number;
  includeMobileApp: boolean;
  has0800: boolean;
  hasSmartIvr: boolean;
  hasCallRecording: boolean;
  hasVirtualFax: boolean;
  selectedHardwareId: string;
  hardwareQty: number;
  areaCode: string;
  contractTermMonths: number;
}
