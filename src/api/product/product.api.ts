import api from "~/config/axiosConfig.ts";
import {SORT_BY_ENUM} from "~/shared/model/common.model.ts";

export const getProductArrival = async () => {
    const model={
        keyword:null,
        categoryId:null,
        sortBy:SORT_BY_ENUM.NEWEST,
        limit: 10,
        page:0
    }
    return await api.post('/api/products/search',model)
}
