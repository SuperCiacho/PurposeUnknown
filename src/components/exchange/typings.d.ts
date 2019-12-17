import { Currency } from '../../models/currency';

type OnSelectCallback = (selected: Currency) => void;
type FieldProps<T> = {
    index: number;
    active: boolean;
    disabled: boolean;
    itemValue: keyof T;
    value: string
    props: ListItemProps
    item: T
    field: React.ReactElement
}
