import React from "react";

const faqData = [
  {
    question: " What is this music player for?",
    answer: "It’s a web-based music player where users can upload, play, organize, and delete audio files."
  },
  {
    question: " What audio formats are supported?",
    answer: ".mp3, .wav, .ogg, .m4a — essentially, anything modern browsers support."
  },
  {
    question: " How do I upload music?",
    answer: "Go to the Upload page. Either click 'Browse Files' or drag & drop your audio files. They’ll appear in your Album."
  },
  {
    question: " Where are uploaded files stored?",
    answer: "Files are saved to the Express backend under an `uploads/` directory and displayed via the `/songs` API."
  },
  {
    question: " Can I delete a song after uploading?",
    answer: "Yes. Simply click the Delete button next to a song in your Album view."
  },
  {
    question: " Are uploaded files private?",
    answer: "Not currently. For deployed versions, you should implement authentication and access control."
  },
  {
    question: " Is there a playlist feature?",
    answer: "Not yet, but you can easily add playlist creation and saving.  I can help with that!"
  },
  {
    question: " Can I play music continuously?",
    answer: "Playback is currently per track. For queue, autoplay, or shuffle features, you’ll need enhanced player logic."
  },
  {
    question: " Is the music player mobile-friendly?",
    answer: "Yes! Thanks to TailwindCSS, the layout is responsive across devices."
  },
  {
    question: " Can I integrate Spotify or YouTube music?",
    answer: "Not currently. we can use their APIs in future, but it requires authentication and streaming rights."
  },
  {
    question: " How can I save favorite songs?",
    answer: "This isn't implemented yet, but adding a  toggle and Favorites view would be a simple enhancement."
  },
];

function FaqSection() {
  return (
    <section className="bg-black text-white py-12 px-6 md:px-20">
      <h2 className="text-3xl font-bold text-purple-300 text-center mb-10 mt-11"> Frequently Asked Questions</h2>
      <div className="grid gap-6 max-w-4xl mx-auto">
        {faqData.map((item, index) => (
          <div
            key={index}
            className="border border-purple-500 rounded-lg p-6 bg-gray-900 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-purple-300 mb-2">
              {item.question}
            </h3>
            <p className="text-gray-300 text-sm leading-relaxed">{item.answer}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default FaqSection;
