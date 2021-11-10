import useSWR from "swr";
import { request } from "graphql-request";

const GetNewsUpdates = `{
    mediaResources {
      id
      name
      file {
        ... on LocalFileFieldOutput {
          filesize
          src
        }
      }
    }
    newsUpdates {
      title
      slug
      shortDescription
      photo {
        altText
        image {
          filesize
          src
          height
          width
        }
      }
      content {
        document
      }
      publishDate
      status
    }
  }`;

export const getNewsUpdates = (url) => {
  const fetcher = (query) => request(`${url}/api/graphql`, query);

  const { data, error } = useSWR(GetNewsUpdates, fetcher);
  let news = data?.newsUpdates.filter((item) => item.status === "published");
  news?.forEach((item) => {
    item.photo.image.src = url + item.photo.image.src;
  });

  let mediaResources = data?.mediaResources;

  const values = {
    news,
    mediaResources,
    isLoading: !error && !data,
    isEmpty: data && news.length === 0 && mediaResources.length === 0,
    isError: error,
  };

  return values
};
