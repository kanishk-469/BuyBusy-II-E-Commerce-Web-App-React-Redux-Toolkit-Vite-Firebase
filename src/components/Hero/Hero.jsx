// import "../../../src/tailwind.css";
function Hero() {
  const scrollToProducts = () => {
    const section = document.getElementById("products-section");

    const scrollFunc = (value) => {
      value.scrollIntoView({
        behavior: "smooth",
      });
    };

    if (section) {
      scrollFunc(section);
    }
  };

  return (
    // <section className="w-full bg-linear-to-r from-violet-50 to-indigo-100  lg:p-14 mb-10 p-10">
    <section className="w-full bg-linear-to-r from-violet-50 via-indigo-50 to-purple-100 py-16 lg:py-24 px-6 lg:px-16 overflow-hidden">
      <div className="flex flex-col lg:flex-row items-center justify-between gap-10">
        {/* Left Content */}
        {/* <div className="flex-1" style={{ padding: "40px" }}> */}
        {/* <div className="flex-1 p-10 lg:p-12"> */}
        <div className="flex-1 max-w-2xl">
          <span className="inline-block bg-violet-100 text-violet-700 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            🛍️ Modern E-Commerce Experience
          </span>

          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900">
            Discover Premium Products
            <span className="block text-violet-600">At Unbeatable Prices</span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg max-w-xl leading-relaxed">
            Shop electronics, fashion, jewellery and accessories with a seamless
            experience powered by React, Redux Toolkit and Firebase.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 mt-10">
            <button
              onClick={scrollToProducts}
              className="bg-violet-600 hover:bg-violet-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg cursor-pointer"
            >
              Shop Now
            </button>

            <button
              onClick={scrollToProducts}
              className="border-2 border-violet-600 text-violet-600 hover:bg-violet-50 px-8 py-4 rounded-xl font-semibold transition-all duration-300 cursor-pointer"
            >
              Explore Categories
            </button>
          </div>

          <div className="flex gap-12 mt-14 flex-wrap">
            <div>
              <h3 className="text-2xl font-bold text-violet-600">100+</h3>
              <p className="text-gray-500">Products</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-violet-600">24/7</h3>
              <p className="text-gray-500">Support</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-violet-600">100%</h3>
              <p className="text-gray-500">Secure Checkout</p>
            </div>
          </div>
        </div>

        {/* Right Image */}
        <div className="flex-1 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=900"
            alt="Shopping"
            className="rounded-sm shadow-2xl w-full max-w-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}

export default Hero;
