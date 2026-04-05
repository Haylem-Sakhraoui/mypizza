import { ProductCard } from "./ProductCard";

const pizzas = [
  {
    id: 1,
    image:
      "https://plus.unsplash.com/premium_photo-1672198597143-45a4b5f064c9?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTd8fHBpenphJTIwbWFyZ2hlcml0YXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Margherita",
    description: "Tomatensauce, Mozzarella, frisches Basilikum, Olivenöl",
    price: "8,5€",
  },
  {
    id: 2,
    image:
      "https://plus.unsplash.com/premium_photo-1733259709671-9dbf22bf02cc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cGl6emElMjBzYWxhbWl8ZW58MHx8MHx8fDA%3D",
    title: "Salami",
    description: "Tomatensauce, Mozzarella, Salami, Oregano",
    price: "11,5€",
    badge: "Beliebt",
  },
  {
    id: 3,
    image:
      "https://images.unsplash.com/photo-1708649360696-7e0af9b714b7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl6emElMjBodWF3YWl8ZW58MHx8MHx8fDA%3D",
    title: "Hawaii",
    description: "Tomatensauce, Mozzarella, Schinken, Ananas",
    price: "12€",
  },
  {
    id: 4,
    image:
      "https://media.istockphoto.com/id/860443260/fr/photo/pizza-italienne-avec-thon-citron-oignons.webp?a=1&b=1&s=612x612&w=0&k=20&c=1HbnbTaPL_UnydShqC2dmatzdzPo99YwJoPKFWg8P1s=",
    title: "Tonno",
    description: "Tomatensauce, Mozzarella, Thunfisch, Zwiebeln, Kapern",
    price: "11,50€",
  },
  {
    id: 5,
    image:
      "https://media.istockphoto.com/id/1598834662/fr/photo/pizza-quatre-fromages-avec-du-basilic-frais-sur-le-dessus-sur-une-planche-de-bois-sur-un-fond.webp?a=1&b=1&s=612x612&w=0&k=20&c=T80n7V-up-PKdweH3kOhXf83eLqBCQr7v6X9IsYQ-eY=",
    title: "4 Käse",
    description: "Mozzarella, Gorgonzola, Parmesan, Emmentaler, Tomatensauce",
    price: "12,50€",
    badge: "Fan-Fav",
  },
  {
    id: 6,
    image:
      "https://images.unsplash.com/photo-1709392975966-6e76d0452436?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fHBpenphJTIwZGlhYm9sb3xlbnwwfHwwfHx8MA%3D%3D",
    title: "Diabolo 🌶️",
    description: "Tomatensauce, Mozzarella, scharfe Salami, Jalapeños, Chili",
    price: "10,90€",
    badge: "Scharf",
  },
  {
    id: 7,
    image:
      "https://media.istockphoto.com/id/1209993541/fr/photo/pizza-au-fromage-mozzarella-jambon-sauce-tomate-saucisse-poivre-%C3%A9pices-et-roquette-fra%C3%AEche.webp?a=1&b=1&s=612x612&w=0&k=20&c=GbPfuA-72P20niZw3Z7nenrJml1p03qwozGrT1X8UEA=",
    title: "Sucuk ",
    description: "Tomatensauce, Mozzarella, scharfe Salami, Jalapeños, Chili",
    price: "11,5€",
    badge: "Scharf",
  },
  {
    id: 8,
    image:
      "https://images.unsplash.com/photo-1617343251257-b5d709934ddd?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpenphJTIwc3BpbmF0fGVufDB8fDB8fHww",
    title: "Spinat ",
    description: "Tomatensauce, Mozzarella, scharfe Salami, Jalapeños, Chili",
    price: "12,5€",
    badge: "",
  },
  {
    id: 9,
    image:
      "https://images.unsplash.com/photo-1739643815373-72444e14c54b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fHBpenphJTIwdmVnZWFyaXNofGVufDB8fDB8fHww",
    title: "Vegetarisch 🌶️",
    description: "Tomatensauce, Mozzarella, scharfe Salami, Jalapeños, Chili",
    price: "12€",
    badge: "",
  },
  {
    id: 10,
    image:
      "https://images.unsplash.com/photo-1717883235373-ef10b2a745a3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cGl6emElMjBmdW5naGl8ZW58MHx8MHx8fDA%3D",
    title: "Funghi",
    description: "Tomatensauce, Mozzarella, scharfe Salami, Jalapeños, Chili",
    price: "10,5€",
    badge: "",
  },
  {
    id: 11,
    image:
      "https://media.istockphoto.com/id/925889900/fr/photo/pizza-au-pepperoni-chaud-maison-pr%C3%AAt-%C3%A0-manger.webp?a=1&b=1&s=612x612&w=0&k=20&c=iKrES2LmlvzZSSrN-3ljfy4k1HPGmNoZjdYDuRKK1t8=",
    title: "Prochiotto",
    description: "Tomatensauce, Mozzarella, scharfe Salami, Jalapeños, Chili",
    price: "12€",
    badge: "",
  },
  {
    id: 12,
    image:
      "https://images.unsplash.com/photo-1708649783142-846b4f66796f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fHBpenphJTIwbWlzdGF8ZW58MHx8MHx8fDA%3D",
    title: "Mista",
    description: "Tomatensauce, Mozzarella, scharfe Salami, Jalapeños, Chili",
    price: "12€",
    badge: "",
  },
  {
    id: 13,
    image:
      "https://media.istockphoto.com/id/471961243/fr/photo/pizza-avec-poulet-et-mushroom-cuisine-italienne-studio.webp?a=1&b=1&s=612x612&w=0&k=20&c=HfpYS83I8ycFjuhSg9kkuBF0dzeo0zlPvLikL_J0z_g=",
    title: "Hühnerwald",
    description: "Tomatensauce, Mozzarella, scharfe Salami, Jalapeños, Chili",
    price: "12€",
    badge: "",
  },
  {
    id: 14,
    image:
      "https://media.istockphoto.com/id/1052912364/fr/photo/pizza-canadien-avec-bacon-isol%C3%A9e-on-white-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=XNoHPs93uDSHI_0RgpDkCaQUTOfUY4ylCvANUrlayvs=",
    title: "Regina",
    description: "Tomatensauce, Mozzarella, scharfe Salami, Jalapeños, Chili",
    price: "12€",
    badge: "",
  },

];

export function PizzaSection() {
  return (
    <section id="pizza" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-orange-50 rounded-full px-4 py-1.5 mb-4">
            <span>🍕</span>
            <span className="text-sm font-bold" style={{ color: "#ec6408" }}>
              UNSERE PIZZEN
            </span>
          </div>
          <h2
            className="text-gray-900 mb-3"
            style={{ fontSize: "clamp(1.8rem, 4vw, 2.5rem)", fontWeight: 800 }}
          >
            Klassiker &amp; Highlights
          </h2>
          <p className="text-gray-500 max-w-md mx-auto text-sm">
            Frisch zubereitet, knuspriger Boden, premium Zutaten – unsere Pizzen werden direkt zu dir geliefert.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {pizzas.map((pizza) => (
            <ProductCard
              key={pizza.id}
              image={pizza.image}
              title={pizza.title}
              description={pizza.description}
              price={pizza.price}
              badge={pizza.badge}
              extras={[
                "Extra Mozzarella",
                "Extra Sauce",
                "Keine Zwiebeln",
                "Extra Scharf 🌶️",
                "Glutenfrei (+1,50€)",
                "Kein Knoblauch",
              ]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
