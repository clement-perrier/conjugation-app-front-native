declare module 'react-native-multicolor-progress-bar' {
    import { Component } from 'react';
    import { ViewStyle } from 'react-native';
  
    interface ProgressObject {
      color: string;
      value: number;
      nameToDisplay?: string;
      opacity?: number;
    }
  
    interface ProgressBarProps {
      arrayOfProgressObjects: ProgressObject[];
      style?: ViewStyle;
    }
  
    export class ProgressBar extends Component<ProgressBarProps> {}
  }
  