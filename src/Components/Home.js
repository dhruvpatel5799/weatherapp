import { useEffect, useState } from "react";
import locationIcon from "../Images/location.png";
import searchIcon from "../Images/search.png";
import Image from "react-bootstrap/Image";
import Card from 'react-bootstrap/Card'
import { Col, Container, Row } from "react-bootstrap";
import { Input } from "antd";

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
                    description: "Couldn't find anything!",
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
            <div className="container" style={{ position: "relative", maxInlineSize: "fit-content", paddingLeft: "0", paddingRight: "0" }}>
                <Image fluid src={displayImage} style={{ height: "372px" }} alt="City Image" />
                <Container fluid className="align-items-center d-flex" style={{ position: "absolute", top: "25%" }}>
                    <Container>
                        <Row>
                            <Col md={11} >
                                <p className="text-sm-center text-md-start" style={{ fontSize: "40px", color: "white", marginBottom: "10px" }}>{weatherData.city}</p>
                            </Col>
                            <Col lg={2}>
                                <p style={{ fontSize: "55px", color: "white", marginBottom: "0" }}>{weatherData.temperature}&deg;</p>
                                <p style={{ color: "white", marginBottom: "0" }}>{weatherData.description}</p>
                            </Col>
                            <Col md={2} xs={6} sm={6} style={{ borderRight: "2px solid white" }}>
                                <p style={{ color: "white", textAlign: "center" }}>HUMIDITY</p>
                                <p style={{ fontSize: "25px", color: "white", textAlign: "center" }}>{weatherData.humidity}%</p>
                            </Col>
                            <Col md={2} xs={6} sm={6}>
                                <p style={{ color: "white", textAlign: "center" }}>WIND</p>
                                <p style={{ fontSize: "25px", color: "white", textAlign: "center" }}>{weatherData.windSpeed} KM/H</p>
                            </Col>
                        </Row> <br />
                    </Container>
                </Container>
            </div>
            <Container>
                <Container fluid className="d-flex justify-content-center">
                    <Input placeholder="Search Location"
                        size="large"
                        type="text"
                        value={search}
                        onChange={handleInputChange}
                        className="form-control"
                        id="search"
                        prefix={<Image src={searchIcon} />}
                        suffix={<Image src={locationIcon} />}
                        style={{ borderRadius: "25px", maxWidth: "60%", marginTop: "20px", marginBottom: "10px" }} />
                </Container>
                <Container fluid>
                    <Row>
                        <Col className="align-items-center d-flex justify-content-center" style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <Card bg="danger" text="white" className="align-items-center d-flex justify-content-center" onClick={() => { getWeatherData("france") }} style={{ width: '15rem', height: '15rem', borderRadius: '15%' }}>
                                <Card.Title>FRANCE</Card.Title>
                            </Card>
                        </Col>
                        <Col className="align-items-center d-flex justify-content-center" style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <Card bg="info" text="white" className="align-items-center d-flex justify-content-center" onClick={() => { getWeatherData("north africa") }} style={{ width: '15rem', height: '15rem', borderRadius: '15%' }}>
                                <Card.Title>NORTH AFRICA</Card.Title>
                            </Card>
                        </Col>
                        <Col className="align-items-center d-flex justify-content-center" style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <Card bg="success" text="white" className="align-items-center d-flex justify-content-center" onClick={() => { getWeatherData("qatar") }} style={{ width: '15rem', height: '15rem', borderRadius: '15%' }}>
                                <Card.Title>QATAR</Card.Title>
                            </Card>
                        </Col>
                        <Col className="align-items-center d-flex justify-content-center" style={{ marginTop: "10px", marginBottom: "10px" }}>
                            <Card bg="warning" text="white" className="align-items-center d-flex justify-content-center" onClick={() => { getWeatherData("japan") }} style={{ width: '15rem', height: '15rem', borderRadius: '15%' }}>
                                <Card.Title>JAPAN</Card.Title>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </Container>

        </>
    )
}
export default Home;