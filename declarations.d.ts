declare module 'metro-config' {
    import type { ConfigT } from '@react-native/metro-config'; // Ensure this type exists or use another appropriate type
    export function getDefaultConfig(): Promise<ConfigT>;
  }