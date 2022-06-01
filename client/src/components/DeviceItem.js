import React, { useContext } from "react";
import { Card, Col, Image } from "react-bootstrap";
import device_icon from "../assets/default_device_icon.png";
import star from "../assets/star.png";
import { useNavigate } from "react-router-dom";
import { DEVICE_ROUTE } from "../utils/consts";
import { Context } from "..";

const DeviceItem = ({ device: deviceItem }) => {
    const navigate = useNavigate();
    const { device } = useContext(Context);

    return (
        <Col
            md={3}
            className={"mt-3"}
            onClick={() => {
                navigate(DEVICE_ROUTE + "/" + deviceItem.id);
                device.setIsAddedToBasket(false);
            }}
        >
            <Card style={{ width: 150, cursor: "pointer" }} border={"light"}>
                <Image
                    width={150}
                    height={150}
                    src={deviceItem.picture?.picture_url ?? device_icon}
                />
                <div className="text-black-50 mt-1 d-flex justify-content-between align-items-center">
                    <div className="d-flex align-items-center">
                        <div>{deviceItem.rating}</div>
                        <Image width={18} height={18} src={star} />
                    </div>
                </div>
                <div>{deviceItem.name}</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
