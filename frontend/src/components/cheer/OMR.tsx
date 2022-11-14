import React, { useCallback, useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Carousel from 'react-bootstrap/Carousel';
import { addOmr, setUser } from '../../store/user';
import { setIsOwner, setOmr } from '../../store/omr';
import { setLikeList } from '../../store/likeList';
import CreateMsg from './CreateMsg';
import DetailMsg from './DetailMsg';
import CantReadMsg from './CantReadMsg';
import Cheer from './OMRCheer';
import Info from './OMRInfo';
import Pallet from './OMRPallet';
import Code from './OMRCode';
import LikeList from './LikeList';
import UseNotice from './UseNotice';
import OMRApi from '../../api/OMRApi';
import type { RootState } from '../../store/store';
import styles from './OMR.module.scss';

function OMR(): JSX.Element {
  const [notice, setNotice] = useState<boolean>(true);
  const [btnActive, setBtnActive] = useState<boolean>(true);
  const { user, omr, auth, modal, likeList } = useSelector(
    (state: RootState) => state
  );
  const dispatch = useDispatch();
  const colorList = [
    'yellow',
    'skyblue',
    'purple',
    'green',
    'dark_yellow',
    'navy',
    'orange',
    'pink',
  ];
  const omrBg = ['empty', 'already', 'notyet', 'cannot', 'liked'];
  const handleLike = () => {
    setNotice(false);
    setBtnActive(false);
  };
  const handleNotice = () => {
    setNotice(true);
    setBtnActive(true);
  };
  const getOmr = useCallback(
    async (omrId: number) => {
      const { status, data } = auth.isLoggedIn
        ? await OMRApi.omr.getUserOmr(omrId)
        : await OMRApi.omr.getNotUserOmr(omrId);
      if (status === 200) {
        dispatch(setUser(data.data.user));
        dispatch(setOmr(data.data.omr));
        dispatch(setIsOwner(data.data.isOwner));
      }
    },
    [auth.isLoggedIn, dispatch]
  );

  const movePage = useCallback(
    async (move: number) => {
      const leftOrRight = omr.pageNum + move;
      getOmr(user.omrList[leftOrRight]);
    },
    [omr.pageNum, user.omrList, getOmr]
  );

  const createNewPage = useCallback(async () => {
    const newPage = user.omrList.length;
    const NewOmr = {
      color: newPage % 8,
      pageNum: newPage,
      userId: user.userId,
    };
    try {
      const { status, data } = await OMRApi.omr.createNewOMR(NewOmr);
      if (status === 201) {
        alert('새로운 페이지가 추가되었습니다.');
        dispatch(addOmr(data.data.omrId));
      }
    } catch {
      alert('20개 이상의 문항을 작성해야합니다.');
    }
  }, [user.userId, user.omrList, dispatch]);

  // 즐겨찾기 조회하기 위해
  useEffect(() => {
    const getLikeList = async () => {
      const response = await OMRApi.note.likeList(user.codedEmail);
      if (response.status === 200) {
        dispatch(setLikeList(response.data.data));
        console.log('즐겨찾기 조회 성공');
      }
    };
    getLikeList();
  }, [dispatch, user.codedEmail]);

  return (
    <div className={`${styles[colorList[omr.color]]} ${styles.test}`}>
      <div className={`${styles.omr} ${styles.body}`}>
        {/* OMR TOP */}
        <Code />
        <div className={styles.omr_head}>
          <button
            className={styles.header}
            type="button"
            onClick={() => createNewPage()}
          >
            답안지 교체
          </button>
        </div>
        {/* OMR BODY */}
        <div className={styles.omr_body}>
          {/* 좌측: 정보확인란 */}
          <button
            type="button"
            onClick={() => movePage(-1)}
            style={{ visibility: omr.pageNum === 0 ? 'hidden' : 'visible' }}
          >
            &#10094;
          </button>
          <div className={styles.info}>
            <div className={`${styles.page}`}>
              <span className={`${styles.body}`}>{omr.pageNum + 1}</span>
              <span>교시 응원영역</span>
            </div>

            <Info title={'이  름'} content={`${user.name}`} />
            <Info title={'필  적\n확인란'} content={user.introduction} />
            <div>
              <div className={`${styles.header} ${styles.top}`}>
                <button
                  className={`${styles.button_left} ${
                    btnActive ? styles.active : styles.nonactive
                  }`}
                  type="button"
                  onClick={handleNotice}
                >
                  안내사항
                </button>
                <button
                  type="button"
                  className={`${styles.button_right} ${
                    !btnActive ? styles.active : styles.nonactive
                  }`}
                  onClick={handleLike}
                >
                  검토하기
                </button>
              </div>
              <div className={`${styles.body} ${styles.bottom}`}>
                {/* 즐겨찾기 보여주는 부분 */}

                {notice ? (
                  <div>
                    <UseNotice omrBg={omrBg} isOwner={omr.isOwner} />
                    <div>
                      <div className={styles.pallet}>
                        <Pallet colorList={colorList} />
                      </div>
                    </div>
                  </div>
                ) : (
                  <Carousel>
                    {likeList.likeList.map((data) => (
                      <Carousel.Item key={data.noteId}>
                        <LikeList
                          pageNum={data.pageNum}
                          problemNum={data.problemNum}
                          checkNum={data.checkNum}
                          username={user.name}
                          content={data.content}
                          nickname={data.nickname}
                        />
                      </Carousel.Item>
                    ))}
                  </Carousel>
                )}
              </div>
            </div>
            <Info title={'감  독\n확인란'} content={'감독확인란'} />
          </div>
          {/* 그 외: 응원구역 */}
          <div className={`${styles.cheer}`}>
            <Cheer msg={omr.omrInfo.slice(0, 10)} start={0} />
          </div>
          <div className={`${styles.cheer}`}>
            <Cheer msg={omr.omrInfo.slice(10, 20)} start={10} />
          </div>
          <button
            type="button"
            onClick={() => movePage(1)}
            style={{
              visibility:
                omr.pageNum + 1 === user.omrList.length ? 'hidden' : 'visible',
            }}
          >
            &#10095;
          </button>
        </div>
        <div className={styles.omr_footer} />
        <Code />
      </div>
      <div>
        {modal.create && <CreateMsg />}
        {modal.detail && <DetailMsg />}
        {modal.canNotRead && <CantReadMsg />}
      </div>
    </div>
  );
}

export default OMR;
