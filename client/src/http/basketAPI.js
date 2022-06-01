import { $authHost } from ".";

export const fetchBasket = async () => {
    const { data } = await $authHost.get("api/basket");
    return data;
};

export const clearBasket = async () => {
    return $authHost.delete("api/basket");
};

export const addDevice = async (basket_id, device_id) => {
    return $authHost.post("api/basket/add", { basket_id, device_id });
};

export const removeDevice = async (basket_id, device_id) => {
    return $authHost.delete("api/basket/remove", { data: { basket_id, device_id } });
};
