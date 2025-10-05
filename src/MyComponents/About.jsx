import React from "react";

export default function About() {
  return (
    <div className="container my-5">
        <style>
            {`
                h1 {
                    font-size: 36px;
                    margin-bottom: 20px;
                    font-weight: bold;
                    font-family: 'Roboto', cambria;
                }
                h2 {
                    font-size: 24px;
                    margin-bottom: 10px;
                    font-weight: bold;
                    font-family: 'Roboto', cambria;
                }
                p {
                    font-size: 18px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                    font-family: 'Roboto', cambria;
                }
                    pa {
                    font-size: 18px;
                    line-height: 1.5;
                    margin-bottom: 20px;
                    font-weight: bold;
                    font-family: 'Roboto', cambria;
                }
                    pa::before {
                    content: "— ";
                    font-family: 'Roboto', cambria;
                }
                    pa::after {
                    content: " —";
                    font-family: 'Roboto', cambria;
                }

            `}
        </style>
      <h1>About Us</h1>
      <h2>Welcome to [Brand Name] — where style meets purpose.</h2>
        <p>Born from a passion for self-expression and a love for clean design, [Brand Name] is more than just a clothing label — it's a movement. We believe what you wear should empower you, tell your story, and reflect your values.</p>
            <p>Every piece in our collection is crafted with intention — blending timeless aesthetics with modern edge. Whether you're dressing for the everyday or making a bold statement, our designs are here to help you own your look with confidence.</p>
            <p>Sustainability, quality, and authenticity are at the heart of everything we do. From responsibly sourced materials to ethical production practices, we’re committed to making fashion that feels good — inside and out.
            Meet the Founder
        </p>

        <h2>[Owner’s Full Name], </h2>
            <pa>founder and creative mind behind [Brand Name], </pa>
            <p>started this journey with a simple but bold vision:
            to create clothing that stands for something — something real, lasting, and unapologetically authentic.</p>
                <p>With a background in [brief background – e.g., fashion design, business, street culture, or art], [First Name] brings a unique perspective to the brand, blending creativity with a strong sense of purpose. What began as a personal project quickly grew into a brand that resonates with people who value individuality, integrity, and modern style.</p>
                <h2>[His/Their] mission is clear:</h2>
                <p>"Clothing should be more than just fabric — it should inspire confidence, tell a story, and represent who you are."
                Every drop, every design, and every detail is a reflection of that mission.</p>
                <h2>Our Promise</h2>
                <p>We’re building more than a brand — we’re building a community. When you wear [Brand Name], you’re not just wearing clothes — you’re wearing purpose, passion, and pride.
                This is [Brand Name]. Designed to move. Built to last. Made for you.
            </p>
            <p>
                Join us on this journey. Let's make fashion not just about what we wear, but about how we wear it.
            </p>
            
    </div>
  );
}
