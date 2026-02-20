import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'onboarding',
    children: [
      {
        path: 'step1',
        loadComponent: () =>
          import('./pages/onboarding/step1/step1.component').then(
            (m) => m.Step1Component
          ),
      },
      {
        path: 'step2',
        loadComponent: () =>
          import('./pages/onboarding/step2/step2.component').then(
            (m) => m.Step2Component
          ),
      },
      {
        path: 'step3',
        loadComponent: () =>
          import('./pages/onboarding/step3/step3.component').then(
            (m) => m.Step3Component
          ),
      },
    ],
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'mood',
    children: [
      {
        path: 'text',
        loadComponent: () =>
          import('./pages/mood/text/text.component').then(
            (m) => m.MoodTextComponent
          ),
      },
      {
        path: 'microphone',
        loadComponent: () =>
          import('./pages/mood/microphone/microphone.component').then(
            (m) => m.MoodMicrophoneComponent
          ),
      },
      {
        path: 'facial',
        loadComponent: () =>
          import('./pages/mood/facial/facial.component').then(
            (m) => m.MoodFacialComponent
          ),
      },
    ],
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component').then((m) => m.AboutComponent),
  },
  {
    path: 'result',
    loadComponent: () =>
      import('./pages/result/result.component').then((m) => m.ResultComponent),
  },
  {
    path: 'loading',
    loadComponent: () =>
      import('./pages/loading/loading.component').then(
        (m) => m.LoadingComponent
      ),
  },
  { path: '', redirectTo: 'onboarding/step1', pathMatch: 'full' },
  { path: '**', redirectTo: 'onboarding/step1' },
];
