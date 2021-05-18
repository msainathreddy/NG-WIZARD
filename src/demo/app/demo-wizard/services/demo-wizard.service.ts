import { Injectable, Type } from '@angular/core';
import { isObservable, Observable } from 'rxjs';
import { NgWizardConfig, StepValidationArgs, STEP_STATE, THEME } from '../../../../ng-wizard/public-api';

import { StepOneComponent } from '../steps/step-1/step-one.component';
import { StepTwoComponent } from '../steps/step-2/step-two.component';
import { StepThreeComponent } from '../steps/step-3/step-three.component';
import { StepFourComponent } from '../steps/step-4/step-four.component';
import { StepFiveComponent } from '../steps/step-5/step-five.component';

@Injectable()
export class DemoWizardService {
  constructor() {
  }

  config: NgWizardConfig = {
    selected: 0,
    theme: THEME.arrows,
    toolbarSettings: {
      toolbarExtraButtons: [
        {
          text: 'Finish',
          class: 'btn btn-info',
          event: () => alert('Finished!!!')
        },
      ]
    }
  };

  stepDefinitions: StepDefinition[] = [
    {
      title: 'Summon',
      description: 'Summon Details',
      component: StepOneComponent,
      canEnter: this.validateStep.bind(this, 'entry'),
      canExit: this.validateStep.bind(this, 'exit'),
    },
    {
      title: ' Petitioner',
      description: 'Petitioner Details',
      //state: STEP_STATE.disabled,
      component: StepTwoComponent,
      canEnter: this.validateStep.bind(this, 'entry'),
      canExit: this.validateStep.bind(this, 'exit'),
    },
    {
      title: 'Summon Defendant',
      description: 'Summon Defendant Details',
      component: StepThreeComponent,
      canEnter: this.validateStep.bind(this, 'entry'),
      canExit: this.validateStep.bind(this, 'exit'),
    },
    {
      title: 'Summon Fee',
      description: 'Summon Fee Details',
      component: StepFourComponent,
    },
    {
      title: 'Step 5',
      description: 'Step 5 description',
      state: STEP_STATE.hidden,
      component: StepFiveComponent,
    },
  ];

  private validateStep(type: string, args: StepValidationArgs) {
    let step = type == 'entry' ? args.toStep : args.fromStep;
    let stepSpecificValidateMethod;

    if (step && step.componentRef) {
      stepSpecificValidateMethod = type == 'entry' ? step.componentRef.instance.validateEntryToStep : step.componentRef.instance.validateExitFromStep;
    }

    if (stepSpecificValidateMethod) {
      if (typeof stepSpecificValidateMethod === typeof true) {
        return <boolean>stepSpecificValidateMethod;
      }
      else if (stepSpecificValidateMethod instanceof Function) {
        stepSpecificValidateMethod = stepSpecificValidateMethod.bind(step.componentRef.instance);
        let result = stepSpecificValidateMethod();

        if (isObservable<boolean>(result)) {
          return result;
        }
        else if (typeof result === typeof true) {
          return <boolean>result;
        }
      }
    }

    return true;
  }
}

export interface StepDefinition {
  title: string;
  description: string;
  state?: STEP_STATE;
  component: Type<any>;
  canEnter?: boolean | ((args: StepValidationArgs) => boolean) | ((args: StepValidationArgs) => Observable<boolean>);
  canExit?: boolean | ((args: StepValidationArgs) => boolean) | ((args: StepValidationArgs) => Observable<boolean>);
}
