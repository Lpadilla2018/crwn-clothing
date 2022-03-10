import "./cart-dropdown.styles.scss";
import CustomButton from "../custom-button/custom-button";

// custom button
const CartDropDown = () => (
  <div className="cart-dropdown">
    <div className="cart-items">
        <p>Test</p>
        <p>test</p>
    </div>
      <CustomButton>GO TO CHECKOUT</CustomButton>
  </div>
);

export default CartDropDown;
