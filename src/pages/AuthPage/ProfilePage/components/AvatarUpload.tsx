import React, {useEffect, useState} from "react";
import {Avatar, Button, Upload} from "antd";
import {CloseOutlined, SaveOutlined, UploadOutlined, UserOutlined} from "@ant-design/icons";
import type {RcFile, UploadChangeParam} from "antd/es/upload";
import {useDispatch} from "react-redux";
import {AvatarUploadWrapper} from "~/pages/AuthPage/ProfilePage/components/style.ts";
import {updateAvatar} from "~/redux";
import toast from "react-hot-toast";
import axios from "axios";
import userService from "~/services/user.service.ts";

interface AvatarUploadProps {
    avatarUrl?: string | null;
    onAvatarChange: (url: string | null) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({  avatarUrl, onAvatarChange }) => {
    const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(avatarUrl || null);
    const [previewFile, setPreviewFile] = useState<RcFile | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setCurrentAvatarUrl(avatarUrl || null);
    }, [avatarUrl]);

    const handleAvatarChange = (info: UploadChangeParam) => {
        const file = info.file.originFileObj as RcFile;

        if (file) {
            setPreviewFile(file);
        }
    };

    const beforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith("image/");
        const isLt2M = file.size / 1024 / 1024 < 2; // Giới hạn 2MB

        if (!isImage) {
            toast.error("Bạn chỉ có thể tải lên file hình ảnh!");
            return false;
        }
        if (!isLt2M) {
            toast.error("Ảnh phải có dung lượng nhỏ hơn 2MB!");
            return false;
        }
        return true; // Trả về `true` để cho phép upload
    };

    const handleSave = async () => {
        if (!previewFile) return;

        const formData = new FormData();
        formData.append("file", previewFile);

        try {
            const response = await userService.uploadAvatar(formData);

            if (response.data) {
                setCurrentAvatarUrl(response.data);
                setPreviewFile(null);
                onAvatarChange(response.data);
                dispatch(updateAvatar(response.data));
                toast.success("Avatar đã được cập nhật!");
            }
        } catch (error) {
            toast.error("Lưu avatar thất bại!");
        }
    };

    const handleCancel = () => {
        setPreviewFile(null);
    };

    return (
        <AvatarUploadWrapper>
            <Avatar
                size={100}
                src={previewFile ? URL.createObjectURL(previewFile) : currentAvatarUrl}
                icon={<UserOutlined />}
            />
            <Upload showUploadList={false} beforeUpload={beforeUpload} onChange={handleAvatarChange}>
                <Button icon={<UploadOutlined />} style={{ marginTop: 10 }}>
                    Thay đổi Avatar
                </Button>
            </Upload>

            {previewFile && (
                <div style={{ marginTop: 10 }}>
                    <Button type="primary" icon={<SaveOutlined />} onClick={handleSave} style={{ marginRight: 8 }}>
                        Lưu
                    </Button>
                    <Button icon={<CloseOutlined />} onClick={handleCancel}>
                        Hủy bỏ
                    </Button>
                </div>
            )}
        </AvatarUploadWrapper>
    );
};

export default AvatarUpload;
