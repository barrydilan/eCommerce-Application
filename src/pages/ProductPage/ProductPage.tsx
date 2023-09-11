import { useEffect, useState } from 'react';

import getAttribute from './lib/helpers/getAttribute.ts';
import AddWishlistMobile from './ui/AddWishlistMobile.tsx';
import Allergens from './ui/Allergens.tsx';
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
import { DEFAULT_TITLE } from '../../shared/const/constants.ts';
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

  useEffect(() => {
    if (!data) return;
    const title = data.name.en;
    document.title = title;

    // eslint-disable-next-line consistent-return
    return () => {
      document.title = DEFAULT_TITLE;
    };
  });

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

  const price = prices[0].value.centAmount;
  const discountPrice = getAttribute(attributes, ProductAttributeNames.DISCOUNT_PRICE);
  const isSpicy = Boolean(getAttribute(attributes, ProductAttributeNames.IS_SPICY));
  const isVegan = Boolean(getAttribute(attributes, ProductAttributeNames.IS_VEGAN));
  const rawPrice = discountPrice ?? price;
  const rawOldPrice = discountPrice ? price : null;
  const name = en;

  const imgList = images.map((img) => img.url);

  const ingredients = getAttribute(attributes, ProductAttributeNames.INGREDIENTS)?.toString()?.split(', ');
  const calories = getAttribute(attributes, ProductAttributeNames.CALORIES);
  const weight = getAttribute(attributes, ProductAttributeNames.WEIGHT);
  const allergens = getAttribute(attributes, ProductAttributeNames.ALLERGENS);

  return (
    <div
      className="
        mt-14
        sm:mt-16
        md:py-11"
    >
      <ImageSlider onClose={handleCloseSlider} isOpen={isSliderOpen} imgList={imgList} />
      <div className="mx-auto h-full md:max-w-[645px]">
        <div className="relative h-fit md:rounded-[32px] md:border-[15px] md:border-text-grey/10 dark:md:border-text-grey/40">
          <AddWishlistMobile />
          <div className="h-full">
            <Title onClick={handleSliderOpen} imgList={imgList} name={name}>
              <div>
                <TitleAbout isSpicy={isSpicy} isVegan={isVegan} name={name} weight={weight} calories={calories} />
              </div>
            </Title>
            <BackButton />
            <div className="absolute z-10 -mt-4 flex w-full flex-col rounded-3xl rounded-t-[32px] bg-primary px-4 pt-7 dark:bg-dark-bg-primary sm:px-8 md:relative">
              <div className="absolute left-0 top-0 z-10 hidden h-8 w-full bg-primary dark:bg-dark-bg-primary md:block md:h-5 md:rounded-t-2xl" />
              <HeaderMobile isSpicy={isSpicy} isVegan={isVegan} name={name} calories={calories} weight={weight} />
              <Header>
                <>
                  <Rating rating={rating} setRating={setRating} />
                  <Price rawOldPrice={rawOldPrice} rawPrice={Number(rawPrice)} />
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
              {typeof allergens === 'string' ? <Allergens allergens={allergens} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}