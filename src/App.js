import { Autocomplete, TextField } from '@mui/material';
import { useState } from 'react';
import './App.scss';
import ThemeContext from "./Components/ThemeContext";
import Details from './Components/DetailsComponent';

function App() {

  const [options, setOptions] = useState([]);
  const [data, setData] = useState({});

  async function handleInput(e) {
    setOptions([]);
    let response = await fetch(`https://weather-be.herokuapp.com/search?input=${e.target.value}`);
    let data = await response.json();
    setOptions(data.map(el => ({ label: el.name, id: el.id })));
  };

  function handleEnter(e) {
    if (e.key === 'Enter') fetchData(e.target.value);
  };

  async function fetchData(city) {
    let data = await (await fetch(`https://weather-be.herokuapp.com/weather?city=${city}`)).json();
    setData(data);
  };

  return (
    <ThemeContext>
      <div className="App">
        <main className='App-main'>
          <Autocomplete
            disablePortal
            freeSolo
            id="outlined-basic"
            options={options}
            filterOptions={x => x}
            onChange={(_, value) => handleEnter({ key: 'Enter', target: { value: value?.label } })}
            sx={{
              '.MuiAutocomplete-clearIndicator': {
                color: 'white'
              }
            }}
            renderInput={(params) => <TextField label="City" variant="outlined" {...params} onInput={handleInput} onKeyPress={handleEnter} sx={{
              width: 400,
              '& label.Mui-focused, & label': {
                color: 'white',
              },
              '& .MuiInput-underline': {
                borderBottomColor: 'white',
              },
              '& .MuiOutlinedInput-root': {
                color: 'white',
                borderRadius: 8,
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
                }
              }
            }} />} />

          <Details data={data} />
        </main>
      </div>
    </ThemeContext>
  );
};

export default App;
