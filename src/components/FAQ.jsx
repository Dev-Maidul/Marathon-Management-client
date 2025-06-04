import React from "react";

const FAQ = () => {
  return (
    <section className="dark:bg-gray-100 dark:text-gray-800 rounded-2xl py-8 mb-8">
      <div className="container flex flex-col justify-center px-4 py-8 mx-auto md:p-8">
        <h2 className="text-2xl font-semibold sm:text-4xl text-center py-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
               How do I register for a marathon event?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
            Simply log in or create an account, go to the "Marathons" page, and click the "Register" button for your desired event.
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              Can I update my profile after registration?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
              Yes, after logging in, you can update your name and profile photo anytime from your account settings.
            </p>
          </details>
          <details className="w-full border rounded-lg">
            <summary className="px-4 py-6 focus:outline-none focus-visible:dark:ring-violet-600">
              What should I do if I forget my password?
            </summary>
            <p className="px-4 py-6 pt-0 ml-4 -mt-4 dark:text-gray-600">
               Use the "Forgot Password" link on the login page. A reset link will be sent to your email.
            </p>
          </details>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
