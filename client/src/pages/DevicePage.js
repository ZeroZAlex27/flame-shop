import React, { useContext, useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import device_icon from "../assets/default_device_icon.png";
import star from "../assets/star.png";
import { useParams } from "react-router-dom";
import { fetchOneDevice } from "../http/deviceAPI";
import { fetchBasket, addDevice, removeDevice } from "../http/basketAPI";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const DevicePage = observer(() => {
    const { device, user } = useContext(Context);
    const [deviceItem, setDeviceItem] = useState({ info: [] });
    const { id } = useParams();

    useEffect(() => {
        if (user.isAuth) {
            fetchBasket().then((data) => {
                data.devices.map((d) => {
                    if (parseInt(id) === d.id) {
                        device.setIsAddedToBasket(true);
                    }
                });
            });
        }
        fetchOneDevice(id).then((data) => setDeviceItem(data));
    }, []);

    const addToBasket = () => {
        device.setIsAddedToBasket(true);
        addDevice(device.basket, parseInt(id));
    };

    const removeFromBasket = () => {
        device.setIsAddedToBasket(false);
        removeDevice(device.basket, parseInt(id));
    };

    return (
        <Container className="mt-3">
            <Row>
                <Col md={4}>
                    <Image
                        width={300}
                        height={300}
                        src={deviceItem.picture?.picture_url ?? device_icon}
                    />
                </Col>
                <Col md={4}>
                    <Row className="d-flex flex-column align-items-center">
                        <h2>{deviceItem.name}</h2>
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
                            {deviceItem.rating}
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
                        <h3>{deviceItem.price} тг.</h3>
                        {device.isAddedToBasket === false ? (
                            <Button variant={"outline-dark"} onClick={addToBasket}>
                                Добавить в корзину
                            </Button>
                        ) : (
                            <Button variant={"outline-dark"} onClick={removeFromBasket}>
                                Убрать из корзины
                            </Button>
                        )}
                    </Card>
                </Col>
            </Row>
            <Row className="d-flex flex-column m-3">
                <h1>Характеристики</h1>
                {deviceItem.info.map((info, index) => (
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
});

export default DevicePage;
