## Abstract

Introducing how to apply `GraphQL` with `GraphQL Code Generator` & `React Query` on `Next.js` framework base.

`GraphQL`. 기존의 `REST API` 호출 방식을 넘어 `schema`를 이용해 마치 `DB`를 다루는 `sql`과 같이 데이터 호출을 다룰수 있는 새로운 개념.

`GQL`은 이미 개발자라면 익숙한 용어가 되버렸지만 아직도 현재 진행형이며 이번 포스팅에는 Query 솔루션인 `React Query`와 기존의 `GQL`의 pain point 중 하나인 `Type`과 `Schema` 관리, 불필요한 반복적인 코드 작성을 자동으로 해결해주는 `GraphQL Code Generator`를 이용해 `GQL`을 직관적으로 관리하는 방법을 소개하고자한다.

GQL에 대한 내용은 하기 참조
GQL 이란?: https://tech.kakao.com/2019/08/01/graphql-basic/

---

## Getting Started

<p>
  <img src="https://img.shields.io/badge/GraphQL-E10098?style=flat-square&logo=GraphQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/GraphQL Code Generator-E10098?style=flat-square&logo=GraphQL&logoColor=white"/>
  <img src="https://img.shields.io/badge/React Query-FF4154?style=flat-square&logo=React Query&logoColor=white"/>
  <img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-3178c6?style=flat-square&logo=TypeScript&logoColor=white"/>
  <img src="https://img.shields.io/badge/pnpm-F69220?style=flat-square&logo=pnpm&logoColor=white"/>
</p>

원하는 프로젝트 폴더에 `Next.Js TypeScript` 프로젝트를 생성

##### Terminal

```sh
pnpm create next-app . --typescript
```

---

`React Query`로 `GQL`를 사용하고자 필요한 패키지를 설치

> #### Note
>
> 최근 `React Query`는 패키지 명이 `TanStack Query` 큰 카테고리로 묶였는데 추후 `Sevelte Query` 등 다양한 플랫폼을 지원할 >예정이라 한다.

##### Terminal

```sh
pnpm add -S @tanstack/react-query graphql graphql-request

pnpm add -D @tanstack/react-query-devtools
```

---

환경 변수도 사용할 예정이기에 `dotenv` 패키지도 설치

##### Terminal

```sh
pnpm add -S dotenv
```

---

`.env.local` 을 생성한뒤 API URL 을 등록

`GraphQL` API 주소는 Fake GraphQL을 제공하는 `GraphQLZero`를 이용하였다.

GraphQLZero Link: https://graphqlzero.almansi.me/

##### .env.local

```env
NEXT_PUBLIC_GRAPHQL_URL=https://graphqlzero.almansi.me/api
```

env 항목이 Type Error 에 잡히지 않도록 `next-constants.d.ts` 파일을 생성하고 default type으로 변수 선언

##### next-constants.d.ts

```ts
declare namespace NodeJS {
	export interface ProcessEnv {
		NEXT_PUBLIC_GRAPHQL_URL: string;
	}
}
```

---

### Common Approach by `React Query` + `GraphQL`

`react query` 설정을 위해 `_app.tsx` 을 다음과 같이 수정

> #### Note
>
> - `SSR`이기에 `SEO`와 `UX`를 최적화 하기위해 `Hydration State`를 설정
> - `Hydration` 개념은 하기 링크 참조
>   - Link: https://blog.saeloun.com/2021/12/16/hydration.html
> - `pageProps.dehydratedState` 는 `Serverside Props` 에서 이용할 예정
> - `refetch`를 최소화해서 `UX` 최적화

```tsx
const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});
```

##### pages/\_app.tsx

```tsx
import '../styles/globals.css';

import type { AppProps } from 'next/app';

import { Hydrate, QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<QueryClientProvider client={queryClient}>
			<Hydrate state={pageProps.dehydratedState}>
				<Component {...pageProps} />;
				<ReactQueryDevtools initialIsOpen />
			</Hydrate>
		</QueryClientProvider>
	);
}

export default MyApp;
```

---

`GraphQlZero`의 `album` Resolver Query를 `react query`로 요청

`legacy.tsx` 파일을 생성하고 실제로 데이터가 들어오는 것을 확인한다.

> #### Note
>
> - `type` 이나 `schema`는 `GraphQlZero`의 Docs를 참고해서 원하는 데이터만 임의로 작성

```tsx
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
```

- `getStaticProps`를 이용해 `Server`에서 미리 캐시된 `dehydratedState`를 내려준다.

