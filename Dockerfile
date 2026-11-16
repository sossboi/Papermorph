# SPR421 Papermorph — static site image
FROM nginx:alpine

# Remove default nginx site
RUN rm -rf /usr/share/nginx/html/*

# Copy the SPR421 bookshelf
COPY site/ /usr/share/nginx/html/

# Normalize permissions: narration tools write files (e.g. timings.js) with mode
# 0600, which the nginx runtime (nginx user) cannot read -> 403 in container.
RUN find /usr/share/nginx/html -type f ! -perm 644 -exec chmod 644 {} + \
 && find /usr/share/nginx/html -type d ! -perm 755 -exec chmod 755 {} +

# Basic SPA-ish fallback: serve 404.html for missing pages
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    gzip on;\n\
    gzip_types text/css application/javascript image/webp application/json;\n\
    location / {\n\
        try_files $uri $uri/ $uri/index.html =404;\n\
    }\n\
    error_page 404 /404.html;\n\
}\n' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
