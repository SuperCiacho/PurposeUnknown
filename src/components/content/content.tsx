import * as React from 'react';
import { Currency } from '../../models/currency';
import { Paper } from 'react-md/lib/Papers';
import { SelectField, } from 'react-md/lib/SelectFields';
import { Grid, Cell } from 'react-md/lib/Grids';
import { AppContext } from '../../app.context';
import { ListItem } from 'react-md/lib/Lists';


interface ContentProps {
    prop?: any;
}

interface ContentState {
    currencies: Currency[];
    selected?: Currency;
}

export class Content extends React.Component<ContentProps, ContentState, ApplicationContext> {
    constructor(props: ContentProps) {
        super(props);
        this.state = { currencies: [] };
        this.handleChange = this.handleChange.bind(this);
    }
    public async componentDidMount(): Promise<void> {
        const currencies = await this.context.services.currencies.list();
        this.setState({ currencies: currencies.map(this.mapCurrencyToListItem) });
    }

    public render(): React.ReactNode {
        const currencies = this.state.currencies;
        return (
            <Paper zDepth={2}>
                <Grid spacing={16}>
                    <Cell size={6}>
                        <SelectField
                            id="source-currency"
                            label="Source currency"
                            placeholder="Source currency"
                            menuItems={currencies}
                            position={SelectField.Positions.BELOW}
                            fullWidth
                        />
                    </Cell>
                    <Cell size={6}>
                        <SelectField
                            id="target-currency"
                            label="Target currency"
                            placeholder="Target currency"
                            menuItems={currencies}
                        position={SelectField.Positions.BELOW}
                        fullWidth
                    />
                    </Cell>
                    <Cell size={12}>
                        Chart
                    </Cell>
                </Grid>
            </Paper>
        );
    }

    private mapCurrencyToListItem(data: Currency): object {
        return (
            <ListItem
                primaryText={data.name}
                secondaryText={data.value}
                contentStyle={{ display: 'flex', justifyContent: 'space-between' }}
            />
        )
    }

    private handleChange(): void {
        alert('dupa');
        this.setState({
            selected: { name: 'EUR', value: 1 }
        });
    }

}

const XComp: React.FunctionComponent<Currency> = (data) => {
    return <div>{`${data.name}: ${data.value}`}</div>;
}

Content.contextType = AppContext;