import { useState } from 'react';

import { useLocation } from 'react-router-dom';

import AddWishlistMobile from './ui/AddWishlistMobile.tsx';
import BackButton from './ui/BackButton.tsx';
import Description from './ui/Description.tsx';
import Footer from './ui/Footer.tsx';
import Header from './ui/Header.tsx';
import HeaderMobile from './ui/HeaderMobile.tsx';
import Ingredient from './ui/Ingredient.tsx';
import IngredientList from './ui/IngredientList.tsx';
import Price from './ui/Price.tsx';
import Rating from './ui/Rating.tsx';
import Title from './ui/Title.tsx';
import TitleAbout from './ui/TitleAbout.tsx';
import { useGetProductQuery } from '../../entities/product';

export default function ProductPage() {
  const [rating, setRating] = useState(4.3);
  const location = useLocation();

  const productId = location.pathname.slice(1);
  const { data } = useGetProductQuery(productId);

  if (!data) return null;

  const ingredients = data.masterData.current.masterVariant.attributes
    .find((obj) => obj.name === 'ingredients')
    ?.value?.toString()
    ?.split(', ');

  const rawPrice = data.masterData.current.masterVariant.prices[0].value.centAmount;
  const rawOldPrice = 4450;
  const image = data.masterData.current.masterVariant.images[0].url;
  const name = data.masterData.current.name.en;
  const calories = 1;
  const weight = 2;

  return (
    <div className="mx-auto h-full md:max-w-[645px]">
      <div className="relative h-full md:rounded-t-[32px] md:border-12 md:border-text-grey/10">
        <AddWishlistMobile />
        <div className="relative h-full">
          <Title image={image} name={name}>
            <TitleAbout name={name} weight={weight} calories={calories} />
          </Title>
          <BackButton />
          <div className="absolute -mt-12 flex flex-col rounded-3xl bg-primary px-4 pt-7 sm:px-8">
            <HeaderMobile name={name} calories={calories} weight={weight} />
            <Header>
              <>
                <Rating rating={rating} setRating={setRating} />
                <Price rawOldPrice={rawOldPrice} rawPrice={rawPrice} />
              </>
            </Header>
            <Footer />
            <Description />
            {ingredients ? (
              <IngredientList>
                <>
                  {ingredients.map((ing) => (
                    <Ingredient key={ing} value={ing} />
                  ))}
                </>
              </IngredientList>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
