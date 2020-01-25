import React, { FC, ReactNode } from 'react';
import { useSelector } from 'react-redux';

import { State } from '../redux/store';

const DummyTextViewer: FC = () => {
  const {
    simpleText: {
      text, errorMsg, isLoading,
    }
  }: State = useSelector((state: State) => state);

  const textViewer: ReactNode = errorMsg !== undefined ?
    <p>oops, there was an error</p> : (
      <p>{text}</p>
    );

  const dummyTextViewer: ReactNode | null = isLoading ? 
    (<p>loading...</p>) : textViewer;

  return (
    <section>
      {dummyTextViewer}
    </section>
  )
}

export default DummyTextViewer;
