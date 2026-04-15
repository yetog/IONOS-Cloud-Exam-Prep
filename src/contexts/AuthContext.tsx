import { createContext, useContext, ReactNode } from 'react';

// Temporary: Firebase auth replaced with a pass-through context.
// The platform (IONOS marketplace) enforces Google SSO at the reverse-proxy
// level — only authenticated employees can reach this app. Proper per-user
// identity via platform headers (X-Auth-Email, X-Auth-User, X-Auth-Role)
// will be wired up once the platform endpoint is confirmed.

interface SimpleUser {
  uid:         string;
  email:       string | null;
  displayName: string | null;
}

interface AuthContextType {
  user:          SimpleUser;
  loading:       false;
  signIn:        () => Promise<void>;
  signUp:        () => Promise<void>;
  signOut:       () => Promise<void>;
  resetPassword: () => Promise<void>;
}

const noop = async () => {};

const PLATFORM_USER: SimpleUser = {
  uid:         'local',
  email:       null,
  displayName: 'IONOS User',
};

const AuthContext = createContext<AuthContextType>({
  user:          PLATFORM_USER,
  loading:       false,
  signIn:        noop,
  signUp:        noop,
  signOut:       noop,
  resetPassword: noop,
});

export function AuthProvider({ children }: { children: ReactNode }) {
  return (
    <AuthContext.Provider value={{
      user:          PLATFORM_USER,
      loading:       false,
      signIn:        noop,
      signUp:        noop,
      signOut:       noop,
      resetPassword: noop,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  return useContext(AuthContext);
}
