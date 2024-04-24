// import { useEffect, useState } from 'react';
// import { useRouter ,  usePathname, useSearchParams  } from 'next/navigation';
// import { getCookie, hasCookie } from 'cookies-next';
// import config from '@/config';

// const { sellerId } = config;

// const useRedirectIfNotLoggedIn = () => {
//     const router = useRouter();
//     const pathname = usePathname();
//     const searchParams = useSearchParams();
//     const [shouldRender, setShouldRender] = useState(false);

//     useEffect(() => {
//         const isLoggedIn = hasCookie(sellerId) && getCookie(sellerId);
//         const url = `${pathname}?${searchParams}`;
//         const isSellersPage = url.includes('/sellers');

//         if (!isLoggedIn && isSellersPage) {
//             router.push('/registration'); // Redirect to registration page
//         } else {
//             setShouldRender(true); // Set shouldRender to true if not redirected
//         }
//     }, [router , pathname, searchParams]);

//     return shouldRender;
// };

// export default useRedirectIfNotLoggedIn;
