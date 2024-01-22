# END POINTS

## POST /register

### Request Body

```json
{
    "email": <String>,
    "password": <String>,
    "phoneNumber": <String>,
    "address": <String>,
    "username": <String>
}
```

### Response (201)

```json
{
  "id": 3,
  "email": "budi@mail.com"
}
```

### Response (400 - Bad Request - Password null or empty)

```json
{
  "message": "Password is required"
}
```

### Response (400 - Bad Request - Email is already registered)

```json
{
  "message": "Email already registered"
}
```

### Response (400 - Bad Request - Email is not in email format)

```json
{
  "message": "Must be in Email format"
}
```

### Response (400 - Bad Request - Email is null or empty)

```json
{
  "message": "Email is required"
}
```

## POST /login

### Request Body

```json
{
    "email": <String>,
    "password": <String>,
}
```

### Response (200)

```json
{
  "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNzAxMTA3OTQ1fQ.oQDKqrF8aU0T_Gj5EeiCLRUfivD3Pomg1AynKP7wdPI"
}
```

### Response (400 - Bad Request - Email is null or empty)

```json
{
  "message": "Email is required"
}
```

### Response (400 - Bad Request - Password is null or empty)

```json
{
  "message": "Password is required"
}
```

### Response (401 - Bad Request - Password is null or empty)

```json
{
  "message": "Email or Password is invalid"
}
```

## GET /users

### Request User

```json
{
  "id": 1
}
```

### Response (200)

```json
{
  "id": 2,
  "email": "budi@mail.com",
  "name": "Budi Keren",
  "address": "Jl. Klengkeng no 9, 65116",
  "phoneNumber": "082222222222",
  "role": "user",
  "createdAt": "2023-12-13T05:11:23.143Z",
  "updatedAt": "2023-12-13T05:11:23.143Z"
}
```

## PUT /users

### Request User

```json
{
  "id": 1
}
```

### Request Body

```json
{
    "email":  <String>,
    "name":  <String>,
    "address":  <String>,
    "phoneNumber":  <String>
 }
```

### Response (200)

```json
{
  "message": "Profile updated"
}
```

### Response (400 - Bad Request - Email is null)

```json
{
  "message": "Email is required"
}
```

### Response (400 - Bad Request - Email is already registered)

```json
{
  "message": "Email already registered"
}
```

### Response (400 - Bad Request - Email is not in email format)

```json
{
  "message": "Must be in Email format"
}
```

## GET /meals

### Response (200)

