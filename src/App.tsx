import { useEffect, useState } from "react";
import { Input, Select } from "src/components/common";
import { exchange } from "src/api/exchange";
import { ExchangeProp } from "src/types/exchange";
import styled from "styled-components";

const Exchange = [
    {
        code: "KRW",
        name: "대한민국",
        text: "원",
    },
    {
        code: "EUR",
        name: "유럽연합",
        text: "유로",
    },
    {
        code: "USD",
        name: "미국",
        text: "달러",
    },
    {
        code: "JPY",
        name: "일본",
        text: "엔",
    },
    {
        code: "CNY",
        name: "중국",
        text: "위안",
    },
];

const App = () => {
    const [exchangeRates, setExchangeRates] =
        useState<ExchangeProp[]>(Exchange);
    const [fromCurrency, setFromCurrency] = useState<string>("KRW");
    const [toCurrency, setToCurrency] = useState<string>("USD");
    const [fromAmount, setFromAmount] = useState<number>(0);
    const [toAmount, setToAmount] = useState<number>(0);

    const handleFromCurrencyChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setFromCurrency(event.target.value);
    };

    const handleToCurrencyChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setToCurrency(event.target.value);
    };

    const handleFromAmountChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setFromAmount(parseFloat(event.target.value));
    };

    const handleToAmountChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setToAmount(parseFloat(event.target.value));
    };

    useEffect(() => {
        if (fromAmount) {
            const debounce = setTimeout(() => {
                exchange(fromCurrency, toCurrency, fromAmount).then((res) => {
                    setToAmount(res);
                });
            }, 300);
            return () => clearTimeout(debounce);
        } else {
            setToAmount(0);
        }
    }, [fromAmount, fromCurrency, toCurrency]);

    return (
        <Layout>
            <h1>환전 계산기</h1>
            <Box>
                <Input value={fromAmount} onChange={handleFromAmountChange} />
                <Select
                    value={fromCurrency}
                    onChange={handleFromCurrencyChange}
                    lists={exchangeRates}
                />
            </Box>

            <Box>
                <Input
                    value={toAmount}
                    onChange={handleToAmountChange}
                    isDisable={true}
                />
                <Select
                    value={toCurrency}
                    onChange={handleToCurrencyChange}
                    lists={exchangeRates}
                />
            </Box>
        </Layout>
    );
};

const Layout = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const Box = styled.div`
    width: 300px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 10px;
    padding: 10px;
    border: 1px solid #eaeaea;
    border-radius: 5px;
    > input {
        padding-right: 5px;
        border-right: 1px solid #eaeaea;
    }
`;

export default App;
