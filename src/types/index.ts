export interface AuthContextType {
  token: string;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
}