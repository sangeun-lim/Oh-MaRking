import EventModal from './EventModal';
import styles from './EventCardComponent.module.scss';
import './Card.scss';

interface EventCardComponentProps {
  imageUrl: string;
  imageAlt: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
function EventCardComponent({
  imageUrl,
  imageAlt,
  open,
  setOpen,
}: EventCardComponentProps): JSX.Element {
  const imageClick = () => {
    setOpen(!open);
  };

  return (
    <div className={styles.card}>
      <div className={`${styles.img_tape} ${styles.img_tape_1}`}>
        <button
          className={styles.card_shadow}
          type="button"
          onClick={imageClick}
        >
          <img className={styles.card_img} src={imageUrl} alt={imageAlt} />
        </button>
      </div>
      <EventModal
        imageUrl={imageUrl}
        imageAlt={imageAlt}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default EventCardComponent;
