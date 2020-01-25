import React, { FC } from 'react';
import { Dispatch } from 'redux';
import { useDispatch } from 'react-redux';
import { startRequestText, errorRequestText, finishRequestText } from '../redux/actions';

const DummyTextRequestButton: FC = () => {
  const dispatch: Dispatch = useDispatch();

  const REQUEST_URL: string = 'https://baconipsum.com/api/?type=meat?paras=200';

  const handleClick = async () => {
    dispatch(startRequestText());

    const response: string | Error = await fetch(REQUEST_URL)
      .then((resp: Response) => resp.text())
      .catch((err: Error) => err);

    (response instanceof Error) ?
      dispatch(errorRequestText(response.message)) :
      dispatch(finishRequestText(response));
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

