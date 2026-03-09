import { InfiniteSlider } from '@/components/ui/infinite-slider';

function InfiniteSliderBasic() {
  return (
    <InfiniteSlider gap={24} reverse className="w-full h-full">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&auto=format&fit=crop&q=80"
        alt="Porcelain patio with dining space"
        className="h-[120px] w-[180px] rounded-lg object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=900&auto=format&fit=crop&q=80"
        alt="Contemporary landscaped garden"
        className="h-[120px] w-[180px] rounded-lg object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=900&auto=format&fit=crop&q=80"
        alt="Modern front driveway"
        className="h-[120px] w-[180px] rounded-lg object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1600566752734-3f5d5d7f0d39?w=900&auto=format&fit=crop&q=80"
        alt="Neat hardscape borders"
        className="h-[120px] w-[180px] rounded-lg object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&auto=format&fit=crop&q=80"
        alt="Outdoor seating and paving"
        className="h-[120px] w-[180px] rounded-lg object-cover"
      />
      <img
        src="https://images.unsplash.com/photo-1600210492493-0946911123ea?w=900&auto=format&fit=crop&q=80"
        alt="Premium patio finish"
        className="h-[120px] w-[180px] rounded-lg object-cover"
      />
    </InfiniteSlider>
  );
}

const infiniteSliderDemo = {
  InfiniteSliderBasic,
};

export default infiniteSliderDemo;
