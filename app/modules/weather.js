import React from "react";
import Footer from '../modules/footer';
import Image from "next/image";
import wind from '/public/icons/wind.svg';
import temp from '/public/icons/temperature.svg';
import clouds from '/public/icons/clouds.svg';
import pressure from '/public/icons/pressure.svg';
import summer from '/public/icons/summer.svg';
import vision from '/public/icons/vision.svg';
import geo from '/public/icons/geo-alt.svg';

const apiKey = process.env.NEXT_PUBLIC_API_KEY;

class Weather extends React.Component {
    state = {
        temp: "brak danych",
        wiatr: "brak danych",
        stan: "brak danych",
        cisnienie: "brak danych",
        clouds: "brak danych",
        visibility: "brak danych",
        time: "brak danych",
        city: "Warszawa",
        cityOk: "Warszawa",
        country: "PL",
        lat: "",
        lon: "",
        active: false,
    }


    componentDidMount() {
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        fetch
            (`${url}?q=${this.state.city}&units=metric&lang=pl&appid=${apiKey}`)
            .then(response => response.json())
            .then(dane => this.setState({ temp: dane.main.temp, wiatr: dane.wind.speed, stan: dane.weather[0].description, cisnienie: dane.main.pressure, visibility: dane.visibility, clouds: dane.clouds.all, time: new Date(dane.dt * 1000).toLocaleTimeString() })
            )
    }

    componentDidUpdate(prevProps, prevState) {
        const apiWork = dane => this.setState({ cityOk: dane.name, temp: dane.main.temp, wiatr: dane.wind.speed, stan: dane.weather[0].description, cisnienie: dane.main.pressure, visibility: dane.visibility, clouds: dane.clouds.all, time: new Date(dane.dt * 1000).toLocaleTimeString(), country: dane.sys.country });
        const url = 'https://api.openweathermap.org/data/2.5/weather';
        if (prevState.active !== this.state.active || prevState.lat !== this.state.lat) {
            fetch(`${url}?lat=${this.state.lat}&lon=${this.state.lon}&units=metric&lang=pl&appid=${apiKey}`)
                .then(response => response.json())
                .then(apiWork)
        }
        else if (prevState.city !== this.state.city) {
            fetch(`${url}?q=${this.state.city}&units=metric&lang=pl&appid=${apiKey}`)
                .then(response => response.json())
                .then(apiWork)
        }
    }

    handleChangeCity = (e) => { if (e.target.value.length > 0) { this.setState({ city: e.target.value, active: false }) } else { this.setState({ city: "Warszawa", active: true }) } }

    handleClickLocal = (e) => {
        let showPosition = function (position) {
            this.setState({ lat: position.coords.latitude, lon: position.coords.longitude, active: true });
            document.getElementById('town').value = null;
        }
        showPosition = showPosition.bind(this);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(showPosition);
        }
    }

    render() {
        return (
            <div>
                <footer>
                    <div>
                            <span style={{ fontSize: "18px", color: "#ffffff" }}>Pogoda w Twoim mieście: </span><br /><input id='town' className="input" type="text" placeholder={this.state.cityOk} autoComplete="off" style={{ width: "8em", height: "2.3em", letterSpacing:'1px' }} onChange={this.handleChangeCity}></input>

                            <Image src={geo} onClick={this.handleClickLocal} alt="GPS" style={{ width: "2.7em", height: "2.8em", borderRadius: "15%", outline: "none", marginLeft: "1em", position: "relative", top: "1em", backgroundColor:'white', cursor:'pointer' }} />
                        <br /><br />
                        Aktualna pogoda dla miasta <span className='span'>{this.state.cityOk} - {this.state.country}</span> <span className='span' style={{ fontWeight: "300" }}>({this.state.time})</span>
                        <br />
                        <Image className='icon' src={summer} alt="summer" /> stan: <span className='span'>{this.state.stan}</span><br />
                        <Image className='icon' src={temp} alt="temperature" /> temp.: <span className='span'>{this.state.temp} &#176;C</span>
                        <Image className='icon' src={wind} alt="wind" /> wiatr: <span className='span'>{this.state.wiatr} m/s</span><br />
                        <Image className='icon' src={pressure} alt="pressure" />  ciśnienie: <span className='span'>{this.state.cisnienie} hPa</span>
                        <Image className='icon' src={vision} alt="visibillity" /> widoczność: <span className='span'>{this.state.visibility} m</span><br />
                        <Image className='icon' src={clouds} alt="clouds" /> zachmurzenie:  <span className='span'>{this.state.clouds} %</span><br /><br />
                        <Footer />
                    </div>
                </footer>
            </div>
        )
    }

}

export default Weather;