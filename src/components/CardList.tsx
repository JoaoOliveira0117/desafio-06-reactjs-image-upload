import { SimpleGrid, useDisclosure } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Card } from './Card';
import { ModalViewImage } from './Modal/ViewImage';

interface Card {
  title: string;
  description: string;
  url: string;
  ts: number;
  id: string;
}

interface CardsProps {
  cards: Card[];
}

export function CardList({ cards }: CardsProps): JSX.Element {
  const { isOpen, onClose, onOpen, onToggle } = useDisclosure();
  const [imageUrl, setImageUrl] = useState('');

  function viewImageModal(url) {
    onOpen();
    setImageUrl(url);
  }

  return (
    <>
      {cards.length > 0 && (
        <>
          <SimpleGrid columns={3} spacing="40px">
            {cards.map(card => (
              <Card data={card} viewImage={viewImageModal} />
            ))}
          </SimpleGrid>

          <ModalViewImage isOpen={isOpen} onClose={onClose} imgUrl={imageUrl} />
        </>
      )}
    </>
  );
}
