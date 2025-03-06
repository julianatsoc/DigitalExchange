import { z } from 'zod';

const currencySchema = z.record(z.string());

export async function fetchCurrencies() {
    try{
        const res = await fetch('https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies.min.json');
        if (!res.ok) {
            throw new Error('Failed to fetch currencies');
        }
        const data = await res.json();
        return currencySchema.parse(data);
    }
    catch(error){
        console.error('Error fetching currencies:', error);
    throw error;
    }
}


export async function fetchExchangeRates(baseCurrency:string){
    try {
        const res = await fetch(`https://latest.currency-api.pages.dev/v1/currencies/${baseCurrency.toLowerCase()}.json`);
        if (!res.ok) {
            throw new Error('Failed to fetch exchange rates');
        }
        const data = await res.json();
        return data;
    } catch (error) {
        console.error('Error fetching exchange rates:', error);
        throw error;
}}