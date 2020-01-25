import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { toggleHiText } from '../redux/actions';
import { RootState } from '../redux/types';

const ShowHiTextButton: FC = () => {
  const dispatch: Dispatch = useDispatch();
  const isHiTextShown: boolean = 
    useSelector((state: RootState) => state.simpleText.isHiTextShown);

  const handleClick = () => dispatch(toggleHiText());

  const buttonMsg: string = `Click here to ${isHiTextShown ? 'hide' : 'show'} the hi text`;

  return (
    <button
      style={{ backgroundColor: 'grey', color: 'white', width: 150, height: 50 }}
      onClick={handleClick}
    >
      {buttonMsg}
    </button>
  )
}

export default ShowHiTextButton;
