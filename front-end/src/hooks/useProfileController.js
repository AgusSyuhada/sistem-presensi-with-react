import { useState, useEffect } from 'react';
import { useAuth } from './useAuth'; // Pastikan path sesuai dengan struktur Anda
import { authApi } from '../data/auth'; // Pastikan path sesuai

export const useProfileController = () => {
    const { user } = useAuth(); // Dapatkan user yang login dari AuthContext
    const [profileData, setProfileData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Fetch profil saat komponen mount atau user berubah
    useEffect(() => {
        if (user && user.pegid) {
            setIsLoading(true);
            authApi.fetchProfile(user.pegid)
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