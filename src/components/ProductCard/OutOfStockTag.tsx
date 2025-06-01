export const OutOfStockTag=()=>{
    return (
        <div
            style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: '#fff',
                padding: '8px 16px',
                borderRadius: '9999px',
                fontWeight: 600,
                fontSize: 14,
                zIndex: 2,
                pointerEvents: 'none',
            }}
        >
            Hết hàng
        </div>
    );
}