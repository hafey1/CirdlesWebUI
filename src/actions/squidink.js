// @flow
import { CREATE_PROJECT } from './types';

export const createProject = (name: string) => {
    return (dispatch: any) => {
        dispatch({ type: CREATE_PROJECT, name });
    };
};
