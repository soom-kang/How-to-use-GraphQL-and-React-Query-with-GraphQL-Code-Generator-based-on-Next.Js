import type { NextPage } from 'next';

import Link from 'next/link';
import { dehydrate } from '@tanstack/react-query';
import { GraphQLClient } from 'graphql-request';
import { useAlbumQuery } from '../graphql/generated';
import { queryClient } from './_app';

const gqlClient = new GraphQLClient(process.env.NEXT_PUBLIC_GRAPHQL_URL);

export const getStaticProps = async () => {
  await queryClient.prefetchQuery(
    useAlbumQuery.getKey({ id: '2' }),
    useAlbumQuery.fetcher(gqlClient, { id: '2' })
  );

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const New: NextPage = () => {
  const { data } = useAlbumQuery(gqlClient, { id: '2' });

  const { album } = data!;

  return (
    <>
      <header style={{ textAlign: 'center' }}>
        <h1>Hello GraphQL + React Query !</h1>
        <Link href={'/'}>Back Home</Link>
      </header>
      <hr />
      <main>
        <p style={{ textAlign: 'center', color: 'grey' }}>
          {JSON.stringify(album)}
        </p>
      </main>
    </>
  );
};

export default New;
