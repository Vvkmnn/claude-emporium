# Security

Plugins in this marketplace run hook scripts with Node.js access to your filesystem and environment. They do not transmit data externally except through the MCP servers they wrap (which have their own scopes).

## Reporting a Vulnerability

If you find a security issue — particularly anything that could cause a hook script to leak environment variables, credentials, or sensitive files — please report it via [GitHub private vulnerability reporting](https://github.com/Vvkmnn/claude-emporium/security/advisories/new) rather than opening a public issue.

Include:
- Which plugin/file is affected
- What an attacker could do with it
- A proof of concept if possible

I'll respond within 72 hours.
