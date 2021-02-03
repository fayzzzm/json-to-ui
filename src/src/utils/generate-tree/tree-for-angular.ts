export const generate_tree = (tree: any, key: string, level: string[] = []) => {
    let current_tree = '';

    if (typeof tree !== 'object') return `<span>{{ ${level.join('.')} }}</span>`;
    else
        Object.keys(tree).forEach((key) => {
            if (Array.isArray(tree[key])) {
                const subtree = generate_tree(tree[key][0], key, [key]);
                const levels = level.concat(key).join('.');
                const template = `<div *ngFor="let ${key} of ${levels}">${subtree}</div>`;

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
