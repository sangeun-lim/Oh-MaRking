import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toast } from '../common/Toast';
import { setColor } from '../../store/omr';
import OMRApi from '../../api/OMRApi';
import type { RootState } from '../../store/store';
import styles from './OMR.module.scss';

interface PalletProps {
  colorList: string[];
}

function Pallet({ colorList }: PalletProps): JSX.Element {
  const { omrList } = useSelector((state: RootState) => state.user);
  const { isOwner, pageNum, color } = useSelector(
    (state: RootState) => state.omr
  );
  const dispatch = useDispatch();

  const changeColor = useCallback(async (newColor: number, omrId: number) => {
    const ChangeColor = {
      color: newColor,
      omrId,
    };
    const { status } = await OMRApi.omr.changeOmrColor(ChangeColor);
    if (status === 202) {
      Toast('색상이 변경되었습니다', 'pallet');
    }
  }, []);

  const onClick = (newColor: number) => {
    // 색상이 이전 값과 같을 때 처리하기
    if (isOwner && color !== newColor) {
      changeColor(newColor, omrList[pageNum]);
    }
    dispatch(setColor(newColor));
  };

  const colors = [0, 1, 2, 3, 4, 5, 6, 7];
  return (
    <>
      {colors.map((newColor: number) => (
        <span key={newColor} className={`${styles[colorList[newColor]]}`}>
          <button
            className={styles.body}
            type="button"
            onClick={() => onClick(newColor)}
          >
            {' '}
          </button>
        </span>
      ))}
    </>
  );
}

export default Pallet;
