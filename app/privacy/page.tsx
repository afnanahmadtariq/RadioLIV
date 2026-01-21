import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy - RadioLIV',
    description: 'Privacy Policy for RadioLIV online radio streaming platform.',
};

export default function PrivacyPage() {
    return (
        <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
            <section className="hero-section" style={{ paddingBottom: '24px' }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <h1 className="hero-title">🔒 Privacy Policy</h1>
                    <p className="hero-subtitle">Last updated: January 22, 2026</p>
                </div>
            </section>

            <article style={{
                padding: '0 32px',
                maxWidth: '800px',
                lineHeight: '1.8',
                color: 'var(--text-secondary)',
            }}>
                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        1. Information We Collect
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        RadioLIV is designed with privacy in mind. We collect minimal data:
                    </p>
                    <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>Local Storage Data:</strong> Your favorites and recently played stations are stored
                            locally in your browser and never sent to our servers.
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>Usage Analytics:</strong> We may collect anonymous usage statistics to improve the Service.
                        </li>
                    </ul>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        2. Data Storage
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        All user preferences (favorites, recently played, settings) are stored locally in your browser
                        using localStorage. This data remains on your device and is not transmitted to any server.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        3. Third-Party Services
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        RadioLIV uses the Radio Browser API to fetch radio station information. When you play a station,
                        you connect directly to the radio station&apos;s servers. We recommend reviewing the privacy policies
                        of individual radio stations.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        4. Cookies
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        We do not use tracking cookies. Any cookies used are essential for the functioning of the
                        application.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        5. Children&apos;s Privacy
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        Our Service is not intended for children under 13. We do not knowingly collect personal
                        information from children under 13.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        6. Your Rights
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        Since we don&apos;t collect personal data on our servers, you have full control over your data.
                        You can clear all local data at any time through the Settings page or by clearing your
                        browser&apos;s localStorage.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        7. Changes to This Policy
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        We may update this Privacy Policy from time to time. We will notify you of any changes by
                        posting the new Privacy Policy on this page.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        8. Contact Us
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        If you have any questions about this Privacy Policy, please contact us through our website.
                    </p>
                </section>
            </article>
        </div>
    );
}
