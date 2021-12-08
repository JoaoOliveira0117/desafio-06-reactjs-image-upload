import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = 0 }) =>
    await api.get('/api/images?after=' + pageParam);
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: ({ data }) => {
      if (data.after) {
        return data.after;
      } else {
        return null;
      }
    },
  });

  const formattedData = useMemo(() => {
    const images = data?.pages[0].data;
    return images?.data;
  }, [data]);

  if (isLoading) {
    return <Loading></Loading>;
  }

  if (isError) {
    return <Error></Error>;
  }

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {hasNextPage && (
          <>
            {!isFetchingNextPage ? (
              <Button onClick={() => fetchNextPage()}>Carregar mais</Button>
            ) : (
              <Box>Carregando...</Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}
