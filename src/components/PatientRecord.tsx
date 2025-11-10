import React, { useState } from 'react';
import { Patient } from '../types';
import { ReactComponent as User } from '../assets/images/user.svg';

interface Props {
  type: 'view' | 'edit' | 'add';
  patient: Patient | null;
  onClose: () => void;
  onSave: (patient: Patient) => void;
}

const PatientModal: React.FC<Props> = ({ type, patient, onClose, onSave }) => {
  const [noImage, setNoImage] = React.useState(false);
  const [formData, setFormData] = useState<Patient>({
    id: patient?.id || '',
    createdAt: patient?.createdAt || new Date().toISOString(),
    name: patient?.name || '',
    avatar: patient?.avatar || '',
    description: patient?.description || '',
    website: patient?.website || '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSave(formData);
  };

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
      <div className='opacity-0 translate-y-4 animate-slide-up max-w-sm p-6 bg-white rounded-xl shadow-md w-full relative'>
        <button
          onClick={onClose}
          className='absolute top-2 right-2 text-gray-500 hover:text-gray-800'
        >
          ✕
        </button>

        {type === 'view' ? (
          <>
            <div className='flex flex-row justify-between mb-4'>
              {noImage ? (
                <User className='w-20 h-20 rounded-full my-auto object-cover' />
              ) : (
                <img
                  src={formData.avatar}
                  alt={formData.name}
                  className='w-24 h-24 rounded-full mx-auto mb-4 object-cover'
                  onError={() => setNoImage(true)}
                />
              )}
              <h2 className='text-xl font-bold text-center mb-2 mr-4'>
                {formData.name}
              </h2>
            </div>
            <p className='text-gray-600 mb-2'>{formData.description}</p>
            {formData.website && (
              <a
                href={formData.website}
                target='_blank'
                rel='noopener noreferrer'
                className='text-blue-500 hover:underline block text-center'
              >
                {formData.website}
              </a>
            )}
          </>
        ) : (
          <>
            <h2 className='text-xl font-bold mb-4'>
              {type === 'edit' ? 'Edit' : 'Add'} Patient
            </h2>
            <label htmlFor='name' className='block mb-2 text-sm text-gray-600'>
              Name:
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Name'
              className='w-full border p-2 rounded mb-2'
              required
            />
            <label
              htmlFor='avatar'
              className='block mb-2 text-sm text-gray-600'
            >
              Avatar URL:
            </label>
            <input
              type='text'
              name='avatar'
              value={formData.avatar}
              onChange={handleChange}
              placeholder='Avatar URL'
              className='w-full border p-2 rounded mb-2'
            />
            <label
              htmlFor='description'
              className='block mb-2 text-sm text-gray-600'
            >
              Description:
            </label>
            <textarea
              name='description'
              value={formData.description}
              onChange={handleChange}
              placeholder='Description'
              className='w-full border p-2 rounded mb-2'
              required
            />
            <label
              htmlFor='website'
              className='block mb-2 text-sm text-gray-600'
            >
              Website:
            </label>
            <input
              type='text'
              name='website'
              value={formData.website}
              onChange={handleChange}
              placeholder='Website'
              className='w-full border p-2 rounded mb-4'
              required
            />
            <button onClick={handleSubmit} className='btn-primary m-auto block'>
              Save
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PatientModal;
