import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <>
      <header style={{ textAlign: 'center' }}>
        <h1>Hello GraphQL + React Query !</h1>
      </header>
      <hr />
      <main>
        <ul>
          <li>
            <Link href={'/legacy'}>Legacy React Query + GQL Sample</Link>
          </li>
          <li>
            <Link href={'/new'}>
              New React Query + GQL + GQL Generator Sample
            </Link>
          </li>
        </ul>
      </main>
    </>
  );
};

export default Home;
