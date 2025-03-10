import { BASE_URL, httpService } from '~/services/index.ts';

const userService = {
    // Lấy danh sách địa chỉ
    getAddresses: () => {
        return httpService.get(`${BASE_URL}/api/user/address`);
    },

    // Cập nhật địa chỉ
    updateAddress: (model:any) => {
        return httpService.put(`${BASE_URL}/api/user/address`, model);
    },

    // Xóa địa chỉ
    deleteAddress: (id: number) => {
        return httpService.delete(`${BASE_URL}/api/user/address/${id}`);
    },

    // Thêm địa chỉ mới
    addAddress: (model:any) => {
        return httpService.post(`${BASE_URL}/api/user/address`, model);
    },

    // Cập nhật thông tin cá nhân (ví dụ có sẵn)
    updateProfile: (fullName?: string, phone?: string, gender: boolean = true) => {
        const model = {
            full_name: fullName,
            gender,
            phone,
        };
        return httpService.put(`${BASE_URL}/api/user/profile`, model);
    },
    updateDefaultAddress(id: number) {
        return httpService.put(`${BASE_URL}/api/user/address/${id}/default`);
    }
};

export default userService;
