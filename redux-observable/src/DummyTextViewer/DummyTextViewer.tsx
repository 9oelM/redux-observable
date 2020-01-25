import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../redux/types';

const DummyTextViewer: FC = () => {
  const {
    simpleText: {
      text, errorMsg, isLoading, isHiTextShown,
    }
  }: RootState = useSelector((state: RootState) => state);

  const textViewer: ReactNode = errorMsg !== undefined ?
    <p>oops, there was an error</p> : (
      isHiTextShown ? null : <p>{text}</p>
    );

  const dummyTextViewer: ReactNode | null = isLoading && !isHiTextShown ? 
    (<p>loading...</p>) : textViewer;

  return (
    <section>
      {dummyTextViewer}
    </section>
  )
}

export default DummyTextViewer;
