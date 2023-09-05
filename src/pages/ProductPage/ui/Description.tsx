import { ProductAttribute, ProductAttributeNames } from '../../../entities/product';

interface IDescriptionProps {
  attributes: ProductAttribute[];
}

function Description({ attributes }: IDescriptionProps) {
  return (
    <div className="mt-6">
      <h3 className="text-2xl font-normal text-accent">Description</h3>
      <p className="mt-3 text-[13px] font-light text-text-grey">
        {attributes.map((attr, index) => {
          if (index === 0) return null;
          if (attr.name === ProductAttributeNames.IS_SPICY || attr.name === ProductAttributeNames.IS_VEGAN) {
            return null;
          }
          return <span className="block" key={attr.name}>{`${attr.name} - ${attr.value}`}</span>;
        })}
      </p>
    </div>
  );
}

export default Description;
