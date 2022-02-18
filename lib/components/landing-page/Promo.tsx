import data from './promoData';

/**
 * Contains features and values that our app embraces.
 */
const Promo: React.FC = () => {
  return (
    <div className="flex flex-col items-center px-16 pb-8 my-8">
      <div className="">
        {data.map((d) => {
          return !d.order ? (
            <div className="flex flex-row" key={d.title}>
              <div className="w-1/2 pt-5">
                <div className="text-lg font-bold">{d.title}</div>
                <div>{d.desc}</div>
              </div>
              <div className="flex justify-center w-1/2 bg-gray-200 rounded-md h-80">
                <img alt="" src={d.img} />
              </div>
            </div>
          ) : (
            <div className="flex flex-row" key={d.title}>
              <div className="flex justify-center w-1/2 bg-gray-200 rounded">
                <img alt="" src={d.img} />
              </div>
              <div className="w-1/2 p-5">
                <div className="text-lg font-bold">{d.title}</div>
                <div>{d.desc}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Promo;
