# Item Format in ./public/data/items.json

## Value | Data type | Required/Optional | Default value (if !null)
Description of how `value` and `key` are used.



# Documentation

## name | String | Required
Used to display the name of `item`.


## imageURL | String | Required 
URL for image to display of `item`.


## pixelized | Boolean | Optional | true
Boolean to set if the `imageURL` image of the item will be pixelized or blurred. 

2D items are best pixelized.


## costFCS | Int | Required
Cost of item in FlexCrop Standard, divided from defaultAmount

Ex. `costDiamonds=2` & `defaultAmount=5` will be 5/2. Buying 5 of `item` will cost $2FCS.


## costDiamonds | Int | Required
Cost of item in diamonds, divided from defaultAmount

Ex. `costDiamonds=2` & `defaultAmount=5` will be 5/2. Buying 5 of `item` will cost 2 Diamonds.


## defaultAmount | Int | Optional | 1
Base amount of `item` that will be bought, used in conjunction with `costFCS` and `costDiamonds` to calculate less than $1FCS / 1 Diamond `item` value.