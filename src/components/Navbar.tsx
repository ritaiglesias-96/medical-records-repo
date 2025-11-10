import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className='bg-white shadow-md sticky top-0 z-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16 items-center'>
          <Link to='/' className='text-xl font-bold text-blue-600'>
            Medical Records
          </Link>
          <div className='hidden md:flex space-x-6'>
            <Link
              to='/'
              className='text-gray-700 hover:text-blue-600 transition-colors'
            >
              Home
            </Link>
            <Link
              to='/records'
              className='text-gray-700 hover:text-blue-600 transition-colors'
            >
              Patients
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
