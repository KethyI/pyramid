import BackCard from "../backCard/BackCard";
import Res from "../reset/Res";
import s from "./body.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setBodyGameToo, setHint, sortCards } from "../../store/cardSlice";
import CardItem from "../cardItem/cardItem";

const Body = () => {
  const card = useSelector((state) => state.pyramid);
  const dispatch = useDispatch();
  if (card.hint) {
    setTimeout(() => {
      dispatch(setHint(false));
    }, 500);
  }
  if (card.cards[0].id === 0) {
    dispatch(sortCards());
  }

  const checkHint = (index, forCard) => {
    if (
      card.forRule[card.rule[index].rule[0]] === 0 &&
      card.forRule[card.rule[index].rule[1]] === 0
    ) {
      if (forCard.point === 13) {
        return true;
      }
      if (card.rezCount >= 0) {
        if (forCard.point + card.rez[card.rezCount].point === 13) {
          return true;
        }
      }
    }

    return false;
  };

  const checkPlay = (index) => {
    if (card.bodyPlay[0] === index) {
      dispatch(setBodyGameToo(-1));
      return true;
    }
    return false;
  };

  return (
    <div className={s.main}>
      <div className={s.area}>
        {card.cards.map(
          (el, index) =>
            28 > index && (
              <CardItem
                key={index}
                el={el}
                index={index}
                animate={checkHint(index, el) && card.hint}
                bodyGame={checkPlay(index)}
              ></CardItem>
            )
        )}
      </div>
      <div className={s.basement}>
        <div className={s.deck}>
          <BackCard />
          <Res />
        </div>
      </div>
    </div>
  );
};

export default Body;
