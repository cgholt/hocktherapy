export type Testimonial = {
  id: string;
  name: string;
  role?: string;
  quote: string;
  // Optional: add image path like "/images/avatar-1.jpg" and place file in public/images/
  avatar?: string | null;
};

export const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Sarah M.",
    quote: "Working with this practice has been transformative. I finally feel like I have the tools to manage my anxiety.",
  },
  {
    id: "2",
    name: "James & Lisa",
    role: "Couples therapy clients",
    quote: "Our communication has improved so much. We're grateful for the guidance and support.",
  },
  {
    id: "3",
    name: "Michael R.",
    quote: "A safe space to work through difficult emotions. I recommend this practice to anyone seeking support.",
  },
];
