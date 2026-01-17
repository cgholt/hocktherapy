export type Service = {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  durationMinutes?: number;
  price?: number;
  // Optional: add image path like "/images/service-1.jpg" and place file in public/images/
  image?: string | null;
};

export const services: Service[] = [
  {
    id: "1",
    title: "Individual Therapy",
    slug: "individual-therapy",
    summary: "One-on-one sessions tailored to your unique needs and goals.",
    content: `
      <p>Individual therapy provides a safe, confidential space to explore your thoughts, feelings, and behaviors. Together, we'll work to understand patterns that may be holding you back and develop strategies for positive change.</p>
      <h3>What to expect</h3>
      <ul>
        <li>50-minute sessions</li>
        <li>Personalized treatment approach</li>
        <li>Evidence-based techniques</li>
        <li>A supportive, non-judgmental environment</li>
      </ul>
    `,
    durationMinutes: 50,
    image: null,
  },
  {
    id: "2",
    title: "Couples Therapy",
    slug: "couples-therapy",
    summary: "Strengthen your relationship through improved communication and understanding.",
    content: `
      <p>Couples therapy helps partners improve their relationship by learning new ways to communicate, resolve conflicts, and deepen their connection.</p>
      <h3>Common areas we address</h3>
      <ul>
        <li>Communication challenges</li>
        <li>Trust and intimacy issues</li>
        <li>Life transitions</li>
        <li>Conflict resolution</li>
      </ul>
    `,
    durationMinutes: 60,
    image: null,
  },
  {
    id: "3",
    title: "Anxiety & Stress Management",
    slug: "anxiety-stress",
    summary: "Learn practical tools to manage anxiety and reduce stress in your daily life.",
    content: `
      <p>Anxiety can feel overwhelming, but with the right support and tools, you can learn to manage it effectively. We'll work together to understand your anxiety triggers and develop coping strategies that work for you.</p>
      <h3>Techniques we may use</h3>
      <ul>
        <li>Cognitive behavioral therapy (CBT)</li>
        <li>Mindfulness and relaxation techniques</li>
        <li>Breathing exercises</li>
        <li>Lifestyle modifications</li>
      </ul>
    `,
    durationMinutes: 50,
    image: null,
  },
];
