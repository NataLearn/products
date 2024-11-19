import { useAppDispatch } from "../app/hooks";
import {
  Product,
  ReactionName,
  reactionCLicked,
} from "../slices/productsSlice";

const reactionObj: Record<ReactionName, string> = {
  heart: "❤️",
};

interface ReactionButtonsProps {
  product: Product;
}

export const ReactionButtons = ({ product }: ReactionButtonsProps) => {
  const dispatch = useAppDispatch();

  const reactionButtons = Object.entries(reactionObj).map(([name, emoji]) => {
    const reaction = name as ReactionName;
    const active: string = product.reactions[reaction] === true ? "active" : "";
    return (
      <button
        key={reaction}
        type="button"
        className={`reaction-button ${active}`}
        onClick={() =>
          dispatch(reactionCLicked({ productId: product.id, reaction }))
        }
      >
        {emoji}
      </button>
    );
  });

  return <>{reactionButtons}</>;
};
