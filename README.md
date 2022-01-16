# Item Format in ./public/data/items.json

## Value | Data type | Required/Optional | Default value (if !null)
Description of how `value` and `key` are used.



# Documentation

## name | String | Required
Used to display the name of `item`.


## desc | String | Optional | ""
Used to display a short description of `item` if wanted.


## imageURL | String | Required 
URL for image to display of `item`.


## pixelized | Boolean | Optional | true
Boolean to set if the `imageURL` image of the item will be pixelized or blurred. 

2D items are best pixelized.


## cost.fcs | Int | Required
Cost of item in FlexCrop Standard, divided from defaultAmount

Ex. `costDiamonds=2` & `defaultAmount=5` will be 5/2. Buying 5 of `item` will cost $2FCS.


## cost.diamonds | Int | Required
Cost of item in diamonds, divided from defaultAmount

Ex. `costDiamonds=2` & `defaultAmount=5` will be 5/2. Buying 5 of `item` will cost 2 Diamonds.


## default_amount | Int | Optional | 1
Base amount of `item` that will be bought, used in conjunction with `costFCS` and `costDiamonds` to calculate less than $1FCS / 1 Diamond `item` value.


## css.left.text / css.right.text | String | "white"
Colour for text in left / right div. String must be compatible with CSS colours.


## css.left.background / css.right.background | String | "#645542"
Background colour for text in left / right div. String must be compatible with CSS colours.