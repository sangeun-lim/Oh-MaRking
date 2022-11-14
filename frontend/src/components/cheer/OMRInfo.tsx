import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { BsClipboardCheck, BsBackspace } from 'react-icons/bs';
import { AiFillEdit } from 'react-icons/ai';
import AuthApi from '../../api/AuthApi';
import { setIntro } from '../../store/user';
import { stampUrl } from '../../utils/imgUrl';
import type { RootState } from '../../store/store';
import styles from './OMR.module.scss';
import LinkCopy from './LinkCopy';

interface InfoProps {
  title: string;
  content: string;
}

function Info({ title, content }: InfoProps): JSX.Element {
  const { isOwner } = useSelector((state: RootState) => state.omr);
  const dispatch = useDispatch();
  const [isEdting, setIsEdting] = useState(false);
  const [text, setText] = useState<string>(content);

  const updateUserProfile = useCallback(async () => {
    const UserData = { introduction: text };
    const { status } = await AuthApi.auth.updateUserProfile(UserData);
    if (status === 202) {
      dispatch(setIntro(text));
      setIsEdting(false);
    }
  }, [text, dispatch]);

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const switchIsEdting = useCallback(() => {
    setIsEdting((state) => !state);
    setText(content);
  }, [content]);

  const getContent = () => {
    switch (title.replaceAll(/\s/g, '')) {
      case '이름':
        return (
          <div className={styles.name}>
            <span>{content}</span>
            <LinkCopy />
          </div>
        );

      case '필적확인란':
        return !isEdting ? (
          <div className={styles.intro}>
            <span>{content}</span>
            <AiFillEdit
              type="button"
              // className={styles.custom_cursor}
              // className={styles.edit}
              aria-label="자기소개 수정"
              onClick={switchIsEdting}
              style={{
                display: isOwner ? 'visible' : 'none',
              }}
            />
          </div>
        ) : (
          <div className={styles.editing}>
            <textarea
              name="introduction"
              value={text}
              onChange={onChange}
              maxLength={20}
            />
            <div>
              <BsClipboardCheck onClick={updateUserProfile} />
              <BsBackspace onClick={switchIsEdting} />
            </div>
          </div>
        );

      case '감독확인란':
        return <img src={stampUrl} alt="감독은 노녕과 아이들" />;

      default:
        return null;
    }
  };

  return (
    <div className={styles.section}>
      <div className={`${styles.header} ${styles.left}`}>{title}</div>
      <div className={` ${styles.body} ${styles.right}`}>{getContent()}</div>
    </div>
  );
}

export default Info;
