const Navbar: React.FC = () => {
  return (
    <nav className='bg-white shadow-md fixed w-full z-20 top-0 left-0'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between h-16'>
          <div className='flex-shrink-0 flex items-center'>
            <h1 className='text-3xl font-bold'>Medical Records</h1>
          </div>
          {/* This is as an example, as if it were a real system */}
          <div className='hidden md:flex items-center space-x-6'>
            <a
              href='/'
              className='btn-secondary transition-colors duration-200'
            >
              Home
            </a>
            <a
              href='records'
              className='btn-secondary transition-colors duration-200'
            >
              Records
            </a>
            <a
              href='#services'
              className='btn-secondary transition-colors duration-200'
            >
              Services
            </a>
            <a
              href='#contact'
              className='btn-secondary transition-colors duration-200'
            >
              Contact
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
