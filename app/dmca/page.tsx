import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'DMCA & Takedown - RadioLIV',
    description: 'DMCA takedown policy for RadioLIV online radio streaming platform.',
};

export default function DmcaPage() {
    return (
        <div className="animate-fade-in" style={{ paddingBottom: '60px' }}>
            <section className="hero-section" style={{ paddingBottom: '24px' }}>
                <div className="hero-content" style={{ maxWidth: '100%' }}>
                    <h1 className="hero-title">⚖️ DMCA & Takedown</h1>
                    <p className="hero-subtitle">Copyright and Content Removal Policy</p>
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
                        Important Disclaimer
                    </h2>
                    <div style={{
                        background: 'rgba(233, 30, 99, 0.1)',
                        border: '1px solid var(--accent-primary)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '20px',
                        marginBottom: '20px'
                    }}>
                        <p style={{ marginBottom: '0' }}>
                            <strong>RadioLIV does not host, store, or stream any audio content.</strong> We are a directory
                            service that aggregates publicly available radio streams from around the internet using the
                            Radio Browser API. All radio content is streamed directly from the original broadcasters.
                        </p>
                    </div>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        How RadioLIV Works
                    </h2>
                    <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
                        <li style={{ marginBottom: '8px' }}>
                            We fetch radio station metadata from the Radio Browser API
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            When you click play, your browser connects directly to the radio station&apos;s stream URL
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            No audio passes through our servers
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            We do not cache, store, or redistribute any audio content
                        </li>
                    </ul>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        Reporting Copyright Issues
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        If you believe a radio station listed in our directory is infringing on your copyright,
                        please note:
                    </p>
                    <ol style={{ paddingLeft: '24px', marginBottom: '12px' }}>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>For content issues:</strong> Contact the radio station directly, as they are
                            responsible for their own broadcast content.
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>For listing removal:</strong> If you are the owner of a station and wish to be
                            removed from our directory, please contact us with proof of ownership.
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>For Radio Browser data:</strong> Since we source our data from Radio Browser,
                            you may also need to contact them at{' '}
                            <a href="https://www.radio-browser.info/" target="_blank" rel="noopener noreferrer"
                                style={{ color: 'var(--accent-primary)' }}>
                                radio-browser.info
                            </a>
                        </li>
                    </ol>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        Station Owner Rights
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        If you are a radio station owner and would like your station to be:
                    </p>
                    <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>Removed from our directory:</strong> Please contact us with verification of ownership
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>Updated with correct information:</strong> Submit changes through the Radio Browser platform
                        </li>
                        <li style={{ marginBottom: '8px' }}>
                            <strong>Verified:</strong> Contact us for station verification badge
                        </li>
                    </ul>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        Contact for Takedown Requests
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        To submit a takedown request or copyright concern, please include:
                    </p>
                    <ul style={{ paddingLeft: '24px', marginBottom: '12px' }}>
                        <li style={{ marginBottom: '8px' }}>Your full legal name and contact information</li>
                        <li style={{ marginBottom: '8px' }}>The specific station or content in question</li>
                        <li style={{ marginBottom: '8px' }}>Proof of copyright ownership or authorization</li>
                        <li style={{ marginBottom: '8px' }}>A statement of good faith belief</li>
                        <li style={{ marginBottom: '8px' }}>Your physical or electronic signature</li>
                    </ul>
                    <p style={{ marginBottom: '12px' }}>
                        Send requests through our website contact form or reach out directly via email.
                    </p>
                </section>

                <section style={{ marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '20px', fontWeight: 600, marginBottom: '16px', color: 'var(--text-primary)' }}>
                        Response Time
                    </h2>
                    <p style={{ marginBottom: '12px' }}>
                        We aim to respond to all legitimate takedown requests within 48-72 hours. However, since
                        we do not control the actual radio streams, some issues may need to be addressed by the
                        station operators directly.
                    </p>
                </section>
            </article>
        </div>
    );
}
