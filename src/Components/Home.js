import { useEffect, useState } from "react";
import locationIcon from "../Images/location.png";
import searchIcon from "../Images/search.png";
import Image from "react-bootstrap/Image";
import Card from 'react-bootstrap/Card'

const Home = () => {
    const [weatherData, setWeatherData] = useState({});
    const [search, setSearch] = useState('');
    const [displayImage, setDisplayImage] = useState(require(`../Images/france.jpg`))

    const getWeatherData = async (params = 'france') => {
        try {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${params}&appid=b543da68018a588fb6d38cc7890d0310`);
            if (response.status === 200) {
                const data = await response.json();
                const tempWeatherData = {
                    temperature: Math.floor(data.main.temp - 273.15),    //Converting Kelvin to Celsius
                    description: data.weather[0].description.toUpperCase(),
                    humidity: data.main.humidity,
                    windSpeed: Math.floor(data.wind.speed * 3.6),       //Converrting meter/sec to km/h
                    city: (data.name).toUpperCase()
                }
                setWeatherData(tempWeatherData);
                if (["france", "japan", "qatar", "tunisia"].includes(params.toLocaleLowerCase())) {
                    setDisplayImage(require(`../Images/${params.toLocaleLowerCase()}.jpg`))
                }
                else {
                    setDisplayImage(require(`../Images/mumbai.jpg`))
                }
            }
            else if (response.status === 429) {
                const tempWeatherData = {
                    temperature: 0,
                    description: "Rainy Day for Us!",
                    humidity: 0,
                    windSpeed: 0,
                    city: "Too many requests. Please try after sometime!"
                }
                setWeatherData(tempWeatherData);
            }
            else if (response.status === 404) {
                const tempWeatherData = {
                    temperature: 0,
                    description: "Try searching somthing else!",
                    humidity: 0,
                    windSpeed: 0,
                    city: "No data found for " + params.toUpperCase()
                }
                setWeatherData(tempWeatherData);
                setDisplayImage(require(`../Images/mumbai.jpg`))
            }
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        getWeatherData();
    }, []);

    const handleInputChange = (e) => {
        setSearch(e.target.value)
        if (e.target.value !== '') {
            getWeatherData(e.target.value)
        }
        else {
            getWeatherData()
        }
    }

    return (
        <>
            <Image fluid src={displayImage} style={{ position: "absolute" }} alt="City Image" />
            <div className="container" style={{ position: "relative", transform: "translateY(29%)" }}>
                <div className="row">
                    <div className="col-11" style={{ fontSize: "40px", color: "white" }}>
                        {weatherData.city}
                    </div>
                    <div className="col-3">
                        <p style={{ fontSize: "55px", color: "white", marginBottom: "0" }}>{weatherData.temperature}&deg;</p>
                        <p style={{ color: "white", marginBottom: "0" }}>{weatherData.description}</p>
                    </div>
                    <div className="col-2" style={{ borderRight: "2px solid white" }}>
                        <p style={{ color: "white", textAlign: "center" }}>HUMIDITY</p>
                        <p style={{ fontSize: "25px", color: "white", textAlign: "center" }}>{weatherData.humidity}%</p>
                    </div>
                    <div className="col-2">
                        <p style={{ color: "white", textAlign: "center" }}>WIND</p>
                        <p style={{ fontSize: "25px", color: "white", textAlign: "center" }}>{weatherData.windSpeed} KM/H</p>
                    </div>
                </div> <br /><br /><br />
                <div className="container" style={{ maxWidth: '50%' }}>
                    <div className="input-group mb-3">
                        <span className="input-group-text"><Image rounded src={searchIcon} /></span>
                        <input type="text"
                            value={search}
                            onChange={handleInputChange}
                            placeholder="Search Location"
                            className="form-control"
                            id="search" />
                        <span className="input-group-text"><Image rounded src={locationIcon} /></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <Card bg="danger" text="white" className="align-items-center d-flex justify-content-center" onClick={() => { getWeatherData("france") }} style={{ width: '10rem', height: '10rem' }}>
                            <Card.Title>FRANCE</Card.Title>
                        </Card>
                    </div>
                    <div className="col-3">
                        <Card bg="info" text="white" className="align-items-center d-flex justify-content-center" onClick={() => { getWeatherData("north africa") }} style={{ width: '10rem', height: '10rem' }}>
                            <Card.Title>NORTH AFRICA</Card.Title>
                        </Card>
                    </div>
                    <div className="col-3">
                        <Card bg="success" text="white" className="align-items-center d-flex justify-content-center" onClick={() => { getWeatherData("qatar") }} style={{ width: '10rem', height: '10rem' }}>
                            <Card.Title>QATAR</Card.Title>
                        </Card>
                    </div>
                    <div className="col-3">
                        <Card bg="warning" text="white" className="align-items-center d-flex justify-content-center" onClick={() => { getWeatherData("japan") }} style={{ width: '10rem', height: '10rem' }}>
                            <Card.Title>JAPAN</Card.Title>
                        </Card>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Home;