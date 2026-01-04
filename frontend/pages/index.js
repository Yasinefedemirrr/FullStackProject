import { useEffect } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    // Ana sayfadan login'e yönlendir
    router.push('/login');
  }, []);

  return null;
}

