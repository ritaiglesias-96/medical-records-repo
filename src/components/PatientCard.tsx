import React from 'react';
import { Patient } from '../types';
import { ReactComponent as User } from '../assets/images/user.svg';

interface Props {
  patient: Patient;
  onView: () => void;
  onEdit: () => void;
}

const PatientCard: React.FC<Props> = ({ patient, onView, onEdit }) => {
  const [noImage, setNoImage] = React.useState(false);

  return (
    <div className='bg-white rounded-md p-4 flex flex-col justify-between h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1'>
      <div className='flex flex-row justify-between mb-4'>
        {noImage ? (
          <User className='w-20 h-20 rounded-full my-auto object-cover' />
        ) : (
          <img
            src={patient.avatar}
            alt={patient.name}
            className='w-16 h-16 rounded-full my-auto object-cover'
            onError={() => setNoImage(true)}
          />
        )}
        <h2 className='my-auto truncate'>{patient.name}</h2>
      </div>
      <p className='mb-4 truncate'>{patient.description}</p>
      <div className='flex justify-between mt-auto'>
        <button onClick={onView} className='btn-primary'>
          View
        </button>
        <button onClick={onEdit} className='btn-secondary'>
          Edit
        </button>
      </div>
    </div>
  );
};

export default PatientCard;
