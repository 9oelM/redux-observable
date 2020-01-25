import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { startRequestText } from '../redux/actions';

const DummyTextRequestButton: FC = () => {
  const dispatch: Dispatch = useDispatch();

  const handleClick = async () => {
    dispatch(startRequestText());
  }

  return (
    <button 
      style={{ backgroundColor: 'grey', color: 'white', width: 150, height: 50 }}
      onClick={handleClick}
    >
      Click me to request dummy text
    </button>
  )
};

export default DummyTextRequestButton;

