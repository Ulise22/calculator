import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const App = () => {
  const [calc, setCalc] = useState("");
  const [result, setResult] = useState ("");

  const ops = ['/', '*', '+', '-', '.'];

  const updateCalc = value => {
    if (
      ops.includes(value) && calc === '' || ops.includes(value) && ops.includes(calc.slice(-1))
    ) {
      return;
    }
    setCalc(calc + value)

    if (!ops.includes(value)) setResult(eval(calc + value).toString());
  }

  const createDigits = () => {
    const digits= [];

    for(let i = 1; i < 10; i++) {digits.push(<button onClick={() => updateCalc(i.toString())} key={i}>{i}</button>)} return digits;
  }

  const deleteAll = () => {
    setCalc(''); 
    setResult('');
  }

  const deleteLast = () => {
    if(calc == '') return; 

    const value = calc.slice(0, -1)
    setCalc(value);
    setResult(value);
  }

  const calculate = () => {
    setCalc(eval(calc).toString());
    setResult('')
  }

  return (
    <div className='app'>
      <div className='calculator'>
          <div className='result'> {result ? <span>{result}</span> : ''} { calc || '0'} </div>
          <div className='deletes'>
            <button onClick={deleteAll}>Reset</button>
            <button onClick={deleteLast}>Del</button>
            <button onClick={() => updateCalc('(')}>(</button>
            <button onClick={() => updateCalc(')')}>)</button>
          </div>
          <div className='operators'>
            <button onClick={() => updateCalc('+')}>+</button>
            <button onClick={() => updateCalc('-')}>-</button>
            <button onClick={() => updateCalc('*')}>*</button>
            <button onClick={() => updateCalc('/')}>/</button>
          </div>
          <div className='digits'>
            { createDigits() }
            <button onClick={() => updateCalc('0')}>0</button>
            <button onClick={() => updateCalc('.')}>.</button>
            
            <button onClick={calculate}>=</button>
          </div>
      </div>
    </div>
  )
}

ReactDOM.render(<React.StrictMode><App /></React.StrictMode>,document.getElementById('root'));