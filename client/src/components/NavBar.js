import React, { useContext } from "react";
import { Context } from "..";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { SHOP_ROUTE } from "../utils/consts";
import { observer } from "mobx-react-lite";

const NavBar = observer(() => {
    const { user } = useContext(Context);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand style={{ color: "white" }} as={Link} to={SHOP_ROUTE}>
                    FlameShop
                </Navbar.Brand>
                {user.isAuth ? (
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={SHOP_ROUTE}>
                            Админ панель
                        </Nav.Link>
                        <Nav.Link as={Link} to={SHOP_ROUTE} onClick={() => user.setIsAuth(false)}>
                            Выйти
                        </Nav.Link>
                    </Nav>
                ) : (
                    <Nav className="ml-auto">
                        <Nav.Link as={Link} to={SHOP_ROUTE} onClick={() => user.setIsAuth(true)}>
                            Авторизация
                        </Nav.Link>
                    </Nav>
                )}
            </Container>
        </Navbar>
    );
});

export default NavBar;
