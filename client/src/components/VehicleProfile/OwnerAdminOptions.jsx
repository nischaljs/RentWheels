import React, { useState } from 'react';
import { X, Trash2, AlertTriangle, Loader2, ShieldAlert, Car } from 'lucide-react';

const OwnerAdminOptions = ({ user, vehicle }) => {
    console.log(vehicle);
    console.log(user);
    const [isApproving, setIsApproving] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [showDeleteWarning, setShowDeleteWarning] = useState(false);

    const isOwner = user?.vehicles?.includes(vehicle?.id);
    const isAdmin = user?.role === 'ADMIN';
    const canModify = isOwner || isAdmin;

    const handleApproval = async (vehicleId, isApprove) => {
        setIsApproving(true);
        try {
            await api.patch(`admin/vehicles/${vehicleId}/${isApprove ? 'approve' : 'reject'}`);
            showToast(
                isApprove ? 'success' : 'error',
                isApprove ? 'Vehicle approved successfully' : 'Vehicle rejected'
            );
        } catch (err) {
            showToast('error', 'Failed to update vehicle status');
        } finally {
            setIsApproving(false);
        }
    };

    const handleDelete = async (vehicleId) => {
        setIsDeleting(true);
        try {
            await api.delete(`vehicles/${vehicleId}`);
            showToast('success', 'Vehicle deleted successfully');
        } catch (err) {
            showToast('error', 'Failed to delete vehicle');
        } finally {
            setIsDeleting(false);
            setShowDeleteWarning(false);
        }
    };

    if (!canModify) {
        return (
            <div className="p-6 bg-gray-50 rounded-lg border border-gray-200 w-full max-w-md mx-auto">
                <div className="flex items-center space-x-3 text-gray-500">
                    <ShieldAlert className="h-6 w-6" />
                    <span className="text-lg">Not your vehicle - Actions disabled</span>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-200 w-full max-w-md mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <Car className="h-6 w-6 text-gray-600" />
                    <h3 className="text-lg font-medium text-gray-900">Vehicle Actions</h3>
                </div>
            </div>

            <div className="space-y-4">
                {isAdmin && (
                    <button
                        onClick={() => handleApproval(vehicle.id, false)}
                        disabled={isApproving}
                        className="w-full flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed text-base"
                    >
                        {isApproving ? (
                            <Loader2 className="h-6 w-6 animate-spin" />
                        ) : (
                            <>
                                <X className="h-6 w-6 mr-3" />
                                Reject Vehicle
                            </>
                        )}
                    </button>
                )}

                {!showDeleteWarning ? (
                    <button
                        onClick={() => setShowDeleteWarning(true)}
                        className="w-full flex items-center justify-center px-6 py-3 bg-gray-800 hover:bg-gray-900 text-white rounded-lg transition-colors duration-200 text-base"
                    >
                        <Trash2 className="h-6 w-6 mr-3" />
                        Delete Vehicle
                    </button>
                ) : (
                    <div className="space-y-4">
                        <div className="flex items-start space-x-3 p-4 bg-amber-50 text-amber-800 rounded-lg">
                            <AlertTriangle className="h-6 w-6 flex-shrink-0 mt-0.5" />
                            <div className="text-base">
                                <p className="font-medium mb-2">Warning: This action cannot be undone</p>
                                <p className="mb-2">Deleting this vehicle will also remove:</p>
                                <ul className="list-disc ml-5 space-y-1">
                                    <li>Booking history</li>
                                    <li>Related documents</li>
                                </ul>
                            </div>
                        </div>
                        
                        <div className="flex space-x-4">
                            <button
                                onClick={() => setShowDeleteWarning(false)}
                                className="flex-1 px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-lg transition-colors duration-200 text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => handleDelete(vehicle.id)}
                                disabled={isDeleting}
                                className="flex-1 flex items-center justify-center px-6 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200 disabled:opacity-50 text-base"
                            >
                                {isDeleting ? (
                                    <Loader2 className="h-6 w-6 animate-spin" />
                                ) : (
                                    <>
                                        <Trash2 className="h-6 w-6 mr-3" />
                                        Confirm Delete
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default OwnerAdminOptions;