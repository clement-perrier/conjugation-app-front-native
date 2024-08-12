// metro.config.ts
import { getDefaultConfig } from 'metro-config';

export default (async () => {
  const {
    resolver: { assetExts, sourceExts },
  } = await getDefaultConfig();

  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts.filter((ext: any) => ext !== 'svg'),
      sourceExts: [...sourceExts, 'svg'],
    },
  };
})();
