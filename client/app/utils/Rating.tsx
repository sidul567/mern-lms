import React, { FC } from "react";
import { BsStarFill } from "react-icons/bs";
import { BsStarHalf } from "react-icons/bs";
import { BsStar } from "react-icons/bs";

type Props = {
  rating: number;
};

const Rating: FC<Props> = ({ rating }: Props) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= rating) {
      stars.push(<BsStarFill fill="#f97316" size={18} />);
    } else if (i <= Math.ceil(rating)) {
      stars.push(<BsStarHalf  fill="#f97316" size={18} />);
    }else{
      stars.push(<BsStar  fill="#f97316" size={18} />);
    }
  }
  return (
  <div className="flex gap-1 items-center">
    {stars}
  </div>
  );
};

export default Rating;