```tsx
export const getStaticProps = async () => {
	await queryClient.prefetchQuery(['album'], useAlbumFetcher);

	return {
		props: {
			dehydratedState: dehydrate(queryClient),
		},
	};
};
```

##### pages/legacy.tsx

```tsx
import type { NextPage } from 'next';

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
			</header>
			<hr />
			<main>
				<p style={{ textAlign: 'center', color: 'grey' }}>{JSON.stringify(album)}</p>
			</main>
		</>
	);
};

export default Legacy;
```

### Result - `React Query` + `GraphQL`

![gql_gen_1](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/54osajk9cafxam4y26o0.png)

> #### Note - Pain Point
>
> 여기까지가 기존의 `gql` + `react query` 방식을 통해 데이터를 받아오는 과정이다.
> 하지만 이런 방식에는 **Pain Point**가 존재한다.
>
> - `schema` 에 대응하는 `Type`을 직접 작성
> - `schema` 변경이 있다면 `Type` 역시 Docs 를 확인한 후 직접 변경 필요
> - 요청할때마다 반복적인 코드 반복 작성

---

### New Approach by `React Query` + `GraphQL` + `GraphQL Code Generator`

이런 Pain Point를 자동으로 해결해주는 것이 `GraphQL Code Generator` 다.

`GQL Code Generator` 관련 패키지를 설치

##### Terminal

```sh
# code generator core 패키지
pnpm add -D @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations

# code generator react query 관련 패키지
pnpm add -D @graphql-codegen/typescript-react-query @graphql-codegen/typescript-graphql-request

# code generator yaml loader 패키지
pnpm add -D yaml-loader
```

---

`codegen.yml` 파일을 생성한 뒤 설정값 입력

> #### Note
>
> - `schema` 는 `graphql` 폴더 안에 `[filename].graphql`로 관리하기로 한다. (ts나 다른 확장자도 가능)
> - `documents`에는 `gql schema` 파일 형식과 위치를 설정해준다.
>
> ```yml
> documents: 'graphql/**/!(*.generated).{graphql,ts}'
> ```
>
> - `schema` 는 `GQL URL` 위치. 여기서는 환경 변수로 관리 하기때문에 다음과 같이 작성
>
> ```yml
> schema: ${NEXT_PUBLIC_GRAPHQL_URL}
> ```
>
> - 중요 옵션들은 다음과 같다.
>   나머지 내용들은 하기 링크에서 확인:
>   https://www.graphql-code-generator.com/plugins/typescript/typescript-react-query
>   - `exposeFetcher`: `GetStaticProps`, `GetServerSideProps` 에 prefetch로 사용할 query fetcher 함수를 export
>   - `exposeQueryKey`: `react quey`의 `query key` 도 export
>   - `fetcher` : fetcher로 사용할 모듈. 여기서는 기존에 사용했던 `graphql-request` 사용한다.

##### codegen.yml

```yml
documents: 'graphql/**/!(*.generated).{graphql,ts}'
schema: ${NEXT_PUBLIC_GRAPHQL_URL}
require:
  - ts-node/register
generates:
  graphql/generated.ts:
    plugins:
      - typescript
      - typescript-operations
      - typescript-react-query
    config:
      interfacePrefix: 'I'
      typesPrefix: 'I'
      skipTypename: true
      declarationKind: 'interface'
      noNamespaces: true
      pureMagicComment: true
      exposeQueryKeys: true
      exposeFetcher: true
      withHooks: true
      fetcher: graphql-request
```

---

`pakage.json` 에 `graphql-codegen` script추가

##### package.json

```json
{
	...
	"scripts": {
		...
		"generate:gql": "graphql-codegen --require dotenv/config --config codegen.yml dotenv_config_path=.env.local"
	},
	...
}

```

---

`graphql` 폴더를 생성한뒤 요청할 `schema` 파일을 작성
여기서는 `album` 관련 schema를 `album.graphql`에 작성

##### graphql/album.graphql

```graphql
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
```

---

여기까지 진행했다면 모든 준비를 완료한 상태
현재 파일 구조는 다음과 같다.

##### structure

```
.
├── graphql/
│   └── album.graphql
├── pages/
│   ├── _app.tsx
│   ├── index.tsx
│   └── legacy.tsx
├── ...
├── codegen.yml
├── next-constants.d.ts
├── package.json
└── ...
```

이제 `GraphQL Generator`를 사용해 `Type`, `Method` 를 자동 생성이 가능

