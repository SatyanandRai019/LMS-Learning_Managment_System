function CarouselSlide({
  image,
  title,
  description,
  slideNumber,
  totalSlides,
}) {
  const prevSlide =
    slideNumber === 1 ? totalSlides : slideNumber - 1;

  const nextSlide =
    slideNumber === totalSlides ? 1 : slideNumber + 1;

  return (
    <div
      id={`slide${slideNumber}`}
      className="carousel-item relative w-full"
    >
      <img
        src={image}
        alt={title}
        className="h-[450px] w-full object-cover"
      />

      {/* Text Overlay */}
      <div className="absolute bottom-0 w-full bg-black/50 p-6 text-white">
        <h2 className="text-2xl font-bold">{title}</h2>
        <p className="mt-2">{description}</p>
      </div>

      {/* Navigation Buttons */}
      <div className="absolute left-5 right-5 top-1/2 flex -translate-y-1/2 justify-between">
        <a href={`#slide${prevSlide}`} className="btn btn-circle">
          ❮
        </a>

        <a href={`#slide${nextSlide}`} className="btn btn-circle">
          ❯
        </a>
      </div>
    </div>
  );
}

export default CarouselSlide;