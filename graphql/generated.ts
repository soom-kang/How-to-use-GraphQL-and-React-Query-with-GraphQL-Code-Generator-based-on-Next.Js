import { GraphQLClient } from 'graphql-request';
import { RequestInit } from 'graphql-request/dist/types.dom';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };

function fetcher<TData, TVariables>(client: GraphQLClient, query: string, variables?: TVariables, headers?: RequestInit['headers']) {
  return async (): Promise<TData> => client.request<TData, TVariables>(query, variables, headers);
}
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: any;
}

export interface IAddress {
  city?: Maybe<Scalars['String']>;
  geo?: Maybe<IGeo>;
  street?: Maybe<Scalars['String']>;
  suite?: Maybe<Scalars['String']>;
  zipcode?: Maybe<Scalars['String']>;
}

export interface IAddressInput {
  city?: InputMaybe<Scalars['String']>;
  geo?: InputMaybe<IGeoInput>;
  street?: InputMaybe<Scalars['String']>;
  suite?: InputMaybe<Scalars['String']>;
  zipcode?: InputMaybe<Scalars['String']>;
}

export interface IAlbum {
  id?: Maybe<Scalars['ID']>;
  photos?: Maybe<IPhotosPage>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<IUser>;
}


export interface IAlbumPhotosArgs {
  options?: InputMaybe<IPageQueryOptions>;
}

export interface IAlbumsPage {
  data?: Maybe<Array<Maybe<IAlbum>>>;
  links?: Maybe<IPaginationLinks>;
  meta?: Maybe<IPageMetadata>;
}

export enum ICacheControlScope {
  Private = 'PRIVATE',
  Public = 'PUBLIC'
}

export interface IComment {
  body?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  post?: Maybe<IPost>;
}

export interface ICommentsPage {
  data?: Maybe<Array<Maybe<IComment>>>;
  links?: Maybe<IPaginationLinks>;
  meta?: Maybe<IPageMetadata>;
}

export interface ICompany {
  bs?: Maybe<Scalars['String']>;
  catchPhrase?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
}

export interface ICompanyInput {
  bs?: InputMaybe<Scalars['String']>;
  catchPhrase?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}

export interface ICreateAlbumInput {
  title: Scalars['String'];
  userId: Scalars['ID'];
}

export interface ICreateCommentInput {
  body: Scalars['String'];
  email: Scalars['String'];
  name: Scalars['String'];
}

export interface ICreatePhotoInput {
  thumbnailUrl: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
}

export interface ICreatePostInput {
  body: Scalars['String'];
  title: Scalars['String'];
}

export interface ICreateTodoInput {
  completed: Scalars['Boolean'];
  title: Scalars['String'];
}

export interface ICreateUserInput {
  address?: InputMaybe<IAddressInput>;
  company?: InputMaybe<ICompanyInput>;
  email: Scalars['String'];
  name: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  username: Scalars['String'];
  website?: InputMaybe<Scalars['String']>;
}

export interface IGeo {
  lat?: Maybe<Scalars['Float']>;
  lng?: Maybe<Scalars['Float']>;
}

export interface IGeoInput {
  lat?: InputMaybe<Scalars['Float']>;
  lng?: InputMaybe<Scalars['Float']>;
}

export interface IMutation {
  _?: Maybe<Scalars['Int']>;
  createAlbum?: Maybe<IAlbum>;
  createComment?: Maybe<IComment>;
  createPhoto?: Maybe<IPhoto>;
  createPost?: Maybe<IPost>;
  createTodo?: Maybe<ITodo>;
  createUser?: Maybe<IUser>;
  deleteAlbum?: Maybe<Scalars['Boolean']>;
  deleteComment?: Maybe<Scalars['Boolean']>;
  deletePhoto?: Maybe<Scalars['Boolean']>;
  deletePost?: Maybe<Scalars['Boolean']>;
  deleteTodo?: Maybe<Scalars['Boolean']>;
  deleteUser?: Maybe<Scalars['Boolean']>;
  updateAlbum?: Maybe<IAlbum>;
  updateComment?: Maybe<IComment>;
  updatePhoto?: Maybe<IPhoto>;
  updatePost?: Maybe<IPost>;
  updateTodo?: Maybe<ITodo>;
  updateUser?: Maybe<IUser>;
}


export interface IMutationCreateAlbumArgs {
  input: ICreateAlbumInput;
}


export interface IMutationCreateCommentArgs {
  input: ICreateCommentInput;
}


export interface IMutationCreatePhotoArgs {
  input: ICreatePhotoInput;
}


