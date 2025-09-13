# 🔒 Security Policy

## Supported Versions

We actively support the following versions with security updates:

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

If you discover a security vulnerability in Benchwarmers OSS, please help us by reporting it responsibly.

### 🚨 How to Report

**Please do NOT report security vulnerabilities through public GitHub issues.**

Instead, please report security vulnerabilities by emailing:
- **Email**: [hockey@benchwarmers.app]
- **Subject**: `[SECURITY] Vulnerability Report - Benchwarmers OSS`

### 📋 What to Include

Please include the following information in your report:

1. **Description**: A clear description of the vulnerability
2. **Steps to Reproduce**: Detailed steps to reproduce the issue
3. **Impact**: What an attacker could achieve by exploiting this vulnerability
4. **Environment**: Your environment details (browser, OS, etc.)
5. **Proof of Concept**: If possible, include a proof of concept
6. **Suggested Fix**: Any suggestions for fixing the vulnerability

### 🕐 Response Timeline

We will acknowledge your report within **48 hours** and provide a more detailed response within **7 days** indicating our next steps.

We will keep you informed about our progress throughout the process of fixing the vulnerability.

### 🎯 Our Commitment

- We will investigate all legitimate reports
- We will fix vulnerabilities in a timely manner
- We will credit reporters (with permission) in our security advisories
- We will not pursue legal action against security researchers

### 🔍 Security Best Practices

When using Benchwarmers OSS, please follow these security best practices:

#### For Users
- Keep your dependencies updated
- Use HTTPS when accessing the application
- Be cautious with shared computers
- Clear browser data when using public computers

#### For Contributors
- Never commit sensitive data (API keys, passwords, etc.)
- Use environment variables for configuration
- Follow secure coding practices
- Report security issues through proper channels

### 🛡️ Known Security Considerations

#### Current Security Measures
- **Content Security Policy (CSP)**: Implemented to prevent XSS attacks
- **Input Validation**: All user inputs are validated and sanitized
- **HTTPS Only**: All communications should use HTTPS
- **Dependency Scanning**: Regular security audits of dependencies

#### Third-Party Data
- Player data is sourced from public NHL APIs
- Copies of NHL API player images are served from a public CloudFlare R2 bucket

### 📢 Security Updates

Security updates will be:
- Released as soon as possible after a fix is developed
- Documented in release notes
- Communicated through GitHub Security Advisories
- Tagged with appropriate severity levels

### 🤝 Security Hall of Fame

We appreciate security researchers who help make our project safer. With your permission, we'll acknowledge your contribution in our Security Hall of Fame.

### 📞 Contact

For security-related questions or concerns:
- **Email**: [your-email@example.com]
- **GitHub**: Create a private security advisory

---

**Thank you for helping keep Benchwarmers OSS secure!** 🛡️
