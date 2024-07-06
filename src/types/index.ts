export interface AuthContextType {
  token: string;
  isAuthenticated: boolean;
  login: (data: any) => Promise<void>;
  logout: () => void;
}

export interface ModalProps {
  title?: string;
  text?: string;
  isOpen: boolean;
  children?: React.ReactNode;
}

export interface Ingredient {
  id: number;
  name: string;
  src: string;
}
