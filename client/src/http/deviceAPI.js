import { $authHost, $host } from ".";

export const createType = async (type) => {
    const { data } = await $authHost.post("api/type", type);
    return data;
};

export const fetchTypes = async () => {
    const { data } = await $host.get("api/type");
    return data;
};

export const createBrand = async (brand) => {
    const { data } = await $authHost.post("api/brand", brand);
    return data;
};

export const fetchBrands = async () => {
    const { data } = await $host.get("api/brand");
    return data;
};

export const createDevice = async (name, price, brand_id, type_id, info) => {
    const { data } = await $authHost.post("api/device", {
        name,
        price,
        brand_id,
        type_id,
        info,
    });
    return data;
};

export const fetchDevices = async (type_id, brand_id, page, limit) => {
    const { data } = await $host.get("api/device", { params: { type_id, brand_id, page, limit } });
    return data;
};

export const fetchOneDevice = async (id) => {
    const { data } = await $host.get("api/device/" + id);
    return data;
};

export const createPicture = async (device_id, file) => {
    var formData = new FormData();
    formData.append("file", file);

    return $authHost.post("api/device/" + device_id + "/upload-photo", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};
