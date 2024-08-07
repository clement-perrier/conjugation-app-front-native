import { ImageSourcePropType } from "react-native";

// imageMappings.js
const flags: {[key: string]: ImageSourcePropType} = {
    'spain': require('../assets/images/flags/spain.svg'),
    'france': require('../assets/images/flags/france.svg'),
    'germany': require('../assets/images/flags/germany.svg'),
    'italy': require('../assets/images/flags/italy.svg'),
  };
  
export default flags;