import { LegalPage, LegalSection } from "@/components/legal-page";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Privacy Policy" lastUpdated="July 2026">
      <p>
        ProRab AI Agent (&quot;ProRab,&quot; &quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) provides a
        cloud-based, multi-tenant business automation platform for small and medium-sized businesses. This
        Privacy Policy explains what information we collect, how we use it, and the choices you have.
      </p>

      <LegalSection title="1. Information We Collect">
        <p>We collect the following categories of information:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>
            <strong>Account information:</strong> name, email address, and password (stored as a salted hash,
            never in plain text) when you or your team create a workspace or sign in.
          </li>
          <li>
            <strong>Workspace data:</strong> information your business enters into the platform, including
            leads, customers, jobs, notes, and uploaded knowledge base documents. This data belongs to the
            workspace that created it and is isolated from other tenants.
          </li>
          <li>
            <strong>Usage data:</strong> pages visited, actions taken, and general device/browser information,
            used to operate and improve the service.
          </li>
          <li>
            <strong>Session cookies:</strong> a single authentication cookie used to keep you signed in. We do
            not use third-party advertising or tracking cookies.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="2. How We Use Information">
        <ul className="list-disc space-y-1 pl-5">
          <li>To operate, maintain, and secure the platform.</li>
          <li>To authenticate accounts and enforce access controls between workspaces.</li>
          <li>To provide the AI features described in the product (intake chat, analytics, forecasts).</li>
          <li>To communicate with you about your account or changes to the service.</li>
        </ul>
        <p>We do not sell personal information, and we do not use your workspace data to train third-party AI models.</p>
      </LegalSection>

      <LegalSection title="3. Data Storage &amp; Security">
        <p>
          Data is stored in a managed PostgreSQL database (Neon) and served via Vercel&apos;s cloud
          infrastructure. Connections use TLS in transit. Each workspace&apos;s data is logically isolated by
          tenant, and application-level access controls enforce that users can only see data belonging to
          their own workspace.
        </p>
      </LegalSection>

      <LegalSection title="4. Third-Party Services">
        <p>
          We rely on infrastructure providers (Vercel for hosting, Neon for database storage) to operate the
          platform. If you choose to connect optional third-party integrations (such as Salesforce, QuickBooks,
          Stripe, or Slack) from the Integrations page, data may be shared with those services according to
          their own privacy policies and only as needed to provide the connected functionality.
        </p>
      </LegalSection>

      <LegalSection title="5. Data Retention &amp; Deletion">
        <p>
          We retain workspace data for as long as your account is active. You may request deletion of your
          workspace and associated data at any time by contacting us; we will remove personal data within a
          reasonable period, except where retention is required by law.
        </p>
      </LegalSection>

      <LegalSection title="6. Your Rights">
        <p>
          Depending on your location, you may have rights under applicable law (such as the GDPR or CCPA) to
          access, correct, export, or delete your personal information, or to object to certain processing.
          To exercise these rights, contact us using the information below.
        </p>
      </LegalSection>

      <LegalSection title="7. Children's Privacy">
        <p>
          ProRab AI Agent is intended for business use and is not directed at individuals under 18. We do not
          knowingly collect personal information from children.
        </p>
      </LegalSection>

      <LegalSection title="8. Changes to This Policy">
        <p>
          We may update this Privacy Policy from time to time. Material changes will be reflected by updating
          the &quot;Last updated&quot; date above.
        </p>
      </LegalSection>

      <LegalSection title="9. Contact Us">
        <p>
          Questions about this policy or your data can be sent to{" "}
          <a href="mailto:privacy@prorabagent.com" className="text-teal-600 hover:underline">
            privacy@prorabagent.com
          </a>
          .
        </p>
      </LegalSection>
    </LegalPage>
  );
}