```json
[
  {
    "id": 1,
    "idMeal": "52874",
    "strMeal": "Beef and Mustard Pie",
    "strCategory": "Beef",
    "strArea": "British",
    "strInstructions": "Preheat the oven to 150C/300F/Gas 2.\r\nToss the beef and flour together in a bowl with some salt and black pepper.\r\nHeat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole.\r\nFry until browned on each side, then remove and set aside. Repeat with the remaining oil and beef.\r\nReturn the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock, onion, carrots, thyme and mustard, and season well with salt and pepper.\r\nCover with a lid and place in the oven for two hours.\r\nRemove from the oven, check the seasoning and set aside to cool. Remove the thyme.\r\nWhen the beef is cool and you're ready to assemble the pie, preheat the oven to 200C/400F/Gas 6.\r\nTransfer the beef to a pie dish, brush the rim with the beaten egg yolks and lay the pastry over the top. Brush the top of the pastry with more beaten egg.\r\nTrim the pastry so there is just enough excess to crimp the edges, then place in the oven and bake for 30 minutes, or until the pastry is golden-brown and cooked through.\r\nFor the green beans, bring a saucepan of salted water to the boil, add the beans and cook for 4-5 minutes, or until just tender.\r\nDrain and toss with the butter, then season with black pepper.\r\nTo serve, place a large spoonful of pie onto each plate with some green beans alongside.",
    "strMealThumb": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
    "strYoutube": "https://www.youtube.com/watch?v=nMyBC9staMU",
    "ingredient": "1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 200ml Red Wine, 400ml Beef Stock, 1 finely sliced Onion, 2 chopped Carrots, 3 sprigs Thyme, 2 tbs Mustard, 2 free-range Egg Yolks, 400g Puff Pastry, 300g Green Beans, 25g Butter, pinch Salt, pinch Pepper",
    "createdAt": "2023-12-13T05:11:31.141Z",
    "updatedAt": "2023-12-13T05:11:31.141Z"
  },
  {
    "id": 2,
    "idMeal": "52878",
    "strMeal": "Beef and Oyster pie",
    "strCategory": "Beef",
    "strArea": "British",
    "strInstructions": "Season the beef cubes with salt and black pepper. Heat a tablespoon of oil in the frying pan and fry the meat over a high heat. Do this in three batches so that you don’t overcrowd the pan, transferring the meat to a large flameproof casserole dish once it is browned all over. Add extra oil if the pan seems dry.\r\nIn the same pan, add another tablespoon of oil and cook the shallots for 4-5 minutes, then add the garlic and fry for 30 seconds. Add the bacon and fry until slightly browned. Transfer the onion and bacon mixture to the casserole dish and add the herbs.\r\nPreheat the oven to 180C/350F/Gas 4.\r\nPour the stout into the frying pan and bring to the boil, stirring to lift any stuck-on browned bits from the bottom of the pan. Pour the stout over the beef in the casserole dish and add the stock. Cover the casserole and place it in the oven for 1½-2 hours, or until the beef is tender and the sauce is reduced.\r\nSkim off any surface fat, taste and add salt and pepper if necessary, then stir in the cornflour paste. Put the casserole dish on the hob – don’t forget that it will be hot – and simmer for 1-2 minutes, stirring, until thickened. Leave to cool.\r\nIncrease the oven to 200C/400F/Gas 6. To make the pastry, put the flour and salt in a very large bowl. Grate the butter and stir it into the flour in three batches. Gradually add 325ml/11fl oz cold water – you may not need it all – and stir with a round-bladed knife until the mixture just comes together. Knead the pastry lightly into a ball on a lightly floured surface and set aside 250g/9oz for the pie lid.\r\nRoll the rest of the pastry out until about 2cm/¾in larger than the dish you’re using. Line the dish with the pastry then pile in the filling, tucking the oysters in as well. Brush the edge of the pastry with beaten egg.\r\nRoll the remaining pastry until slightly larger than your dish and gently lift over the filling, pressing the edges firmly to seal, then trim with a sharp knife. Brush with beaten egg to glaze. Put the dish on a baking tray and bake for 25-30 minutes, or until the pastry is golden-brown and the filling is bubbling.",
    "strMealThumb": "https://www.themealdb.com/images/media/meals/wrssvt1511556563.jpg",
    "strYoutube": "https://www.youtube.com/watch?v=ONX74yP6JnI",
    "ingredient": "900g Beef, 3 tbs Olive Oil, 3 Shallots, 2 cloves minced Garlic, 125g Bacon, 1 tbs chopped Thyme, 2 Bay Leaf, 330ml Stout, 400ml Beef Stock, 2 tbs Corn Flour, 8 Oysters, 400g Plain Flour, pinch Salt, 250g Butter, To Glaze Eggs",
    "createdAt": "2023-12-13T05:11:31.141Z",
    "updatedAt": "2023-12-13T05:11:31.141Z"
  },
  ...
]
```

## GET /meals/:id

### Response (200)

