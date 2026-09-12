export interface IProduct {
  id: number;
  slug: string;
  model: string;
  year: number;
  type: string;
  price: number;
  image: string[];
  description: string;
  purpose: string[];

  specifications: {
    frame: {
      material: string;
      type: string;
      axle: string;
      dropout: string;
      storage: string;
    };

    fork: {
      material: string;
      type: string;
      model: string;
      steerer: string;
      travel: string;
      axle: string;
    };

    groupset: {
      brand: string;
      model: string;
      gears: string;
      shifters: string;
      frontDerailleur: string;
      rearDerailleur: string;
      cassette: string;
      crankset: string;
      chain: string;
    };

    brakes: {
      type: string;
      model: string;
      rotors: string;
    };

    wheels: {
      rims: string;
      material: string;
      hubs: string;
      tires: string;
      size: string;
      tubeless: boolean;
      maxTireClearance: string;
    };

    components: {
      handlebar: string;
      stem: string;
      seatpost: string;
      saddle: string;
    };

    weight: string;
  };

  sizes: string[];
}
