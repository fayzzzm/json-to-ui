import { generate_tree as react_tree } from './tree-for-react';
import { UiType } from '../../types';

export const generate_tree = (type: UiType, data: any) => {
    switch (type) {
        case UiType.REACT:
            return react_tree(data, 'data');

        default:
            throw new Error('Unknown ui type!');
    }
};
