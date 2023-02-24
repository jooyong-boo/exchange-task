import styled from "styled-components";
import { ExchangeProp } from "src/types/exchange";

interface IProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    lists: ExchangeProp[];
}

const Select = ({ value, onChange, lists }: IProps) => {
    return (
        <StyledSelect value={value} onChange={onChange}>
            {lists &&
                lists.map((list) => (
                    <option key={list.code} value={list.code}>
                        {list.name} {list.text}
                    </option>
                ))}
        </StyledSelect>
    );
};

const StyledSelect = styled.select`
    border: none;
`;

export default Select;
