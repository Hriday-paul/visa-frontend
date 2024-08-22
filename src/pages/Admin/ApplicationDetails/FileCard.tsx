import { BsEye } from "react-icons/bs";
import { CiFileOn } from "react-icons/ci";
import React, { useState } from 'react';
import {
    DownloadOutlined,
    RotateLeftOutlined,
    RotateRightOutlined,
    SwapOutlined,
    ZoomInOutlined,
    ZoomOutOutlined,
} from '@ant-design/icons';
import { Image, Space } from 'antd';

const FileCard = React.memo(({ name, url }: { name: string, url: string }) => {
    const [visible, setVisible] = useState<boolean>(false);

    const onDownload = (imgUrl: string) => {
        fetch(imgUrl, {
            method: 'GET',
        })
            .then((response) => response.blob())
            .then((blob) => {
                // Create blob link to download
                const url = window.URL.createObjectURL(
                    new Blob([blob]),
                );
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute(
                    'download',
                    `filename.jpg`,
                );

                // Append to html link element page
                document.body.appendChild(link);

                // Start download
                link.click();

                // Clean up and remove the link
                link.parentNode?.removeChild(link);
            });

        // const link = document.createElement('a');
        // link.href = imgUrl;
        // link.setAttribute('download', 'filename.jpg');
        // document.body.appendChild(link);
        // link.click();
        // document.body.removeChild(link);

    };

    return (
        <div className="w-28 h-28">
            <div className="bg-slate-50 dark:bg-boxdark border border-stroke dark:border-strokedark h-28 w-28 p-4 shadow-2 rounded-sm flex flex-col justify-center items-center group relative cursor-pointer">
                <CiFileOn className="text-4xl text-success" />
                <p className="text-sm text-center my-1.5 text-graydark dark:text-slate-200">{name}</p>
                <div onClick={() => setVisible(true)} className="absolute top-0 left-0 w-full h-full group-hover:flex justify-center items-center hidden bg-slate-50 dark:bg-boxdark duration-200 flex-col">
                    <BsEye className="text-xl text-graydark dark:text-slate-200 group-hover:translate-y-0 duration-200" />
                    <p className="text-center">preview</p>
                </div>
            </div>
            <Image
                width={200}
                style={{ display: 'none' }}
                src={url}
                preview={{
                    visible,
                    src: url,
                    onVisibleChange: (value) => {
                        setVisible(value);
                    },
                    toolbarRender: (
                        _,
                        {
                            image: { url },
                            transform: { scale },
                            actions: { onFlipY, onFlipX, onRotateLeft, onRotateRight, onZoomOut, onZoomIn },
                        },
                    ) => (
                        <Space size={20} className="toolbar-wrapper">
                            <DownloadOutlined size={50} onClick={() => onDownload(url)} />
                            <SwapOutlined rotate={90} onClick={onFlipY} />
                            <SwapOutlined onClick={onFlipX} />
                            <RotateLeftOutlined onClick={onRotateLeft} />
                            <RotateRightOutlined onClick={onRotateRight} />
                            <ZoomOutOutlined disabled={scale === 1} onClick={onZoomOut} />
                            <ZoomInOutlined disabled={scale === 50} onClick={onZoomIn} />
                        </Space>
                    ),
                }}
            />
        </div>
    )
})

export default FileCard
