import { createAction } from '@ngrx/store';

export type UpdateActions = '[UPDATE] Get Updates' | '[UPDATE] Add Update';

export const updateGetAction = createAction();
export const updateAddAction = createAction();
