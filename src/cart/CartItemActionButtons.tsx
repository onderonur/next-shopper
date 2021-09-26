import Button from '@src/common/Button';
import { useCartContext } from './CartContext';
import { CartItem } from './CartTypes';
import { DeleteIcon, MinusIcon, PlusIcon } from '@src/common/Icons';

interface CartItemActionButtonsProps {
  cartItem: CartItem;
}

function CartItemActionButtons({ cartItem }: CartItemActionButtonsProps) {
  const { addProduct, removeProduct, removeCartItem } = useCartContext();

  const product = cartItem.info;

  return (
    <div className="flex justify-between items-center">
      <Button
        className="h-8 w-8 text-sm rounded-md"
        variant="secondary"
        icon={<DeleteIcon />}
        onClick={() => removeCartItem(product)}
      />
      <div className="flex items-center">
        <Button
          className="h-8 w-8 text-sm rounded-l-md rounded-r-none"
          variant="primary"
          icon={<MinusIcon />}
          onClick={() => removeProduct(product)}
        />
        <div className="h-8 w-8 text-sm border-2 flex justify-center items-center">
          {cartItem.count}
        </div>
        <Button
          className="h-8 w-8 text-sm rounded-r-md rounded-l-none"
          variant="primary"
          icon={<PlusIcon />}
          onClick={() => addProduct(product)}
        />
      </div>
    </div>
  );
}

export default CartItemActionButtons;
