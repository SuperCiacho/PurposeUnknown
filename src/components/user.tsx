import React from 'react';
import { DatePicker } from 'react-md/lib/Pickers';
import { Grid, Cell } from 'react-md/lib/Grids';
import { Paper } from 'react-md/lib/Papers';
import { TextField } from 'react-md/lib/TextFields';

class Person {
    name: string | undefined;
    birthDate: Date | undefined;
    email: string | undefined;
}

export const User: React.FunctionComponent = () => {
    const [person, setPerson] = React.useState<Person>(new Person())
    const update = React.useCallback((value: string | number, event) => setPerson(({ ...person, [event.currentTarget.name]: value })), [person])
    const updateDate = React.useCallback((_, date: Date, event) => setPerson(({ ...person, [event.currentTarget.id]: date })), [person])

    return (
        <Paper zDepth={2}>
            <Grid spacing={1}>
                <Cell size={3}>
                    <p>Person data validator</p>
                </Cell>
                <Cell>
                    <TextField label="Name" required name='name' value={person.name} onChange={update} />
                    <DatePicker id="birthDate" required label="Birth date" inline fullWidth value={person.birthDate} onChange={updateDate} />
                    <TextField label="Email" name="email" type="email" value={person.email} onChange={update} />
                </Cell>
            </Grid>
        </Paper>
    );
};