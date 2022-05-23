import React, { useContext } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";
import { Card } from "react-bootstrap";

const BrandBar = observer(() => {
    const { device } = useContext(Context);

    return (
        <div className="d-flex">
            {device.brands.map((brand) => (
                <Card
                    style={{ cursor: "pointer" }}
                    key={brand.id}
                    className="p-2 m-1"
                    onClick={() => device.setSelectedBrand(brand)}
                    border={brand.id === device.selectedBrand.id ? "danger" : "light"}
                >
                    {brand.name}
                </Card>
            ))}
        </div>
    );
});

export default BrandBar;