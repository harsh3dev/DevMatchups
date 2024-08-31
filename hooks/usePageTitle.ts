"use client";
import { usePathname } from 'next/navigation';

function usePageTitle () {
  const pathname = usePathname();

  if (pathname.startsWith('/signup')) {
    return 'Signup | DevMatchups';
  } else if (pathname.startsWith('/login')) {
    return 'Login | DevMatchups';
  } else if(pathname.startsWith('/teams')){
    return 'Find teams | DevMatchups'
  }
  return 'Myapp'; 
};

export default usePageTitle;
