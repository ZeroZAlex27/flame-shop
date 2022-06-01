import { observer } from "mobx-react-lite";
import React, { useState, useEffect, useContext } from "react";
import { Button, Card, Col, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { fetchBasket, removeDevice } from "../http/basketAPI";
import device_icon from "../assets/default_device_icon.png";
import star from "../assets/star.png";
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from "..";

const Basket = observer(() => {
    const [basketList, setBasketList] = useState([]);
    const { device } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        fetchBasket().then((data) => {
            setBasketList(data.devices);
        });
    }, []);

    const removeFromBasket = (deviceItemId) => {
        device.setIsAddedToBasket(false);
        removeDevice(device.basket, deviceItemId);
        setTimeout(() => {
            window.location.reload(false);
        }, 1000);
    };

    return (
        <Col className="d-flex flex-column ms-5">
            {basketList.map((deviceItem) => (
                <Card className="m-3">
                    <Row md={3} className={"mt-3"}>
                        <Col md={4}>
                            <Image
                                width={300}
                                height={300}
                                style={{ cursor: "pointer" }}
                                src={deviceItem.picture?.picture_url ?? device_icon}
                                onClick={() => {
                                    navigate(DEVICE_ROUTE + "/" + deviceItem.id);
                                    device.setIsAddedToBasket(false);
                                }}
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
                                <Button
                                    variant={"outline-dark"}
                                    onClick={() => {
                                        removeFromBasket(deviceItem.id);
                                    }}
                                >
                                    Убрать из корзины
                                </Button>
                            </Card>
                        </Col>
                    </Row>
                </Card>
            ))}
        </Col>
    );
});

export default Basket;
