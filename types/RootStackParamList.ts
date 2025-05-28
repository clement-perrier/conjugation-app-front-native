
// export type RootStackParamList = {
//     'Home': any
//     'Learning language list': any
//     'Add learning language': any
//     'On boarding learning language': any
//     'Tense(s) selection': any
//     'Verb(s) selection': any
//     'Batch progress': any
//     'Batch created': any
//     'Start': any
//     'Question': any
//     'Results': any
//     'Log in': any
//     'Sign up': any
//     'Reset password request': any
//     'New password': any
//     'Success screen': any
//     'Tutorial': any
//     'OnBoardingTutorial': any
//     'Settings': any
//     'Offline': any
// };

export type RootStackParamList = {
  [Routes.Home]: any;
  [Routes.LearningLanguageList]: any;
  [Routes.AddLearningLanguage]: any;
  [Routes.OnBoardingLearningLanguage]: any;
  [Routes.TenseSelection]: any;
  [Routes.VerbSelection]: any;
  [Routes.BatchProgress]: any;
  [Routes.BatchCreated]: any;
  [Routes.Start]: any;
  [Routes.Question]: any;
  [Routes.Results]: any;
  [Routes.Login]: any;
  [Routes.Signup]: any;
  [Routes.ResetPasswordRequest]: any;
  [Routes.NewPassword]: any;
  [Routes.SuccessScreen]: any;
  [Routes.Tutorial]: any;
  [Routes.OnBoardingTutorial]: any;
  [Routes.Settings]: any;
  [Routes.Offline]: any;
};

export enum Routes {
  Home = 'Home',
  LearningLanguageList = 'LearningLanguageList',
  AddLearningLanguage = 'AddLearningLanguage',
  OnBoardingLearningLanguage = 'OnboardingLearningLanguage',
  TenseSelection = 'TenseSelection',
  VerbSelection = 'VerbSelection',
  BatchProgress = 'BatchProgress',
  BatchCreated = 'BatchCreated',
  Start = 'Start',
  Question = 'Question',
  Results = 'Results',
  Login = 'Login',
  Signup = 'Signup',
  ResetPasswordRequest = 'ResetPasswordRequest',
  NewPassword = 'NewPassword',
  SuccessScreen = 'SuccessScreen',
  Tutorial = 'Tutorial',
  OnBoardingTutorial = 'OnboardingTutorial',
  Settings = 'Settings',
  Offline = 'Offline',
}


