import React, { useEffect, useCallback, useState, useRef } from 'react';
import { fetchPatients } from '../api/records';
import { Patient } from '../types';
import PatientCard from '../components/PatientCard';
import PatientRecord from '../components/PatientRecord';
import toast, { Toaster } from 'react-hot-toast';

const MedicalRecords: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [modalType, setModalType] = useState<'view' | 'edit' | 'add' | null>(
    null
  );
  const [allPatients, setAllPatients] = useState<Patient[]>([]);
  const [visiblePatients, setVisiblePatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(false);
  const [moreAvailable, setMoreAvailable] = useState(true);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const limit = 6;

  const fetchAllPatients = useCallback(async () => {
    setLoading(true);
    try {
      const data: Patient[] = await fetchPatients();
      setAllPatients(data);
      setPatients(data);
      setVisiblePatients(data.slice(0, limit));
      if (data.length <= limit) setMoreAvailable(false);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAllPatients();
  }, [fetchAllPatients]);

  const loadMore = useCallback(() => {
    if (!moreAvailable || loading) return;
    setLoading(true);

    setTimeout(() => {
      setVisiblePatients((prev) => {
        const next = allPatients.slice(prev.length, prev.length + limit);
        if (next.length === 0) setMoreAvailable(false);
        return [...prev, ...next];
      });
      setLoading(false);
    }, 300);
  }, [allPatients, loading, moreAvailable]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && moreAvailable && !loading) {
          loadMore();
        }
      },
      {
        root: null,
        rootMargin: '200px',
        threshold: 1.0,
      }
    );

    const currentSentinel = sentinelRef.current;
    if (currentSentinel) observer.observe(currentSentinel);

    return () => {
      if (currentSentinel) observer.unobserve(currentSentinel);
    };
  }, [loadMore, moreAvailable, loading]);

  const handleOpenModal = (
    type: 'view' | 'edit' | 'add',
    patient?: Patient
  ) => {
    setModalType(type);
    setSelectedPatient(patient || null);
  };

  const handleSavePatient = (patient: Patient) => {
    if (modalType === 'edit') {
      setPatients((prev) =>
        prev.map((p) => (p.id === patient.id ? patient : p))
      );
      toast.success('Patient record updated successfully!');
    } else if (modalType === 'add') {
      if (!patient.name || !patient.description || !patient.website) {
        toast.error('Please fill in all required fields.');
        return;
      }
      setPatients((prev) => [
        ...prev,
        { ...patient, id: String(prev.length + 1) },
      ]);
      toast.success('New patient added successfully!');
    }
    setModalType(null);
  };

  return (
    <div className='bg-gray-100 min-h-screen p-6 relative'>
      <Toaster position='top-right' reverseOrder={false} />

      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-bold text-gray-800'>Medical Records</h1>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
        {patients.map((patient) => (
          <PatientCard
            key={patient.id}
            patient={patient}
            onView={() => handleOpenModal('view', patient)}
            onEdit={() => handleOpenModal('edit', patient)}
          />
        ))}
      </div>

      <div ref={sentinelRef} className='h-4' />

      <button
        onClick={() => handleOpenModal('add')}
        className='fixed bottom-6 right-6 bg-Amethyst hover:bg-blue-700 text-white p-6 rounded-full shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none'
        title='Add New Patient'
      >
        <span className='text-3xl px-6'>+</span>
      </button>

      {modalType && (
        <PatientRecord
          type={modalType}
          patient={selectedPatient}
          onClose={() => setModalType(null)}
          onSave={handleSavePatient}
        />
      )}
    </div>
  );
};

export default MedicalRecords;
