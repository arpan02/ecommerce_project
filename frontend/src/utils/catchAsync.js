const catchAsync = fn => {
  try {
    fn();
  } catch (error) {
    console.log(error);
  }
};

export default catchAsync;
