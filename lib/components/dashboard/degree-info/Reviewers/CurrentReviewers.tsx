import ReactTooltip from 'react-tooltip';

const CurrentReviewers = () => {
  const data = [
    {
      name: 'John Smith',
      jhed: 'jsmith1',
      status: 'pending',
      requestingReview: false,
    },
    {
      name: 'Mary Poppins',
      jhed: 'mpoppins1',
      status: 'approved',
      requestingReview: false,
    },
    {
      name: 'Charlie Brown',
      jhed: 'cbrown53',
      status: 'approved',
      requestingReview: true,
    },
  ];

  const getSVG = (status: string) => {
    if (status === 'pending') {
      return (
        <img
          src={'svg/Check.svg'}
          alt="status"
          className="h-4 block m-auto h-4 mt-1 tooltip"
          data-tip="Pending"
        />
      );
    } else if (status === 'approved') {
      return (
        <img
          src={'svg/Checkmark.svg'}
          alt="status"
          className="tooltip"
          data-tip="Approved"
        />
      );
    }
  };

  const getElements = (data) => {
    return data.map((element) => {
      return (
        <div
          className="flex flex-row justify-between items-center pt-2"
          key={element.name}
        >
          <p>{element.name}</p>
          <div className="flex flex-row">
            {element.requestingReview && (
              <img
                src="svg/CircularArrow.svg"
                alt="requesting review"
                className="h-3 w-3 mt-1.5 mr-1 tooltip"
                data-tip="This reviewer is requesting a review"
              />
            )}
            <div className="h-6 w-6">{getSVG(element.status)}</div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex flex-col pl-1 border-b">
      {getElements(data)}
      <ReactTooltip delayShow={200} />
    </div>
  );
};

export default CurrentReviewers;
