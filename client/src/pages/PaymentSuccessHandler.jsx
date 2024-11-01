import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import api from '../services/api';

const PaymentSuccessHandler = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verifyAndRedirect = async () => {
            const pidx = searchParams.get('pidx');
            const transaction_id = searchParams.get('transaction_id');
            const amount = searchParams.get('amount');
            const status = searchParams.get('status');
            const purchase_order_id = searchParams.get('purchase_order_id');


            

            if (status !== 'Completed') {
                navigate('/booking/failed', { replace: true });
                return;
            }

            try {
                const response = await api.post('/payments/verify-payment', {
                    pidx,
                    transaction_id,
                    amount,
                    status,
                    purchase_order_id,
                });
                

                if (response.data.success) {

                    // Redirect to success page with verified status
                    navigate(`/payment/verified?bookingId=${response.data.data.bookingId}`, { replace: true });
                } else {
                    navigate('/booking/failed', { replace: true });
                }
            } catch (error) {
                console.error('Payment verification failed:', error);
                navigate('/booking/failed', { replace: true });
            }
        };

        verifyAndRedirect();
    }, [searchParams, navigate]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto mb-4"></div>
                <p className="text-gray-600">Verifying your payment...</p>
            </div>
        </div>
    );
};

export default PaymentSuccessHandler;
