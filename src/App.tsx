import React, { ChangeEvent, useEffect, useState } from 'react';
import './App.css';

type Option = 'isPrime' | 'isFibonacci';
function App() {
  const [number, setNumber] = useState<number>();
  const [option, setOption] = useState<Option>('isPrime');
  const [result, setResult] = useState<string>('');
  
  const onNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.value === '') {
      setNumber(undefined);
    } else {
      setNumber(Number(event.target.value));
    }
  }
  const onNumberInputBlur = () => {
    if (!number) {
      return;
    }
    if (number < 0) {
      setNumber(1);
    } else {
      setNumber(Math.round(number));
    }
  }

  useEffect(() => {
    if (!number) {
      return;
    }
    switch (option) {
    case 'isPrime':
      setResult(isPrime(number).toString());
      break;
    case 'isFibonacci':
      setResult(isFibonacci(number).toString());
      break;
    }
  }, [number, option]);

  return (
    <div className="container">
      <div className="left-panel">
        <input type="number" value={number} onChange={onNumberChange} onBlur={onNumberInputBlur}></input>
      </div>
      <div className="middle-panel">
        <select 
          value={option} 
          onChange={(e) => { setOption(e.target.value as Option) }} 
        >
          <option value="isPrime">isPrime</option>
          <option value="isFibonacci">isFibonacci</option>
        </select>
      </div>
      <div className="right-panel">{result}</div>
    </div>
  );
}

export default App;

const isPrime = (num: number) => {
  for(let i = 2, s = Math.sqrt(num); i <= s; i++)
      if(num % i === 0) return false; 
  return num > 1;
}

const isFibonacci = (input: number) => {
  if (input === 0 || input === 1) {
    return true;
  }

  let i;
  let fib = [0, 1];

  for (i = 2; i <= Number.MAX_VALUE; i++) {
    fib[i] = fib[i - 2] + fib[i - 1];

    if (fib[i] === input) {
      return true;
    } else if (fib[i] > input) {
      return false;
    }
  }

  return false;
}