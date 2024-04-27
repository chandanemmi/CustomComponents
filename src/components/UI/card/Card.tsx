import React from 'react';

import Image from 'next/image';

import { CardContainer, ContentContainer, Logo } from '@/components/UI/card/Card.styled';
import Typography from '@/components/UI/typography/Typography';

import type { Component } from '@/types';

interface CardProps {
  logo: string; // Path for the logo image
  heading: string;
  description: string;
  isSelected: boolean;
  onClick: () => void; // Callback for card click
}

const Card: Component<CardProps> = ({ logo, heading, description, isSelected, onClick }) => (
  <CardContainer isSelected={isSelected} onClick={onClick}>
    {isSelected && (
      <div className="TickMark">
        <img src={tick.src} alt="tick" />
      </div>
    )}
    <Logo>
      <img src={logo} alt="Logo" width={50} height={50} style={{ objectFit: 'contain' }} />
      {/* <Image src={"https://assets.ajio.com/cms/AJIO/WEB/D-1.0-MHP-M-11012024-topbanner-z2-p3-Dennislingo-Differenceofopinion-flat55.jpg"} alt="Logo" width={50} height={50} /> */}
    </Logo>
    <ContentContainer>
      <Typography variant="body-s-link" mb={1} className="typography">
        {heading}
      </Typography>
      <Typography variant="body-xxs-reg" className="typography">
        {description}
      </Typography>
    </ContentContainer>
  </CardContainer>
);

export default Card;
