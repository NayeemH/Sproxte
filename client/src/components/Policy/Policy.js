import React from "react";
import { Container } from "react-bootstrap";
import styles from "./Policy.module.scss";

const Policy = () => {
  return (
    <div className={styles.wrapper}>
      <h1 className="text-center fw-dark py-3 ">PRIVACY POLICY</h1>
      <Container>
        <span className="d-block text-center fs-3 fw-bold pt-3">
          1. Personal information
        </span>

        <span className="d-block fs-4 fw-dark text-justify  pb-3">
          Before using certain parts of any{" "}
          <a href="mailto: orders@sproxte.com" className={styles.link}>
            sproxte.com
          </a>{" "}
          (“Sproxte”) or ordering Products, you must complete an online
          registration form. During registration, you will be prompted to
          provide to us certain personal information, including but not limited
          to User’s (your/company) name, shipping and billing address, phone
          number, email address, and credit card number. In addition, we may
          also ask you for your/Customer’s country of residence and/or
          organization’s country of operation, so we can comply with applicable
          laws and regulations, and for your gender. These kinds of personal
          information are used for billing purposes, to fulfill orders, to
          communicate about order and Sproxte, and for internal marketing
          purposes. If we encounter a problem when processing the order, your
          personal information may be used to contact you. By registering at
          Sproxte, you agree that all information provided in the registration
          data is true and accurate and that you will maintain and update this
          information as required in order to keep it current, complete, and
          accurate. Sproxte may collect statistics about the behavior of
          visitors to its Site. Sproxte may display this information publicly or
          provide it to others. However, Sproxte does not disclose personal
          information other than as described here. If you are a registered user
          of a Sproxte Site and have supplied your email address, Sproxte may
          occasionally send you an email to tell you about new features, new
          Products, solicit your feedback. Sproxte takes all measures reasonably
          necessary to protect against the unauthorized access, use, alteration
          or destruction personal information.
        </span>
        <span className="d-block text-center fs-3 fw-bold pt-3">
          2. Disclosure of information
        </span>

        <span className="d-block fs-4 fw-dark text-justify pb-3">
          Sproxte discloses personal information only to those of its employees,
          contractors and affiliated organizations that need to know that
          information in order to process it on Sproxte’s behalf or to provide
          Services available at Sproxte Site, and that have agreed not to
          disclose it to others. Some of those employees, contractors and
          affiliated organizations may be located outside of your home country.
          Sproxte will not rent or sell personal information to anyone. Other
          than to its employees, contractors and affiliated organizations, as
          described here, Sproxte discloses personal information only in
          response to court order or other governmental request, or when Sproxte
          believes in good faith that disclosure is reasonably necessary to
          protect the property or rights of Sproxte, third parties or the public
          at large.
        </span>
        <span className="d-block text-center fs-3 fw-bold pt-3">
          3. Security
        </span>

        <span className="d-block fs-4 fw-dark text-justify pb-3">
          Your account is protected by a password for your privacy and security.
          You need to prevent unauthorized access to your account and personal
          information by selecting and protecting your password appropriately
          and limiting access to your computer and browser by signing off after
          you have finished accessing your account.
        </span>
        <span className="d-block text-center fs-3 fw-bold pt-3">
          4. Cookies
        </span>

        <span className="d-block fs-4 fw-dark text-justify pb-3">
          Sproxte employs cookies. Cookies are alphanumeric identifiers that we
          transfer to your computer’s hard drive through your web browser to
          enable our systems to recognize your browser. Most internet browsers
          are initially set to accept cookies. You can set your browser to
          refuse cookies from web sites or to remove cookies from your hard
          drive, but if you do, you will not be able to access or use portions
          of Sproxte Service. We have to use cookies to enable you to select
          Products, place them in an online shopping cart, and to purchase those
          Products. If you do this, we keep a record of your browsing activity
          and purchase.
        </span>
        <span className="d-block text-center fs-3 fw-bold pt-3">
          5. Business transitions
        </span>

        <span className="d-block fs-4 fw-dark text-justify pb-3">
          If Sproxte, or substantially all of its assets were acquired, or in
          the event that Sproxte goes out of business or enters bankruptcy, your
          personal information would be one of the assets that is transferred or
          acquired by a third party. You acknowledge that such transfers may
          occur, and that any acquirer of Sproxte and/or the Site may continue
          to use your personal information as set forth in this policy.
        </span>
        <span className="d-block text-center fs-3 fw-bold pt-3">
          6. Privacy policy changes
        </span>

        <span className="d-block fs-4 fw-dark text-justify pb-5">
          Although most changes are likely to be minor, Sproxte may change its
          Privacy Policy from time to time, and in Sproxte’s sole discretion.
          Sproxte encourages you to frequently check this page for any changes
          to its Privacy Policy. Your continued use of this Site after any
          change in this Privacy Policy will constitute your acceptance of such
          change.
        </span>
      </Container>
    </div>
  );
};

export default Policy;
