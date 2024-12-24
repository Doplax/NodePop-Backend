const transformProduct = (product, req) => {
  const { photo, ...rest } = product._doc; // Excludes `photo` property
  return {
    ...rest,
    imgSrc: photo?.data
      ? `${req.protocol}://${req.get("host")}/api/images/${product._id}`
      : null,
  };
};

module.exports = { transformProduct };
