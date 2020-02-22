import React from 'react';
import { DatePicker } from 'react-md/lib/Pickers';
import { Grid, Cell } from 'react-md/lib/Grids';
import { Paper } from 'react-md/lib/Papers';
import { TextField } from 'react-md/lib/TextFields';
import { ValidationProvider, useValidationContext } from './context';

class Person {
    name?: string;
    birthDate?: Date;
    email?: string;
}

export const User: React.FunctionComponent = () => {
    const [person, setPerson] = React.useState<Person>(new Person())
    const updateName = React.useCallback((value: string) => setPerson(p => ({ ...p, name: value })), [])
    const updateEmail = React.useCallback((value: string) => setPerson(p => ({ ...p, email: value })), [])
    const updateBirthDate = React.useCallback((_, date: Date) => setPerson(p => ({ ...p, birthDate: date })), []);

    return (
        <ValidationProvider>
            <Paper zDepth={2}>
                <Grid spacing={1}>
                    <Cell size={3}>
                        <ValidationDetails {...person} />
                    </Cell>
                    <Cell>
                        <UserName value={person.name} onChange={updateName} />
                        <UserBirthDay value={person.birthDate} onChange={updateBirthDate} />
                        <UserEmail value={person.email} onChange={updateEmail} />
                    </Cell>
                </Grid>
            </Paper>
        </ValidationProvider>
    );
};

const ValidationDetails: React.FunctionComponent<Person> = props => {
    const { validator } = useValidationContext<Person>();
    return <React.Fragment>
        <div>Object is {validator.validate(props) || 'in'}valid</div>
    </React.Fragment>;
}

const UserName: React.FunctionComponent<UserNameProps> = ({ value, onChange }) => {
    const { validator } = useValidationContext<Person>();
    React.useEffect(() => validator.register('name', exists, value => value!.length > 2), [validator])
    return <TextField id='name' label="Name" required name='name' value={value} onChange={onChange} />;
}

const UserBirthDay: React.FunctionComponent<UserBirthdayProps> = ({ value, onChange }) => {
    const { validator } = useValidationContext<Person>();
    React.useEffect(() => validator.register('birthDate', exists), [validator])
    return <DatePicker id="birthDate" name="birthDate" required label="Birth date" inline fullWidth value={value} onChange={onChange} />;
}

const UserEmail: React.FunctionComponent<UserEmailProps> = ({ value, onChange }) => {
    const { validator } = useValidationContext<Person>();
    React.useEffect(() => validator.register('email', exists, value => value.length > 5), [validator]);
    return <TextField id="email" label="Email" name="email" type="email" value={value} onChange={onChange} />;
}

function exists(value: unknown) {
    return !!value
}

type UserNameProps = { value?: string, onChange(value: string | number, event: Event): void };
type UserBirthdayProps = { value?: Date, onChange(formattedDate: string, date: Date, event: Event): void };
type UserEmailProps = { value?: string, onChange(value: string | number, event: Event): void };