export interface IMutationCreatePostArgs {
  input: ICreatePostInput;
}


export interface IMutationCreateTodoArgs {
  input: ICreateTodoInput;
}


export interface IMutationCreateUserArgs {
  input: ICreateUserInput;
}


export interface IMutationDeleteAlbumArgs {
  id: Scalars['ID'];
}


export interface IMutationDeleteCommentArgs {
  id: Scalars['ID'];
}


export interface IMutationDeletePhotoArgs {
  id: Scalars['ID'];
}


export interface IMutationDeletePostArgs {
  id: Scalars['ID'];
}


export interface IMutationDeleteTodoArgs {
  id: Scalars['ID'];
}


export interface IMutationDeleteUserArgs {
  id: Scalars['ID'];
}


export interface IMutationUpdateAlbumArgs {
  id: Scalars['ID'];
  input: IUpdateAlbumInput;
}


export interface IMutationUpdateCommentArgs {
  id: Scalars['ID'];
  input: IUpdateCommentInput;
}


export interface IMutationUpdatePhotoArgs {
  id: Scalars['ID'];
  input: IUpdatePhotoInput;
}


export interface IMutationUpdatePostArgs {
  id: Scalars['ID'];
  input: IUpdatePostInput;
}


export interface IMutationUpdateTodoArgs {
  id: Scalars['ID'];
  input: IUpdateTodoInput;
}


export interface IMutationUpdateUserArgs {
  id: Scalars['ID'];
  input: IUpdateUserInput;
}

export enum IOperatorKindEnum {
  Gte = 'GTE',
  Like = 'LIKE',
  Lte = 'LTE',
  Ne = 'NE'
}

export interface IOperatorOptions {
  field?: InputMaybe<Scalars['String']>;
  kind?: InputMaybe<IOperatorKindEnum>;
  value?: InputMaybe<Scalars['String']>;
}

export interface IPageLimitPair {
  limit?: Maybe<Scalars['Int']>;
  page?: Maybe<Scalars['Int']>;
}

export interface IPageMetadata {
  totalCount?: Maybe<Scalars['Int']>;
}

export interface IPageQueryOptions {
  operators?: InputMaybe<Array<InputMaybe<IOperatorOptions>>>;
  paginate?: InputMaybe<IPaginateOptions>;
  search?: InputMaybe<ISearchOptions>;
  slice?: InputMaybe<ISliceOptions>;
  sort?: InputMaybe<Array<InputMaybe<ISortOptions>>>;
}

export interface IPaginateOptions {
  limit?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
}

export interface IPaginationLinks {
  first?: Maybe<IPageLimitPair>;
  last?: Maybe<IPageLimitPair>;
  next?: Maybe<IPageLimitPair>;
  prev?: Maybe<IPageLimitPair>;
}

export interface IPhoto {
  album?: Maybe<IAlbum>;
  id?: Maybe<Scalars['ID']>;
  thumbnailUrl?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  url?: Maybe<Scalars['String']>;
}

export interface IPhotosPage {
  data?: Maybe<Array<Maybe<IPhoto>>>;
  links?: Maybe<IPaginationLinks>;
  meta?: Maybe<IPageMetadata>;
}

export interface IPost {
  body?: Maybe<Scalars['String']>;
  comments?: Maybe<ICommentsPage>;
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<IUser>;
}


export interface IPostCommentsArgs {
  options?: InputMaybe<IPageQueryOptions>;
}

export interface IPostsPage {
  data?: Maybe<Array<Maybe<IPost>>>;
  links?: Maybe<IPaginationLinks>;
  meta?: Maybe<IPageMetadata>;
}

export interface IQuery {
  _?: Maybe<Scalars['Int']>;
  album?: Maybe<IAlbum>;
  albums?: Maybe<IAlbumsPage>;
  comment?: Maybe<IComment>;
  comments?: Maybe<ICommentsPage>;
  photo?: Maybe<IPhoto>;
  photos?: Maybe<IPhotosPage>;
  post?: Maybe<IPost>;
  posts?: Maybe<IPostsPage>;
  todo?: Maybe<ITodo>;
  todos?: Maybe<ITodosPage>;
  user?: Maybe<IUser>;
  users?: Maybe<IUsersPage>;
}


export interface IQueryAlbumArgs {
  id: Scalars['ID'];
}


export interface IQueryAlbumsArgs {
  options?: InputMaybe<IPageQueryOptions>;
}


export interface IQueryCommentArgs {
  id: Scalars['ID'];
}


export interface IQueryCommentsArgs {
  options?: InputMaybe<IPageQueryOptions>;
}


