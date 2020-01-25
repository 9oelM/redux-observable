import React, { FC, ReactNode } from 'react';
import { RootState } from '../redux/types';
import { useSelector } from 'react-redux';

const HiTextViewer: FC = () => {
  const isHiTextShown: boolean = 
    useSelector((state: RootState) => state.simpleText.isHiTextShown);
  
  const hiText: ReactNode =
  isHiTextShown ?
    (<section>
      <p>HI</p>
    </section>) : 
    null;

  return (<>{hiText}</>);
}

export default HiTextViewer;
