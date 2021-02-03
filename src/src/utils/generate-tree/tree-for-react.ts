export const generate_tree = (tree: any, key: string, level: string[] = []) => {
    let current_tree = '';

    Object.keys(tree).forEach((key) => {
        if (typeof tree[key] === 'object') {
            const subtree = generate_tree(tree[key], key, level.concat(key));
            current_tree += subtree;
        } else {
            const levels = level.concat(key).join('.');
            current_tree += `<div className='${key}'>{ ${levels} }</div>`;
        }
    });

    return `<div className='${key}_container'>${current_tree}</div>`;
};
