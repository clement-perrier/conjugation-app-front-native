import { ImageSourcePropType } from "react-native";

// imageMappings.js
const flags: {[key: string]: ImageSourcePropType} = {
    'spain': require('../assets/images/flags/spain.svg'),
    'french': require('../assets/images/flags/france.svg'),
    'germany': require('../assets/images/flags/germany.svg'),
    'italy': require('../assets/images/flags/italy.svg'),
    // Add other mappings here
  };
  
export default flags;