export interface IQueryPhotoArgs {
  id: Scalars['ID'];
}


export interface IQueryPhotosArgs {
  options?: InputMaybe<IPageQueryOptions>;
}


export interface IQueryPostArgs {
  id: Scalars['ID'];
}


export interface IQueryPostsArgs {
  options?: InputMaybe<IPageQueryOptions>;
}


export interface IQueryTodoArgs {
  id: Scalars['ID'];
}


export interface IQueryTodosArgs {
  options?: InputMaybe<IPageQueryOptions>;
}


export interface IQueryUserArgs {
  id: Scalars['ID'];
}


export interface IQueryUsersArgs {
  options?: InputMaybe<IPageQueryOptions>;
}

export interface ISearchOptions {
  q?: InputMaybe<Scalars['String']>;
}

export interface ISliceOptions {
  end?: InputMaybe<Scalars['Int']>;
  limit?: InputMaybe<Scalars['Int']>;
  start?: InputMaybe<Scalars['Int']>;
}

export interface ISortOptions {
  field?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<ISortOrderEnum>;
}

export enum ISortOrderEnum {
  Asc = 'ASC',
  Desc = 'DESC'
}

export interface ITodo {
  completed?: Maybe<Scalars['Boolean']>;
  id?: Maybe<Scalars['ID']>;
  title?: Maybe<Scalars['String']>;
  user?: Maybe<IUser>;
}

export interface ITodosPage {
  data?: Maybe<Array<Maybe<ITodo>>>;
  links?: Maybe<IPaginationLinks>;
  meta?: Maybe<IPageMetadata>;
}

export interface IUpdateAlbumInput {
  title?: InputMaybe<Scalars['String']>;
  userId?: InputMaybe<Scalars['ID']>;
}

export interface IUpdateCommentInput {
  body?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
}

export interface IUpdatePhotoInput {
  thumbnailUrl?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  url?: InputMaybe<Scalars['String']>;
}

export interface IUpdatePostInput {
  body?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
}

export interface IUpdateTodoInput {
  completed?: InputMaybe<Scalars['Boolean']>;
  title?: InputMaybe<Scalars['String']>;
}

export interface IUpdateUserInput {
  address?: InputMaybe<IAddressInput>;
  company?: InputMaybe<ICompanyInput>;
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  username?: InputMaybe<Scalars['String']>;
  website?: InputMaybe<Scalars['String']>;
}

export interface IUser {
  address?: Maybe<IAddress>;
  albums?: Maybe<IAlbumsPage>;
  company?: Maybe<ICompany>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['ID']>;
  name?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  posts?: Maybe<IPostsPage>;
  todos?: Maybe<ITodosPage>;
  username?: Maybe<Scalars['String']>;
  website?: Maybe<Scalars['String']>;
}


export interface IUserAlbumsArgs {
  options?: InputMaybe<IPageQueryOptions>;
}


export interface IUserPostsArgs {
  options?: InputMaybe<IPageQueryOptions>;
}


export interface IUserTodosArgs {
  options?: InputMaybe<IPageQueryOptions>;
}

export interface IUsersPage {
  data?: Maybe<Array<Maybe<IUser>>>;
  links?: Maybe<IPaginationLinks>;
  meta?: Maybe<IPageMetadata>;
}

export type IAlbumQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type IAlbumQuery = { album?: { id?: string | null, title?: string | null, user?: { id?: string | null, name?: string | null, username?: string | null, email?: string | null, company?: { name?: string | null, bs?: string | null } | null } | null, photos?: { data?: Array<{ id?: string | null, title?: string | null, url?: string | null } | null> | null } | null } | null };


export const AlbumDocument = /*#__PURE__*/ `
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
export const useAlbumQuery = <
      TData = IAlbumQuery,
      TError = unknown
    >(
      client: GraphQLClient,
      variables: IAlbumQueryVariables,
      options?: UseQueryOptions<IAlbumQuery, TError, TData>,
      headers?: RequestInit['headers']
    ) =>
    useQuery<IAlbumQuery, TError, TData>(
      ['album', variables],
      fetcher<IAlbumQuery, IAlbumQueryVariables>(client, AlbumDocument, variables, headers),
      options
    );

useAlbumQuery.getKey = (variables: IAlbumQueryVariables) => ['album', variables];
;

useAlbumQuery.fetcher = (client: GraphQLClient, variables: IAlbumQueryVariables, headers?: RequestInit['headers']) => fetcher<IAlbumQuery, IAlbumQueryVariables>(client, AlbumDocument, variables, headers);