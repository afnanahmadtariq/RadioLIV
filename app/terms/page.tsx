import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service - RadioLIV',
    description: 'Terms of Service for RadioLIV online radio streaming platform.',
};

export default function TermsPage() {
    return (
        <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
            <section className="hero-section" style={{ paddingBottom: '24px' }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <h1 className="hero-title">📜 Terms of Service</h1>
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
                        1. Acceptance of Terms
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        By accessing and using RadioLIV (&ldquo;the Service&rdquo;), you agree to be bound by these Terms of Service.
                        If you do not agree to these terms, please do not use the Service.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        2. Description of Service
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        RadioLIV is a free online radio directory that provides access to publicly available internet radio streams.
                        We do not host, produce, or control the content of any radio station accessed through our Service.
                    </p>
                    <p style={{ marginBottom: '12px' }}>
                        The radio streams are provided by third-party broadcasters, and we act merely as an aggregator
                        using the Radio Browser API.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        3. User Responsibilities
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        You agree to use the Service only for lawful purposes and in accordance with these Terms.
                        You agree not to:
                    </p>
                    <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
                        <li style={{ marginBottom: '8px' }}>Use the Service for any illegal or unauthorized purpose</li>
                        <li style={{ marginBottom: '8px' }}>Attempt to interfere with or disrupt the Service</li>
                        <li style={{ marginBottom: '8px' }}>Record, redistribute, or rebroadcast any content accessed through the Service</li>
                        <li style={{ marginBottom: '8px' }}>Circumvent any access restrictions or security measures</li>
                    </ul>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        4. Intellectual Property
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        The RadioLIV name, logo, and user interface are our property. All radio content, including music,
                        broadcasts, and station logos, belong to their respective owners.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        5. Disclaimer of Warranties
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        THE SERVICE IS PROVIDED &ldquo;AS IS&rdquo; WITHOUT WARRANTIES OF ANY KIND. We do not guarantee that
                        any radio stream will be available, uninterrupted, or error-free.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        6. Limitation of Liability
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        RadioLIV shall not be liable for any direct, indirect, incidental, special, or consequential damages
                        resulting from your use of the Service.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        7. Changes to Terms
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        We reserve the right to modify these Terms at any time. Continued use of the Service after
                        changes constitutes acceptance of the new Terms.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        8. Contact
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        For questions about these Terms, please contact us through our website.
                    </p>
                </section>
            </article>
        </div>
    );
}
