import { Button, Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Header } from '../components/Header';
import { CardList } from '../components/CardList';
import { api } from '../services/api';
import { Loading } from '../components/Loading';
import { Error } from '../components/Error';

export default function Home(): JSX.Element {
  const fetchImages = async param => {
    const images = await api.get('/api/images', {
      params: {
        after: param.pageParam,
      },
    });

    return images.data;
  };
  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: (lastPage, pages) => {
      const { after } = lastPage;

      return after ? after : null;
    },
  });

  const formattedData = useMemo(() => {
    const images = data?.pages?.map(({ data }) => data).flat();
    return images;
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
              <Button my="8" onClick={() => fetchNextPage()}>
                Carregar mais
              </Button>
            ) : (
              <Box my="8">Carregando...</Box>
            )}
          </>
        )}
      </Box>
    </>
  );
}
