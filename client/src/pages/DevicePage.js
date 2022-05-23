import React from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import star from "../assets/star.png";

const DevicePage = () => {
    const device = {
        id: 1,
        name: "Iphone 12 Pro",
        price: 25000,
        rating: 5,
        img: "https://object.pscloud.io/cms/cms/Photo/img_0_77_3172_2_1.jpg",
    };
    const description = [
        { id: 1, title: "Оперативная память", description: "5 ГБ" },
        { id: 2, title: "Камера", description: "12 МП" },
        { id: 3, title: "Процессор", description: "Pentium 3" },
        { id: 4, title: "Количество ядер", description: "2" },
        { id: 5, title: "Аккумулятор", description: "4000" },
    ];

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image width={300} height={300} src={device.img} />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{device.name}</h2>
                        <div
                            className="d-flex align-items-center justify-content-center"
                            style={{
                                background: `url(${star}) no-repeat center center`,
                                width: 240,
                                height: 240,
                                backgroundSize: "cover",
                                fontSize: 64,
                            }}
                        >
                            {device.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card
                        className="d-flex flex-column align-items-center justify-content-around"
                        style={{
                            width: 300,
                            height: 300,
                            fontSize: 32,
                            border: "5px solid lightgray",
                        }}
                    >
                        <h3>От:{device.price} тг.</h3>
                        <Button variant={"outline-dark"}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {description.map((info, index) => (
                    <Row
                        key={info.id}
                        style={{
                            background: index % 2 === 0 ? "lightgray" : "transparent",
                            padding: 10,
                        }}
                    >
                        {info.title}: {info.description}
                    </Row>
                ))}
            </Row>
        </Container>
    );
};

export default DevicePage;
