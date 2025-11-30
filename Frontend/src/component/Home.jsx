import React from "react";

const Home = () => {
  return (
    <>
      <style>
        {`
          .home {
            font-family: 'Poppins', sans-serif;
          }

          /* HERO SECTION */
          .hero {
            background-image: url("https://images.unsplash.com/photo-1500530855697-b586d89ba3ee");
            background-size: cover;
            background-position: center;
            height: 80vh;
            color: white;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 60px;
          }

          .hero h1 {
            font-size: 60px;
            margin-bottom: 10px;
          }

          .hero p {
            font-size: 20px;
            margin-bottom: 20px;
          }

          .btn {
            background-color: #2E8B57;
            border: none;
            padding: 12px 28px;
            color: white;
            font-size: 18px;
            border-radius: 8px;
            cursor: pointer;
            transition: 0.3s;
          }

          .btn:hover {
            background-color: #256c46;
          }

          /* FEATURED SECTION */
          .featured {
            padding: 50px;
            text-align: center;
          }

          .featured h2 {
            font-size: 32px;
            margin-bottom: 30px;
          }

          .place-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 25px;
            margin-top: 20px;
          }

          .place-card {
            background: white;
            box-shadow: 0px 4px 12px rgba(0,0,0,0.15);
            border-radius: 12px;
            padding-bottom: 20px;
            overflow: hidden;
            text-align: center;
            transition: 0.3s;
          }

          .place-card:hover {
            transform: translateY(-5px);
          }

          .place-card img {
            width: 100%;
            height: 200px;
            object-fit: cover;
          }

          .place-card h3 {
            margin: 15px 0 10px;
          }

          .place-card p {
            margin: 0 15px;
            color: #555;
          }

          /* MOBILE RESPONSIVE */
          @media (max-width: 768px) {
            .hero {
              padding-left: 20px;
              text-align: center;
              padding-right: 20px;
              align-items: center;
            }

            .hero h1 {
              font-size: 38px;
            }

            .place-grid {
              grid-template-columns: 1fr;
            }
          }
        `}
      </style>

      <div className="home">

        {/* HERO SECTION */}
        <section className="hero">
          <h1>Discover The Hidden Places</h1>
          <p>Explore lesser-known destinations shared by real travelers.</p>
          <button className="btn">Explore Now</button>
        </section>

        {/* FEATURED HIDDEN PLACES */}
        <section className="featured">
          <h2>Featured Hidden Destinations</h2>

          <div className="place-grid">

            <div className="place-card">
              <img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470" />
              <h3>Mystic Forest</h3>
              <p>A quiet forest far away from tourists.</p>
            </div>

            <div className="place-card">
              <img src="https://images.unsplash.com/photo-1508615070457-7baeba4003ab" />
              <h3>Silver Waterfall</h3>
              <p>Hidden waterfall in the Himalayan foothills.</p>
            </div>

            <div className="place-card">
              <img src="https://images.unsplash.com/photo-1525104885110-205d0a52e2fe" />
              <h3>Crystal Caves</h3>
              <p>Unexplored caves known only to locals.</p>
            </div>

          </div>
        </section>

      </div>
    </>
  );
};

export default Home;
