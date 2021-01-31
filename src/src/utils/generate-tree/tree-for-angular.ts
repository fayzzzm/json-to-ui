import { v4 as uuidv4 } from 'uuid';

export const generate_tree = (tree: any, key: string, level: string[] = []) => {
    let current_tree = '';

    if (typeof tree !== 'object') return `<span>{{ ${level.join('.')} }}</span>`;
    else
        Object.keys(tree).forEach((key) => {
            if (Array.isArray(tree[key])) {
                const id = uuidv4();
                const subtree = generate_tree(tree[key][0], id, [id]);
                const levels = level.concat(key).join('.');
                const template = `<div *ngFor="let ${id} of ${levels}">${subtree}</div>`;

                current_tree += template;
            } else if (typeof tree[key] === 'object') {
                const subtree = generate_tree(tree[key], key, level.concat(key));
                current_tree += subtree;
            } else {
                const levels = level.concat(key).join('.');
                current_tree += `<div class='${key}'>{{ ${levels} }}</div>`;
            }
        });

    return `<div class='${key}_container'>${current_tree}</div>`;
};
