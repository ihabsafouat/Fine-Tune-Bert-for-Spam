# syntax=docker/dockerfile:1.4

FROM python:3.8-slim-bullseye

# Install system dependencies and clean up
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        sendmail sendmail-cf libsasl2-modules \
        build-essential libpq-dev \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt && \
    pip install --no-cache-dir uvicorn[standard]

# Copy application files (use .dockerignore to exclude unnecessary files)
COPY . .

# Set up mail folders (permissions for dev, restrict for prod)
RUN mkdir -p /var/spool/mail /var/spool/mail/spam /var/log/spam-filter && \
    chmod 777 /var/spool/mail /var/spool/mail/spam /var/log/spam-filter

# --- SENDMAIL GMAIL RELAY CONFIGURATION ---
# For production, use Docker secrets or build args for these!
ENV GMAIL_USER=isafouat36@gmail.com
ENV GMAIL_PASS="ryuh cfkl dzup quyk"

RUN echo "define(\`SMART_HOST', \`smtp.gmail.com')dnl" >> /etc/mail/sendmail.mc && \
    echo "define(\`RELAY_MAILER_ARGS', \`TCP \$h 587')dnl" >> /etc/mail/sendmail.mc && \
    echo "define(\`ESMTP_MAILER_ARGS', \`TCP \$h 587')dnl" >> /etc/mail/sendmail.mc && \
    echo "FEATURE(\`authinfo', \`hash -o /etc/mail/authinfo.db')dnl" >> /etc/mail/sendmail.mc && \
    echo "define(\`confAUTH_OPTIONS', \`A p')dnl" >> /etc/mail/sendmail.mc && \
    echo "TRUST_AUTH_MECH(\`EXTERNAL DIGEST-MD5 CRAM-MD5 LOGIN PLAIN')dnl" >> /etc/mail/sendmail.mc && \
    echo "define(\`confAUTH_MECHANISMS', \`EXTERNAL GSSAPI DIGEST-MD5 CRAM-MD5 LOGIN PLAIN')dnl" >> /etc/mail/sendmail.mc && \
    echo "AuthInfo:smtp.gmail.com \"U:${GMAIL_USER}\" \"P:${GMAIL_PASS}\" \"M:PLAIN\"" > /etc/mail/authinfo && \
    makemap hash /etc/mail/authinfo < /etc/mail/authinfo && \
    cd /etc/mail && m4 sendmail.mc > sendmail.cf

EXPOSE 8000

# Start sendmail and your app
CMD service sendmail start && uvicorn backend.app:app --host 0.0.0.0 --port 8000 