import React, { useState } from 'react';
import { generate_tree } from '../../utils/generate-tree';
import { UiType } from '../../types';
import { Button } from '@material-ui/core';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import { Controlled as CodeMirrorInput, UnControlled as CodeMirrorOutput } from 'react-codemirror2';

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
    const [type, setType] = useState('react');
    const classes = useStyles();
    // TODO: should be select option input, where you can choose
    // which ui do you want.

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
            const result = generate_tree(UiType.ANGULAR, json);
            setOutput(result);
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
