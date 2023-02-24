import React from "react";
import styled from "styled-components";

interface IProps {
    value: number;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isDisable?: boolean;
}

const Input = ({ value, onChange, isDisable = false }: IProps) => {
    return (
        <StyledInput
            type="number"
            value={value ? value : ""}
            onChange={onChange}
            disabled={isDisable}
        />
    );
};

const StyledInput = styled.input`
    border: none;
    &:focus {
        outline: none;
    }
`;

export default Input;
