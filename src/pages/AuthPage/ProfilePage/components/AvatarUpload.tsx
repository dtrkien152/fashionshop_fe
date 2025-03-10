// src/components/AvatarUpload.tsx
import React, { useState, useEffect } from 'react';
import { Button, Upload, Avatar, message } from 'antd';
import { UploadOutlined, UserOutlined } from '@ant-design/icons';
import type { RcFile, UploadChangeParam } from 'antd/es/upload';
import { AvatarUploadWrapper } from '~/pages/AuthPage/ProfilePage/components/style.ts';

interface AvatarUploadProps {
    avatarUrl?: string | null;
    onAvatarChange: (url: string | null) => void;
}

const AvatarUpload: React.FC<AvatarUploadProps> = ({ avatarUrl, onAvatarChange }) => {
    const [currentAvatarUrl, setCurrentAvatarUrl] = useState<string | null>(avatarUrl || null);

    useEffect(() => {
        setCurrentAvatarUrl(avatarUrl || null);
    }, [avatarUrl]);

    const handleAvatarChange = (info: UploadChangeParam) => {
        if (info.file.status === 'done') {
            const newAvatarUrl = URL.createObjectURL(info.file.originFileObj as RcFile);
            setCurrentAvatarUrl(newAvatarUrl);
            onAvatarChange(newAvatarUrl);
            message.success('Cập nhật avatar thành công!');
        }
    };

    const beforeUpload = (file: RcFile) => {
        const isImage = file.type.startsWith('image/');
        if (!isImage) {
            message.error('Bạn chỉ có thể tải lên file hình ảnh!');
        }
        return isImage;
    };

    return (
        <AvatarUploadWrapper>
            <Avatar size={100} src={currentAvatarUrl} icon={<UserOutlined />} />
            <Upload
                showUploadList={false}
                beforeUpload={beforeUpload}
                onChange={handleAvatarChange}
            >
                <Button icon={<UploadOutlined />} style={{ marginTop: 10 }}>
                    Thay đổi Avatar
                </Button>
            </Upload>
        </AvatarUploadWrapper>
    );
};

export default AvatarUpload;
