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

  const getSVG = (status: string): string => {
    if (status === 'pending') {
      return 'svg/Star.svg';
    } else if (status === 'approved') {
      return 'svg/Checkmark.svg';
    }
  };

  const getElements = (data) => {
    return data.map((element) => {
      return (
        <div className="flex flex-row justify-between items-center pt-2">
          <p>{element.name}</p>
          <div className="flex flex-row">
            {element.requestingReview ? (
              <img src="svg/Grab.svg" alt="requesting review" className="h-6" />
            ) : null}
            <img src={getSVG(element.status)} alt="status" className="h-6" />
          </div>
        </div>
      );
    });
  };

  return <div className="flex flex-col pl-1 border-b">{getElements(data)}</div>;
};

export default CurrentReviewers;
