import React from 'react';

import logoGrande from '../../../assets/reserva_logo.png';
import logoPequena from '../../../assets/bird_logo.png';

interface LogoReservaGrandeProps {
  width?: string;
  height?: string;
}

export const LogoReservaGrande = (
  commomProps: LogoReservaGrandeProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
): JSX.Element => {
  const { height } = commomProps;
  return (
    <div {...commomProps}>
      <img height={height || 25} src={logoGrande} alt="Logo da Reserva" />
    </div>
  );
};

export const LogoReservaPequena = (
  commomProps: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >,
): JSX.Element => (
  <div {...commomProps}>
    <img width="25" src={logoPequena} alt="Pássaro da logo da reserva" />
  </div>
);
