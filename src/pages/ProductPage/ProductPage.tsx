import { useState } from 'react';

import getAttribute from './lib/helpers/getAttribute.ts';
import AddWishlistMobile from './ui/AddWishlistMobile.tsx';
import BackButton from './ui/BackButton.tsx';
import Description from './ui/Description.tsx';
import Footer from './ui/Footer.tsx';
import Header from './ui/Header.tsx';
import HeaderMobile from './ui/HeaderMobile.tsx';
import ImageSlider from './ui/ImageSlider';
import Ingredient from './ui/Ingredient.tsx';
import IngredientList from './ui/IngredientList.tsx';
import Price from './ui/Price.tsx';
import Rating from './ui/Rating.tsx';
import Title from './ui/Title.tsx';
import TitleAbout from './ui/TitleAbout.tsx';
import { ProductAttributeNames, useGetProductQuery } from '../../entities/product';
import 'swiper/css';
import { useGetPath } from '../../shared/lib/hooks';
import LoadingAnimation from '../../shared/ui/LoadingAnimation.tsx';

export default function ProductPage() {
  const [rating, setRating] = useState(4.3);
  const [isSliderOpen, setSliderOpen] = useState(false);
  const productId = useGetPath();
  const { data } = useGetProductQuery(productId);

  const handleSliderOpen = () => {
    setSliderOpen(true);
  };

  const handleCloseSlider = () => {
    setSliderOpen(false);
  };

  if (!data)
    return (
      <div className="flex h-full items-center justify-center overflow-hidden">
        <LoadingAnimation />
      </div>
    );

  const {
    masterVariant: { attributes, prices, images },
    name: { en },
  } = data;

  const rawPrice = prices[0].value.centAmount;
  const rawOldPrice = 4450;
  const name = en;

  const imgList = images.map((img) => img.url);

  const ingredients = getAttribute(attributes, ProductAttributeNames.INGREDIENTS)?.toString()?.split(', ');
  const calories = getAttribute(attributes, ProductAttributeNames.CALORIES);
  const weight = getAttribute(attributes, ProductAttributeNames.WEIGHT);

  return (
    <div
      className="
        mt-14
        sm:mt-16
        md:py-11"
    >
      <ImageSlider onClose={handleCloseSlider} isOpen={isSliderOpen} imgList={imgList} />
      <div className="mx-auto h-full md:max-w-[645px]">
        <div className="relative h-[1250px] md:rounded-t-[32px] md:border-12 md:border-text-grey/10">
          <AddWishlistMobile />
          <div className="relative h-full">
            <Title onClick={handleSliderOpen} imgList={imgList} name={name}>
              <div>
                <TitleAbout name={name} weight={weight} calories={calories} />
              </div>
            </Title>
            <BackButton />
            <div
              className="absolute z-[10]
 -mt-4 flex w-full flex-col rounded-3xl bg-primary px-4 pt-7 sm:px-8"
            >
              <HeaderMobile name={name} calories={calories} weight={weight} />
              <Header>
                <>
                  <Rating rating={rating} setRating={setRating} />
                  <Price rawOldPrice={rawOldPrice} rawPrice={rawPrice} />
                </>
              </Header>
              <Footer />
              <Description attributes={attributes} />
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
    </div>
  );
}
