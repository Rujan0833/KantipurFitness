
const FeaturesSection = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">GYM FEATURES</h2>
          <div className="w-20 h-1 bg-gym-red mx-auto mb-6"></div>
          <p className="text-lg max-w-3xl mx-auto">
            Our classic gym provides all the essential equipment and amenities you need for
            a serious workout without the unnecessary distractions.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featureItems.map((item, index) => (
            <div key={index} className="bg-gym-light p-8 rounded-lg hover:shadow-md transition-shadow hover-grow">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-md mb-6"
              />
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-gray-700">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const featureItems = [
  {
    title: "Classic Free Weights",
    description: "High-quality dumbbells, barbells, and weight plates for traditional strength training.",
    image: "https://images.unsplash.com/photo-1638805981949-362f5964521f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80"
  },
  {
    title: "Strength Machines",
    description: "Reliable, well-maintained strength machines targeting every muscle group.",
    image: "https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1031&q=80"
  },
  {
    title: "Dedicated Training Areas",
    description: "Spacious zones for powerlifting, bodybuilding, and functional training.",
    image: "https://images.unsplash.com/photo-1593079831268-3381b0db4a77?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80"
  },
  {
    title: "Clean Locker Rooms",
    description: "Well-maintained locker rooms with showers and secure storage for your belongings.",
    image: "https://images.unsplash.com/photo-1570799915102-87456e0c5464?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Knowledgeable Staff",
    description: "Experienced trainers with expertise in classic training methodologies.",
    image: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
  },
  {
    title: "Flexible Hours",
    description: "Open early and close late to accommodate your busy schedule.",
    image: "https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80"
  }
];

export default FeaturesSection;
