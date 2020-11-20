import React from 'react';

import logoGrande from '../../../assets/logos/logo.png';
import logoPequena from '../../../assets/logos/logo_colibiri.png';

interface LogoCorretEasyGrandeProps {
  width?: string;
  height?: string;
}

export const LogoReservaGrande = (
  commomProps: LogoCorretEasyGrandeProps &
    React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLDivElement>,
      HTMLDivElement
    >,
): JSX.Element => {
  const { height } = commomProps;
  return (
    <div {...commomProps}>
      <img height={height || 25} src={logoGrande} alt="Logo da CorretEasy" />
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
    <img width="25" src={logoPequena} alt="Pássaro da logo da Corrret" />
  </div>
);
