import React, { useState } from 'react';

import './styles.scss';

enum FieldType {
    INPUT = 'INPUT',
    OUTPUT = 'OUTPUT'
}

export const App = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

    const is_valid_json = (json: string) => {
        try {
            return [true, JSON.parse(json)];
        } catch (e) {
            return [false, e];
        }
    }

    const change_text = (e: React.ChangeEvent<HTMLTextAreaElement>, type: FieldType) => {
        const { value } = e.target;

        try {
            switch (type) {
                case FieldType.INPUT:
                    setInput(value);
                    break;
                case FieldType.OUTPUT:
                    setOutput(value);
                    break;
                default:
                    throw new Error('Invalid type for field!')
                }
        } catch (e) {
            console.error(e);
        }
    }

    const generate_tree = (tree: any, key: string, level: string[] = []) => {
        let current_tree = '';

        Object.keys(tree).forEach((key) => {
            if (typeof tree[key] === 'object') {
                const subtree = generate_tree(tree[key], key, level.concat(key));
                current_tree += subtree;
            } else {
                const levels = level.concat(key).join('.')
                current_tree += `<div className='${key}'>{ ${levels} }</div>`;
            }
        });


        return `<div className='${key}_container'>${current_tree}</div>`;
    }

    const make_tree = () => {
        const [valid, json] = is_valid_json(input);

        if (valid) {
            const result = generate_tree(json, 'main', ['data']);
            setOutput(result);

        } else {
            console.error('Wrong json', json);  
        }
    }

    return (
        <div className="container">
            <textarea name="" value={input} onChange={(e) => change_text(e, FieldType.INPUT)}></textarea>
            <textarea name="" value={output} onChange={(e) => change_text(e, FieldType.OUTPUT)}></textarea>
            <button onClick={make_tree}>Convert</button>
        </div>
        )
}