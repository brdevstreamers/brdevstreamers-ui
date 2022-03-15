export interface AuthContextInterface extends Partial<AuthState> {
  setAuthState: (authState: AuthState | null) => void;
  authenticated?: boolean;
  logout: () => void;
}

export type AuthState = {
  token: string;
};
