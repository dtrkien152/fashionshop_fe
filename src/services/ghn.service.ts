import {BASE_URL, httpService} from "~/services/index.ts";

export const ghnService = {
    getProvinces: () => {
        httpService.attachTokenToHeader();
        return httpService.get(BASE_URL + '/api/ghn/provinces' );
    },

    getWards: (districtId:number) => {
        httpService.attachTokenToHeader();
        return httpService.get(BASE_URL + '/api/ghn/wards?districtId=' + districtId );
    },
    getDistricts: (provinceId:number) => {
        httpService.attachTokenToHeader();
        return httpService.get(BASE_URL + '/api/ghn/districts?provinceId=' + provinceId );
    },

}