import { UiType } from '@app/types';
import { generate_tree } from '@utils/generate-tree';

import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import { Controlled as CodeMirrorInput, UnControlled as CodeMirrorOutput } from 'react-codemirror2';
import prettier from 'prettier/standalone';
import parser_html from 'prettier/parser-html';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import './styles.scss';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const App = () => {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [type, setType] = useState(UiType.REACT);
    const classes = useStyles();

    const is_valid_json = (json: string) => {
        try {
            return [true, JSON.parse(json)];
        } catch (e) {
            return [false, e];
        }
    };

    const make_tree = () => {
        const [valid, json] = is_valid_json(input);

        if (valid) {
            const code = generate_tree(type, json);
            format_code(code);
        } else {
            console.error('Wrong json', json);
        }
    };

    const handleChange = (event: any) => {
        const { value } = event.target;

        setType(value);
    };

    const options = {
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true,
    };

    const format_code = (code: string) => {
        const formattedCode = prettier.format(code, {
            parser: 'html',
            plugins: [parser_html],
        });

        setOutput(formattedCode);
    };

    return (
        <div className="container">
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Type</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={type}
                    onChange={handleChange}
                >
                    <MenuItem value={UiType.REACT}>React</MenuItem>
                    <MenuItem value={UiType.ANGULAR}>Angular</MenuItem>
                </Select>
                <Button variant="contained" color="primary">
                    <span onClick={make_tree}>Convert</span>
                </Button>
            </FormControl>

            <div className="code__containers">
                <CodeMirrorInput
                    value={input}
                    options={options}
                    onBeforeChange={(editor, data, value) => {
                        console.log(editor, data);
                        setInput(value);
                    }}
                    onChange={(editor, data, value) => {
                        console.log(editor, data, value);
                    }}
                />
                <CodeMirrorOutput value={output} options={options} />
            </div>
        </div>
    );
};
