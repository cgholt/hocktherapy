export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export const faqs: FAQ[] = [
  {
    id: "1",
    question: "What should I expect in the first session?",
    answer: "<p>The first session is an opportunity for us to get to know each other. We'll discuss what brings you to therapy, your goals, and any questions you have. It's a chance to see if we're a good fit to work together.</p>",
  },
  {
    id: "2",
    question: "How long does therapy typically last?",
    answer: "<p>The duration of therapy varies depending on your individual needs and goals. Some people find a few sessions helpful, while others benefit from longer-term support. We'll regularly check in on your progress and adjust as needed.</p>",
  },
  {
    id: "3",
    question: "Do you offer virtual sessions?",
    answer: "<p>Yes, I offer both in-person and virtual sessions to accommodate your schedule and preferences. Virtual sessions are conducted through a secure, HIPAA-compliant platform.</p>",
  },
  {
    id: "4",
    question: "What are your fees and do you accept insurance?",
    answer: "<p>Please contact me directly to discuss fees and insurance options. I'm committed to making therapy accessible and can discuss sliding scale options if needed.</p>",
  },
];
