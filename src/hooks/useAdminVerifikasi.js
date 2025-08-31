// src/hooks/useAdminVerifikasi.js
import { useEffect, useState } from 'react';
import * as authService from '../services/authService';

/**
 * Custom hook untuk mengelola verifikasi pengguna di halaman admin.
 * - Ambil data pengguna yang perlu diverifikasi
 * - Handle approve/reject verifikasi
 * - Manage modal dan state
 */
const useAdminVerifikasi = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Ambil data dari backend
  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await authService.indexVerifikasiPengguna();
      console.log('📌 Response:', res);
      setUsers(res.data || []);
    } catch (err) {
      console.error('❌ Gagal ambil verifikasi:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ✅ Handle view detail user
  const handleViewDetail = (user) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  // ✅ Handle close modal
  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowModal(false);
  };

  // ✅ Handle approve user
  const handleApprove = async (user) => {
    try {
      // TODO: Implement approve API call
      console.log('Approve user:', user);

      // Update local state
      setUsers(
        users.map((u) =>
          u.id_akun === user.id_akun ? { ...u, status_dokumen: 'approved' } : u
        )
      );

      handleCloseModal();
    } catch (err) {
      console.error('❌ Gagal approve user:', err);
    }
  };

  // ✅ Handle reject user
  const handleReject = async (user) => {
    try {
      // TODO: Implement reject API call
      console.log('Reject user:', user);

      // Update local state
      setUsers(
        users.map((u) =>
          u.id_akun === user.id_akun ? { ...u, status_dokumen: 'rejected' } : u
        )
      );

      handleCloseModal();
    } catch (err) {
      console.error('❌ Gagal reject user:', err);
    }
  };

  // ✅ Handle delete user
  const handleDelete = async (userId) => {
    try {
      // TODO: Implement delete API call
      console.log('Delete user:', userId);

      // Update local state
      setUsers(users.filter((u) => u.id_akun !== userId));
    } catch (err) {
      console.error('❌ Gagal delete user:', err);
    }
  };

  return {
    users,
    loading,
    selectedUser,
    showModal,
    handleViewDetail,
    handleCloseModal,
    handleApprove,
    handleReject,
    handleDelete,
    refetch: fetchData,
  };
};

export default useAdminVerifikasi;
