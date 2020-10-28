// @flow
import { CREATE_PROJECT } from 'actions';

const initialState = {
    projects: []
};

export default function profile(state: any = initialState, action: any) {
    switch (action.type) {
        case CREATE_PROJECT: {
            const newProject = {
                name: action.name
            };
            const newProjects = [...state.projects, newProject];
            return newProjects;
        }
        default:
            return state;
    }
}
