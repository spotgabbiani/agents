export interface Agent {
  id?: number;
  name: string;
  email: string;
  status: "Active" | "Inactive";
  lastSeen: string;
  department: string;
  location: string;
}
