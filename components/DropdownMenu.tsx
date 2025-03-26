'use client';
import { useState } from 'react';
import Link from 'next/link';
import { FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const DropdownMenu = ({
  item,
  isMobile = false,
}: {
  item: any;
  isMobile?: boolean;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <li
      className={`relative ${isMobile ? 'block' : 'group'}`}
      onMouseEnter={() => !isMobile && setOpen(true)}
      onMouseLeave={() => !isMobile && setOpen(false)}
    >
      {/* Parent Item */}
      <button
        className="flex items-center justify-between gap-2 hover:text-yellow-400 transition w-full"
        onClick={() => isMobile && setOpen(!open)}
      >
        {item.title} {item.submenu && <FaChevronDown size={12} />}
      </button>

      {/* Dropdown Menu (Only exists if there is a submenu) */}
      {item.submenu && open && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
          className={`absolute left-0 mt-2 w-56 bg-white text-black shadow-lg rounded-md py-2 z-50 ${
            isMobile ? 'static' : 'group-hover:block hidden'
          }`}
        >
          {/* Use a <div> or <ul> here instead of <li> */}
          <div className="flex flex-col">
            {item.submenu.map((sub: any, idx: number) => (
              <div key={idx} className="px-4 py-2 hover:bg-gray-200">
                {sub.link ? (
                  <Link href={sub.link} onClick={() => setOpen(false)}>
                    {sub.title}
                  </Link>
                ) : (
                  <DropdownMenu item={sub} isMobile={isMobile} />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </li>
  );
};

export default DropdownMenu;
