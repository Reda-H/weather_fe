import { Paper, Zoom } from "@mui/material";
import moment from "moment";
import ThermometerIcon from "../icons/ThermometerIcon";
import SunriseIcon from "../icons/SunriseIcon";
import SunsetIcon from "../icons/SunsetIcon";

function Details({ data }) {
    let className = 'details';
    
    if (Object.keys(data).length !== 0) {
        let sunriseNoShift = data.sys.sunrise;
        let sunsetNoShift = data.sys.sunset;
        let cityName = data.name;
        let timezone = data.timezone;
        let time = moment.utc(data.dt, 'X').add(timezone, 'seconds').format('HH:mm a');
        let sunrise = moment.utc(sunriseNoShift, 'X').add(timezone, 'seconds').format('HH:mm a');
        let sunset = moment.utc(sunsetNoShift, 'X').add(timezone, 'seconds').format('HH:mm a');

        return (
            <Zoom in={Object.keys(data).length !== 0} style={{ transitionDelay: '500ms' }}>
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
                    <div className={`${className}`} style={{ color: 'white' }}>
                        <div className={`${className}__header`}>
                            <h2 className={`${className}__header__title`}>{cityName}</h2>
                            <p className={`${className}__header__time`}>{time}</p>
                        </div>
                        <div className={`${className}__image`}>
                            <img src={data.image} alt={data.weather[0].description} />
                        </div>
                        <div className={`${className}__info`}>
                            <div className={`${className}__info--left`}>
                                <div className={`${className}__info__iconText`}>
                                    <ThermometerIcon />
                                    <h3 className={`${className}__info__temperature`}>{data.main.temp} <sup>°C</sup></h3>
                                </div>
                            </div>

                            <div className={`${className}__info--right`}>
                                <div className={`${className}__info__iconText`}>
                                    <SunriseIcon />
                                    <p className={`${className}__info__sunrise`}>{sunrise}</p>
                                </div>
                                <div className={`${className}__info__iconText`}>
                                    <SunsetIcon />
                                    <p className={`${className}__info__sunset`}>{sunset}</p>
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
                margin: '44px'
            }}></div>
        )
    }
};

export default Details;