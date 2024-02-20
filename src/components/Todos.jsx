import React, { useReducer, useState } from 'react';
import { Container, Row, Col, Button, Table } from 'react-bootstrap';

// import { v4 as uuidv4 } from 'uuid'; // import uuidv4 function from uuid package

const initialState = [];

const Add_Action = {
    AddTask: "Add_Task",
    DeletTASK: "Delete_Task",
    EditTask: "Edit_Task"
}

const reducer = (state, action) => {
    switch(action.type) {
        case Add_Action.AddTask:
            return [...state, { id: action.id, name: action.payload }];

        case Add_Action.DeletTASK:
            return state.filter((d) => d.id !== action.payload);

        case Add_Action.EditTask:
            return state.map((data) =>
                data.id === action.id ? { ...data, name: action.payload } : data
            );

        default:
            return state;
    }
}

const init = (initialState) => {
    const result = [{id: 101, name: "amit"}]
    return result;
}

const Todos = () => {
    const [state, dispatch] = useReducer(reducer, initialState, init);
    
    const [inputValue, setInputValue] = useState('');
    const [editId, setEditId] = useState(null);



    const handleClick = () => {
        if (inputValue.trim() === '') return; // Prevent adding empty tasks

        if (editId) {
            dispatch({ type: Add_Action.EditTask, payload: inputValue, id: editId });
            setEditId(null);
        } else {
            const timestamp = Date.now(); // Get current timestamp
            const str = timestamp.toString(); // Convert timestamp to string
            const digitsArray = str.split('').map(Number); // Split string into array of characters and convert each character to a number
            const str3 = digitsArray.splice(9,4);
            // console.log( Number(str3.join('')));

            const id = Number(str3.join(''));
            dispatch({ type: Add_Action.AddTask, payload: inputValue, id: id });
        }
        setInputValue('');
    }

    const EditHandle = (name, id) => {
        setInputValue(name); // Set input value to current task being edited
        setEditId(id);
    }

    return (
        <Container className='m-5'>
            <Row>
               <Col md={5}>
                    <b className='fs-2'> Enter List: </b> {' '}
                    <input type="text" placeholder='enter lists' value={inputValue} onChange={(e) => setInputValue(e.target.value)}/> {' '}
                    <Button variant='success' className='btn-md' onClick={handleClick}>
                        {editId ? "Update" : "Add"}
                    </Button>
                </Col>
                <Col md={7}>
                    <Table>
                        <thead>
                            {state.length > 0 && (
                                <tr>
                                    <th>#</th>
                                    <th>Show List</th>
                                    <th>Action</th>
                                </tr>
                            )}
                        </thead>
                        <tbody>
                            {state.length > 0 ? (
                                state.map((val, index) => (
                                    <tr key={index}>
                                        <td>{val.id}</td>
                                        <td>{val.name}</td>
                                        <td>
                                            <Button onClick={() => dispatch({ type: Add_Action.DeletTASK, payload: val.id })}>Delete</Button>{' '}
                                            <Button onClick={() => EditHandle(val.name, val.id)}>Edit</Button>{' '}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr><td colSpan={3} className='text-center'>There is No Data</td></tr>
                            )}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    )
}

export default Todos;