```json
{
  "id": 1,
  "idMeal": "52874",
  "strMeal": "Beef and Mustard Pie",
  "strCategory": "Beef",
  "strArea": "British",
  "strInstructions": "Preheat the oven to 150C/300F/Gas 2.\r\nToss the beef and flour together in a bowl with some salt and black pepper.\r\nHeat a large casserole until hot, add half of the rapeseed oil and enough of the beef to just cover the bottom of the casserole.\r\nFry until browned on each side, then remove and set aside. Repeat with the remaining oil and beef.\r\nReturn the beef to the pan, add the wine and cook until the volume of liquid has reduced by half, then add the stock, onion, carrots, thyme and mustard, and season well with salt and pepper.\r\nCover with a lid and place in the oven for two hours.\r\nRemove from the oven, check the seasoning and set aside to cool. Remove the thyme.\r\nWhen the beef is cool and you're ready to assemble the pie, preheat the oven to 200C/400F/Gas 6.\r\nTransfer the beef to a pie dish, brush the rim with the beaten egg yolks and lay the pastry over the top. Brush the top of the pastry with more beaten egg.\r\nTrim the pastry so there is just enough excess to crimp the edges, then place in the oven and bake for 30 minutes, or until the pastry is golden-brown and cooked through.\r\nFor the green beans, bring a saucepan of salted water to the boil, add the beans and cook for 4-5 minutes, or until just tender.\r\nDrain and toss with the butter, then season with black pepper.\r\nTo serve, place a large spoonful of pie onto each plate with some green beans alongside.",
  "strMealThumb": "https://www.themealdb.com/images/media/meals/sytuqu1511553755.jpg",
  "strYoutube": "https://www.youtube.com/watch?v=nMyBC9staMU",
  "ingredient": "1kg Beef, 2 tbs Plain Flour, 2 tbs Rapeseed Oil, 200ml Red Wine, 400ml Beef Stock, 1 finely sliced Onion, 2 chopped Carrots, 3 sprigs Thyme, 2 tbs Mustard, 2 free-range Egg Yolks, 400g Puff Pastry, 300g Green Beans, 25g Butter, pinch Salt, pinch Pepper",
  "createdAt": "2023-12-13T05:11:31.141Z",
  "updatedAt": "2023-12-13T05:11:31.141Z"
}
```

### Response (404 - Not Found - Meal id is not registered)

```json
{
  "message": "Data not Found"
}
```

## GET /orders

### Request User

```json
{
  "id": 2
}
```

### Response (200)

```json
{
[
  {
    "id": 4,
    "orderId": "test4",
    "status": "Ordered",
    "UserId": 2,
    "MealId": 1,
    "createdAt": "2023-12-13T05:11:31.172Z",
    "updatedAt": "2023-12-13T05:11:31.172Z"
  },
  {
    "id": 5,
    "orderId": "test5",
    "status": "Ordered",
    "UserId": 2,
    "MealId": 3,
    "createdAt": "2023-12-13T05:11:31.172Z",
    "updatedAt": "2023-12-13T05:11:31.172Z"
  },
  {
    "id": 6,
    "orderId": "test6",
    "status": "Ordered",
    "UserId": 2,
    "MealId": 3,
    "createdAt": "2023-12-13T05:11:31.172Z",
    "updatedAt": "2023-12-13T05:11:31.172Z"
  }
]
}
```

## POST /orders/:MealId

### Request Params

```json
{
  "MealId": 1
}
```

### Request User

```json
{
  "id": 6
}
```

### Response (201)

```json
{
  "id": 11,
  "MealId": 1,
  "UserId": 6,
  "updatedAt": "2023-12-13T15:56:37.035Z",
  "createdAt": "2023-12-13T15:56:37.035Z",
  "orderId": null,
  "status": "Ordered"
}
```

### Response (404 - Not Found - Meal id is not registered)

```json
{
  "message": "Data not Found"
}
```

## DELETE /orders/:id

### Request Params

```json
{
  "id": 11
}
```

### Request User

```json
{
  "id": 6
}
```

### Response (200)

```json
{
  "message": "Order canceled"
}
```

### Response (404 - Not Found - Order id is not registered)

```json
{
  "message": "Data not Found"
}
```

### Response (403 - Forbidden - UserId is not order creator or admin)

```json
{
  "message": "Forbidden Access"
}
```

## GLOBAL ERROR

### Response (500 - Internal Server Error)

```json
{
  "message": "Internal Server Error"
}
```

### Response (401 - Unauthorized)

```json
{
  "message": "Invalid Token"
}
```

### Response (403 - Forbidden)

```json
{
  "message": "Forbidden Access"
}
```
