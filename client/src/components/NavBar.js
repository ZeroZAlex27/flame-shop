import React, { useContext } from "react";
import { Context } from "..";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";
import { fetchBrands, fetchDevices, fetchTypes } from "../http/deviceAPI";

const NavBar = observer(() => {
    const { user, device } = useContext(Context);
    const navigate = useNavigate();

    const logOut = () => {
        user.setUser({});
        user.setIsAuth(false);
        localStorage.removeItem("token");
    };

    const returnDefault = () => {
        fetchTypes().then((data) => device.setTypes(data));
        fetchBrands().then((data) => device.setBrands(data));
        fetchDevices(null, null, 1, device.limit).then((data) => {
            device.setDevices(data.rows);
            device.setTotalCount(data.count);
        });
        device.setSelectedType({});
        device.setSelectedBrand({});
    };

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand
                    style={{ color: "white" }}
                    as={Link}
                    to={SHOP_ROUTE}
                    onClick={returnDefault}
                >
                    FlameShop
                </Navbar.Brand>
                {user.isAuth ? (
                    <Nav className="ml-auto">
                        <Nav.Link onClick={() => navigate(ADMIN_ROUTE)}>Админ панель</Nav.Link>
                        <Nav.Link
                            onClick={() => {
                                logOut();
                            }}
                        >
                            Выйти
                        </Nav.Link>
                    </Nav>
                ) : (
                    <Nav className="ml-auto">
                        <Nav.Link
                            onClick={() => {
                                navigate(LOGIN_ROUTE);
                            }}
                        >
                            Авторизация
                        </Nav.Link>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;
