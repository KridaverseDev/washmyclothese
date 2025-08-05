import { NextPage } from "next";

const RefundPolicy: NextPage = () => {
  return (
    <main style={{ maxWidth: "800px", margin: "2rem auto", padding: "0 1rem" }}>
      <h1>Refund Policy</h1>
      <p>
        At <strong>Wash My Clothes</strong>, we strive to provide the highest quality washing and cleaning
        services. Please note that once the washing and cleaning process has begun on your clothes, we
        are unable to offer refunds. Additionally, cancellations will not be accepted once the service
        is underway.
      </p>
      <p>
        We appreciate your understanding and thank you for trusting <strong>Wash My Clothes</strong> with
        your laundry needs!
      </p>

      <h2>Contact Us</h2>
      <p>If you have any questions or concerns about our Refund Policy, please feel free to reach out to us:</p>
      <ul>
        <li>
          <p>
            By visiting this page on our website:{" "}
            <a
              href="https://www.washmyclothes.co.in/"
              target="_blank"
              rel="external nofollow noopener noreferrer"
              className="text-blue-600 underline"
            >
              https://www.washmyclothes.co.in/
            </a>
          </p>
        </li>
        <li>
          <strong>By phone:</strong> 8712326333
        </li>
      </ul>
    </main>
  );
};

export default RefundPolicy;
