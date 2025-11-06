import { useState, useEffect } from 'react';
import { useAuth } from './useAuth'; // Pastikan path sesuai dengan struktur Anda
import { authApi } from '../data/authApi';

export const useProfileController = () => {
    const { user } = useAuth(); // Dapatkan user yang login dari AuthContext
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    useEffect(() => {
        if (user && user.id) {
            setIsLoading(true);
            authApi.fetchProfile(user.id) 
                .then(data => {
                    setProfileData(data);
                })
                .catch(err => {
                    setError(err.message || "Gagal memuat data profil");
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } else {
            setError("Tidak ada pengguna yang login");
            setIsLoading(false);
        }
    }, [user]);

    // Kembalikan state dan fungsi yang dibutuhkan oleh View
    return {
        profileData,
        isLoading,
        error,
        sidebarOpen,
        setSidebarOpen,
    };
};