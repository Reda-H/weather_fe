import { Autocomplete, Paper, TextField, Zoom } from '@mui/material';
import moment from 'moment/moment';
import { useEffect, useState } from 'react';
import './App.scss';
import ThemeContext from "./Components/ThemeContext";
import SunriseIcon from './icons/SunriseIcon';
import SunsetIcon from './icons/SunsetIcon';
import ThermometerIcon from './icons/ThermometerIcon';

function App() {

  let [options, setOptions] = useState([]);
  let [lastSearch, setLastSearch] = useState();
  const [data, setData] = useState({});

  async function handleInput(e) {
    setOptions([]);
    let response = await fetch(`https://weather-be.herokuapp.com/search?input=${e.target.value}`);
    let data = await response.json();
    setOptions(data.map(el => ({ label: el.name, id: el.id })));

  }

  function handleEnter(e) {
    if (e.key === 'Enter') {
      setLastSearch(e.target.value);
      fetchData(e.target.value);
    }
  }

  async function fetchData(city) {
    let data = await (await fetch(`https://weather-be.herokuapp.com/weather?city=${city}`)).json();
    setData(data)
  }

  function Details({ data }) {
    if (Object.keys(data).length !== 0) {
      let sunriseNoShift = data.sys.sunrise;
      let sunsetNoShift = data.sys.sunset;
      let cityName = data.name;
      let timezone = data.timezone;
      let time = moment.utc(data.dt, 'X').add(timezone, 'seconds').format('HH:mm a');
      let sunrise = moment.utc(sunriseNoShift, 'X').add(timezone, 'seconds').format('HH:mm a');
      let sunset = moment.utc(sunsetNoShift, 'X').add(timezone, 'seconds').format('HH:mm a');

      return (
        <Zoom in={Object.keys(data).length !== 0} style={{ transitionDelay: '500ms'}}>
          <Paper elevation={3} sx={{
            '&.MuiPaper-root': {
              width: 400,
              height: 500,
              borderRadius: 7,
              border: '4px solid white',
              background: '#282c34',
              margin: 5,
            }
          }}>
            <div className="details" style={{ color: 'white' }}>
              <div className='details__header'>
                <h2 className='details__header__title'>{cityName}</h2>
                <p className='details__header__time'>{time}</p>
              </div>
              <div className='details__image'>
                <img src={data.image} alt={data.weather[0].description} />
              </div>
              <div className='details__info'>
                <div className='details__info--left'>
                  <div className='details__info__iconText'>
                    <ThermometerIcon />
                    <h3 className='details__info__temperature'>{data.main.temp} <sup>°C</sup></h3>
                  </div>
                </div>

                <div className='details__info--right'>
                  <div className='details__info__iconText'>
                    <SunriseIcon />
                    <p className='details__info__sunrise'>{sunrise}</p>
                  </div>
                  <div className='details__info__iconText'>
                    <SunsetIcon />
                    <p className='details__info__sunset'>{sunset}</p>
                  </div>
                </div>
              </div>
            </div>
          </Paper>
        </Zoom>
      )
    } else {
      return (
        <div style={{
          width: '400px',
          height: '500px',
          margin: '44px'}}></div>
      )
    }
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
            onClose={e => handleEnter({ key: 'Enter', target: { value: e.target.innerText } })}
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
}

export default App;
