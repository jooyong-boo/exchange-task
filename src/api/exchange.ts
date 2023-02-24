import axios from "axios";

export const exchange = async (from: string, to: string, amount: number) => {
    try {
        let result = await axios.get(
            `https://api.exchangerate.host/convert?from=${from}&to=${to}&amount=${amount}`
        );
        return result.data.result;
    } catch (err) {
        throw err;
    }
};
