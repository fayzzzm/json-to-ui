import { generate_tree as react_tree } from './tree-for-react';
import { generate_tree as angular_tree } from './tree-for-angular';
import { UiType } from '../../types';

export const generate_tree = (type: UiType, data: any) => {
    switch (type) {
        case UiType.REACT:
            return react_tree(data, 'data', ['data']);
        case UiType.ANGULAR:
            return angular_tree(data, 'data', ['data']);
        default:
            throw new Error('Unknown ui type!');
    }
};
