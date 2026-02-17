const SeoContent = ({ title, description, faqs }) => {
  return (
    <section className="max-w-7xl mx-auto mt-10">
      <div className="bg-white rounded-xl p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-3">{title}</h2>
        <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

        {faqs && faqs.length > 0 && (
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Frequently Asked Questions
            </h3>
            <dl className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="border-b border-gray-100 pb-4">
                  <dt className="font-medium text-gray-700 mb-1">
                    {faq.question}
                  </dt>
                  <dd className="text-gray-500 text-sm">{faq.answer}</dd>
                </div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </section>
  );
};

export default SeoContent;
