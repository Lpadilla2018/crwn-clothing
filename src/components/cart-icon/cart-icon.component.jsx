import { connect } from "react-redux";
import "./cart-icon.styles.scss";
import { toggleCartHidden } from "../../redux/reducers/cart/cart.action";

// Import shopping icon as a component in order to place inline in html
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

// create function that holds a div of the shopping icon and the span for number

const CartIcon = ({toggleCartHidden}) => (
  <div className="cart-icon" onClick={toggleCartHidden}>
    <ShoppingIcon className="shopping-icon"></ShoppingIcon>
    <span className="item-count">0</span>
  </div>
);

// Bind function to dispatch action
const mapDispatchToProps = dispatch => ({
  toggleCartHidden: () => dispatch(toggleCartHidden())
})
export default connect(null, mapDispatchToProps)(CartIcon);