script를 실행하면 `graphql` 폴더 안에 `generated.ts`가 생성

이 파일안에는 `schema`에 대응하는 `Query Function`, `Type` 들이 자동으로 생성되어 있는 것을 확인할 수 있다. (파일 내용은 생략)

##### Terminal

```sh
pnpm generate:gql

✔ Parse Configuration
✔ Generate outputs
```

---

자동생성된 `Query Method`와 `Type`을 통해 보다 쉽게 `album`의 데이터들을 호출해보자

`pages`폴더안에 `new.tsx` 파일을 다음과 같이 작성

`legacy.tsx`와 정확히 동일한 기능을 하는 페이지이다.

> #### Note
>
> - `useQuery` 관련 코드가 자동 생성된 `useAlbumQuery` 한줄로 대체

```tsx
const { data } = useAlbumQuery(gqlClient, { id: '3' });
```

- `prefetchQuery` 에서 `key`, `fetcher` 코드를 직접 작성할 필요없이 `useAlbumQuery.getKey()`, `useAlbumQuery.fetcher()` 로 대체

```tsx
await queryClient.prefetchQuery(
	useAlbumQuery.getKey({ id: '3' }),
	useAlbumQuery.fetcher(gqlClient, { id: '3' })
);
```

- `Type`은 자동 선언되어 연결되어있기 때문에 따로 작성 필요 불가
- 이후 `server spec` 변경으로 인한 `schema` 변경시 `code generate` 명령 한줄로 반복적인 `type` 매칭, 재작성 과정을 생략할 수 있다.

##### pages/new.tsx

```tsx
import type { NextPage } from 'next';

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
			</header>
			<hr />
			<main>
				<p style={{ textAlign: 'center', color: 'grey' }}>{JSON.stringify(album)}</p>
			</main>
		</>
	);
};

export default New;
```

---

## Result

### 👉 [CodeSandBox Sample Link](https://codesandbox.io/p/github/soom-kang/How-to-use-GraphQL-and-React-Query-with-GraphQL-Code-Generator-based-on-Next.Js/main?workspaceId=99d1ebdb-6029-4fa4-945c-b71e7dfc3e5d&file=%2FREADME.md&workspace=%257B%2522activeFileId%2522%253A%2522clego8pow000ng8g20aungbyw%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522spaces%2522%253A%257B%2522clego8u4l00153b6l772jaxcf%2522%253A%257B%2522key%2522%253A%2522clego8u4l00153b6l772jaxcf%2522%252C%2522name%2522%253A%2522Default%2522%252C%2522devtools%2522%253A%255B%257B%2522type%2522%253A%2522PREVIEW%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A3000%252C%2522key%2522%253A%2522clego96nj007p3b6lm2fzr49o%2522%252C%2522isMinimized%2522%253Afalse%252C%2522path%2522%253A%2522%252Flegacy%2522%257D%252C%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522key%2522%253A%2522clego95hw00583b6lzjxv3uru%2522%252C%2522isMinimized%2522%253Afalse%257D%255D%257D%257D%252C%2522currentSpace%2522%253A%2522clego8u4l00153b6l772jaxcf%2522%252C%2522spacesOrder%2522%253A%255B%2522clego8u4l00153b6l772jaxcf%2522%255D%252C%2522hideCodeEditor%2522%253Afalse%257D)

![gql_gen_2](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0puk8hh2ap7s3l53k044.png)

---

## Conclusion

본 포스팅에서는 `GraphQL Code Generator` 를 통해 Server Spec 변경할때마다 `schema` 변경뿐만 아니라 `type` 까지 재작성을 해야하는 `GQL`의 Pain Point 를 해결하는 방법을 소개하였다. 추가적으로 `SSR`을 통해 데이터 관련하여 `hydration`하는 technique도 같이 소개하였다.

현재까지도 주류는 `REST API` 이다. 하지만 큰 변화가 없는 `REST API`와 달리 `GQL`에서는 여러가지 기능이 꾸준히 소개되고 발전하고 있다. 특히 Backend 와 Frontend 사이의 Communication Gap 을 줄여주는 방향으로 `GQL`은 꾸준히 발전하고 있으며 이는 실무의 인적 비용과도 직접적으로 연결되는 방향이다.

이는 개발자라면 `GQL`에 관해 앞으로도 꾸준히 관심을 가질만한 충분한 이유가 될것이다.

`GQL Code Generator` 에 대해 자세한 내용 하기 링크에서 확인할 수 있다.
Link: https://www.graphql-code-generator.com/
