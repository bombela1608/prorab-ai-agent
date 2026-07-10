import { LegalPage, LegalSection } from "@/components/legal-page";

export default function TermsOfUsePage() {
  return (
    <LegalPage title="Terms of Use" lastUpdated="July 2026">
      <p>
        These Terms of Use (&quot;Terms&quot;) govern access to and use of ProRab AI Agent (the
        &quot;Service&quot;). By creating a workspace or otherwise using the Service, you agree to these Terms
        on behalf of yourself and the business you represent.
      </p>

      <LegalSection title="1. The Service">
        <p>
          ProRab AI Agent is a cloud-based, multi-tenant software platform that provides CRM, scheduling,
          finance, analytics, and AI-assisted automation tools for small and medium-sized businesses.
        </p>
      </LegalSection>

      <LegalSection title="2. Accounts">
        <p>
          You must provide accurate information when creating a workspace and are responsible for maintaining
          the confidentiality of your login credentials and for all activity under your account. Notify us
          promptly of any unauthorized use.
        </p>
      </LegalSection>

      <LegalSection title="3. Subscription Plans &amp; Billing">
        <ul className="list-disc space-y-1 pl-5">
          <li>New workspaces receive a 14-day free trial with full Professional-tier access; no payment method is required to start a trial.</li>
          <li>Paid plans (Basic, Professional, Enterprise) are billed on a recurring basis as described on the Pricing page at the time of purchase.</li>
          <li>You may upgrade, downgrade, or cancel your subscription at any time from your account settings; changes take effect at the start of the next billing cycle unless stated otherwise.</li>
          <li>Fees are non-refundable except where required by law.</li>
        </ul>
      </LegalSection>

      <LegalSection title="4. Acceptable Use">
        <p>You agree not to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Use the Service for any unlawful purpose or to store or transmit infringing, defamatory, or otherwise unlawful material.</li>
          <li>Attempt to gain unauthorized access to another workspace&apos;s data or to the Service&apos;s underlying infrastructure.</li>
          <li>Interfere with or disrupt the integrity or performance of the Service.</li>
          <li>Reverse-engineer or resell the Service without our prior written consent.</li>
        </ul>
      </LegalSection>

      <LegalSection title="5. Your Data">
        <p>
          You retain all rights to the data you or your customers submit to the Service (&quot;Customer
          Data&quot;). You grant us a limited license to host, process, and display Customer Data solely to
          provide and improve the Service. You are responsible for ensuring you have the necessary rights and
          consents to submit any personal data of your own customers or employees into the platform.
        </p>
      </LegalSection>

      <LegalSection title="6. Intellectual Property">
        <p>
          The Service, including its software, design, and branding, is owned by ProRab AI Agent and its
          licensors. These Terms do not grant you any rights to our trademarks or branding except as necessary
          to use the Service as intended.
        </p>
      </LegalSection>

      <LegalSection title="7. Third-Party Integrations">
        <p>
          The Service may allow you to connect third-party services (such as Salesforce, QuickBooks, Stripe,
          or Slack). Your use of those integrations is subject to the third party&apos;s own terms, and we are
          not responsible for their availability, accuracy, or acts or omissions.
        </p>
      </LegalSection>

      <LegalSection title="8. Disclaimers">
        <p>
          The Service, including any AI-generated content, forecasts, or recommendations, is provided
          &quot;as is&quot; without warranties of any kind. AI outputs may be inaccurate or incomplete and
          should not be treated as professional, legal, or financial advice; you remain responsible for
          decisions made using the Service.
        </p>
      </LegalSection>

      <LegalSection title="9. Limitation of Liability">
        <p>
          To the maximum extent permitted by law, ProRab AI Agent will not be liable for any indirect,
          incidental, special, or consequential damages, or for any loss of profits or data, arising out of or
          related to your use of the Service.
        </p>
      </LegalSection>

      <LegalSection title="10. Termination">
        <p>
          You may stop using the Service and close your workspace at any time. We may suspend or terminate
          access for material breach of these Terms, non-payment, or conduct that risks harm to the Service or
          other users.
        </p>
      </LegalSection>

      <LegalSection title="11. Changes to These Terms">
        <p>
          We may update these Terms from time to time. Continued use of the Service after changes take effect
          constitutes acceptance of the revised Terms.
        </p>
      </LegalSection>

      <LegalSection title="12. Contact">
        <p>
          Questions about these Terms can be sent to{" "}
          <a href="mailto:legal@prorabagent.com" className="text-teal-600 hover:underline">
            legal@prorabagent.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
