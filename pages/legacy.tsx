import type { NextPage } from 'next';

import Link from 'next/link';
import { useQuery, dehydrate } from '@tanstack/react-query';
import { request, gql } from 'graphql-request';
import { queryClient } from './_app';

interface AlbumQuery {
  album: {
    id: string;
    title: string;
    user: {
      id: string;
      name: string;
      username: string;
      email: string;
      company: {
        name: string;
        bs: string;
      };
    };
    photos: {
      data: {
        id: string;
        title: string;
        url: string;
      };
    };
  };
}

const albumQueryDocument = gql`
	query album($id: ID!) {
		album(id: $id) {
			id
			title
			user {
				id
				name
				username
				email
				company {
					name
					bs
				}
			}
			photos {
				data {
					id
					title
					url
				}
			}
		}
	}
`;

const useAlbumFetcher = async () =>
  await request<AlbumQuery, { id: string }>(
    process.env.NEXT_PUBLIC_GRAPHQL_URL,
    albumQueryDocument,
    {
      id: '2',
    }
  );

export const getStaticProps = async () => {
  await queryClient.prefetchQuery(['album'], useAlbumFetcher);

  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
};

const Legacy: NextPage = () => {
  const { data } = useQuery<AlbumQuery>(['album'], useAlbumFetcher);
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

export default Legacy;
